Bu makale resmi NVIDIA grafik kartı sürücülerini kapsamaktadır. Topluluk açık kaynak sürücüsü için [Nouveau](nouveau.md)'ya bakın. Hybrid Intel/NVIDIA grafikli bir dizüstü bilgisayarınız varsa, bunun yerine [NVIDIA Optimus](nvidia-optimus.md)'a bakın.

> [!WARNING]
> NVIDIA sürücüsünü NVIDIA web sitesinden yüklemekten kaçının. Pacman aracılığıyla kurulum, sürücünün sistemin geri kalanıyla birlikte yükseltilmesine olanak tanır.

# Kurulum

Öncelikle ekran kartınızın hangi seriden olduğuna bakmanız gerek. Bunun için şu komutu kullanın:

```bash
lspci -k | grep -A 2 -E "(VGA|3D)"
```

Ardından ekran kartınızı bu [listeden](https://nouveau.freedesktop.org/CodeNames.html) bulun ve hangi aileye ait olduğunu öğrenin. Ardından aşağıdaki tabloya göre size uygun sürücüyü indireceksiniz:

| GPU serisi                                         | Kernel                | Temel sürücü      | OpenGL desteği                              |
| -------------------------------------------------- | --------------------- | ----------------- | ------------------------------------------- |
| Maxwell (NV110) serisi ve sonrası                  | linux ya da linux-lts | nvidia            | nvidia-utils lib32-nvidia-utils             |
| Kepler (NVE0) serisi                               | herhangi birisi       | nvidia-470xx-dkms | nvidia-470xx-utils lib32-nvidia-470xx-utils |
| GeForce 400/500/600 serisi kartlar [NVCx and NVDx] | herhangi birisi       | nvidia-390xx-dkms | nvidia-390xx-utils lib32-nvidia-390xx-utils |
| Tesla (NV50/G80-90-GT2XX)                          | herhangi birisi       | nvidia-340xx-dkms | nvidia-340xx-utils lib32-nvidia-340xx-utils |

Mesela benim ekran kartım Maxwell serisinden yeni olduğu için `nvidia` sürücüsünü, OpenGL için de `nvidia-utils` ve `lib32-nvidia-utils` paketini kurmam gerekiyor.

## DRM ayarını etkinleştirmek

NVIDIA otomatik KMS geç yüklemeyi desteklemediğinden, Wayland kompozitörlerinin düzgün çalışması için DRM (Direct Rendering Manager) çekirdek modu ayarının etkinleştirilmesi gerekir.

nvidia-utils 560.35.03-5 sürümünden itibaren DRM varsayılan olarak etkin durumdadır.[[1]](https://gitlab.archlinux.org/archlinux/packaging/packages/nvidia-utils/-/commit/1b02daa2ccca6a69fa4355fb5a369c2115ec3e22) Daha eski sürücüler için `nvidia_drm` modülü için `modeset=1` çekirdek modülü parametresini ayarlayın.

DRM’in etkin olup olmadığını öğrenmek için aşağıdaki komutu kullanabilirsiniz:

```bash
sudo cat /sys/module/nvidia_drm/parameters/modeset
```

Eğer bu komut, sonuç olarak `Y` döndürüyorsa, DRM etkin demektir. Eğer DRM etkin değilse aşağıdaki gibi modeset=1 çekirdek modülü parametresini GRUB’a ekleyin:

```bash
sudo nano /etc/default/grub
```

ardından `GRUB_CMDLINE_LINUX_DEFAULT` ile başlayan satırı bulun:

```bash
GRUB_DEFAULT=0
GRUB_TIMEOUT='5'
GRUB_CMDLINE_LINUX_DEFAULT="GRUB_CMDLINE_LINUX_DEFAULT='nowatchdog nvme_load=YES loglevel=3'"
GRUB_CMDLINE_LINUX=""
```

Ardından iki tırnak içerisine `nvidia_drm.modeset=1` parametresini ekleyin. Eğer 6.11 ve daha yeni bir kernel sürümü kullanıyorsanız, aynı şekilde `nvidia_drm.fbdev=1` paramteresini de eklemeniz gerekiyor.

Örneğin 6.10 ve ya daha eski bir kernel kullanıyorsanız:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nvidia-drm.modeset=1"
```

6.11 ve ya daha yeni bir kernel kullanıyorsanız:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nvidia-drm.modeset=1 nvidia-drm.fbdev=1"
```

bunları yaptıktan sonra CTRL+X kombinasyonu ile dosyayı kaydedip kapatın ve ardından GRUB’ı güncelleyin:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## Erken yükleme

Temel işlevsellik için sadece kernel parametresini eklemek yeterli olacaktır. Mümkün olan en erken zamanda yüklenmesini sağlamak istiyorsanız veya başlangıç sorunları fark ediyorsanız (nvidia çekirdek modülünün görüntü yöneticisinden sonra yüklenmesi gibi) initramfs'ye `nvidia`, `nvidia_modeset`, `nvidia_uvm` ve `nvidia_drm` ekleyebilirsiniz.

### mkinitcpio

Eğer mkinitcpio initramfs kullanıyorsanız, aşağıdaki adımları takip edin:
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

> [!WARNING]
> Bu satırları, yüklü olan NVIDIA paketinize ve kullandığınız kernel'e göre değiştirmeyi unutmayın.

### Booster

Eğer Booster kullanıyorsanız, aşağıdaki adımları takip edin:
Önce `/etc/booster.yaml` dosyasını düzenleyin:

```bash
sudo nano /etc/booster.yaml
```

ardından `modules_force_load` ile başlayan satırı bulup, parametreleri ekleyin ve dosyayı kaydedin:

```bash
modules_force_load: nvidia nvidia_modeset nvidia_uvm nvidia_drm
```

ardından Booster imajınızı yenileyin:

```bash
booster build booster-foo.img
```

### Dracut

Eğer dracut kullanıyorsanız, aşağıdaki adımları takip edin:
Önce `/etc/dracut.conf.d/myflags.conf` dosyasını düzenleyin:

```bash
sudo nano /etc/dracut.conf.d/myflags.conf
```

ardından `force_drivers` ile başlayan satırı bulup, parametreleri ekleyin ve kaydedin:

```bash
# ...
force_drivers+=" nvidia nvidia_modeset nvidia_uvm nvidia_drm "
# ...
```
