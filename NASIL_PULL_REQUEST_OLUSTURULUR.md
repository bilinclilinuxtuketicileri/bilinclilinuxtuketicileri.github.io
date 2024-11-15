# Nasıl pull request oluşturulur?

Öncelikle repoyu forklayın:
![](docs/images/pull_request_1.png)
![](docs/images/pull_request_2.png)

Repoyu forkladığınız zaman reponun bir kopyası GitHub hesabınızda da oluşacaktır. Kendi GitHub sayfanızda oluşan repoyu bilgisayarınıza klonlayın. Daha sonra reponun klonlandığı klasöre geçiş yapıp yeni bir branch oluşturup branche geçiş yapın.

```bash
git clone https://github.com/UserName/RepoName.git Bilincli-Linux-Tuketicileri
cd Bilincli-Linux-Tuketicileri
git checkout -b UserName/main
```

![](docs/images/pull_request_4.png)

Bu aşamadan sonra projede yapmak istediğiniz değişiklikleri yapıp commit atın ve reponuza gönderin.

```bash
git add newFile.md
git commit -m "Eklendi: newFile.md"
git push origin UserName/main
```

Bu aşamadan sonra işlemlerimize GitHub üzerinden devam etmemiz gerekiyor. Kendi sayfamızdaki repoya tekrar baktığımızda bu sefer bir uyarı mesajı göreceğiz.

![](docs/images/pull_request_5.png)
![](docs/images/pull_request_6.png)

Pull request gönderirken [CONTRIBUTING](CONTRIBUTING.md) sayfasındaki kurallara uyduğunuzdan emin olun.
