Bu makale NVIDIA grafik kartları için açık kaynaklı Nouveau sürücüsünü kapsamaktadır. Tescilli sürücü hakkında bilgi için [NVIDIA](onerilen-dosya-sistemi-duzeni.md) bölümüne bakın.

# Kurulum

3D hızlandırma için DRI sürücüsünü sağlayan mesa paketini yükleyin. (`sudo pacman -S mesa`)

- 32 bit uygulama desteği için, multilib deposundan lib32-mesa paketini de yükleyin. (`sudo pacman -S lib32-mesa`)
- DDX sürücüsü (Xorg'da 2D hızlandırma sağlar) için xf86-video-nouveau paketini yükleyin. (`sudo pacman -S xf86-video-nouveau`)

## Mesa NVK Vulkan Sürücüsünü Kullanma

> [!WARNING]
> Bu sürücü hala geliştirilme aşamasındadır ve bu nedenle gerilemeler beklenmelidir. Açık kaynak ve tescilli sürücülerde çalışan bazı şeyler (çoğunlukla oyunlar) muhtemelen NVK kullanarak aynı şekilde (hatta hiç) çalışmayacaktır. Eğer oyun oynamak önemli bir iş yüküyse, biraz olgunlaşana kadar NVK kullanmaktan kaçınmalısınız.

NVK kullanımı için Kernel sürümü 6.7 veya daha yeni ve mesa sürümü 24.1 veya daha yeni olmalıdır.

NVK'yı etkinleştirmeden önce aşağıdaki paketlerden herhangi birini (ve/veya lib32 ve DKMS varyantlarını) kaldırmanız gerekir:

- [nvidia](https://archlinux.org/packages/?name=nvidia), [nvidia-open](https://archlinux.org/packages/?name=nvidia-open), [nvidia-lts](https://archlinux.org/packages/?name=nvidia-lts), [nvidia-beta (AUR)](https://archlinux.org/packages/?name=nvidia-beta)
- [nvidia-settings](https://archlinux.org/packages/?name=nvidia-settings), [nvidia-utils](https://archlinux.org/packages/?name=nvidia-utils)
- [egl-wayland](https://archlinux.org/packages/?name=egl-wayland)
