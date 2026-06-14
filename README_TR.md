<div align="center">

<img src="./icons/vantagraph-theme.svg" width="120" alt="Vantagraph"/>

# Vantagraph

**Spotify için modern, modüler bir Spicetify teması.**
11 elden ayarlı renk paleti, uygulama içi ayar paneli, özel ikon seti, resim içinde resim (PiP) karaoke sözleri, görev çubuğu çalar, fare tekerleğiyle ses ve şarkıya göre döngü aracı - hepsi tek bir tema paketinde.

[![Lisans: AGPL v3](https://img.shields.io/badge/Lisans-AGPL_v3-A78BFA?style=for-the-badge&logo=gnu&logoColor=white)](./LICENSE)
[![Spicetify](https://img.shields.io/badge/Spicetify-2.43%2B-1ED760?style=for-the-badge&logo=spotify&logoColor=white)](https://spicetify.app/)
[![Spotify](https://img.shields.io/badge/Spotify-1.2.86%2B-1DB954?style=for-the-badge&logo=spotify&logoColor=white)](https://www.spotify.com/)
[![Durum](https://img.shields.io/badge/durum-akt%C4%B1f-22C55E?style=for-the-badge)](#)
[![Yazar](https://img.shields.io/badge/yazar-Miabeyefendi-0EA5E9?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Miabeyefendi)

[**Kurulum**](#-kurulum) · [**Temalar**](#-on-bir-tema) · [**Eklentiler**](#-eklentiler) · [**Ayarlar**](#%EF%B8%8F-ayarlar-turu) · [**Atıflar**](#-atiflar--ilham) · **·** [English](./README.md) · [Español](./README_ES.md)

</div>

---

<div align="center">

### Karanlık temalar bir bakışta

<img src="./screenshots/1.MainShowcaseForDark.png" width="92%" alt="Vantagraph karanlık temalar"/>

### Aydınlık temalar bir bakışta

<img src="./screenshots/2.MainShowcaseForWhite.png" width="92%" alt="Vantagraph aydınlık temalar"/>

</div>

---

## ✨ Öne Çıkanlar

- **11 özenle dengelenmiş palet** - 5 karanlık + 6 aydınlık; her biri uzun dinleme seansları için ayarlanmıştır.
- **Uygulama içi ayar paneli** - Spotify'ın içinde çalışan 5 sekmeli modal (Tema, Yazı Tipi, Yerleşim, Arka Plan, Snippet'ler).
- **Özel Vantagraph ikon seti** - üst bar, kenar bar, çalar ve sağ tık menülerinde Spotify Encore ikonlarının yerine geçen 66 elle çizilmiş SVG.
- **Vantagraph Şarkı Sözü Mini Çaları** - kelime senkronlu karaoke, çeviriler, vinil, animasyon ön ayarlarıyla resim içinde resim penceresi.
- **Vantagraph Görev Çubuğu Çaları** - `documentPictureInPicture` API'si ile çerçevesiz, her zaman üstte yüzen bar. Başka bir uygulama tam ekranken bile çalmayı kontrol edebilirsin.
- **Volume+** - bar üzerinde fare tekerleğiyle ses, orta tıkla sessize alma, yüzde tooltip'i, hızlı ön ayarlar, sessiz durum göstergesi.
- **LoopyLoop** - ilerleme çubuğuna sağ tıklayıp başlangıç / bitiş noktası belirle; döngüler şarkı başına localStorage'da kalıcıdır.
- **30+ snippet** - Friend Activity, reklam bannerı, "Made for You", "Top Mixes", podcast filtresi vs. gizle. Ayrıca yuvarlak görseller, modern kaydırma çubuğu, ince kitaplık satırları, otomatik gizlenen kenar bar, ve bir yığın geliştirici aracı (yerleşim ızgarası, öğe vurgulayıcı, boşluk görselleştirici, CSS değişken monitörü, DOM mutation kaydedici).
- **Özel arka planlar** - herhangi bir görsel URL'si veya mevcut albüm kapağı; canlı bulanıklık / parlaklık / kontrast / doygunluk sürgüleriyle.
- **Özel yazı tipi & vurgu rengi** - herhangi bir Google Font (veya yerel), herhangi bir HEX vurgu rengi.
- **Tek tıkla sıfırlama** - tüm localStorage anahtarlarını, enjekte edilmiş stilleri, body sınıflarını ve satır içi değişkenleri siler.

---

## 🎨 On Bir Tema

### Karanlık

<table>
<tr>
  <td align="center" width="50%">
    <img src="./screenshots/Theme-Vantablack.png" width="100%" alt="VantaBlack"/><br/>
    <sub><b>VantaBlack</b> · derin siyah nötrler, kırık beyaz yazı</sub>
  </td>
  <td align="center" width="50%">
    <img src="./screenshots/Theme-R34-Purple.png" width="100%" alt="R34 Purple"/><br/>
    <sub><b>R34 Purple</b> · gece yarısı indigo, altın vurgular, asil mavi oynat</sub>
  </td>
</tr>
<tr>
  <td align="center">
    <img src="./screenshots/Theme-Crimson.png" width="100%" alt="Crimson"/><br/>
    <sub><b>Crimson</b> · koyu şarap zemini, sıcak altın vurgular</sub>
  </td>
  <td align="center">
    <img src="./screenshots/Theme-Olive.png" width="100%" alt="Olive"/><br/>
    <sub><b>Olive</b> · orman yosunu, lime vurgu, yumuşak yazı</sub>
  </td>
</tr>
</table>

> Ayrıca **Spotify Default** paleti de listede; karşılaştırma yapmak isteyenler için.

### Aydınlık

<table>
<tr>
  <td align="center" width="50%">
    <img src="./screenshots/LightTheme-Vantawhite.png" width="100%" alt="VantaWhite"/><br/>
    <sub><b>VantaWhite</b> · kağıt beyazı yüzeyler, neredeyse siyah yazı</sub>
  </td>
  <td align="center" width="50%">
    <img src="./screenshots/LightTheme-Glass.png" width="100%" alt="Glass"/><br/>
    <sub><b>Glass</b> · soluk mavi / teal, buzlu cam hissi</sub>
  </td>
</tr>
<tr>
  <td align="center">
    <img src="./screenshots/LightTheme-Lavender.png" width="100%" alt="Lavender Blush"/><br/>
    <sub><b>Lavender Blush</b> · krem + lavanta, sıcak amber vurgu</sub>
  </td>
  <td align="center">
    <img src="./screenshots/LightTheme-TealGreen.png" width="100%" alt="Teal Green"/><br/>
    <sub><b>Teal Green</b> · yumuşak teal, gül kırmızısı vurgu</sub>
  </td>
</tr>
</table>

> İki aydınlık tema daha `color.ini` içinde gelir ve seçicide görünür: **Rose Vale** ve **Japanese Indigo**.

---

## 📦 Kurulum

### Ön Koşullar

- [Spotify Masaüstü](https://www.spotify.com/download/) (`1.2.86+` üzerinde test edildi)
- [Spicetify CLI](https://spicetify.app/docs/getting-started) (`2.43+` üzerinde test edildi)

### 1. Dosyaları Spicetify klasörlerine kopyala

Spicetify, tema ve eklentileri AppData altındaki **iki ayrı** klasörde tutar. Windows'ta tam yollar şunlardır:

| Ne | Nereye |
|---|---|
| **`Vantagraph`** klasörü (`color.ini`, `user.css`, `theme.js`, `icons/`, `screenshots/` içeren) | `C:\Users\<KULLANICI>\AppData\Roaming\spicetify\Themes\Vantagraph\` |
| **`Vantagraph/Extensions/`** içindeki her `.js` dosyası | `C:\Users\<KULLANICI>\AppData\Roaming\spicetify\Extensions\` |

İkisini de hızlıca açmak için `spicetify config-dir` komutunu kullanabilirsin.

Son yapı şöyle olmalı:

```
%AppData%\spicetify\
├─ Themes\
│  └─ Vantagraph\
│     ├─ color.ini
│     ├─ user.css
│     ├─ theme.js
│     ├─ icons\
│     └─ screenshots\
└─ Extensions\
   ├─ vantagraph-settings.js          ← zorunlu
   ├─ vantagraph-icons.js             ← tercih edilen
   ├─ vantagraph-lyric-miniplayer.js  ← tercihe bağlı (tavsiye edilir)
   ├─ vantagraph-loopyloop.js         ← tercihe bağlı (tavsiye edilir)
   ├─ vantagraph-taskbarplayer.js     ← tercihe bağlı (tavsiye edilir)
   ├─ vantagraph-volume-plus.js       ← tercihe bağlı (tavsiye edilir)
   └─ vantagraph-debug.js             ← yalnızca geliştiriciler için
```

### 2. Neyi etkinleştireceğine karar ver

Eklentiler dört kategoriye ayrılır. İstediğin gibi karıştır - `vantagraph-settings.js` dışında her şey opsiyoneldir.

| Seviye | Eklenti | Neden |
|---|---|---|
| **Zorunlu** | `vantagraph-settings.js` | Bu olmadan uygulama içi Ayarlar paneli (çark ikonu) hiç görünmez. Tema yine de çalışır ama canlı yapılandırmayı kaybedersin. |
| **Tercih edilen** | `vantagraph-icons.js` | 66 Encore SVG'sini Vantagraph ikon setiyle değiştirir. Tam görsel kimlik için şiddetle tavsiye edilir, ancak eklemesen de tema yine güzel görünür. |
| **Tercihe bağlı (tavsiye edilir)** | `vantagraph-lyric-miniplayer.js`<br/>`vantagraph-loopyloop.js`<br/>`vantagraph-taskbarplayer.js`<br/>`vantagraph-volume-plus.js` | Özellik eklentileri. İstediğin kadarını aç. Hiçbiri tema için gerekli değildir. |
| **Yalnızca geliştiriciler için** | `vantagraph-debug.js` | DevTools konsoluna 3 katmanlı renk geçersiz kılma zincirini basan yardımcı araç. Normal kullanıcı olarak etkinleştirme. |

### 3. Vantagraph'ı etkinleştir

**A) Tam kurulum (önerilen başlangıç):** `terminalcodes.txt` içindeki birebir blok - temayı, ayar panelini, ikonları ve dört opsiyonel eklentiyi açar:

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify config extensions vantagraph-volume-plus.js
spicetify config extensions vantagraph-lyric-miniplayer.js
spicetify config extensions vantagraph-loopyloop.js
spicetify config extensions vantagraph-icons.js
spicetify apply
```

> `vantagraph-taskbarplayer.js` **pakette gelir ama varsayılan blokta yer almaz** çünkü ayrı bir Picture-in-Picture penceresi açar ve bu herkesin isteyeceği bir şey değildir. Eklemek için: `spicetify config extensions vantagraph-taskbarplayer.js` ve tekrar uygula.

**B) Minimal kurulum:** sadece tema + ayar paneli.

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify apply
```

Uyguladıktan sonra Spotify, Vantagraph aktif şekilde yeniden başlar. Üst barın sağ köşesinde **çark ikonu** belirir; ayar panelini açmak için ona tıkla.

### Standart Spotify'a dönüş

```bash
spicetify config inject_css 0 replace_colors 0 overwrite_assets 0 inject_theme_js 0
spicetify config current_theme marketplace
spicetify config extensions vantagraph-settings.js-
spicetify config extensions vantagraph-volume-plus.js-
spicetify config extensions vantagraph-lyric-miniplayer.js-
spicetify config extensions vantagraph-loopyloop.js-
spicetify apply
```

Eklenti adının sonundaki `-` Spicetify'ın "kaldır" sözdizimidir.

---

## ⚙️ Ayarlar Turu

Vantagraph ayar paneli üst bardaki **çark ikonundan** açılır ve tamamen uygulama içinde çalışır. 5 sekmeli bir modal: Tema, Yazı Tipi, Yerleşim, Arka Plan, Snippet'ler.

<div align="center">
<img src="./screenshots/3.MainShowcaseSettings.png" width="80%" alt="Ayar paneli"/>
</div>

<table>
<tr>
  <td align="center" width="33%">
    <img src="./screenshots/Settings-ThemeSelect.png" width="100%" alt="Tema seçimi sekmesi"/><br/>
    <sub><b>🎨 Tema</b><br/>Karanlık / aydınlık gruplarından seç. Her satır 3 renkli önizleme gösterir (panel · pencere · vurgu). Liste altında: <b>Özel İkonlar</b> anahtarı ve <b>Özel Vurgu Rengi</b> seçici (uygula / sıfırla).</sub>
  </td>
  <td align="center" width="33%">
    <img src="./screenshots/Settings-Font.png" width="100%" alt="Yazı Tipi sekmesi"/><br/>
    <sub><b>✏️ Yazı Tipi</b><br/>Bir ön ayar seç (Inter, JetBrains Mono vb.) ya da herhangi bir Google Fonts adı yaz; Vantagraph URL'yi senin için kurar. <b>Boyut</b> sürgüsü 10-20px arası ve tüm Encore tip elementlerine uygulanır.</sub>
  </td>
  <td align="center" width="33%">
    <img src="./screenshots/Settings-Layout.png" width="100%" alt="Yerleşim sekmesi"/><br/>
    <sub><b>📐 Yerleşim</b><br/>Üç sürgü + bir yoğunluk seçici. <b>İkon Boyutu</b> 12-34px, <b>Yoğunluk</b> compact / default / comfortable, <b>Köşeler</b> 0-24px border-radius. Her sürgünün <b>DEF</b> butonu Spotify varsayılanına döner.</sub>
  </td>
</tr>
<tr>
  <td align="center">
    <img src="./screenshots/Settings-Background.png" width="100%" alt="Arka Plan sekmesi"/><br/>
    <sub><b>🖼️ Arka Plan</b><br/>Herhangi bir görsel URL'si yapıştır ya da <b>Albüm Kapağı BG</b> anahtarıyla anlık çalan kapağı kullan. Bulanıklık, parlaklık, kontrast, doygunluk için görüntü filtre sürgüleri. İpucu: önce tema seç, sonra BG'yi etkinleştir.</sub>
  </td>
  <td align="center">
    <img src="./screenshots/Settings-SnippetsPT1.png" width="100%" alt="Snippet'ler bölüm 1"/><br/>
    <sub><b>✂️ Snippet'ler · Görsel & Buton Gizleme</b><br/>Yuvarlak görseller, modern kaydırma çubuğu, vinil animasyonunu durdur. Sonrasında çalar bar / üst bar anahtarlarının uzun listesi: Friend Activity, What's New, Tam Ekran, Şarkı Sözü, Mini Çalar, Kuyruk, Karıştır, Tekrar, Bağlantı, Ses çubuğu, Şimdi Çalıyor widget'ı.</sub>
  </td>
  <td align="center">
    <img src="./screenshots/Settings-SnippetsPT2.png" width="100%" alt="Snippet'ler bölüm 2"/><br/>
    <sub><b>✂️ Snippet'ler · Öğe Gizleme, Yerleşim & Geliştirici</b><br/>Anasayfa bölümlerini gizle (Made for You, Top Mixes, Jump Back In, New Releases vb.), reklam bannerı, podcast filtresi. Yerleşim: ince kitaplık satırları, 1200px altı otomatik gizlenen kenar bar. Geliştirici: yerleşim ızgarası, öğe vurgulayıcı, boşluk görselleştirici, CSS değişken monitörü, DOM mutation kaydedici, Encore audit.</sub>
  </td>
</tr>
</table>

Panelin altında kırmızı bir **↻ Varsayılana Sıfırla** butonu vardır; her `vantagraph:*` localStorage anahtarını siler, enjekte edilmiş `<style>` ve `<link>` etiketlerini kaldırır, `:root` üzerindeki satır içi `--spice-*` / `--vg-*` değişkenlerini temizler, body sınıflarını kaldırır ve Spotify Default temasını uygular.

---

## 🧩 Eklentiler

### Vantagraph Görev Çubuğu Çaları

<div align="center">
<img src="./screenshots/4.MainShowcaseTaskBarPlays.png" width="80%" alt="Görev Çubuğu Çaları önizleme"/>
</div>

Deneysel `documentPictureInPicture` API'si üzerine kurulu çerçevesiz, her zaman üstte mini çalar. PiP `<html>` üzerinde bir `MutationObserver` ve bir rAF nöbetçisi ile Spotify'ın SPA navigasyon silmelerinden korunur. Canlı şarkı sözleri, ileri-geri sarma, ses, karıştır / tekrar / beğen içerir; şarkı sözü kapatılınca genişlik otomatik ayarlanır. İsteğe bağlı - ayrıca etkinleştir.

### Pakette gelen diğer eklentiler

| Eklenti | İşlevi |
|---|---|
| `vantagraph-settings.js` | Uygulama içi ayar modalı (çark ikonu). Panelin görünmesi için zorunludur. |
| `vantagraph-icons.js` | 66 Encore SVG'sini Vantagraph ikon setiyle değiştirir. Tema sekmesinden açılıp kapatılabilir. |
| `vantagraph-volume-plus.js` | Ses barı üzerinde tekerlek, orta tıkla sessiz, yüzde tooltip'i, hızlı ön ayar overlay'i (25/50/75/100%), altın parıltılı aktif ön ayar, geniş 250px bar. Yalnızca public API kullanır (`_volume` yok). |
| `vantagraph-lyric-miniplayer.js` | Kelime senkronlu karaoke (rAF döngüsü), 8 animasyon ön ayarı, çeviriler, vinil, hizalama seçici, font boyutu kontrolü, header içinde beğen, ayrı ayar popup'ı içeren PiP şarkı sözü penceresi. |
| `vantagraph-loopyloop.js` | İlerleme çubuğuna sağ tıklayıp döngü başlangıç / bitişi belirle. Döngüler şarkı URI'sine göre localStorage'da kalıcıdır. İnce ayar için yakınlık tabanlı kaydır-ittir. |
| `vantagraph-taskbarplayer.js` | Çerçevesiz, her zaman üstte yüzen PiP çalar (yukarıda). |
| `vantagraph-debug.js` | Herhangi bir CSS değişkeni için 3 katmanlı geçersiz kılma zincirini basan konsol aracı: Spotify Encore varsayılanı → Spicetify `--spice-*` → Vantagraph satır içi geçersiz kılma. DevTools'a yapıştır veya eklenti olarak yükle. |

---

## 🙏 Atıflar & İlham

Pakette gelen üç eklenti, harika önceki çalışmalar üzerine kurulu komple yeniden yazımlardır. Yazarlarına büyük teşekkürler:

### Volume+ ilhamı

- **Yazar:** [Aspecky](https://github.com/Aspecky)
- **Orijinal repo:** <https://github.com/Aspecky/spicetify-extensions/tree/main/volume-plus>
- **Alınan orijinal kavram:** tekerlekle ses + tooltip.
- **Vantagraph eklemeleri:** sıfırdan yeniden yazıldı; orta tık sessiz, hızlı ön ayar overlay'i (altın parıltılı aktif gösterge ve çift tık "tercih edilen ses" geri yükleme ile), 250px sabit bar genişliği, Tippy yedek etiketi, Vantagraph ikon entegrasyonu, modern `data-testid` seçicileri, başlangıçta ses geri yükleme, ilk çalıştırmada orta tık ipucu, yalnızca public API.

### Loopy Loop ilhamı

- **Orijinal yazar:** khanhas ve [Spicetify](https://github.com/spicetify) sürdürücüleri
- **Orijinal repo:** <https://github.com/spicetify/cli/tree/main/Extensions>
- **Alınan orijinal kavram:** ilerleme çubuğuna sağ tıklayıp döngü başlangıç / bitişi belirleme.
- **Vantagraph eklemeleri:** Vantagraph sınıf eşleme sistemini kullanan modernize seçiciler, deprecate olmuş `_HTMLContextMenuItem` API yerine native `createElement`, Vantagraph teması farkındalıklı renkler (`--spice-accent`, `--spice-player`, `--spice-highlight`), şarkı başına localStorage'da kalıcı döngüler, yakınlık tabanlı kaydır-ittir.

### Lyric Miniplayer ilhamı

- **Orijinal yazar:** FO-SS
- **Orijinal repo:** <https://github.com/FO-SS/Spictify-Lyric-Miniplayer>
- **Alınan orijinal kavram:** yüzen Picture-in-Picture şarkı sözü penceresi.
- **Vantagraph eklemeleri:** canlı `--spice-*` temalama, rAF render döngüsü, `VantagraphData` entegrasyonu, Spotify benzeri yerleşim, ayrı ayar popup penceresi, 8 animasyon ön ayarı, çeviriler, vinil, hizalama seçici, font boyutu kontrolü, karaoke parıltısı, satır içi tekrar / beğen / ses.

README'nin görsel yönü; [Catppuccin](https://github.com/catppuccin), [Tokyo Night](https://github.com/folke/tokyonight.nvim), [Dracula](https://draculatheme.com/), [Nord](https://www.nordtheme.com/) ve [Gruvbox](https://github.com/morhetz/gruvbox) showcase'lerinden ilham alır. Spotify, Spotify logosu, "Spicetify" ve burada anılan tüm üçüncü taraf proje adları ilgili sahiplerine aittir; kullanımları nominatif/dürüst kullanımdır ve hiçbir bağ veya onay anlamına gelmez.

---

## 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır. Önce [CONTRIBUTING.md](./CONTRIBUTING.md) ve [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) dosyalarını okuyun. Katkıda bulunarak eserinizi AGPL-3.0 altında lisanslamayı kabul edersiniz.

## 🛡️ Güvenlik

Bir zafiyet mi buldunuz? Halka açık issue açmayın. [SECURITY.md](./SECURITY.md) içindeki özel süreci izleyin.

## 📄 Lisans

Vantagraph; [LICENSE](./LICENSE) dosyasındaki ek şartlarla birlikte **GNU Affero General Public License v3.0 (AGPL-3.0)** altında lisanslanmıştır. Kısaca:

- Eksiksiz kaynak kodu AGPL-3.0 altında erişilebilir tuttuğunuz sürece (barındırılan / SaaS / ağ kullanımı dahil - AGPL §13) ve aşağıdaki yazar atfını koruduğunuz sürece bu eseri **ücretsiz** kullanabilir, inceleyebilir, değiştirebilir, dağıtabilir ve hatta para kazanabilirsiniz.
- Kapalı kaynaklı, tescilli veya AGPL dışı kullanım için **ayrı, yazılı bir ticari lisans** gerekir (royalti / gelir payı içerebilir). Bkz. [LICENSE](./LICENSE) §8.

### Zorunlu atıf (AGPL §7(b))

Aşağıdaki atıf; her kopyada, fork'ta veya dağıtımda görünür ve değiştirilmeden korunmalıdır:

> **Miabeyefendi (Mustafa İhsan Albayrak)** - <https://github.com/Miabeyefendi>

Tam metin için [NOTICE](./NOTICE) dosyasına bakın.

## ⚠️ Sorumluluk Reddi

Bu yazılım hiçbir garanti olmaksızın "olduğu gibi" sunulur. Tamamen kendi riskinizle çalıştırırsınız ve etkileştiği herhangi bir üçüncü taraf platformun (özellikle Spotify) Kullanım Koşullarına uymak dahil kendi kullanımınızdan yalnızca siz sorumlusunuz. Spotify bu projeyle bağlı veya bu projeyi onaylamış değildir; adı ve ticari markaları Spotify AB'ye aittir. Yazar; hesap yasakları, veri kaybı veya başka herhangi bir zarardan, uygulanabilir yasanın izin verdiği azami ölçüde sorumlu değildir. Tam şartlar [LICENSE](./LICENSE) dosyasındadır.

## 📬 İletişim

- **GitHub:** [@Miabeyefendi](https://github.com/Miabeyefendi)
- **Ticari lisanslama:** GitHub profilim üzerinden bana ulaşın.

---

<div align="center">
<sub><a href="https://github.com/Miabeyefendi">Miabeyefendi</a> tarafından ☕ ve çok fazla <code>!important</code> ile yapıldı</sub>
</div>
