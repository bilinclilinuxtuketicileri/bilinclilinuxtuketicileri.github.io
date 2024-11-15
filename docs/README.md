# Linux nedir?

Tıpkı Windows, iOS ve Mac OS gibi Linux da bir işletim sistemidir. Aslında, gezegendeki en popüler platformlardan biri olan Android, Linux işletim sistemi tarafından desteklenmektedir. İşletim sistemi, masaüstü veya dizüstü bilgisayarınızla ilişkili tüm donanım kaynaklarını yöneten bir yazılımdır. Basitçe söylemek gerekirse, işletim sistemi yazılımınız ve donanımınız arasındaki iletişimi yönetir. İşletim sistemi (OS) olmadan yazılım çalışmaz.

Linux işletim sistemi birkaç farklı parçadan oluşur:

1. **Önyükleyici (Bootloader) -** Bilgisayarınızın önyükleme sürecini yöneten yazılım. Çoğu kullanıcı için bu, işletim sistemine önyükleme yapmak için açılan ve sonunda kaybolan bir açılış ekranı olacaktır.

2. **Çekirdek (Kernel) -** Bu, aslında 'Linux' olarak adlandırılan bütünün tek parçasıdır. Çekirdek sistemin çekirdeğidir ve CPU, bellek ve çevresel aygıtları yönetir. Çekirdek, işletim sisteminin en alt seviyesindeki bileşendir.
   <small>Yani en temel bileşenidir. Lowest level = Temel, Highest level = Kullanıcının doğrudan etkileşimde bulunduğu uygulamalar</small>

3. **Init sistemi -** Bu, kullanıcı alanını önyükleyen ve daemonları kontrol etmekle görevli bir alt sistemdir. En yaygın kullanılan init sistemlerinden biri systemd'dir ve aynı zamanda en tartışmalı olanlardan biridir. İlk önyükleme önyükleyiciden (yani GRUB veya GRand Unified Bootloader) devredildikten sonra önyükleme sürecini yöneten init sistemidir.

4. **Daemonlar -** Bunlar önyükleme sırasında veya masaüstünde oturum açtıktan sonra başlayan arka plan hizmetleridir (yazdırma, ses, zamanlama vb.).

5. **Grafik sunucusu -** Bu, monitörünüzdeki grafikleri görüntüleyen alt sistemdir. Genellikle X sunucusu veya sadece X olarak adlandırılır.

6. **Masaüstü ortamı (DE) -** Bu, kullanıcıların gerçekte etkileşimde bulunduğu parçadır. Aralarından seçim yapabileceğiniz birçok masaüstü ortamı vardır (GNOME, Cinnamon, Mate, Pantheon, Enlightenment, KDE, Xfce, vb.) Her masaüstü ortamı yerleşik uygulamalar (dosya yöneticileri, yapılandırma araçları, web tarayıcıları ve oyunlar gibi) içerir.

7. **Pencere yöneticisi (WM) -** Bu, pencere ve ekran düzeninden sorumlu olan bir yazılımdır. Pencere yöneticisi, açık uygulamaların ekranda nasıl yerleşeceğini, sınırlarını, başlık çubuklarını ve diğer görsel unsurlarını kontrol eder. Çoğu pencere yöneticisi, kullanıcıya pencere düzeni üzerinde çeşitli özelleştirme seçenekleri sunar. Kendi başına çalışabilen bağımsız pencere yöneticileri (i3, bspwm, Openbox, Fluxbox, vb.) veya bir masaüstü ortamının parçası olarak gelen entegre pencere yöneticileri (KWin, Mutter, Muffin, vb.) bulunur.

8. **Uygulamalar -** Masaüstü ortamları tüm uygulama yelpazesini sunmaz. Tıpkı Windows ve macOS gibi Linux da kolayca bulunup yüklenebilen binlerce yüksek kaliteli yazılım başlığı sunar. Çoğu modern Linux dağıtımı (daha fazlası aşağıda) uygulama kurulumunu merkezileştiren ve basitleştiren App Store benzeri araçlar içerir. Örneğin Ubuntu Linux, binlerce uygulama arasında hızlı bir şekilde arama yapmanızı ve bunları tek bir merkezi konumdan yüklemenizi sağlayan Ubuntu Yazılım Merkezi'ne (GNOME Software'in yeniden markası) sahiptir.
