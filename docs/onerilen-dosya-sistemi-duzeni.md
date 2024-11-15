# Arch tabanlı dağıtımlarda önerilen dosya sistemi düzeni

Eğer EndeavourOS gibi diğer Arch-based dağıtımları, rollback için gereken dosya sistemi düzeniyle gelmiyorlar. Yani, eğer Arch’ı manuel olarak kurmadıysanız (örneğin, EndeavourOS kurduysanız), sisteminiz genellikle snapshot’lar için uyumlu bir BTRFS alt birim (subvolume) yapısıyla gelmez. Bu durumda, Snapper ile snapshot oluşturabilirsiniz ancak bu snapshot’lara geri dönemeyebilirsiniz. Bu sorunu çözmek için birkaç ayar yapmanız gerekecek.

## Önerilen dosya sistemi düzeni nedir?

Önerilen dosya sistemi düzeni, kısaca snapshot işlemleri için oluşturduğunuz "kurulu düzen"dir. Her bir alt birim (subvolume) belirli bir dizine bağlanır, bu da snapshot işlemlerinin daha hızlı ve verimli olmasını sağlar. İşte önerilen dosya sistemi düzeni budur:

| Subvolume  | Mountpoint  |
| ---------- | ----------- |
| @          | /           |
| @home      | /home       |
| @snapshots | /.snapshots |
| @var_log   | /var/log    |

## Nasıl yaparız?

Öncelikle, eğer Arch Linux’u `archinstall` ile veya manuel kurduysanız zaten bir şey yapmanıza gerek yok. Ancak EndeavourOS veya diğer Arch tabanlı dağıtımları kullanıyorsanız (muhtemelen Garuda Linux hariç), sisteminiz `@snapshots` alt birimi olmadan gelecektir, ki esas sorun da bu zaten.

İlk olarak yapmanız gereken, mevcut yapınızı kontrol etmektir:

```bash
sudo btrfs su li -p /
```

> Bu arada
>
> ```
> su = subvolume
> li = list
> cr = create
> de = delete
> ```

Eğer sonuç şu şekildeyse:

```bash
ID 257 gen 123818 parent 5 top level 5 path @home
ID 258 gen 123691 parent 5 top level 5 path @cache
ID 259 gen 123818 parent 5 top level 5 path @log
ID 260 gen 115392 parent 5 top level 5 path @swap
ID 2261 gen 123800 parent 5 top level 5 path @snapshots
ID 2264 gen 123726 parent 257 top level 257 path @home/.snapshots
ID 2266 gen 123817 parent 5 top level 5 path @
```

Herhangi bir sorun yok demektir. Ancak `@snapshots` yerine `.snapshots` görüyorsanız, aşağıdaki adımları uygulayın.

### 1. @snapshots subvolume’unu oluşturma

İlk olarak, eğer Snapper ile root ve home için config dosyaları oluşturduysanız, bunları silmeniz gerekiyor. Aksi takdirde, bu işlemlerden sonra Snapper’ı kullanırken hata almanız çok olası.

```bash
sudo snapper -c root delete-config
sudo snapper -c home delete-config
```

`/.snapshots` klasörünün bağlanmamış (mount edilmemiş) olması, hatta hiç bulunmaması gerekiyor. Eğer böyle bir klasör hala mevcutsa, aşağıdaki komutla silebilirsiniz:

```bash
sudo umount /.snapshots
sudo rm -r /.snapshots
```

Ardından `/` klasörü için yeni bir config oluşturun. Snapper’in `create-config` funksiyonu otomatik olarak, önerilen yapı için gerekli olmayan ve silinebilen `.snapshots` subvolume’unu oluşturur.

```bash
sudo btrfs subvolume delete /.snapshots
```

Subvolume’u sildikten sonra, `/.snapshots` klasörünü yeniden oluşturun.

```bash
sudo mkdir /.snapshots
```

Şimdi `@snapshots` alt birimini oluşturmamız gerek, ancak eğer sıradan bir şekilde `sudo btrfs create @snapshots` komutunu kullanırsak, oluşturacağımız subvolume `@` alt birimi olur ve bu bizim işimize yaramaz. Bu yüzden önce `/btrfs` klasörünü oluşturup, `5` id’li subvolume’ları bu klasöre mount edeceğiz. Önce bu klasörü oluşturalım.

```bash
sudo mkdir /btrfs
```

Sistem açılışında otomatik olarak `5` id’li subvolume’ların `/btrfs` klasörüne mount edilmesi için `/etc/fstab` dosyasını düzenlememiz gerekiyor.

```bash
sudo nano /etc/fstab
```

Bu dosyaya şu satırı ekleyin:

```bash
UUID=UUIDNIZI_GIRIN /btrfs btrfs rw,noatime,compress-force=zstd:5,ssd,space_cache,subvolid=5 0 0
```

`UUID=UUIDNIZI_GIRIN` kısmını, kendi sisteminizdeki doğru UUID ile değiştirmeniz gerektiğini unutmayın. UUID’yi öğrenmek için aşağıdaki komutu kullanabilirsiniz:

```bash
sudo blkid /dev/sdX1
```

(Burada `/dev/sdX1` kısmını kendi disk bölümünüzle değiştirdiğinizden emin olun.)

Bu düzenleme ile, sisteminiz her açıldığında `5` id’li subvolume’lar otomatik olarak `/btrfs` klasörüne mount edilecektir. Sisteminizi yeniden başlatmadan mount işlemini yapmak istiyorsanız

```bash
sudo mount -a
```

komutu ile mount edebilirsiniz.

Şimdi, `@snapshots` subvolume’unu, parent 5 ID’li bir alt birim olarak oluşturmak için şu komutu kullanacağız:

```bash
sudo btrfs su cr /btrfs/@snapshots
```

Bu komutla, `@` subvolume’undan tamamen bağımsız bir `@snapshots` subvolume’u oluşturmuş olacağız. Bu, sisteminizdeki snapshot işlemleri için gerekli olan alt birimi yaratmanıza olanak tanıyacaktır.

Oluşturduğumuz `@snapshots` subvolume’unu `/.snapshots` klasörüne mount etmemiz gerekiyor. Bunun her sistem açılışında otomatik yapılması için yine `/etc/fstab` dosyasını düzenleyeceğiz.

```bash
sudo nano /etc/fstab
```

Bu dosyaya şu satırı ekleyin:

```bash
UUID=UUIDNIZI_GIRIN /.snapshots btrfs subvol=/@snapshots 0 0
```

- Yine, `UUID=UUIDNIZI_GIRIN` kısmını, kendi sisteminizdeki doğru UUID ile değiştirmeniz gerektiğini unutmayın.

Mount işlemini hemen gerçekleştirmek için, tekrardan `sudo mount -a` komutunu kullanın. Böylece, `@snapshots` subvolume’u her açılışta otomatik olarak `/.snapshots` dizinine mount edilecektir.

Şimdi oluşturduğumuz `@snapshots` subvolume’unun parent’ının 5 olup olmadığını kontrol etmemiz gerekiyor. Bunun için şu komutu kullanabiliriz:

```bash
sudo btrfs su li -p /
```

Eğer `@snapshots` ile ilgili kısım şu şekilde görünüyorsa:

```bash
ID 2261 gen 123800 parent 5 top level 5 path @snapshots
```

Bu durumda herhangi bir sorun yok demektir. Yine de, snapper ile bir root snapshot’u alın ve snapshot’un doğru bir şekilde `@snapshots` subvolume’una oluşturulup oluşturulmadığını doğrulayın. Eğer, `ID 2355 gen 119328 parent 2261 top level 2261 path @snapshots/30/snapshot` gibi `@snapshots` içerisine oluşturulmuşsa hiçbir sorun yoktur.

### 2. Snapshot’a geri dönme

Üstteki işlemleri yapsanız dahi, `snapper rollback` komutu düzgün çalışmayacaktır. Çünkü `snapper rollback`’in yaptığı tek şey, salt okunur bir snapshot’tan yazılabilir bir snapshot oluşturmak ve bunu varsayılan subvolume olarak ayarlamaktır. Bu işlem, **her zaman varsayılan subvolume’a** önyükleme yapıldığı sürece doğru şekilde çalışır. Bu durum **OpenSUSE** üzerinde düzgün çalışırken, **Arch Linux** üzerinde çalışmaz. Bunun nedeni, Arch’ta kök alt biriminin GRUB’a sabit bir şekilde kodlanmış olmasıdır. Yani, Arch üzerinde varsayılan alt birime önyükleme yapmaya çalıştığınızda, bu işlem reddedilir. Eğer bir snapshot’a dönmek isterseniz, bunu `snapper-rollback` paketi ile veya manuel olarak yapmanız gerekecek.

#### I. `snapper-rollback` paketi ile snapshot’a geri dönme

Önce `snapper-rollback` paketini AUR’dan indirin:

```bash
yay -S snapper-rollback
```

Yükleme işlemi tamamlandıktan sonra, `snapper-rollback`’in sisteminize uygun şekilde çalışabilmesi için yapılandırma dosyasını düzenlemeniz gerekecek.

```bash
sudo nano /etc/snapper-rollback.conf
```

Config dosyasını şu şekilde ayarlayın:

```bash
# config for btrfs root
[root]
# Name of your linux root subvolume
subvol_main = @
# Name of your snapper snapshot subvolume
subvol_snapshots = @snapshots
# Directory to which your btrfs root is mounted.
mountpoint = /btrfs
# Device file for btrfs root.
# If your btrfs root isn't mounted to `mountpoint` directory, then automatically
# mount this device there before rolling back. This parameter is optional, but
# if unset, you'll have to mount your btrfs root manually.
dev = /dev/sda2
```

Buradaki `dev = /dev/sda2` parametresi sistemden sisteme göre değişebiliyor. `lsblk` komutunu kullanarak bunu öğrenebilirsiniz:

```bash
❯ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 465,8G  0 disk
├─sda1   8:1    0     1G  0 part /boot/efi
└─sda2   8:2    0 465,7G  0 part /var/log
                                 /var/cache
                                 /home
                                 /swap
                                 /btrfs
                                 /.snapshots
                                 /
```

Bende `/` mountpoint’inin bulunduğu kısım `sda2` olduğundan `/dev/sda2` olarak ayarlamam gerek.  
Yapılandırma dosyasını düzenledikten sonra, `Ctrl + O` tuşları ile kaydedin, ardından `Ctrl + X` ile çıkın. Şimdi, bir snapshot’a dönmek için `sudo snapper-rollback SNAPSHOT_ID` komutunu kullanabilirsiniz.

#### II. Manuel olarak snapshot’a dönme

Manuel olarak snapshot’a dönmek için, çncelikle, Arch Live CD/USB veya herhangi bir başka Linux Live ortamında sisteminizi başlatmanız gerekecek. Sonrasında, terminali açın ve şu komutla dosya sisteminizi `/mnt` klasörüne bağlayın:

```bash
sudo mount -o subvolid=5 /dev/sda2 /mnt
```

- Burada `/dev/sda2` kısmı, sisteminizin BTRFS kök bölümüyle ilişkilendirilmiş disk bölümü olmalı. Bu, sisteminizin BTRFS yapılandırmasına göre değişebilir.

Herhangi bir sorun çıkmaması için mevcut `@` subvolume’unu silmek yerine taşımanızı öneririm. Aşağıdaki komutla şu anki `@` subvolume’unu `@.broken` olarak taşıyabilirsiniz:

```bash
sudo mv /mnt/@ /mnt/@.broken
```

Şimdi, seçtiğiniz snapshot’tan yazılabilir bir subvolume oluşturacağız. Snapshot’ı `/mnt/@snapshots/ID/snapshot` yolundan alacağız. `ID` kısmı, dönmek istediğiniz snapshot’un ID’sini belirtir. Bunu aşağıdaki komutla yapabilirsiniz:

```bash
sudo btrfs subvolume snapshot /mnt/@snapshots/ID/snapshot /mnt/@
```

Bu işlemle, snapshot’tan yeni bir yazılabilir `@` subvolume’u oluşturmuş olacaksınız.

Yazılabilir `@` subvolume’u oluşturduktan sonra, subvolume bağlantısını kapatıp ardından yeniden mount edin.

```bash
sudo umount /mnt
sudo mount -o subvol=@ /dev/sda2 /mnt
```

Yeni subvolume’u mount ettikten sonra da, sisteminize `chroot` kullanarak bağlanmanız gerekiyor. Bunun için şu komutu kullanabilirsiniz:

```bash
arch-chroot /mnt
```

Şimdi, `initramfs`’yi yeniden oluşturmak için aşağıdaki komutu çalıştırın:

```bash
sudo mkinitcpio -P
```

Artık sisteminizi `reboot` komutuyla yeniden başlatabilirsiniz.
