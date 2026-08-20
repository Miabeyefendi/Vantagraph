<div align="center">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/assets/logo-dark.svg" width="110" alt="Vantagraph">

# Vantagraph

**Одиннадцать вручную подобранных цветовых схем для Spotify, панель настроек, живущая внутри приложения, и шесть необязательных расширений. Ни конфигурационных файлов, ни перезапусков.**

[![Лицензия: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-A78BFA?style=for-the-badge&logo=gnu&logoColor=white)](https://github.com/Miabeyefendi/Vantagraph/blob/main/LICENSE)
[![Версия](https://img.shields.io/github/v/release/Miabeyefendi/Vantagraph?style=for-the-badge&color=F59E0B&label=version)](https://github.com/Miabeyefendi/Vantagraph/releases/latest)
[![Загрузки](https://img.shields.io/github/downloads/Miabeyefendi/Vantagraph/total?style=for-the-badge&color=22C55E&label=downloads)](https://github.com/Miabeyefendi/Vantagraph/releases)
[![Spicetify](https://img.shields.io/badge/Spicetify_2.43%2B-1E293B?style=for-the-badge&logo=spotify&logoColor=white)](https://spicetify.app/)

[English](https://github.com/Miabeyefendi/Vantagraph#readme) · [Türkçe](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_TR.md) · [Español](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_ES.md) · [简体中文](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_ZH.md) · [Русский](https://github.com/Miabeyefendi/Vantagraph/blob/main/README_RU.md)

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-dark.png" width="94%" alt="Пять тёмных схем Vantagraph рядом внутри Spotify: VantaBlack, R34 Purple, Crimson, Olive и Spotify Default">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-light.png" width="94%" alt="Шесть светлых схем Vantagraph рядом внутри Spotify: VantaWhite, Glass, Lavender Blush, Teal Green, Rose Vale и Japanese Indigo">

</div>

---

## ✨ Что вы получаете

**Одиннадцать палитр.** Пять тёмных, шесть светлых, и каждая настроена под долгое прослушивание, а не под одну красивую картинку. Переключаетесь прямо внутри Spotify, изменение происходит сразу.

**Панель настроек, а не конфигурационный файл.** В верхней панели появляется шестерёнка и открывает окно из пяти вкладок: тема, шрифт, раскладка, фон, сниппеты. Каждый ползунок действует прямо во время перетаскивания, а одна кнопка возвращает всё обратно.

**Шесть расширений, которые можно взять или не брать.** Караоке-текст в отдельном окне, безрамочный плеер поверх панели задач, переживающий полноэкранные игры, громкость колесом мыши, повтор фрагмента в пределах трека, 66 нарисованных вручную значков и консоль для разработки. Обязательна только панель настроек.

**Больше тридцати сниппетов.** Скрыть активность друзей, рекламную полосу, «Made for You», фильтр подкастов. Скруглить обложки, сузить строки медиатеки, автоматически прятать боковую панель при ширине меньше 1200px.

<div align="center">
<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/screenshots/main-showcase-settings.png" width="82%" alt="Панель настроек Vantagraph, открытая внутри Spotify, с выбором темы и тремя образцами цвета в каждой строке">
</div>

---

## 📦 Установка

Нужны [Spotify](https://www.spotify.com/download/) `1.2.86+` и [Spicetify](https://spicetify.app/docs/getting-started) `2.43+`.

Скопируйте папку `Vantagraph` в `…/spicetify/Themes/`, а каждый `.js` из `Vantagraph/Extensions/` в `…/spicetify/Extensions/`. Затем:

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify apply
```

Spotify перезапускается с включённой темой и шестерёнкой в верхней панели. Это минимум. Чтобы включить набор значков и необязательные расширения или вернуться к обычному Spotify, смотрите [руководство по установке](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md).

---

## 📖 Документация

| | |
|---|---|
| [**Установка**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md) | Все способы установки, что делает каждое расширение и как удалить начисто |
| [**Одиннадцать тем**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/THEMES.md) | Каждая палитра со снимком экрана и тем, подо что она настроена |
| [**Настройки**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/SETTINGS.md) | Все пять вкладок, каждый ползунок и каждый сниппет |
| [**Расширения**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md) | Шесть расширений подробно и благодарности тем, на чьей работе они построены |
| [**Техническое руководство**](https://github.com/Miabeyefendi/Vantagraph/blob/main/TUTORIAL.md) | Как изнутри устроена трёхслойная система цвета |
| [**Изменения**](https://github.com/Miabeyefendi/Vantagraph/blob/main/CHANGELOG.md) | Что поменялось в каждом релизе |

> Читаете это внутри Spotify? Ссылки выше открываются в браузере. Всё, что нужно для установки темы, уже есть на этой странице.

---

## 📜 Лицензия и благодарности

Vantagraph распространяется под **AGPL-3.0**, условия атрибуции в файле [NOTICE](https://github.com/Miabeyefendi/Vantagraph/blob/main/NOTICE). Пользуйтесь, изменяйте и распространяйте, пока исходный код остаётся открытым, а атрибуция нетронутой.

Три расширения переписаны на основе более ранних работ [Aspecky](https://github.com/Aspecky), khanhas и сопровождающих [Spicetify](https://github.com/spicetify), а также [FO-SS](https://github.com/FO-SS). Что внёс каждый и что было добавлено сверху, изложено в [руководстве по расширениям](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md#credits).

Spotify не связан с этим проектом и не одобряет его. Тема изменяет настольный клиент локально; вы запускаете её на свой страх и риск.

<div align="center">
<br/>
<sub>Сделано <b><a href="https://github.com/Miabeyefendi">Miabeyefendi</a></b></sub>
</div>
