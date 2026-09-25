<div align="center">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/assets/logo-dark.svg" width="110" alt="Vantagraph">

# Vantagraph

**为 Spotify 手工调校的十一套配色、一个住在应用内部的设置面板，以及六个可选扩展。没有配置文件，不用重启。**

[![许可证: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-A78BFA?style=for-the-badge&logo=gnu&logoColor=white)](https://github.com/Miabeyefendi/Vantagraph/blob/main/LICENSE)
[![版本](https://img.shields.io/github/v/release/Miabeyefendi/Vantagraph?style=for-the-badge&color=F59E0B&label=version)](https://github.com/Miabeyefendi/Vantagraph/releases/latest)
[![下载量](https://img.shields.io/github/downloads/Miabeyefendi/Vantagraph/total?style=for-the-badge&color=22C55E&label=downloads)](https://github.com/Miabeyefendi/Vantagraph/releases)
[![Spicetify](https://img.shields.io/badge/Spicetify_2.43%2B-1E293B?style=for-the-badge&logo=spotify&logoColor=white)](https://spicetify.app/)

[English](https://github.com/Miabeyefendi/Vantagraph#readme) · [Türkçe](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/locales/README_TR.md) · [Español](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/locales/README_ES.md) · [简体中文](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/locales/README_ZH.md) · [Русский](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/locales/README_RU.md)

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/palettes-grid.png" width="94%" alt="同一个 Spotify 界面上的全部十一套 Vantagraph 配色，以及设置面板">

</div>

---

## ✨ 你会得到什么

**十一套配色。** 五深六浅，每一套都是为长时间聆听调的，而不是为了一张截图好看。在 Spotify 内部切换，效果立刻生效。

**是设置面板，不是配置文件。** 顶栏出现一个齿轮，点开是一个五标签页的弹窗：主题、字体、布局、背景、片段。每个滑块在你拖动时就生效，一个按钮能把一切还原。

**六个扩展，用不用都行。** 画中画歌词卡拉OK、一个在全屏游戏下依然活着的无边框任务栏播放器、滚轮调音量、单曲循环片段、66 个手绘图标，以及一个开发者控制台。只有设置面板是必需的。

**三十多个片段开关。** 隐藏好友动态、广告横幅、"Made for You"、播客筛选器。把图片改成圆角、把媒体库行变窄、在宽度小于 1200px 时自动收起侧边栏。

<div align="center">
<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/showcase-settings.png" width="82%" alt="在 Spotify 内打开的 Vantagraph 设置面板，主题选择器每一行都带三个色块预览">
</div>

---

## 📦 安装

需要 [Spotify](https://www.spotify.com/download/) `1.2.86+` 和 [Spicetify](https://spicetify.app/docs/getting-started) `2.43+`。

把 `Vantagraph` 目录复制到 `…/spicetify/Themes/`，把 `Vantagraph/Extensions/` 里的每个 `.js` 复制到 `…/spicetify/Extensions/`。然后：

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify apply
```

Spotify 会带着主题重启，顶栏出现齿轮图标。这是最小安装。要开启图标集和可选扩展，或者要退回原版 Spotify，请看[安装指南](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md)。

---

## 📖 文档

| | |
|---|---|
| [**安装**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md) | 所有安装方式、每个扩展做什么，以及如何干净卸载 |
| [**十一套主题**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/THEMES.md) | 每套配色的截图，以及它是照着什么调的 |
| [**设置**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/SETTINGS.md) | 全部五个标签页、每个滑块和每一个片段开关 |
| [**扩展**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md) | 六个扩展的细节，以及它们所基于的致谢 |
| [**技术指南**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/guides/TUTORIAL.md) | 三层配色系统底层是怎么运作的 |
| [**更新日志**](https://github.com/Miabeyefendi/Vantagraph/blob/main/CHANGELOG.md) | 每个版本改了什么 |

> 你是在 Spotify 里看这段吗？上面的链接会在浏览器中打开。安装主题所需的一切，这一页上已经有了。

---

## 📜 许可证与致谢

Vantagraph 采用 **AGPL-3.0**，署名条款见 [NOTICE](https://github.com/Miabeyefendi/Vantagraph/blob/main/NOTICE)。只要源码保持开放、署名保持完整，你可以使用、修改和再分发。

其中三个扩展是在前人工作之上的重写，分别来自 [Aspecky](https://github.com/Aspecky)、khanhas 与 [Spicetify](https://github.com/spicetify) 维护者，以及 [FO-SS](https://github.com/FO-SS)。各自贡献了什么、在此之上又加了什么，都写在[扩展指南](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md#credits)里。

Spotify 与本项目没有关联，也未为其背书。本主题在本地修改桌面客户端；你自担风险运行它。

<div align="center">
<br/>
<sub>由 <b><a href="https://github.com/Miabeyefendi">Miabeyefendi</a></b> 制作</sub>
</div>
