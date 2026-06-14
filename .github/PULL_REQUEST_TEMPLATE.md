<!--
================================================================================
Vantagraph Pull Request template
EN first (authoritative), TR second. Delete sections that do not apply.
Please read CONTRIBUTING.md before opening this PR.
================================================================================
-->

## Summary

<!-- One or two sentences: what does this PR change and why? -->

## Type of change

<!-- Tick the box that fits. Tick more than one if needed. -->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 🎨 New theme or color scheme (addition to `color.ini`)
- [ ] 🧩 New extension or extension change (`Extensions/*.js`)
- [ ] 🖼️ Icon set change (`icons/*.svg`)
- [ ] 💄 CSS / styling change (`user.css`, `theme.js`)
- [ ] 📝 Documentation (README, comments, screenshots)
- [ ] 🔧 Tooling / repo housekeeping (CI, gitignore, templates)
- [ ] 💥 Breaking change (existing setups will need migration)

## Linked issues

<!-- Use "Fixes #123" or "Closes #123" so the issue auto-closes on merge. -->

Fixes #

## Screenshots / clips

<!--
For any visible change (CSS, icons, theme, extensions with UI) please attach
before/after screenshots. For an animation/transition change, a short clip is
worth a thousand words. Drag images straight into this textarea.
-->

| Before | After |
|---|---|
|  |  |

## Tested on

<!-- Tick what you actually tried. Untested combinations are fine, just be honest. -->

- [ ] Spicetify version: <!-- e.g. 2.43.2 -->
- [ ] Spotify version: <!-- e.g. 1.2.86 -->
- [ ] Windows
- [ ] macOS
- [ ] Linux
- [ ] Dark theme (which one): <!-- VantaBlack / R34Purple / Crimson / Olive / Spotify Default -->
- [ ] Light theme (which one): <!-- VantaWhite / Glass / Lavender Blush / Rose Vale / Japanese Indigo / Teal Green -->
- [ ] With extensions enabled: <!-- settings / icons / volume-plus / lyric-miniplayer / loopyloop / taskbarplayer -->

## Checklist

- [ ] I read [CONTRIBUTING.md](../CONTRIBUTING.md) and the code [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md).
- [ ] My contribution is my own work and I agree to license it under **AGPL-3.0** (CONTRIBUTING §1).
- [ ] I did not remove or alter author attribution, license headers, or `NOTICE` (CONTRIBUTING §2).
- [ ] Code matches the existing style (`.editorconfig`, `.gitattributes`); no unrelated reformatting.
- [ ] No personal `vantagraph:*` localStorage keys, debug logs, or hard-coded paths left behind.
- [ ] If I touched `theme.js`, `Extensions/*.js`, or `user.css`, I reloaded Spotify with `spicetify apply` and confirmed it still loads.
- [ ] If this is a new theme: added the block to `color.ini` and verified all 15 keys are filled (`window`, `panel`, `panel-hover`, `menu`, `player`, `stroke`, `text`, `subtext`, `accent`, `btn-active`, `tab-active`, `play-btn`, `play-btn-hover`, `bar-fill`, `bar-bg`, `heart`).

## Anything else?

<!-- Open questions, follow-ups, things you're unsure about. -->

---

<details>
<summary>🇹🇷 Türkçe</summary>

## Özet

<!-- Bir iki cümle: bu PR ne değiştiriyor ve neden? -->

## Değişiklik türü

- [ ] 🐛 Hata düzeltmesi (kırılmayan, mevcut bir sorunu çözen)
- [ ] ✨ Yeni özellik (kırılmayan, işlev ekleyen)
- [ ] 🎨 Yeni tema veya renk paleti (`color.ini` eklemesi)
- [ ] 🧩 Yeni eklenti veya eklenti değişikliği (`Extensions/*.js`)
- [ ] 🖼️ İkon seti değişikliği (`icons/*.svg`)
- [ ] 💄 CSS / stil değişikliği (`user.css`, `theme.js`)
- [ ] 📝 Dokümantasyon (README, yorumlar, ekran görüntüleri)
- [ ] 🔧 Repo bakımı (CI, gitignore, şablonlar)
- [ ] 💥 Kırıcı değişiklik (mevcut kurulumların migration'a ihtiyacı olur)

## Bağlı issue'lar

`Fixes #123` veya `Closes #123` yaz, merge'de otomatik kapansın.

Fixes #

## Ekran görüntüleri / klipler

Görünür her değişiklik (CSS, ikon, tema, UI'li eklentiler) için öncesi/sonrası ekran görüntüsü ekle. Animasyon/geçiş değişikliklerinde kısa bir klip bin kelimeye bedeldir.

| Öncesi | Sonrası |
|---|---|
|  |  |

## Test edildi

- [ ] Spicetify sürümü:
- [ ] Spotify sürümü:
- [ ] Windows / macOS / Linux:
- [ ] Hangi karanlık tema:
- [ ] Hangi aydınlık tema:
- [ ] Hangi eklentiler açık:

## Kontrol listesi

- [ ] [CONTRIBUTING.md](../CONTRIBUTING.md) ve [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) okundu.
- [ ] Katkım kendi özgün eserim ve **AGPL-3.0** altında lisanslamayı kabul ediyorum.
- [ ] Yazar atfını, lisans başlıklarını veya `NOTICE` dosyasını değiştirmedim/silmedim.
- [ ] Kod mevcut stille uyumlu; alakasız reformat yok.
- [ ] Geride debug log, kişisel `vantagraph:*` localStorage anahtarı veya hardcoded yol bırakmadım.
- [ ] `theme.js` / `Extensions/*.js` / `user.css` dokunduysam `spicetify apply` ile yükleyip çalıştığını doğruladım.
- [ ] Yeni tema ise: `color.ini`'ye blok eklendi, 15 anahtar (`window`, `panel`, `panel-hover`, `menu`, `player`, `stroke`, `text`, `subtext`, `accent`, `btn-active`, `tab-active`, `play-btn`, `play-btn-hover`, `bar-fill`, `bar-bg`, `heart`) dolduruldu.

## Başka not?

</details>
