# PRIME render offload

NVIDIA sürücüsü [435.17 sürümü](https://download.nvidia.com/XFree86/Linux-x86_64/435.17/README/primerenderoffload.html)nden beri bu yöntemi desteklemektedir. Modeetting, [xf86-video-amdgpu](https://archlinux.org/packages/?name=xf86-video-amdgpu) (450.57) ve [xf86-video-intel](https://archlinux.org/packages/?name=xf86-video-intel) (455.38) resmi olarak iGPU sürücüleri olarak desteklenmektedir.

NVIDIA kartında bir program çalıştırmak için [nvidia-prime](https://archlinux.org/packages/?name=nvidia-prime) tarafından sağlanan `prime-run` betiğini kullanabilirsiniz:

```bash
prime-run glxinfo | grep "OpenGL renderer"
prime-run vulkaninfo
```

## PCI-Express Çalışma Zamanı D3 (RTD3) Güç Yönetimi

### Açık-kaynak sürücüler

Kernel PCI güç yönetimi, PRIME boşaltma veya ters PRIME ile kullanılmadığında GPU'yu kapatır. Bu özellik modesetting, [xf86-video-amdgpu](https://archlinux.org/packages/?name=xf86-video-amdgpu), [xf86-video-intel](https://archlinux.org/packages/?name=xf86-video-intel), [xf86-video-nouveau](https://archlinux.org/packages/?name=xf86-video-nouveau) sürücüleri tarafından desteklenir.

Her GPU'nun mevcut [\[1\]](https://docs.kernel.org/power/pci.html#native-pci-power-management) güç durumunu kontrol etmek için aşağıdaki komut kullanılabilir:

```bash
cat /sys/class/drm/card*/device/power_state
```

### NVIDIA

Intel Coffee Lake veya üzeri CPU'lara sahip Turing nesil kartların yanı sıra 5800H gibi bazı Ryzen CPU'lar için, kullanılmadığında GPU'yu tamamen kapatmak mümkündür.

NVIDIA tarafından önerildiği gibi aşağıdaki udev kuralları gereklidir:

```
/etc/udev/rules.d/80-nvidia-pm.rules
```

```
# Enable runtime PM for NVIDIA VGA/3D controller devices on driver bind
ACTION=="bind", SUBSYSTEM=="pci", ATTR{vendor}=="0x10de", ATTR{class}=="0x030000", TEST=="power/control", ATTR{power/control}="auto"
ACTION=="bind", SUBSYSTEM=="pci", ATTR{vendor}=="0x10de", ATTR{class}=="0x030200", TEST=="power/control", ATTR{power/control}="auto"

# Disable runtime PM for NVIDIA VGA/3D controller devices on driver unbind
ACTION=="unbind", SUBSYSTEM=="pci", ATTR{vendor}=="0x10de", ATTR{class}=="0x030000", TEST=="power/control", ATTR{power/control}="on"
ACTION=="unbind", SUBSYSTEM=="pci", ATTR{vendor}=="0x10de", ATTR{class}=="0x030200", TEST=="power/control", ATTR{power/control}="on"
```

Bazı kullanıcılar aşağıdaki ek satırların da gerekli olduğunu [bildirmiştir](https://aur.archlinux.org/packages/nvidia-prime-rtd3pm#comment-920182):

```
/etc/udev/rules.d/80-nvidia-pm.rules
```

```
# Enable runtime PM for NVIDIA VGA/3D controller devices on adding device
ACTION=="add", SUBSYSTEM=="pci", ATTR{vendor}=="0x10de", ATTR{class}=="0x030000", TEST=="power/control", ATTR{power/control}="auto"
ACTION=="add", SUBSYSTEM=="pci", ATTR{vendor}=="0x10de", ATTR{class}=="0x030200", TEST=="power/control", ATTR{power/control}="auto"
```

Ayrıca, aşağıdaki modül parametrelerini ekleyin:

```
/etc/modprobe.d/nvidia-pm.conf
```

```
options nvidia "NVreg_DynamicPowerManagement=0x02"
```

Alternatif olarak, bu iki yapılandırma dosyasını sağlayan [nvidia-prime-rtd3pm](https://aur.archlinux.org/packages/nvidia-prime-rtd3pm/)<sup>AUR</sup>'u yükleyebilirsiniz.

Udev kurallarını ve modül parametresini manuel olarak ya da AUR paketini kullanarak ayarladıktan sonra, Dizüstü bilgisayarınızı yeniden başlatmanız gerekecektir.

NVIDIA GPU'nun kapalı olup olmadığını kontrol etmek için bu komutu kullanabilirsiniz:

```bash
cat /sys/bus/pci/devices/0000:01:00.0/power/runtime_status
```

`suspended` veya `çalışıyor` seçeneklerinden birini göreceksiniz, `suspended` görüntüleniyorsa GPU kapalıdır. Artık güç çekimi 0 Watt olacak ve pilin daha uzun süre dayanmasını sağlayacaktır.

NVIDIA RTX A1000 gibi bazı durumlarda, yukarıdaki seçeneklerden hiçbiri listelenmeyebilir ve bunun yerine sonuç `active` olacaktır. Bu tek başına GPU'nun çalışır durumda olduğu anlamına gelmez. Bu durumda bu komutu kullanarak durumu kontrol edebilirsiniz:

```bash
cat /sys/bus/pci/devices/0000:01:00.0/power/runtime_suspended_time
```

GPU `suspended` durumdayken, komutu her çalıştırdığınızda sayaç artacaktır. GPU'nun durumu çalışır hale geldiğinde artış duracaktır.

Ayrıca, NVIDIA aygıt kaynakları artık kullanılmadığında çekirdeğin aygıt durumunu yırtmasını önlemek için `nvidia-persistenced.service`'i etkinleştirmemiz gerekir. [\[4\]](https://us.download.nvidia.com/XFree86/Linux-x86_64/550.54.14/README/nvidia-persistenced.html)

## GPU kullanarak işlemek için uygulamaları yapılandırma

Dinamik Güç Yönetimi etkinleştirilmeden bile, uygulamaların yükten arındırılması gerekir [\[5\]](https://web.archive.org/web/20211203072304/https://jeansenvaars.wordpress.com/2021/12/02/endeavouros-hybrid-gpu-benchmarks/).

NVIDIA GPU'ya yüklenen bir uygulamayı Dinamik Güç Yönetimi etkinken çalıştırmak için aşağıdaki ortam değişkenlerini ekleyin: [\[6\]](https://download.nvidia.com/XFree86/Linux-x86_64/550.54.14/README/primerenderoffload.html)

```
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia command
```

Bir Steam oyununda kullanırken, başlatıcı komut satırı şu şekilde ayarlanabilir:

```
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia %command%
```

?> Not: \_\_NV_PRIME_RENDER_OFFLOAD değerinin sisteme bağlı olarak 0 olarak ayarlanması gerekebilir. Bu değişken hangi GPU'nun kullanılacağını belirttiğinden, hangi GPU'nun 0 ve hangisinin 1 olduğunu kontrol etmeniz önerilir.

## GNOME entegrasyonu

GNOME entegrasyonu için [switcheroo-control](https://archlinux.org/packages/?name=switcheroo-control)'ü kurun ve `switcheroo-control.service`'i etkinleştirin.

GNOME, masaüstü girişindeki `PrefersNonDefaultGPU` özelliğine saygı gösterecektir. Alternatif olarak, simgeye sağ tıklayıp Harici Grafik Kartı Kullanarak Başlat'ı seçerek uygulamaları GPU ile başlatabilirsiniz.

## Sorun giderme

Eğer [bumblebee](https://archlinux.org/packages/?name=bumblebee) yüklüyse, onu kaldırmalısınız çünkü X sunucusu tarafından NVIDIA sürücüsünün yüklenmesi için gerekli olan nvidia_drm sürücüsünü kara listeye alır.
