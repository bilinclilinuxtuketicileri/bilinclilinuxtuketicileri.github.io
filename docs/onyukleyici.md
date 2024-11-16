# Önyükleyici (Bootloader) Nedir?

**Önyükleyici (bootloader)**, bir bilgisayarın açılış sürecinde ilk çalışan yazılım bileşenidir. Bilgisayar açıldığında, bootloader donanım üzerinde çalışmaya başlar ve işletim sistemini başlatmak için gerekli olan tüm adımları yönetir. **Bootloader**, sistemin donanım bileşenlerinin tanınmasını ve işletim sisteminin belleğe yüklenmesini sağlar. Kısacası, bootloader bir nevi **"arabulucu"** rolü üstlenir: **Donanım ve işletim sistemi arasındaki iletişimi sağlar.**

## Çalışma Prensibi

Bir bilgisayar açıldığında, ilk olarak **BIOS** veya **UEFI** gibi **firmware** yazılımları çalışır. Bu yazılımlar, bilgisayarın temel donanım bileşenlerini başlatır ve ardından **bootloader**'i bulup çalıştırmaya başlar. **Bootloader**, işletim sisteminin ilk aşamalarını yükler ve donanım ile yazılım arasındaki bağlantıyı kurarak, işletim sisteminin çalışmaya başlamasını sağlar.

**Bootloader'in temel görevleri** şunlardır:

1.  **Donanımı Başlatmak:** Bilgisayarın temel donanım bileşenlerinin (CPU, RAM, diskler, vs.) tanınmasını sağlar.
2.  **İşletim Sistemi Yükleme:** İşletim sisteminin çekirdek kısmını (**kernel**) belleğe yükler ve çalıştırılmasını başlatır.
3.  **Çoklu Önyükleme Desteği:** Birden fazla işletim sistemi yüklü olan bilgisayarlarda, kullanıcıya hangi işletim sistemini başlatacağına dair seçim yapma imkanı sunar.

## Bootloader Örnekleri

### 1. **GRUB (GRand Unified Bootloader)**

**GRUB**, en yaygın kullanılan ve çoğu **Linux** dağıtımı ile uyumlu olan bir önyükleyicidir. GRUB, çoklu işletim sistemi kurulumlarını destekler ve kullanıcıya açılış sırasında işletim sistemleri arasında seçim yapma imkanı sunar. Ayrıca, **konfigürasyon dosyaları aracılığıyla özelleştirilebilir** ve genellikle açık kaynak kodlu dağıtımların çoğunda kullanılır.

### 2. **LILO (LInux LOader)**

**LILO**, **GRUB**'dan önce popüler olan bir Linux önyükleyicisidir. LILO, önyükleme için daha basit bir yapı sunar, ancak modern GRUB kadar esnek ve güçlü değildir. LILO, genellikle daha eski sistemlerde ya da daha basit bir yapı isteyen kullanıcılar tarafından tercih edilir.

### 3. **Systemd-boot**

**Systemd-boot**, Linux sistemlerinde kullanılan bir başka popüler önyükleyicidir, ancak genellikle daha **minimal bir yapı** sunan ve sadece **UEFI sistemleri** için tasarlanmış bir önyükleyicidir. **systemd-boot**, Linux sistemlerinde **systemd yönetim sistemi** ile entegre bir şekilde çalışır ve özellikle modern UEFI tabanlı sistemlerde tercih edilir. Bununla birlikte, systemd-boot genellikle birkaç özellik açısından diğer önyükleyicilere göre **daha basit** ve **daha az esnektir**.

### 4. **Syslinux**

**Syslinux**, hafif ve basit bir önyükleyici olup genellikle **USB belleklerden** veya küçük işletim sistemi yüklemelerinden boot etmek için kullanılır. Linux dağıtımlarında yaygın olarak kullanılır ve çok **esnek bir yapı** sunar. Syslinux, başlangıçta **ISO dosyalarından boot etmek** için geliştirilmiş olsa da, zamanla daha geniş bir kullanım alanına sahip olmuştur.

---

Her **önyükleyici** farklı kullanım senaryolarına hitap eder ve her biri kendi avantajlarına sahiptir. **GRUB** esneklik ve çoklu önyükleme desteği sunarken, **systemd-boot** minimal ve hızlı bir seçenek sağlar. **LILO**, daha eski sistemler için tercih edilirken, **Syslinux** ise özellikle hafif sistemler için idealdir.
