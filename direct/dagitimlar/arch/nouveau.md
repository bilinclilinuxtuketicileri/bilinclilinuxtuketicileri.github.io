Bu makale NVIDIA grafik kartları için açık kaynaklı Nouveau sürücüsünü kapsamaktadır. Tescilli sürücü hakkında bilgi için [NVIDIA](onerilen-dosya-sistemi-duzeni.md) bölümüne bakın.

# Kurulum

3D hızlandırma için DRI sürücüsünü sağlayan mesa paketini yükleyin. (`sudo pacman -S mesa`)

- 32 bit uygulama desteği için, multilib deposundan lib32-mesa paketini de yükleyin. (`sudo pacman -S lib32-mesa`)
- DDX sürücüsü (Xorg'da 2D hızlandırma sağlar) için xf86-video-nouveau paketini yükleyin. (`sudo pacman -S xf86-video-nouveau`)
