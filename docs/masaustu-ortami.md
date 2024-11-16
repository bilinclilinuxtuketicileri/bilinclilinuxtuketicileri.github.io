# **Masaüstü Ortamı Nedir?**

**Masaüstü ortamı** (**Desktop Environment - DE**), bir işletim sistemi ile kullanıcı arasındaki görsel etkileşimi sağlayan grafiksel bir arayüzdür. Masaüstü ortamları genellikle bir **pencere yöneticisi**, **dosya yöneticisi**, **panel**, **sistem tepsisi** ve çeşitli araçlar (örneğin bir terminal emülatörü) içerir.

## **Pencere Yöneticisi Nedir?**

**Pencere yöneticisi** (**Window Manager - WM**), genellikle bir masaüstü ortamının bir parçası olarak çalışan ve yalnızca pencerelerin boyutlandırılması, taşınması, kapatılması gibi işlemlerden sorumlu olan bir yazılımdır.

Fakat masaüstü ortamından bağımsız pencere yöneticileri de mevcuttur (örn. **Sway**, **Hyprland**, **dwm**, **i3wm** vb.).

Bağımsız pencere yöneticileri, oldukça minimalisttir ve düşük kaynak tüketir. **Klavye kısayolları** ve **özelleştirme seçenekleri**yle genellikle özelleştirme seven kullanıcılar tarafından tercih edilir.

## **Popüler Pencere Yöneticileri**

| **Pencere yöneticisi** | **Grafik sunucusu** | **Kaynak tüketimi** |
| ---------------------- | ------------------- | ------------------- |
| **i3wm**               | **X11 (X.org)**     | ~400mb ram          |
| **Sway**               | **Wayland**         | ~500mb ram          |
| **Hyprland**           | **Wayland**         | ~800mb ram          |

?> Bunlar benim kişisel deneyimlerimdir. Siz WM'leri daha da minimal kullanıp bu kaynak tüketimini daha da düşürebilirsiniz.

---

### **1\. i3wm**

**i3**, X11 tabanlı bir pencere yöneticisi olarak geliştirilmiş ve minimalizm ile kullanım kolaylığını birleştirerek hızla popülerlik kazanmıştır. **i3**, basit ve yapılandırılabilir bir dosya tabanlı konfigürasyon sistemine sahip olup, kullanıcılara çok fazla **özelleştirme** imkânı sunar. Aynı zamanda hafiftir ve çok düşük kaynak kullanır. **i3**'ün **Wayland** ile uyumlu bir versiyonu olan **Sway** geliştirildi, ancak **i3** hala X11 için en yaygın kullanılan pencere yöneticilerinden biridir.

### **2\. Sway**

**Sway**, **i3**’ün bir **Wayland** alternatifi olarak geliştirilmiş bir pencere yöneticisidir. **Sway**, **i3**'ün tüm temel özelliklerini **Wayland** ortamına taşır ve **X11** yerine **Wayland** kullanarak daha düşük gecikme, daha iyi güvenlik ve daha modern bir deneyim sunar.

### **3\. Hyprland**

**Hyprland**, **Wayland** tabanlı olarak geliştirilmiş bir pencere yöneticisidir. **Sway** gibi, **Wayland**’ın sunduğu düşük gecikme ve daha iyi güvenlik özelliklerinden yararlanırken, görsel efektler ve kullanıcı dostu özellikler sunarak daha geniş bir kullanıcı kitlesine hitap eder. **Hyprland**, kullanıcıya büyük bir **özelleştirme** imkânı sunar ve özellikle görsel çekiciliği ile dikkat çeker. **Wayland**’a özgü özelliklerden yararlanarak, **X11**’in sunduğu performans sınırlamalarının önüne geçer ve yeni donanımlarda çok daha verimli çalışır.

## **Popüler Masaüstü Ortamları**

| **Masaüstü ortamı** | **Grafik sunucusu**      | **Görsel tasarım**   | **Kaynak tüketimi** | **Özelleştirme**                              |
| ------------------- | ------------------------ | -------------------- | ------------------- | --------------------------------------------- |
| **GNOME**           | **Wayland, X11 (X.org)** | **Modern**           | ~1gb ram            | **Eklentiler** ile oldukça özelleştirilebilir |
| **KDE Plasma**      | **Wayland, X11 (X.org)** | **Kapsamlı, Modern** | ~800mb ram          | En fazla **özelleştirilebilir** DE            |
| **XFCE**            | **X11**                  | **Minimalist**       | ~600mb ram          | **KDE**'den sonra en fazla özelleştirilebilir |
| **LXDE**            | **X11**                  | **Minimalist**       | ~500mb ram          | Kısıtlı                                       |
| **Cinnamon**        | **X11**                  | **Geleneksel**       | ~800mb ram          | Kısıtlı                                       |
| **Mate**            | **X11**                  | **Geleneksel**       | ~700mb ram          | Kısıtlı                                       |

?> **Kaynak tüketimi** kısmı şahsi deneyimim ve arkadaşlarımın deneyimlerinden ibarettir. Daha ağır bir kurulum ile bu değerler artabilir.

---

### **1\. GNOME**

**GNOME**, **GNU Projesi** tarafından başlatıldı. Amacı, özgür bir masaüstü ortamı sağlamaktı. **GNOME**, modern ve minimal bir tasarıma sahiptir. **GTK** araç takımı kullanılarak geliştirilir ve bazı popüler Linux dağıtımı tarafından varsayılan masaüstü ortamı olarak sunulur. **GNOME Shell** adlı pencere yöneticisi, **GNOME** deneyiminin merkezindedir ve **eklentiler** ile genişletilebilir. Fakat bununla beraber sisteme yük bindirir.

### **2\. KDE Plasma**

**KDE Plasma**, **KDE (K Desktop Environment)** projesi olarak başladı. Daha sonra **KDE Plasma** adını aldı. Geliştiricilere ve **özelleştirmeyi** seven kullanıcılara hitap eden bir masaüstü ortamıdır. **Qt** araç takımı üzerine inşa edilmiştir ve kullanıcıya geniş **özelleştirme** seçenekleri sunar. **KDE**'nin **KWin** adlı pencere yöneticisi, güçlü kompozit özelliklere ve animasyonlara sahiptir. Bunlara rağmen çok hafiftir.

### **3\. XFCE**

**XFCE**, **Olivier Fourdan** tarafından geliştirilmeye başlandı. Hafif ve hızlı bir masaüstü ortamıdır. Daha eski veya düşük donanımlı sistemlerde sorunsuz çalışmasıyla bilinir. **GTK** araç takımı kullanır ve **GNOME**'dan çok daha az kaynak tüketir. **XFCE**'nin pencere yöneticisi olan **Xfwm**, basit ama etkili bir pencere yönetimi sağlar. Buna rağmen oldukça **özelleştirilebilir** bir masaüstü ortamıdır.

### **4\. LXDE**

**LXDE**, Taiwanlı bir geliştirici olan **Hong Jen Yee** tarafından başlatıldı. Düşük kaynak tüketimi ve hızlı tepki süresi ile bilinir. **LXDE**, **GTK** araç takımı kullanılarak geliştirilmiştir, ancak bazı bileşenleri **Qt** ile yeniden yazılmıştır. Pencere yöneticisi olarak **Openbox** kullanır. **LXDE**, daha eski sistemlerde bile hızlı bir kullanıcı deneyimi sağlar.

### **5\. Cinnamon**

**Cinnamon**, **Linux Mint** ekibi tarafından geliştirilmeye başlandı. **GNOME 3**'ün kullanıcı arayüzündeki köklü değişikliklerden hoşlanmayanlar için bir alternatif olarak doğdu. Geleneksel masaüstü düzenini modern özelliklerle birleştirir. **Cinnamon**, **GNOME** teknolojilerine dayanır ve basitlik, işlevsellik ve kullanıcı dostu tasarıma odaklanır.

### **6\. MATE**

**MATE**, **GNOME 2**'nin çatallanmasıyla oluşturuldu. **GNOME 3**'e geçiş sırasında gelen radikal değişiklikleri benimsemeyen kullanıcılar için bir alternatif olarak ortaya çıktı. **MATE**, **GNOME 2**'nin kullanıcı arayüzünü korurken modern sistemlerle uyumlu hale getirmeyi amaçlar. **GTK** tabanlıdır ve geleneksel masaüstü düzenini seven kullanıcılar için ideal bir seçenektir.
