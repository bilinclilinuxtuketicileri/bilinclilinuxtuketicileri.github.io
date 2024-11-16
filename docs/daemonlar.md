# Daemon (Servis) Nedir?

**Daemon**, işletim sistemlerinde **arka planda** çalışan ve belirli görevleri **otomatik** olarak gerçekleştiren bir program veya süreçtir. Daemon'lar genellikle bir kullanıcı arayüzüne sahip olmazlar ve **sistem başlatıldığında** otomatik olarak çalışmaya başlarlar.

## Daemonların Görevleri

**Daemon'lar** genellikle şu tür **görevlerde** kullanılırlar:

1. **Sistem Hizmetleri Sağlama:**
   Örneğin, bir ağ bağlantısını yönetmek, yazıcıya belge göndermek veya bir web sunucusu çalıştırmak.

2. **Otomatik İşlemler:**
   Belirli bir zaman diliminde yedek alma, sistem kaynaklarını izleme veya güncellemeleri kontrol etme.

3. **Kullanıcıdan Bağımsız Çalışma:**
   Kullanıcı giriş yapmasa bile arka planda görevlerini yerine getirirler.

4. **Sistem Kaynaklarını Optimize Etme:**
   Gerektiğinde işlemleri durdurarak veya başlatarak kaynak yönetimini sağlarlar.

## Daemon Türleri ve Kullanım Alanları

**Daemon'lar** genellikle işletim sistemine entegre olur ve sistemin olmazsa olmaz bir parçasıdır.

| Daemon | Görevi                                    | Kullanım Alanı                                           |
| ------ | ----------------------------------------- | -------------------------------------------------------- |
| init   | Diğer tüm daemonları yönetir.             | Tüm Linux sistemleri                                     |
| cron   | Zamanlanmış görevleri çalıştırır.         | Yedekleme, otomatik güncellemeler vb.                    |
| sshd   | Güvenli bir şekilde uzak bağlantı sağlar. | Sunucu yönetimi                                          |
| httpd  | Web hizmetlerini yönetir.                 | Web barındırma                                           |
| udevd  | Donanım algılama ve yönetimi.             | Tak-çalıştır cihazlar (dolayısıyla tüm Linux sistemleri) |

1. **init:** Init, işletim sistemi açılırken başlatılan ilk işlemdir. Aynı zamanda sistem kapatılana kadar çalışmaya devam eden bir daemondur. Diğer tüm daemonların atasıdır da diyebiliriz. Daha fazla bilgi için, bkz. [Init Sistemi](init-sistemi.md)

2. **cron:** Cron, belirli bir zaman planına göre görevleri (script çalıştırma, dosya temizleme, snapshot alma vb.) otomatik olarak yürüten bir daemondur.

3. **sshd:** sshd (Secure SHell Daemon), uzak bağlantılar için güvenli bir shell hizmeti sunar. Ağ hizmetlerini güvenli olmayan bir ağ üzerinden güvenli bir şekilde çalıştırmak için kullanılan kriptografik bir ağ protokolüdür. Genelde, uzaktan oturum açma ve komut yürütme için kullanılır.

?> SSH hakkında daha sonra detaylıca bir makale gelecek.

4. **httpd:** Httpd (Hypertext Transfer Protocol Daemon ya da kısaca HTTP Daemon), web isteklerini işleyerek bir web sunucusunun çalışmasını sağlayan bir daemon. Apache ve Nginx gibi birçok popüler web sunucuları bu daemon'u kullanır.

5. **udevd:** Udevd (Device Daemon), takılan donanımları algılayıp, ilgili sürücüleri yükler. Kısaca tak-çalıştır cihazların hızlı ve sorunsuz çalışmasını sağlar.

## Daemon vs Servis

**Daemon'lar** genelde **"servis"** ile karıştırılır, fakat **servis** daha **genel bir kavram**dır.

- **Daemon:** Her zaman arka planda çalışan, kullanıcının doğrudan iletişimde bulunmadığı bir süreçtir.
- **Servis:** Bazı işlemler arası iletişim mekanizmaları (genellikle ağ üzerinden) üzerinden diğer programlardan gelen isteklere yanır veren bir programdır.

Her daemon, aynı zamanda bir servistir; fakat her servis bir daemon değildir.
