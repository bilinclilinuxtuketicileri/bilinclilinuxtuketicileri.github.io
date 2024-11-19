# NVIDIA

Bu makale resmi NVIDIA grafik kartı sürücülerini kapsamaktadır. Topluluk açık kaynak sürücüsü için Nouveau'ya bakın. Hybrid Intel/NVIDIA grafikli bir dizüstü bilgisayarınız varsa, bunun yerine [**NVIDIA Optimus**](arch-nvidia-optimus.md)'a bakın.

?> Nouveau ve Hybrid ile ilgili rehberleri yazmaya devam ediyoruz. Katkıda bulunmak isteyenleri bekleriz 😇

## Kurulum

!> Uyarı: NVIDIA sürücüsünü NVIDIA web sitesinden sağlanan paket aracılığıyla yüklemekten kaçının. Pacman aracılığıyla kurulum, sürücünün sistemin geri kalanıyla birlikte yükseltilmesine olanak tanır.

!> Not: Hybrid grafikli bir sistemde dual boot yaparken, Windows veya üçüncü taraf uygulamaların Eko modunu (ASUS Eko modu gibi) etkinleştirmek NVIDIA GPU'yu tamamen devre dışı bırakarak algılanamaz hale getirebilir.

İlk olarak, [nouveau wiki'nin kod adları sayfasında](https://nouveau.freedesktop.org/wiki/CodeNames/) kartınızın ailesini (örn. NV110, NVC0, vb.) bulun ve elde edilen modeline/resmi adına karşılık gelin:

```bash
lspci -k -d ::03xx
```

Ardından, kartınız için uygun sürücüyü yükleyin:

| GPU family                                                                                                                                                           | Driver                                                                                                                                                                                                                                                                                                                                   | Status                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [Turing (NV160/TUXXX)](https://nouveau.freedesktop.org/CodeNames.html#NV160) ve sonrası                                                                              | [linux](https://archlinux.org/packages/?name=linux) kerneli için [nvidia-open](https://archlinux.org/packages/?name=nvidia-open), herhangi bir kernel için [nvidia-dkms](https://archlinux.org/packages/?name=nvidia-dkms)                                                                                                               | [Önerilir](https://developer.nvidia.com/blog/nvidia-transitions-fully-towards-open-source-gpu-kernel-modules/), Güncel, destekleniyor |
| [Maxwell (NV110/GMXXX)](https://nouveau.freedesktop.org/CodeNames.html#NV110) ila [Ada Lovelace (NV190/ADXXX)](https://nouveau.freedesktop.org/CodeNames.html#NV190) | [linux](https://archlinux.org/packages/?name=linux) için [nvidia](https://archlinux.org/packages/?name=nvidia), herhangi bir kernel için [nvidia-dkms](https://archlinux.org/packages/?name=nvidia-dkms), [linux-lts](https://archlinux.org/packages/?name=linux-lts) için [nvidia-lts](https://archlinux.org/packages/?name=nvidia-lts) | Güncel, destekleniyor                                                                                                                 |
| [Kepler (NVE0/GKXXX)](https://nouveau.freedesktop.org/CodeNames.html#NVE0)                                                                                           | [nvidia-470xx-dkms](https://aur.archlinux.org/packages/nvidia-470xx-dkms/)<sup><small>AUR</small></sup>                                                                                                                                                                                                                                  | Eski, desteklenmiyor                                                                                                                  |
| [Fermi (NVC0/GF1XX)](https://nouveau.freedesktop.org/CodeNames.html#NVC0)                                                                                            | [nvidia-390xx-dkms](https://aur.archlinux.org/packages/nvidia-390xx-dkms/)<sup><small>AUR</small></sup>                                                                                                                                                                                                                                  | Eski, desteklenmiyor                                                                                                                  |
| [Tesla (NV50/G80-90-GT2XX)](https://nouveau.freedesktop.org/CodeNames.html#NV50)                                                                                     | [nvidia-340xx-dkms](https://aur.archlinux.org/packages/nvidia-340xx-dkms/)<sup><small>AUR</small></sup>                                                                                                                                                                                                                                  | Eski, desteklenmiyor                                                                                                                  |
| [Curie (NV40/G70)](https://nouveau.freedesktop.org/CodeNames.html#NV40) ve öncesi                                                                                    | Artık paketlenmiyor                                                                                                                                                                                                                                                                                                                      | Eski, desteklenmiyor                                                                                                                  |

?> [nvidia-dkms](https://archlinux.org/packages/?name=nvidia-dkms) indirmeden önce, [dkms](https://archlinux.org/packages/?name=dkms)'i ve kernelinize uygun headers paketini indirdiğinizden emin olun. Mesela, [linux](https://archlinux.org/packages/?name=linux) kerneli için: [linux-headers](https://archlinux.org/packages/?name=linux-headers) ve ya [linux-zen](https://archlinux.org/packages/?name=linux-zen) kerneli için de [linux-zen-headers](https://archlinux.org/packages/?name=linux-zen-headers).

32 bit uygulama desteği için, multilib reposundan ilgili lib32 paketini de yükleyin (örn. [lib32-nvidia-utils](https://archlinux.org/packages/?name=lib32-nvidia-utils)).

`kms`'i `/etc/mkinitcpio.conf` dosyasındaki HOOKS dizisinden kaldırın ve initramfs dosyasını yeniden oluşturun (`sudo mkinitcpio -P`). Bu, initramfs'in nouveau modülünü içermesini önleyecek ve çekirdeğin erken önyükleme sırasında onu yükleyemeyeceğinden emin olacaktır. `nvidia-utils` paketi, yeniden başlattığınızda nouveau modülünü kara listeye alan bir dosya içerir.

Wayland kullanıyorsanız, [DRM kernel modu ayarı](#DRM-kernel-modu-ayarı)nı yaptığınızdan emin olun.

## DRM kernel modu ayarı

NVIDIA otomatik KMS geç yüklemeyi desteklemediğinden, Wayland kompozitörlerinin düzgün çalışması için DRM (Direct Rendering Manager) kernel mod ayarının etkinleştirilmesi gerekir.

[nvidia-utils 560.35.03-5](https://archlinux.org/packages/?name=nvidia-utils) sürümünden itibaren DRM varsayılan olarak etkin durumdadır. Daha eski sürücüler için `nvidia_drm` modülü için `modeset=1` kernel modülü parametresini ayarlayın.

DRM'nin gerçekten etkin olduğunu doğrulamak için aşağıdakileri uygulayın:

```bash
cat /sys/module/nvidia_drm/parameters/modeset
```

Bu komut `Y` döndürmelidir.

Eğer DRM etkin değilse aşağıdaki gibi `modeset=1` çekirdek modülü parametresini GRUB’a ekleyin:

```bash
sudo nano /etc/default/grub
```

sonrasında, `GRUB_CMDLINE_LINUX_DEFAULT` ile başlayan satırı bulun:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="nowatchdog nvme_load=YES loglevel=3"
```

Buraya `nvidia_drm.modeset=1` parametresini ekleyin. Eğer 6.11 ve daha yeni bir kernel sürümü kullanıyorsanız, aynı şekilde `nvidia_drm.fbdev=1` paramteresini de eklemeniz gerekiyor.

Dosyayı kaydettikten sonra GRUB'ı güncelleyin:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## Erken yükleme

Temel işlevsellik için sadece kernel parametresini eklemek yeterli olacaktır. Mümkün olan en erken zamanda yüklenmesini sağlamak istiyorsanız veya başlangıç sorunları fark ediyorsanız (nvidia çekirdek modülünün görüntü yöneticisinden sonra yüklenmesi gibi) initramfs'ye `nvidia`, `nvidia_modeset`, `nvidia_uvm` ve `nvidia_drm` ekleyebilirsiniz.

### mkinitcpio için

Önce `mkinitcpio.conf` dosyasını düzenleyin:

```bash
sudo nano /etc/mkinitcpio.conf
```

ardından `MODULES=` ile başlayan satırı bulun ve parantez içerisine üstteki parametreleri ekleyin ve dosyayı kaydedin. Initramfs'e ekledikten sonra, her nvidia sürücü güncellemesinde mkinitcpio'yu çalıştırmayı unutmayın.

```bash
sudo mkinitcpio -P
```

Bu adımları otomatikleştirmek için bir pacman hook oluşturmanız gerekiyor.

```bash
sudo nano /etc/pacman.d/hooks/nvidia.hook
```

```bash
[Trigger]
Operation=Install
Operation=Upgrade
Operation=Remove
Type=Package
# Yüklü olan NVIDIA paketinin yorumunu kaldırın
Target=nvidia
#Target=nvidia-open
#Target=nvidia-lts
# If running a different kernel, modify below to match
Target=linux

[Action]
Description=Updating NVIDIA module in initcpio
Depends=mkinitcpio
When=PostTransaction
NeedsTargets
Exec=/bin/sh -c 'while read -r trg; do case $trg in linux*) exit 0; esac; done; /usr/bin/mkinitcpio -P'
```

!> Bu satırları, yüklü olan NVIDIA paketinize ve kullandığınız kernel'e göre değiştirmeyi unutmayın.

### Booster

Önce `/etc/booster.yaml` dosyasını düzenleyin:

```bash
sudo nano /etc/booster.yaml
```

`modules_force_load` ile başlayan satırı bulup, parametreleri ekleyin ve dosyayı kaydedin:

```bash
modules_force_load: nvidia nvidia_modeset nvidia_uvm nvidia_drm
```

Booster imajınızı yenileyin:

```bash
booster build booster-foo.img
```

### Dracut

Önce `/etc/dracut.conf.d/myflags.conf` dosyasını düzenleyin:

```bash
sudo nano /etc/dracut.conf.d/myflags.conf
```

`force_drivers` ile başlayan satırı bulup, parametreleri ekleyin ve kaydedin:

```bash
# ...
force_drivers+=" nvidia nvidia_modeset nvidia_uvm nvidia_drm "
# ...
```
