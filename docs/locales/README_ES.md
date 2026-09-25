<div align="center">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/assets/logo-dark.svg" width="110" alt="Vantagraph">

# Vantagraph

**Once esquemas de color afinados a mano para Spotify, un panel de ajustes que vive dentro de la aplicación y seis extensiones opcionales. Sin archivos de configuración y sin reinicios.**

[![Licencia: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-A78BFA?style=for-the-badge&logo=gnu&logoColor=white)](https://github.com/Miabeyefendi/Vantagraph/blob/main/LICENSE)
[![Versión](https://img.shields.io/github/v/release/Miabeyefendi/Vantagraph?style=for-the-badge&color=F59E0B&label=version)](https://github.com/Miabeyefendi/Vantagraph/releases/latest)
[![Descargas](https://img.shields.io/github/downloads/Miabeyefendi/Vantagraph/total?style=for-the-badge&color=22C55E&label=downloads)](https://github.com/Miabeyefendi/Vantagraph/releases)
[![Spicetify](https://img.shields.io/badge/Spicetify_2.43%2B-1E293B?style=for-the-badge&logo=spotify&logoColor=white)](https://spicetify.app/)

[English](https://github.com/Miabeyefendi/Vantagraph#readme) · [Türkçe](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/locales/README_TR.md) · [Español](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/locales/README_ES.md) · [简体中文](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/locales/README_ZH.md) · [Русский](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/locales/README_RU.md)

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/main-showcase-dark.png" width="94%" alt="Los cinco esquemas oscuros de Vantagraph uno junto a otro dentro de Spotify: VantaBlack, R34 Purple, Crimson, Olive y Spotify Default">

<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/main-showcase-light.png" width="94%" alt="Los seis esquemas claros de Vantagraph uno junto a otro dentro de Spotify: VantaWhite, Glass, Lavender Blush, Teal Green, Rose Vale y Japanese Indigo">

</div>

---

## ✨ Qué te llevas

**Once paletas.** Cinco oscuras, seis claras, cada una afinada para sesiones largas y no para una captura de pantalla. Cambias entre ellas desde dentro de Spotify y el cambio es inmediato.

**Un panel de ajustes, no un archivo de configuración.** Aparece un engranaje en la barra superior y abre una ventana de cinco pestañas: tema, tipografía, disposición, fondo y snippets. Cada control se aplica mientras lo arrastras, y un solo botón lo devuelve todo a su sitio.

**Seis extensiones que puedes tomar o dejar.** Karaoke de letras en imagen sobre imagen, un reproductor de barra de tareas sin bordes que sobrevive a los juegos a pantalla completa, volumen con la rueda del ratón, bucles por pista, 66 iconos dibujados a mano y una consola para desarrollo. Solo el panel de ajustes es obligatorio.

**Más de treinta snippets.** Oculta la actividad de amigos, la franja de anuncios, "Made for You" o el filtro de podcasts. Redondea las imágenes, adelgaza las filas de la biblioteca, oculta la barra lateral por debajo de 1200px.

<div align="center">
<img src="https://raw.githubusercontent.com/Miabeyefendi/Vantagraph/main/design/screenshots/main-showcase-settings.png" width="82%" alt="El panel de ajustes de Vantagraph abierto dentro de Spotify, con el selector de temas y tres muestras de color en cada fila">
</div>

---

## 📦 Instalación

Necesitas [Spotify](https://www.spotify.com/download/) `1.2.86+` y [Spicetify](https://spicetify.app/docs/getting-started) `2.43+`.

Copia la carpeta `Vantagraph` en `…/spicetify/Themes/` y cada `.js` de `Vantagraph/Extensions/` en `…/spicetify/Extensions/`. Después:

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify apply
```

Spotify se reinicia con el tema puesto y un engranaje en la barra superior. Eso es lo mínimo. Para activar el juego de iconos y las extensiones opcionales, o para volver al Spotify de siempre, sigue la [guía de instalación](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md).

---

## 📖 Documentación

| | |
|---|---|
| [**Instalación**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/INSTALL.md) | Todas las rutas de instalación, qué hace cada extensión y cómo desinstalar sin dejar restos |
| [**Los once temas**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/THEMES.md) | Cada paleta con su captura y para qué fue afinada |
| [**Ajustes**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/SETTINGS.md) | Las cinco pestañas, cada control y cada snippet |
| [**Extensiones**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md) | Las seis en detalle, y los créditos sobre los que están construidas |
| [**Guía técnica**](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/guides/TUTORIAL.md) | Cómo funciona por dentro el sistema de color de tres capas |
| [**Cambios**](https://github.com/Miabeyefendi/Vantagraph/blob/main/CHANGELOG.md) | Qué cambió en cada versión |

> ¿Estás leyendo esto dentro de Spotify? Los enlaces de arriba se abren en tu navegador. Todo lo que necesitas para instalar el tema ya está en esta página.

---

## 📜 Licencia y créditos

Vantagraph es **AGPL-3.0**, con los términos de atribución en [NOTICE](https://github.com/Miabeyefendi/Vantagraph/blob/main/NOTICE). Úsalo, cámbialo y distribúyelo, mientras el código siga abierto y la atribución intacta.

Tres de las extensiones son reescrituras sobre trabajo anterior de [Aspecky](https://github.com/Aspecky), khanhas y los mantenedores de [Spicetify](https://github.com/spicetify), y [FO-SS](https://github.com/FO-SS). Qué aportó cada uno, y qué se añadió encima, está detallado en la [guía de extensiones](https://github.com/Miabeyefendi/Vantagraph/blob/main/docs/EXTENSIONS.md#credits).

Spotify no está afiliado a este proyecto ni lo respalda. El tema modifica el cliente de escritorio localmente; lo ejecutas por tu cuenta y riesgo.

<div align="center">
<br/>
<sub>Creado por <b><a href="https://github.com/Miabeyefendi">Miabeyefendi</a></b></sub>
</div>
