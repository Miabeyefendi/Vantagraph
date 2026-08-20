<div align="center">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/assets/logo-dark.svg" width="110" alt="Vantagraph">

# Vantagraph

**Spotify için elle ayarlanmış on bir renk şeması, uygulamanın içinde yaşayan bir ayar paneli ve altı isteğe bağlı eklenti. Yapılandırma dosyası yok, yeniden başlatma yok.**

[![Lisans: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-A78BFA?style=for-the-badge&logo=gnu&logoColor=white)](https://github.com/Miabeyefendi/Vantagraph/blob/main/LICENSE)
[![Sürüm](https://img.shields.io/github/v/release/Miabeyefendi/Vantagraph?style=for-the-badge&color=F59E0B&label=version)](https://github.com/Miabeyefendi/Vantagraph/releases/latest)
[![İndirme](https://img.shields.io/github/downloads/Miabeyefendi/Vantagraph/total?style=for-the-badge&color=22C55E&label=downloads)](https://github.com/Miabeyefendi/Vantagraph/releases)
[![Spicetify](https://img.shields.io/badge/Spicetify_2.43%2B-1E293B?style=for-the-badge&logo=spotify&logoColor=white)](https://spicetify.app/)

[English](https://github.com/Miabeyefendi/Vantagraph#readme) · [Türkçe](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_TR.md) · [Español](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_ES.md) · [简体中文](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_ZH.md) · [Русский](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_RU.md)

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-dark.png" width="94%" alt="Spotify içinde yan yana beş koyu Vantagraph şeması: VantaBlack, R34 Purple, Crimson, Olive ve Spotify Default">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-light.png" width="94%" alt="Spotify içinde yan yana altı açık Vantagraph şeması: VantaWhite, Glass, Lavender Blush, Teal Green, Rose Vale ve Japanese Indigo">

</div>

---

## ✨ Ne alıyorsun

**On bir palet.** Beş koyu, altı açık; her biri tek bir ekran görüntüsü için değil, uzun dinleme seansları için ayarlandı. Spotify'ın içinden geçiş yapıyorsun ve değişim anında oluyor.

**Yapılandırma dosyası değil, bir ayar paneli.** Üst çubukta bir dişli beliriyor ve beş sekmeli bir pencere açıyor: tema, font, yerleşim, arka plan, snippet'ler. Her kaydırıcı sen sürüklerken etki ediyor ve tek bir düğme her şeyi geri alıyor.

**Alabileceğin ya da bırakabileceğin altı eklenti.** Resim içinde resim karaoke sözler, tam ekran oyunlarda hayatta kalan kenarlıksız bir görev çubuğu oynatıcısı, tekerlekle ses, parça bazlı döngü, 66 elle çizilmiş ikon ve bir geliştirici konsolu. Yalnızca ayar paneli zorunlu.

**Otuz küsur snippet.** Arkadaş etkinliğini, reklam bandını, "Made for You"yu, podcast filtresini gizle. Görselleri yuvarlat, kütüphane satırlarını incelt, 1200px altında kenar çubuğunu otomatik gizle.

<div align="center">
<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-settings.png" width="82%" alt="Spotify içinde açık Vantagraph ayar paneli; her satırda üç renk örneği taşıyan tema seçici">
</div>

---

## 📦 Kurulum

[Spotify](https://www.spotify.com/download/) `1.2.86+` ve [Spicetify](https://spicetify.app/docs/getting-started) `2.43+` gerekiyor.

`Vantagraph` klasörünü `…/spicetify/Themes/` içine, `Vantagraph/Extensions/` altındaki her `.js` dosyasını da `…/spicetify/Extensions/` içine kopyala. Sonra:

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify apply
```

Spotify tema açık ve üst çubukta dişli ikonuyla yeniden başlıyor. Bu asgari kurulum. İkon setini ve isteğe bağlı eklentileri açmak, ya da stok Spotify'a dönmek için [kurulum rehberine](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md) bak.

---

## 📖 Belgeler

| | |
|---|---|
| [**Kurulum**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md) | Tüm kurulum yolları, hangi eklenti ne yapıyor, nasıl temiz kaldırılır |
| [**On bir tema**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/THEMES.md) | Her palet, ekran görüntüsü ve neye göre ayarlandığı |
| [**Ayarlar**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/SETTINGS.md) | Beş sekmenin tamamı, her kaydırıcı ve her snippet |
| [**Eklentiler**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md) | Altı eklenti detaylı, ve üzerine inşa edildikleri atıflar |
| [**Teknik rehber**](https://github.com/Miabeyefendi/Vantagraph/blob/main/TUTORIAL.md) | Üç katmanlı renk sisteminin arka planda nasıl çalıştığı |
| [**Değişiklikler**](https://github.com/Miabeyefendi/Vantagraph/blob/main/CHANGELOG.md) | Her sürümde ne değişti |

> Bunu Spotify içinden mi okuyorsun? Yukarıdaki linkler tarayıcında açılır. Temayı kurmak için gereken her şey zaten bu sayfada.

---

## 📜 Lisans ve atıflar

Vantagraph **AGPL-3.0** altında, atıf şartları [NOTICE](https://github.com/Miabeyefendi/Vantagraph/blob/main/NOTICE) dosyasında. Kaynak açık kaldığı ve atıf korunduğu sürece kullan, değiştir, dağıt.

Eklentilerin üçü daha önceki işler üzerine yazılmış yeniden yazımlardır: [Aspecky](https://github.com/Aspecky), khanhas ve [Spicetify](https://github.com/spicetify) sürdürücüleri, ve [FO-SS](https://github.com/FO-SS). Her birinin neyi kattığı ve üzerine ne eklendiği [eklentiler rehberinde](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md#credits) yazılı.

Spotify bu projeyle bağlı değildir ve onu onaylamamıştır. Tema masaüstü istemcisini yerel olarak değiştirir; kendi riskinle çalıştırırsın.

<div align="center">
<br/>
<sub><b><a href="https://github.com/Miabeyefendi">Miabeyefendi</a></b> tarafından yapıldı</sub>
</div>
