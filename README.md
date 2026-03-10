<div align="center">

# 🌑 Vantagraph for Spicetify

**A collection of meticulously crafted, deep-dark gradient themes for Spotify.**

[![Spicetify](https://img.shields.io/badge/Spicetify-Supported-success?style=for-the-badge&logo=spotify)](https://spicetify.app/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#license)

Vantagraph is not just another dark theme. It’s a carefully designed UI overhaul that focuses on **fluid dark-to-dark gradients**, **perfect spacing**, and **global typography standards**. No pure blacks, just deep, immersive shadows.

</div>

---

## ✨ Features

- **5 Unique Color Schemes:** Ranging from cinematic darks to midnight purples.
- **Flawless Typography:** Utilizes a tri-font system for ultimate readability:
  - `Inter` for the main UI (Global standard sans-serif).
  - `Manrope` for bold, impactful headings.
  - `JetBrains Mono` for track times to ensure perfect tabular alignment (e.g., `03:45` matches `12:18` perfectly in width).
- **Subtle Gradients:** Replaces flat backgrounds with elegant, CSS-based directional gradients.

## 🎨 Themes Showcase

| CineNox (Letterboxd Inspired) | Anthrafall (Anthracite Gradient) |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/14181C/FFFFFF?text=Screenshot+of+CineNox" width="100%"> | <img src="https://via.placeholder.com/600x400/141414/F5F5F5?text=Screenshot+of+Anthrafall" width="100%"> |

| Prussian Eerie (Oceanic Dark) | Chroma V-Spec (Midnight Purple) |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x400/0B1A24/A3D5FF?text=Screenshot+of+Prussian+Eerie" width="100%"> | <img src="https://via.placeholder.com/600x400/1A1124/B983FF?text=Screenshot+of+Chroma+V-Spec" width="100%"> |

| Aura Nibel (Mystic Forest) |
| :---: |
| <img src="https://via.placeholder.com/600x400/060F14/51E4F7?text=Screenshot+of+Aura+Nibel" width="100%"> |

*(Note: Replace placeholder images with actual screenshots of your themes once developed)*

---

## 🚀 Installation

### Prerequisites
Make sure you have [Spicetify CLI](https://spicetify.app/docs/getting-started/installation) installed.

### Windows (PowerShell)
```powershell
git clone https://github.com/Miabeyefendi/vantagraph.git
Copy-Item -Path ".\vantagraph\*" -Destination "$env:appdata\spicetify\Themes\Vantagraph" -Recurse

### Linux / macOS (Bash)
```bash
git clone https://github.com/Miabeyefendi/vantagraph.git
cp -r vantagraph ~/.config/spicetify/Themes/Vantagraph
```

---

## ⚙️ Usage

Once the theme folder is placed in your Spicetify Themes directory, run the following commands to apply it:

```bash
# Set Vantagraph as the main theme
spicetify config current_theme Vantagraph

# Choose your color scheme (Options: CineNox, Anthrafall, Prussian-Eerie, Chroma-V-Spec, Aura-Nibel)
spicetify config color_scheme CineNox

# Apply changes to Spotify
spicetify apply
```

To change the scheme later, simply run:
```bash
spicetify config color_scheme Chroma-V-Spec
spicetify apply
```

---

## 🖋️ Fonts Requirement

To fully experience the "Tabular Figures" and perfect spacing, this theme imports fonts directly via Google Fonts in the `user.css`. You **do not** need to install them locally on your OS. 

*If you prefer local fonts, ensure you have **Inter**, **Manrope**, and **JetBrains Mono** installed on your system.*

## 🤝 Credits & Inspiration
- Inspired by the clean codebase of [Lucid](https://github.com/sanoojes/spicetify-lucid).
- Color palettes inspired by Letterboxd, Nissan Skyline aesthetics, and Ori and the Will of the Wisps.
