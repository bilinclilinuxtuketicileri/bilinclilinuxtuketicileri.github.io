# nvidia-xrun

[nvidia-xrun](https://github.com/Witko/nvidia-xrun), NVIDIA Optimus özellikli dizüstü bilgisayarların isteğe bağlı olarak ayrı NVIDIA grafikleriyle X sunucusunu çalıştırmasına olanak tanıyan bir yardımcı programdır. Bu çözüm, tam GPU kullanımı, uyumluluk ve Bumblebee'den daha iyi performans sunar.

X sunucusu yalnızca entegre grafiklerle veya harici NVIDIA grafikleriyle kullanılabilir, ancak her ikisiyle de kullanılamaz, bu nedenle kullanıcı ayrı bir sanal konsola geçmek ve ilk X sunucusu için kullanılandan farklı grafikler kullanarak başka bir X sunucusu başlatmak isteyebilir.

## Kurulum

Yükleyin:

- [**nvidia**](https://archlinux.org/packages/?name=nvidia) - eski sürücüleri kullanıyorsanız nvidia-xrun'ın PKGBUILD dosyasını düzenlemeniz ve NVIDIA bağımlılığını kaldırmanız gerekir.
- [**nvidia-xrun-git**](https://aur.archlinux.org/packages/nvidia-xrun-git/)<sup>AUR</sup> (önerilir) veya [**nvidia-xrun**](https://aur.archlinux.org/packages/nvidia-xrun/)<sup>AUR</sup> (eski yöntem, özel kartı kapatmak için bumblebee kullanır)
- Herhangi bir **pencere yöneticisi**, çünkü `nvidia-xrun application` gibi uygulamayı doğrudan çalıştırmak önerilmez.

## Konfigürasyon

### Doğru bus id kimliğini ayarlama

?> Not: Eğer paketi AUR'dan yüklediyseniz, bus id kimliği `/etc/X11/nvidia-xorg.conf` dosyasında otomatik olarak ayarlanmıştır. bus id kimliğinin doğru ayarlandığından emin olun, aksi takdirde değiştirin (`lspci` komutunu kullanarak doğru bus id kimliğini bulabilirsiniz). Bazı durumlarda `nvidia-xorg.conf` için `lspci`'den gelen hex çıktısını decimal'e çevirmeniz gerekir, örneğin `3b:00.0` `"PCI:59:0:0"` olur.

Ekran aygıtı bus id kimliğinizi bulun:

```bash
lspci | grep -i nvidia | awk '{print $1}'
```

Bu `01:00.0`'a benzer bir şey döndürebilir. Ardından uygun bus id kimliğini ayarlamak için bir dosya oluşturun (örneğin `/etc/X11/nvidia-xorg.conf.d/30-nvidia.conf`):

```
/etc/X11/nvidia-xorg.conf.d/30-nvidia.conf
```

```
Section "Device"
    Identifier "nvidia"
    Driver "nvidia"
    BusID "PCI:1:0:0"
    #  Option "DPI" "96 x 96"
EndSection
```

Ayrıca bu şekilde, sorunlarla karşılaşırsanız bazı NVIDIA ayarlarını yapabilirsiniz:

```
/etc/X11/nvidia-xorg.conf.d/30-nvidia.conf
```

```
Section "Screen"
    Identifier "nvidia"
    Device "nvidia"
    #  Option "AllowEmptyInitialConfiguration" "Yes"
    #  Option "UseDisplayDevice" "none"
EndSection
```

### Harici GPU kurulumu

Bunu harici bir GPU kurulumunda da kullanabilirsiniz. `nvidia-modeset` ve `nvidia-drm` modüllerini yüklediğinizden emin olun ve _"Device"_ bölümüne `"AllowExternalGpus" "true"` seçeneğini ekleyin.

Birden fazla NVIDIA kartı olan cihazlarda **dahili ekranı** kullanmak için otomatik olarak oluşturulan yapılandırmayı değiştirin:

```
/etc/X11/nvidia-xorg.conf.d/30-nvidia.conf
```

```
Section "ServerLayout"
  Identifier "layout"
  Screen 0 "nvidia" 0 0
  Inactive "intel"
  Option  "AutoAddGPU" "false"
EndSection

Section "Device"
  Identifier "nvidia"
  Driver "nvidia"
  BusID "PCI:9:0:0"
  Option "AllowExternalGpus" "true"
  Option "ProbeAllGpus" "false"
  Option "HardDPMS" "false"
  Option "NoLogo" "true"
  Option "UseEDID" "false"
#    Option "UseDisplayDevice" "none"
EndSection

Section "Screen"
  Identifier "nvidia"
  Device "nvidia"
  Option "AllowEmptyInitialConfiguration" "Yes"
#  Option "UseDisplayDevice" "None"
EndSection
```

bus id kimliğini doğru grafik kartına ayarlamayı unutmayın.

### Pencere yöneticisini otomatik olarak çalıştırma

Kolaylık sağlamak için favori pencere yöneticinizle bir `$XDG_CONFIG_HOME/X11/nvidia-xinitrc` dosyası oluşturabilirsiniz. (nvidia-xrun < v.0.3.79 kullanıyorsanız `$HOME/.nvidia-xinitrc` dosyasını oluşturun)

```
if [ $# -gt 0 ]; then
  $*
else
  your-window-manager
fi
```

Bununla birlikte, uygulamayı belirtmenize gerek yoktur ve basitçe yürütebilirsiniz:

```bash
nvidia-xrun
```

Bu yöntem yalıtılmış bir X sunucusu başlattığından, önceki standart tümleşik GPU yapılandırmalarınız hariç, `/etc/X11/xorg.conf.d/` adresinde bulunan diğer tüm yapılandırma dosyalarının bir kopyasını almak da iyi bir fikirdir.

### NVIDIA kartını yönetmek için bbswitch kullanmak

?> Not: nvidia-xrun > 0.3.78 kartı otomatik olarak devre dışı bırakmalıdır, bu nedenle bu yöntem gereksizdir

NVIDIA kartına ihtiyaç duyulmadığında, _bbswitch_ kartı kapatmak için kullanılabilir. _nvidia-xrun_ betiği otomatik olarak bir pencere yöneticisi çalıştıracak ve NVIDIA kartını uyandıracaktır. Bunu başarmak için şunları yapmanız gerekir:

Önyükleme sırasında `bbswitch` modülünü yükleyin:

```bash
echo 'bbswitch' > /etc/modules-load.d/bbswitch.conf
```

Önyükleme sırasında `nvidia` modülünü devre dışı bırakın:

```bash
echo 'options bbswitch load_state=0 unload_state=1' > /etc/modprobe.d/bbswitch.conf
```

Yeniden başlatmadan sonra NVIDIA kartı kapalı olacaktır. Bu, `bbswitch`'in durumu sorgulanarak görülebilir:

```bash
cat /proc/acpi/bbswitch
```

Kartı sırasıyla açmaya/kapatmaya zorlamak için çalıştırın:

```bash
echo OFF > /proc/acpi/bbswitch
echo ON > /proc/acpi/bbswitch
```

## Kullanım

### Açılışta başlat

`nvidia-xrun-pm.service`'i etkinleştirin - bu, önyükleme sırasında NVIDIA kartını kapatır.

Sistem açıldıktan sonra, sanal konsoldan kullanıcınıza giriş yapın ve `nvidia-xrun` uygulamasını çalıştırın.

Yukarıdakiler işe yaramazsa, kullanılmayan sanal konsola geçin ve tekrar deneyin.

Daha önce de belirtildiği gibi, uygulamaları doğrudan `nvidia-xrun` uygulaması ile çalıştırmak iyi çalışmaz, bu nedenle daha önce belirtildiği gibi bir `nvidia-xinitrc` dosyası oluşturmak ve pencere yöneticinizi başlatmak için `nvidia-xrun` kullanmak en iyisidir.

## Sorun giderme

### NVIDIA GPU kapatılamıyor veya varsayılan olarak ayarlanmış

bkz. [NVIDIA kartını yönetmek için bbswitch kullanmak](#nvidia-kartını-yönetmek-için-bbswitch-kullanmak)

NVIDIA GPU hala kapanmıyorsa ya da `nvidia-xrun` kullandığınızda veya kullanmadığınızda bir şekilde varsayılan olarak ayarlanmışsa, muhtemelen belirli modülleri (daha önce Bumblebee tarafından kara listeye alınmış olan) kara listeye almanız gerekebilir. Bu dosyayı oluşturun ve sisteminizi yeniden başlatın:

```
/usr/lib/modprobe.d/nvidia-xrun.conf
```

```
blacklist nvidia
blacklist nvidia-drm
blacklist nvidia-modeset
blacklist nvidia-uvm
blacklist nouveau
```

`nvidia-xrun-pm.service` ile `nvidia` modüllerini yükleyen `systemd-modules-load.service` arasında bir rice koşulu var gibi görünüyor. Eğer ikincisi önce çalışırsa, `nvidia-xrun-pm` aygıt kaldırma sırasında askıda kalacaktır (aslında `tee` komutu). Öte yandan `nvidia-xrun-pm` önce çalışırsa başarılı olur ve daha sonra modüller bir hata ile yüklenemez (zararsız ama çirkin). Bu nedenle yukarıdaki modülleri her zaman kara listeye almak daha iyi olabilir.

PRIME senkronizasyonunun çalışması için DRM çekirdek modu ayarı etkinleştirilmelidir (örneğin, yalnızca Intel GPU'nun çıkışlara bağlı olduğu muxless cihazlarda). Ancak, bir sorun olması durumunda devre dışı bırakmayı düşünün. [DRM kernel modu ayarı](arch-nvidia#drm-kernel-modu-ayarı)na bakın

Belirli donanımlarda NVIDIA GPU, PCI veri yolu üzerinde iki aygıt gösterir: 3D denetleyici ve ses aygıtı. Bu durumda, GPU'nun tamamen kapanması için her iki aygıtın da veri yolundan kaldırılması gerekir. Bu, `/etc/default/nvidia-xrun` dosyasına ses cihazı veri yolu kimliği için bir satır ve ikinci cihazı kaldırmak için `/usr/bin/nvidia-xrun` dosyasındaki `turn_off_gpu` fonksiyonuna ilgili satır eklenerek yapılabilir.
