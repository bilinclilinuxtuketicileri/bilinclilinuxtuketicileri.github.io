<small>Bu <a href="https://www.linux.com/what-is-linux/">What is Linux?</a> sayfasının bir çevirisidir.</small>

# Linux nedir?

Tıpkı Windows, iOS ve Mac OS gibi Linux da bir işletim sistemidir. Aslında, gezegendeki en popüler platformlardan biri olan Android, Linux işletim sistemi tarafından desteklenmektedir. İşletim sistemi, masaüstü veya dizüstü bilgisayarınızla ilişkili tüm donanım kaynaklarını yöneten bir yazılımdır. Basitçe söylemek gerekirse, işletim sistemi yazılımınız ve donanımınız arasındaki iletişimi yönetir. İşletim sistemi (OS) olmadan yazılım çalışmaz.

Linux işletim sistemi birkaç farklı parçadan oluşur:

1. **Önyükleyici (Bootloader) -** Bilgisayarınızın önyükleme sürecini yöneten yazılım. Çoğu kullanıcı için bu, işletim sistemine önyükleme yapmak için açılan ve sonunda kaybolan bir açılış ekranı olacaktır.

2. **Çekirdek (Kernel) -** Bu, aslında 'Linux' olarak adlandırılan bütünün tek parçasıdır. Çekirdek sistemin çekirdeğidir ve CPU, bellek ve çevresel aygıtları yönetir. Çekirdek, işletim sisteminin en alt seviyesindeki bileşendir.

(Yani en temel bileşenidir. Lowest level = Temel, Highest level = Kullanıcının doğrudan etkileşimde bulunduğu uygulamalar )</small>

3. **Init sistemi -** Bu, kullanıcı alanını önyükleyen ve daemonları kontrol etmekle görevli bir alt sistemdir. En yaygın kullanılan init sistemlerinden biri systemd'dir ve aynı zamanda en tartışmalı olanlardan biridir. İlk önyükleme önyükleyiciden (yani GRUB veya GRand Unified Bootloader) devredildikten sonra önyükleme sürecini yöneten init sistemidir.

4. **Daemonlar -** Bunlar önyükleme sırasında veya masaüstünde oturum açtıktan sonra başlayan arka plan hizmetleridir (yazdırma, ses, zamanlama vb.).

5. **Grafik sunucusu -** Bu, monitörünüzdeki grafikleri görüntüleyen alt sistemdir. Genellikle X sunucusu veya sadece X olarak adlandırılır.

6. **Masaüstü ortamı (DE) -** Bu, kullanıcıların gerçekte etkileşimde bulunduğu parçadır. Aralarından seçim yapabileceğiniz birçok masaüstü ortamı vardır (GNOME, Cinnamon, Mate, Pantheon, Enlightenment, KDE, Xfce, vb.) Her masaüstü ortamı yerleşik uygulamalar (dosya yöneticileri, yapılandırma araçları, web tarayıcıları ve oyunlar gibi) içerir.

Dipnot: Masaüstü ortamı yerine pencere yöneticisi de kullanabilirsiniz. 7. öğesi benim kendi eklememdir.

7. **Pencere yöneticisi (WM) -** Bu, pencere ve ekran düzeninden sorumlu olan bir yazılımdır. Pencere yöneticisi, açık uygulamaların ekranda nasıl yerleşeceğini, sınırlarını, başlık çubuklarını ve diğer görsel unsurlarını kontrol eder. Çoğu pencere yöneticisi, kullanıcıya pencere düzeni üzerinde çeşitli özelleştirme seçenekleri sunar. Kendi başına çalışabilen bağımsız pencere yöneticileri (i3, bspwm, Openbox, Fluxbox, vb.) veya bir masaüstü ortamının parçası olarak gelen entegre pencere yöneticileri (KWin, Mutter, Muffin, vb.) bulunur.

8. **Uygulamalar -** Masaüstü ortamları tüm uygulama yelpazesini sunmaz. Tıpkı Windows ve macOS gibi Linux da kolayca bulunup yüklenebilen binlerce yüksek kaliteli yazılım başlığı sunar. Çoğu modern Linux dağıtımı (daha fazlası aşağıda) uygulama kurulumunu merkezileştiren ve basitleştiren App Store benzeri araçlar içerir. Örneğin Ubuntu Linux, binlerce uygulama arasında hızlı bir şekilde arama yapmanızı ve bunları tek bir merkezi konumdan yüklemenizi sağlayan Ubuntu Yazılım Merkezi'ne (GNOME Software'in yeniden markası) sahiptir.

# Neden Linux kullanmalısınız?

Bu, çoğu insanın sorduğu bir sorudur. Çoğu masaüstü, dizüstü bilgisayar ve sunucuyla birlikte gelen işletim sistemi gayet iyi çalışırken neden tamamen farklı bir bilgisayar ortamını öğrenmekle uğraşalım?

Bu soruyu yanıtlamak için başka bir soru sormak istiyorum. Şu anda kullandığınız işletim sistemi gerçekten "gayet iyi" çalışıyor mu? Yoksa kendinizi virüsler, kötü amaçlı yazılımlar, yavaşlamalar, çökmeler, maliyetli onarımlar ve lisans ücretleri gibi engellerle mücadele ederken mi buluyorsunuz? Yukarıdakilerle mücadele ediyorsanız, Linux sizin için mükemmel bir platform olabilir. Linux, gezegendeki en güvenilir bilgisayar ekosistemlerinden biri haline geldi. Bu güvenilirliği sıfır giriş maliyeti ile birleştirdiğinizde masaüstü platformu için mükemmel bir çözüme sahip olursunuz.

Bu doğru, sıfır giriş maliyeti... yani ücretsiz. Yazılım veya sunucu lisansı için tek kuruş ödemeden istediğiniz kadar bilgisayara Linux kurabilirsiniz.

Windows Server 2016 ile karşılaştırmalı olarak bir Linux sunucusunun maliyetine bir göz atalım. Windows Server 2016 Standart sürümünün fiyatı 882,00 USD'dir (doğrudan Microsoft'tan satın alınır). Bu fiyata İstemci Erişim Lisansı (CAL) ve çalıştırmanız gerekebilecek diğer yazılımların (veritabanı, web sunucusu, posta sunucusu vb.) lisansları dahil değildir. Örneğin, Windows Server 2016 için tek bir kullanıcı CAL'si 38,00 ABD dolarıdır. Örneğin 10 kullanıcı eklemeniz gerekirse, sunucu yazılımı lisanslaması için 388,00 dolar daha ödemeniz gerekir.Linux sunucu ile bunların hepsi ücretsiz ve kurulumu kolaydır. Aslında, tam gelişmiş bir web sunucusu (bir veritabanı sunucusu içeren) kurmak sadece birkaç tıklama veya komut uzaklığındadır (ne kadar basit olabileceği hakkında bir fikir edinmek için Kolay LAMP Sunucu Kurulumu'na bir göz atın).

Sıfır maliyet sizi kazanmak için yeterli değilse, kullandığınız sürece sorunsuz çalışacak bir işletim sistemine sahip olmaya ne dersiniz? Yaklaşık 20 yıldır Linux kullanıyorum (hem masaüstü hem de sunucu platformu olarak) ve fidye yazılımı, kötü amaçlı yazılım veya virüslerle ilgili herhangi bir sorun yaşamadım. Linux genellikle bu tür saldırılara karşı çok daha az savunmasızdır. Sunucuların yeniden başlatılmasına gelince, bu yalnızca çekirdek güncellendiğinde gereklidir. Bir Linux sunucusunun yeniden başlatılmadan yıllar geçirmesi olağan dışı bir durum değildir. Düzenli olarak önerilen güncellemeleri takip ederseniz, kararlılık ve güvenilirlik pratik olarak garanti edilir.

# Açık kaynak

Linux ayrıca açık kaynak lisansı altında dağıtılmaktadır. Açık kaynak şu temel ilkeleri takip eder:

- Programı herhangi bir amaç için çalıştırma özgürlüğü.
- Programın nasıl çalıştığını inceleme ve istediğinizi yaptırmak için onu değiştirme özgürlüğü.
- Komşunuza yardım edebilmeniz için kopyaları yeniden dağıtma özgürlüğü.
- Değiştirilmiş sürümlerinizin kopyalarını başkalarına dağıtma özgürlüğü.

Bu noktalar, Linux platformunu yaratmak için birlikte çalışan topluluğu anlamak için çok önemlidir. Şüphesiz, Linux "insanlar tarafından, insanlar için" olan bir işletim sistemidir. Bu ilkeler aynı zamanda birçok insanın Linux'u seçmesindeki ana faktördür. Bu özgürlük, kullanım özgürlüğü ve seçim özgürlüğü ile ilgilidir.

# "Dağıtım" nedir?

Linux'un her tür kullanıcıya uygun bir dizi farklı sürümü vardır. Yeni kullanıcılardan sıkı kullanıcılara kadar, ihtiyaçlarınıza uygun bir Linux "çeşnisi" bulacaksınız. Bu sürümlere dağıtımlar (ya da kısaca "distros") denir. Neredeyse her Linux dağıtımı ücretsiz olarak indirilebilir, diske (ya da USB belleğe) yazılabilir ve (istediğiniz kadar makineye) kurulabilir.

Popüler Linux dağıtımları şunlardır:

- LINUX MINT
- MANJARO
- DEBIAN
- UBUNTU
- ANTERGOS
- SOLUS
- FEDORA
- ELEMENTARY OS
- OPENSUSE

Her dağıtımın masaüstünde farklı bir yaklaşımı vardır. Bazıları çok modern kullanıcı arayüzlerini tercih ederken (GNOME ve Elementary OS'un Pantheon'u gibi), diğerleri daha geleneksel bir masaüstü ortamına bağlı kalıyor (openSUSE KDE kullanıyor).

[Distrowatch](https://distrowatch.com/)'taki ilk 100 dağıtıma göz atabilirsiniz.

Ve sunucunun geride kaldığını düşünmeyin. Bu arena için şu adrese başvurabilirsiniz:

- Red Hat Enterprise Linux
- Ubuntu Server
- Centos
- SUSE Enterprise Linux

Yukarıdaki sunucu dağıtımlarından bazıları ücretsizdir (Ubuntu Server ve CentOS gibi) ve bazılarının ilişkili bir fiyatı vardır (Red Hat Enterprise Linux ve SUSE Enterprise Linux gibi). İlişkili bir fiyatı olanlar ayrıca destek de içerir.

# Hangi dağıtımı seçmelisiniz?

Hangi dağıtımı kullanacağınız üç basit sorunun cevabına bağlı olacaktır:

- Ne kadar yetenekli bir bilgisayar kullanıcısısınız?
- Modern mi yoksa standart bir masaüstü arayüzü mü tercih edersiniz?
- Sunucu mu yoksa masaüstü mü?

Bilgisayar becerileriniz oldukça basitse, Linux Mint, Ubuntu (Şekil 3), Elementary OS veya Deepin gibi acemi dostu bir dağıtımla devam etmek isteyeceksiniz. Eğer becerileriniz ortalamanın üzerindeyse Debian ya da Fedora gibi bir dağıtımı tercih edebilirsiniz. Bununla birlikte, bilgisayar ve sistem yönetimi konusunda oldukça ustalaştıysanız, Gentoo gibi bir dağıtım kullanın. Eğer gerçekten bir meydan okuma istiyorsanız, Linux From Scratch'in yardımıyla kendi Linux dağıtımınızı oluşturabilirsiniz.

Eğer sadece sunucuya yönelik bir dağıtım arıyorsanız, bir masaüstü arayüzüne ihtiyacınız olup olmadığına ya da bunu sadece komut satırı üzerinden yapmak isteyip istemediğinize de karar vermek isteyeceksiniz. Ubuntu Sunucu bir GUI arayüzü kurmaz. Bunun iki anlamı vardır: sunucunuz grafik yüklemekle uğraşmaz ve Linux komut satırını iyi anlamanız gerekir. Bununla birlikte, sudo apt-get install ubuntu-desktop gibi tek bir komutla Ubuntu Sunucusunun üzerine bir GUI paketi yükleyebilirsiniz. Sistem yöneticileri de bir dağıtımı özelliklerine göre değerlendirmek isteyecektir. Sunucunuz için ihtiyacınız olan her şeyi kutudan çıktığı gibi size sunacak, sunucuya özel bir dağıtım mı istiyorsunuz? Eğer öyleyse, CentOS en iyi seçim olabilir. Ya da bir masaüstü dağıtımı almak ve ihtiyaç duyduğunuz parçaları eklemek mi istiyorsunuz? Eğer öyleyse, Debian veya Ubuntu Linux size iyi hizmet edebilir.

# Linux kurulumu

Birçok insan için bir işletim sistemi kurma fikri çok göz korkutucu bir görev gibi görünebilir. İster inanın ister inanmayın, Linux tüm işletim sistemleri arasında en kolay kurulumlardan birini sunar. Aslında, Linux'un çoğu sürümü Canlı dağıtım olarak adlandırılan bir dağıtım sunar, bu da işletim sistemini sabit diskinizde herhangi bir değişiklik yapmadan bir CD/DVD veya USB flash sürücüden çalıştırabileceğiniz anlamına gelir. Kurulum yapmak zorunda kalmadan tüm işlevselliği elde edersiniz. Denedikten ve kullanmak istediğinize karar verdikten sonra, "Yükle" simgesine çift tıklamanız ve basit kurulum sihirbazından geçmeniz yeterlidir.

Dp: Videolu anlatım için Yusuf İpek'in, <a href="https://www.youtube.com/watch?v=3PsRxJZTXEY">Ventoy ile USB diskinize ISO yazdırın</a> videosuna göz atabilirsiniz.

Tipik olarak, kurulum sihirbazları aşağıdaki adımlarla süreç boyunca size yol gösterir (Ubuntu Linux'un kurulumunu göstereceğiz):

- Hazırlık: Makinenizin kurulum gereksinimlerini karşıladığından emin olun. Bu ayrıca üçüncü taraf yazılımları (MP3 çalma eklentileri, video kodekleri ve daha fazlası gibi) yüklemek isteyip istemediğinizi sorabilir.
- Kablosuz kurulum (gerekirse): Bir dizüstü bilgisayar (veya kablosuz ağa sahip bir makine) kullanıyorsanız, üçüncü taraf yazılımları ve güncellemeleri indirmek için ağa bağlanmanız gerekecektir.
- Sabit disk bölümlendirme (Şekil 4): Bu adım, işletim sisteminin nasıl kurulmasını istediğinizi seçmenize olanak tanır. Linux'u başka bir işletim sisteminin yanına mı kuracaksınız ("çift önyükleme (dual boot)" olarak adlandırılır), tüm sabit diski mi kullanacaksınız, mevcut bir Linux kurulumunu mu yükselteceksiniz veya mevcut bir Linux sürümünün üzerine mi kuracaksınız.
- Konum: Haritadan konumunuzu seçin.
- Klavye düzeni: Sisteminiz için klavye seçin.
- Kullanıcı kurulumu: Kullanıcı adınızı ve şifrenizi ayarlayın.

İşte bu kadar. Sistem kurulumu tamamladıktan sonra yeniden başlatın ve kullanıma hazırsınız. Linux kurulumuna ilişkin daha ayrıntılı bir kılavuz için "Linux'u Kesinlikle En Kolay ve En Güvenli Şekilde Kurma ve Deneme" başlıklı makaleye göz atın ya da Linux Vakfı'nın Linux kurulumuna ilişkin PDF kılavuzunu indirin.

# Linux'ta yazılım yükleme

İşletim sisteminin kendisinin kurulumu ne kadar kolaysa, uygulamaların kurulumu da o kadar kolaydır. Çoğu modern Linux dağıtımı, çoğu kişinin bir uygulama mağazası olarak düşüneceği bir şey içerir. Bu, yazılımın aranabildiği ve yüklenebildiği merkezi bir konumdur. Ubuntu Linux (ve diğer birçok dağıtım) GNOME Yazılımına, Elementary OS AppCenter'a, Deepin Deepin Yazılım Merkezine, openSUSE kendi AppStore'una ve bazı dağıtımlar Synaptic'e güvenir.

Adı ne olursa olsun, bu araçların her biri aynı şeyi yapar: Linux yazılımlarını aramak ve yüklemek için merkezi bir yer. Elbette, bu yazılım parçaları bir GUI'nin varlığına bağlıdır. GUI'siz sunucular için, kurulum için komut satırı arayüzüne güvenmeniz gerekecektir.

Komut satırı kurulumunun bile ne kadar kolay olabileceğini göstermek için iki farklı araca bakalım. Örneklerimiz Debian tabanlı dağıtımlar ve Fedora tabanlı dağıtımlar içindir. Debian tabanlı dağıtımlar yazılım yüklemek için apt-get aracını kullanırken Fedora tabanlı dağıtımlar yum aracının kullanılmasını gerektirecektir. Her ikisi de çok benzer şekilde çalışır. Biz apt-get komutunu kullanarak örneklendireceğiz. Diyelim ki wget aracını kurmak istiyorsunuz (komut satırından dosya indirmek için kullanılan kullanışlı bir araçtır). Bunu apt-get kullanarak yüklemek için komut aşağıdaki gibi olacaktır:

```bash
sudo apt-get install wget
```

sudo komutu eklenmiştir çünkü yazılım yüklemek için süper kullanıcı ayrıcalıklarına ihtiyacınız vardır. Benzer şekilde, aynı yazılımı Fedora tabanlı bir dağıtıma yüklemek için, önce süper kullanıcıya su komutunu verirsiniz (kelimenin tam anlamıyla su komutunu verin ve root şifresini girin) ve bu komutu verirsiniz:

```bash
yum install wget
```

Bir Linux makineye yazılım yüklemenin hepsi bu kadar. Düşündüğünüz kadar zor değil. Hala şüpheniz mi var? Daha önceki Kolay LAMP Sunucusu Kurulumunu hatırlayın. Tek bir komutla:

```bash
sudo taskel
```

Bir sunucu ya da masaüstü dağıtımı üzerine eksiksiz bir LAMP (Linux Apache MySQL PHP) sunucusu kurabilirsiniz. Gerçekten bu kadar kolay.

# Daha fazla kaynak

Hem masaüstü hem de sunucu için en güvenilir, emniyetli ve güvenilir platformlardan birini arıyorsanız, birçok Linux dağıtımından birinden başkasına bakmayın. Linux ile masaüstü bilgisayarlarınızın sorunsuz, sunucularınızın çalışır durumda ve destek taleplerinizin minimum düzeyde olacağından emin olabilirsiniz.

Linux ile yaşamınız boyunca size rehberlik edecek daha fazla bilgi için aşağıdaki kaynaklara göz atın (ingilizce):

- [Linux.com](https://www.linux.com/): Everything you need to know about Linux  (news, tutorials and more)
- [Howtoforge](https://www.howtoforge.com/): Linux tutorials
- [Linux Documentation Project](http://www.tldp.org/): How-tos, guides, and FAQs
- [Linux Knowledge Base and Tutorial](http://www.linux-tutorial.info/): Plenty of tutorials and in-depth guides
- [LWN.net](https://lwn.net/): Linux kernel news and more
