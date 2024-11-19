# NVIDIA Optimus

NVIDIA Optimus, entegre bir GPU ve ayrı bir NVIDIA GPU'nun bir dizüstü bilgisayara yerleştirilmesine ve dizüstü bilgisayar tarafından erişilmesine olanak tanıyan bir teknolojidir.

## Mevcut yöntemler

Kullanılabilecek çeşitli yöntemler vardır:

- **Yalnızca entegre grafikleri kullanmak:** NVIDIA GPU tamamen kapatılacağı için güç tasarrufu sağlar.
- **Yalnızca NVIDIA grafikleri kullanmak:** entegre grafiklerden daha fazla performans sağlar, ancak daha fazla pil tüketir (mobil cihazlar için hoş değildir). Bu, [optimus-manager](#optimus-manager-kullanmak) ve [nvidia-xrun](#nvidia-xrun-kullanmak) seçenekleriyle aynı temel süreci kullanır, daha otomatik yaklaşımlardan birini seçmeden önce sorun giderme ve genel işlevselliği doğrulama için kullanılmalıdır.
- **Her ikisini de kullanmak (gerektiğinde NVIDIA GPU'yu kullanmak ve güç tasarrufu için kapalı tutmak):**
  - **PRIME render offload'ı kullanmak:** NVIDIA tarafından desteklenen resmi yöntem
  - **optimus-manager kullanmak:** Tek bir komutla grafikleri değiştirir (etkili olması için oturumu kapatma ve oturum açma gerekir). Ayrıca PRIME render offload ile hibrit modu destekler. NVIDIA GPU'dan maksimum performans elde eder ve kullanılmadığında kapatır. 1.4 sürümünden bu yana AMD+NVIDIA kombinasyonu da desteklenmektedir.
  - **nvidia-xrun kullanmak:** NVIDIA grafikleriyle farklı TTY'de ayrı X oturumu çalıştırın. NVIDIA GPU'dan maksimum performans elde eder ve kullanılmadığında kapatır.
  - **Bumblebee'yi kullanmak:** Diğer her şey için Intel grafiklerini kullanırken seçilen uygulamaları NVIDIA grafikleriyle çalıştırmaya izin vererek Windows benzeri işlevsellik sağlar. Önemli performans sorunları var.
  - **switcheroo-control kullanmak:** Bumblebee'ye benzer, ancak özellikle GNOME kullanıcıları için. Uygulamaların masaüstü giriş dosyalarında özel GPU'yu tercih edip etmediklerini belirtmelerine izin verir ve sağ tıklama menüsünden herhangi bir uygulamayı NVIDIA GPU'da manuel olarak çalıştırmanıza olanak tanır.
  - **nouveau kullanmak:** Tescilli NVIDIA sürücüsüne kıyasla daha düşük performans sunar ve uyku ve hazırda bekletme ile ilgili sorunlara neden olabilir. En yeni NVIDIA GPU'lar ile çalışmaz.
  - **EnvyControl kullanmak:** Optimus-manager'a benzer, ancak kapsamlı yapılandırma veya arka planda çalışan bir daemon gerektirmez ve ayrıca bir GNOME kullanıcısıysanız GDM'nin yamalı bir sürümünü yüklemeniz gerekir.
  - **NVidia-eXec kullanmak:** Bumblebee'ye benzer, ancak performans etkisi yoktur. Hem Xorg hem de Wayland üzerinde çalışır. Bu paket deneyseldir ve şu anda yalnızca GNOME/GDM altında test edilmektedir.
  - **nvidia-switch kullanmak:** nvidia-xrun'a benzer, ancak TTY'yi değiştirmeye gerek yoktur, geçişler ekran yöneticinizdeki giriş ve çıkışlarla yapılacaktır. Bu paket Debian tabanlı sistemlerde test edilmektedir, ancak nvidia-xrun gibi tüm Linux sistemlerinde çalışmalıdır.

!> Uyarı: Bu seçeneklerin tümü birbirini dışlar, bir yaklaşımı test edip diğerine karar verirseniz, başka bir yöntemi denemeden önce bir yaklaşımı izleyerek yapılan tüm yapılandırma değişikliklerini geri aldığınızdan emin olmalısınız, aksi takdirde dosya çakışmaları ve tanımlanmamış davranışlar ortaya çıkabilir.

## Yalnızca entegre grafikleri kullanmak

Değiştirmeden yalnızca belirli bir GPU'yu kullanmak istiyorsanız, sisteminizin BIOS'undaki seçenekleri kontrol edin. Kartlardan birini devre dışı bırakmak için bir seçenek olmalıdır. Bazı dizüstü bilgisayarlar yalnızca ayrı kartın devre dışı bırakılmasına izin verir veya tam tersi, ancak kartlardan yalnızca birini kullanmayı planlıyorsanız kontrol etmeye değer.

BIOS'unuz Nvidia grafiklerini devre dışı bırakmaya izin vermiyorsa, Linux çekirdeğinin kendisinden devre dışı bırakabilirsiniz. [Harici GPU'yu tamamen devre dışı bırakma]() bölümüne bakın.

### Rendering provider'ı değiştirmeden CUDA kullanmak

CUDA'yı render işlemini Nvidia grafiklerine geçirmeden kullanabilirsiniz. Tek yapmanız gereken bir CUDA uygulamasını başlatmadan önce Nvidia kartının açık olduğundan emin olmaktır, ayrıntılar için [Harici GPU'yu tamamen devre dışı bırakma]() bölümüne bakın.

Artık bir CUDA uygulaması başlattığınızda, gerekli tüm çekirdek modüllerini otomatik olarak yükleyecektir. CUDA kullandıktan sonra Nvidia kartını kapatmadan önce, `nvidia` çekirdek modüllerinin ilk önce boşaltılması gerekir:

```bash
rmmod nvidia_uvm
rmmod nvidia
```

## Yalnızca NVIDIA grafikleri kullanmak

Tescilli NVIDIA sürücüsü birincil işleme sağlayıcısı (rendering provider) olarak yapılandırılabilir. Ayrıca [NVIDIA DRM çekirdek modu ayarı](arch-nvidia#drm-kernel-modu-ayarı)nı etkinleştirerek ana senkronizasyonu etkinleştirmediğiniz sürece kayda değer ekran yırtılması sorunları vardır. Harici GPU kullanımına izin verir ve (Ocak 2017 itibariyle) nouveau sürücüsüne göre belirgin bir performans üstünlüğüne sahiptir.

İlk olarak [NVIDIA](arch-nvidia.md) sürücüsünü ve [xorg-xrandr](https://archlinux.org/packages/?name=xorg-xrandr)'ı yükleyin. Ardından, `/etc/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf` dosyasını yapılandırın; bu dosyanın seçenekleri, bu kurulumla uyumluluk sağlamak için sağlanan `/usr/share/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf` paketiyle birleştirilecektir.

```
/etc/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf
```

```
Section "OutputClass"
    Identifier "intel"
    MatchDriver "i915"
    Driver "modesetting"
EndSection

Section "OutputClass"
    Identifier "nvidia"
    MatchDriver "nvidia-drm"
    Driver "nvidia"
    Option "AllowEmptyInitialConfiguration"
    Option "PrimaryGPU" "yes"
    ModulePath "/usr/lib/nvidia/xorg"
    ModulePath "/usr/lib/xorg/modules"
EndSection
```

Ardından, `~/.xinitrc` dosyanızın başına aşağıdaki iki satırı ekleyin:

```
~/.xinitrc
```

```
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

Şimdi sürücüleri yüklemek için yeniden başlatın ve X başlamalıdır.

Ekranınızın dpi değeri doğru değilse aşağıdaki satırı ekleyin:

```
xrandr --dpi 96
```

X'i başlatırken siyah bir ekranla karşılaşırsanız, `~/.xinitrc` dosyasındaki iki `xrandr` komutundan sonra nokta işareti olmadığından emin olun. Eğer ampersands varsa, pencere yöneticisi `xrandr` komutları çalışmayı bitirmeden önce çalışabilir ve bu da siyah ekrana neden olur.

### Giriş yöneticisi (Display Manager)

Eğer bir giriş yöneticisi (display manager) kullanıyorsanız, `~/.xinitrc` kullanmak yerine giriş yöneticiniz için bir giriş kurulum betiği oluşturmanız veya düzenlemeniz gerekecektir.

### LightDM

LightDM giriş yöneticisi için:

```
/etc/lightdm/display_setup.sh
```

```
#!/bin/sh
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

betiği çalıştırılabilir (`sudo chmod +x /etc/lightdm/display_setup.sh`) yapın.
Şimdi `/etc/lightdm/lightdm.conf` dosyasındaki `[Seat:*]` bölümünü düzenleyerek lightdm'yi betiği çalıştıracak şekilde yapılandırın:

```
/etc/lightdm/lightdm.conf
```

```
[Seat:*]
display-setup-script=/etc/lightdm/display_setup.sh
```

Şimdi yeniden başlatın ve giriş yöneticiniz başlamalıdır.

### SDDM

SDDM giriş yöneticisi için (SDDM, KDE için varsayılan DM'dir):

```
/usr/share/sddm/scripts/Xsetup
```

```
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

### GDM

GDM giriş yöneticisi için iki yeni .desktop dosyası oluşturun:

```
/usr/share/gdm/greeter/autostart/optimus.desktop
/etc/xdg/autostart/optimus.desktop
```

```
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```

GDM'nin varsayılan arka uç olarak X kullandığından emin olun.

### 3D'yi kontrol etme

[mesa-utils](https://archlinux.org/packages/?name=mesa-utils)'i yükleyip çalıştırarak NVIDIA grafiklerinin kullanılıp kullanılmadığını kontrol edebilirsiniz

```bash
glxinfo | grep NVIDIA
```

### Daha fazla bilgi

Daha fazla bilgi için NVIDIA'nın konuyla ilgili resmi sayfasına bakın [\[2\]](http://us.download.nvidia.com/XFree86/Linux-x86/370.28/README/randr14.html).

## Değiştirilebilir grafikleri kullanmak

### PRIME render offload kullanımı

Bu, değiştirilebilir grafikleri desteklemek için resmi NVIDIA yöntemidir. Daha fazla bilgi için [PRIME render offload kullanımı](prime-render-offload.md)

### Bumblebee kullanmak

Bkz. [bumblebee](bumblebee.md)

### switcheroo-control kullanmak

Bkz. [switcheroo-control](prime-render-offload.md#gnome-entegrasyonu)

### nvidia-xrun kullanmak

Bkz. [nvidia-xrun](nvidia-xrun.md)

### optimus-manager kullanmak

[Optimus-manager](https://github.com/Askannz/optimus-manager) dokümantasyonuna bakın. Arch Linux sistemlerinde hem kurulum hem de yapılandırmayı kapsar.

### NVidia-eXec kullanmak

[NVidia-eXec](https://github.com/pedro00dk/nvidia-exec) dokümantasyonuna bakın. Arch Linux sistemlerinde hem kurulum hem de yapılandırmayı kapsar.

### nvidia-switch kullanmak

[nvidia-switch](https://github.com/nvidiaswitch/nvidia-switch) dokümantasyonuna bakın. Arch Linux sistemlerinde hem kurulum hem de yapılandırmayı kapsar.

## Sorun giderme

### Yırtık/Kırık VSync

[DRM kernel modu](arch-nvidia#drm-kernel-modu-ayarı) ayarını etkinleştirin, bu da PRIME senkronizasyonunu etkinleştirecek ve yırtılmayı düzeltecektir.

Ayrıntılar için resmi [forum başlığını](https://devtalk.nvidia.com/default/topic/957814/linux/prime-and-prime-synchronization/) okuyabilirsiniz.

### PCI:1:0:0'da NVIDIA GPU başlatılamadı (GPU veri yolundan düştü / RmInitAdapter başarısız oldu!)

Kernel parametrelerine rcutree.gp_init_delay=1 ekleyin. Orijinal konu [\[3\]](https://github.com/Bumblebee-Project/Bumblebee/issues/455#issuecomment-22497464) ve [\[4\]](https://bbs.archlinux.org/viewtopic.php?id=169742)'te bulunabilir.

### Çözünürlük, ekran taraması yanlış. Xorg.log'da EDID hataları

Bunun nedeni NVIDIA sürücüsünün ekran için EDID'yi algılamamasıdır. Bir EDID dosyasının yolunu manuel olarak belirtmeniz veya aynı bilgileri benzer bir şekilde sağlamanız gerekir.

To provide the path to the EDID file edit the Device Section for the NVIDIA card in Xorg.conf, adding these lines and changing parts to reflect your own system:

```
/etc/X11/xorg.conf
```

```
Section "Device"
       	Option		"ConnectedMonitor" "CRT-0"
       	Option		"CustomEDID" "CRT-0:/sys/class/drm/card0-LVDS-1/edid"
	Option		"IgnoreEDID" "false"
	Option		"UseEDID" "true"
EndSection
```

Xorg başlamazsa, CRT'nin tüm referanslarını DFB ile değiştirmeyi deneyin. `card0`, ekranın LVDS aracılığıyla bağlı olduğu Intel kartının tanımlayıcısıdır. edid ikili dosyası bu dizindedir. Donanım düzenlemesi farklıysa, CustomEDID değeri değişebilir ancak yine de bunun onaylanması gerekir. Yol her durumda `/sys/class/drm` ile başlayacaktır.

Alternatif olarak [read-edid](https://archlinux.org/packages/?name=read-edid) gibi araçlarla edid'inizi oluşturabilir ve sürücüyü bu dosyaya yönlendirebilirsiniz. Modelinler bile kullanılabilir, ancak o zaman `UseEDID` ve `IgnoreEDID`'yi değiştirdiğinizden emin olun.

<!-- EKLENECEK: Buraya daha fazla sorun eklenecek -->
