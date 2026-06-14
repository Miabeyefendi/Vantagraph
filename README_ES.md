<div align="center">

<img src="./icons/vantagraph-theme.svg" width="120" alt="Vantagraph"/>

# Vantagraph

**Un tema Spicetify moderno y modular para Spotify.**
11 paletas ajustadas a mano, panel de ajustes integrado, set de iconos propio, karaoke con letras en ventana flotante (PiP), reproductor en barra de tareas, volumen con rueda del ratón y herramienta de bucle por pista, todo en un único tema.

[![Licencia: AGPL v3](https://img.shields.io/badge/Licencia-AGPL_v3-A78BFA?style=for-the-badge&logo=gnu&logoColor=white)](./LICENSE)
[![Spicetify](https://img.shields.io/badge/Spicetify-2.43%2B-1ED760?style=for-the-badge&logo=spotify&logoColor=white)](https://spicetify.app/)
[![Spotify](https://img.shields.io/badge/Spotify-1.2.86%2B-1DB954?style=for-the-badge&logo=spotify&logoColor=white)](https://www.spotify.com/)
[![Estado](https://img.shields.io/badge/estado-activo-22C55E?style=for-the-badge)](#)
[![Autor](https://img.shields.io/badge/por-Miabeyefendi-0EA5E9?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Miabeyefendi)

[**Instalación**](#-instalación) · [**Temas**](#-los-once-temas) · [**Extensiones**](#-extensiones) · [**Ajustes**](#%EF%B8%8F-tour-de-ajustes) · [**Créditos**](#-créditos--inspiración) · **·** [English](./README.md) · [Türkçe](./README_TR.md)

</div>

---

<div align="center">

### Temas oscuros de un vistazo

<img src="./screenshots/1.MainShowcaseForDark.png" width="92%" alt="Temas oscuros de Vantagraph"/>

### Temas claros de un vistazo

<img src="./screenshots/2.MainShowcaseForWhite.png" width="92%" alt="Temas claros de Vantagraph"/>

</div>

---

## ✨ Lo más destacado

- **11 paletas cuidadosamente equilibradas** - 5 oscuras + 6 claras, cada una afinada para sesiones largas de escucha.
- **Panel de ajustes integrado** - modal de 5 pestañas dentro de Spotify (Tema, Fuente, Diseño, Fondo, Snippets).
- **Set de iconos Vantagraph** - 66 SVG dibujados a mano que reemplazan los iconos Encore de Spotify en la barra superior, lateral, reproductor y menús contextuales.
- **Vantagraph Lyric Miniplayer** - ventana Picture-in-Picture con karaoke sincronizado palabra a palabra, traducciones, vinilo y presets de animación.
- **Vantagraph Taskbar Player** - barra flotante sin bordes y siempre visible vía `documentPictureInPicture`. Te permite controlar la reproducción mientras otra app está en pantalla completa.
- **Volume+** - rueda del ratón sobre la barra de volumen, clic central para silenciar, tooltip de porcentaje, presets rápidos, indicador visual de mute.
- **LoopyLoop** - clic derecho en la barra de progreso para fijar inicio/fin; los bucles persisten por pista en localStorage.
- **30+ snippets** - oculta Friend Activity, banner de anuncios, "Made for You", "Top Mixes", filtro de podcasts, etc. Más imágenes redondeadas, scrollbar moderna, filas finas en biblioteca, barra lateral con auto-ocultar y una pila de herramientas de desarrollo (rejilla de diseño, resaltador de elementos, visualizador de espaciado, monitor de variables CSS, registrador de mutaciones DOM).
- **Fondos personalizados** - cualquier URL de imagen, o usa la portada del álbum actual, con sliders en vivo de desenfoque / brillo / contraste / saturación.
- **Fuente y acento personalizados** - cualquier Google Font (o local), cualquier color de acento HEX.
- **Reset en un clic** - borra cada clave de localStorage, estilo inyectado, clase del body y variable inline.

---

## 🎨 Los once temas

### Oscuros

<table>
<tr>
  <td align="center" width="50%">
    <img src="./screenshots/Theme-Vantablack.png" width="100%" alt="VantaBlack"/><br/>
    <sub><b>VantaBlack</b> · neutros de negro profundo, texto blanco roto</sub>
  </td>
  <td align="center" width="50%">
    <img src="./screenshots/Theme-R34-Purple.png" width="100%" alt="R34 Purple"/><br/>
    <sub><b>R34 Purple</b> · índigo de medianoche, acentos dorados, azul regio</sub>
  </td>
</tr>
<tr>
  <td align="center">
    <img src="./screenshots/Theme-Crimson.png" width="100%" alt="Crimson"/><br/>
    <sub><b>Crimson</b> · superficie vino profundo, dorado cálido</sub>
  </td>
  <td align="center">
    <img src="./screenshots/Theme-Olive.png" width="100%" alt="Olive"/><br/>
    <sub><b>Olive</b> · musgo de bosque, acento lima, texto suave</sub>
  </td>
</tr>
</table>

> También está la paleta **Spotify Default**, incluida para comparar con el look original.

### Claros

<table>
<tr>
  <td align="center" width="50%">
    <img src="./screenshots/LightTheme-Vantawhite.png" width="100%" alt="VantaWhite"/><br/>
    <sub><b>VantaWhite</b> · superficies blanco papel, texto casi negro</sub>
  </td>
  <td align="center" width="50%">
    <img src="./screenshots/LightTheme-Glass.png" width="100%" alt="Glass"/><br/>
    <sub><b>Glass</b> · azul/teal pálido, sensación de cristal esmerilado</sub>
  </td>
</tr>
<tr>
  <td align="center">
    <img src="./screenshots/LightTheme-Lavender.png" width="100%" alt="Lavender Blush"/><br/>
    <sub><b>Lavender Blush</b> · crema + lavanda, acento ámbar cálido</sub>
  </td>
  <td align="center">
    <img src="./screenshots/LightTheme-TealGreen.png" width="100%" alt="Teal Green"/><br/>
    <sub><b>Teal Green</b> · teal suave, acento rojo rosa</sub>
  </td>
</tr>
</table>

> Dos temas claros más vienen en `color.ini` y aparecen en el selector: **Rose Vale** y **Japanese Indigo**.

---

## 📦 Instalación

### Requisitos previos

- [Spotify Desktop](https://www.spotify.com/download/) (probado en `1.2.86+`)
- [Spicetify CLI](https://spicetify.app/docs/getting-started) (probado en `2.43+`)

### 1. Copia los archivos a las carpetas de Spicetify

Spicetify guarda los temas y las extensiones en **dos carpetas separadas** dentro de AppData. En Windows las rutas exactas son:

| Qué | A dónde va |
|---|---|
| La carpeta **`Vantagraph`** (con `color.ini`, `user.css`, `theme.js`, `icons/`, `screenshots/`) | `C:\Users\<TÚ>\AppData\Roaming\spicetify\Themes\Vantagraph\` |
| Cada archivo `.js` dentro de **`Vantagraph/Extensions/`** | `C:\Users\<TÚ>\AppData\Roaming\spicetify\Extensions\` |

Puedes abrir cualquiera de las dos rápidamente con `spicetify config-dir`.

La estructura final debe verse así:

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
   ├─ vantagraph-settings.js          ← obligatoria
   ├─ vantagraph-icons.js             ← preferida
   ├─ vantagraph-lyric-miniplayer.js  ← opcional (recomendada)
   ├─ vantagraph-loopyloop.js         ← opcional (recomendada)
   ├─ vantagraph-taskbarplayer.js     ← opcional (recomendada)
   ├─ vantagraph-volume-plus.js       ← opcional (recomendada)
   └─ vantagraph-debug.js             ← solo desarrolladores
```

### 2. Elige qué activar

Las extensiones se dividen en cuatro niveles. Combínalas como quieras - todo es opt-in excepto `vantagraph-settings.js`.

| Nivel | Extensión | Por qué |
|---|---|---|
| **Obligatoria** | `vantagraph-settings.js` | Sin esto, el panel de Ajustes integrado (icono de engranaje) nunca aparece. El tema sigue funcionando, pero pierdes toda la configuración en vivo. |
| **Preferida** | `vantagraph-icons.js` | Reemplaza 66 SVG de Encore por el set de iconos Vantagraph. Muy recomendada para la identidad visual completa, pero el tema se ve genial aunque la omitas. |
| **Opcional (recomendada)** | `vantagraph-lyric-miniplayer.js`<br/>`vantagraph-loopyloop.js`<br/>`vantagraph-taskbarplayer.js`<br/>`vantagraph-volume-plus.js` | Complementos de funciones. Activa todas las que quieras. Ninguna es necesaria para el tema. |
| **Solo desarrolladores** | `vantagraph-debug.js` | Una herramienta de consola DevTools que imprime la cadena de sobrescritura de color en 3 capas. No la actives como usuario normal. |

### 3. Activa Vantagraph

**A) Setup completo (recomendado para empezar):** el bloque exacto de `terminalcodes.txt`, activa el tema, el panel de ajustes, los iconos y las cuatro extensiones opcionales:

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

> `vantagraph-taskbarplayer.js` viene **incluida pero fuera del bloque por defecto**, porque abre una ventana Picture-in-Picture aparte y no es lo que todo el mundo quiere. Añádela con `spicetify config extensions vantagraph-taskbarplayer.js` y vuelve a aplicar.

**B) Setup mínimo:** solo tema + panel de ajustes.

```bash
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme vantagraph
spicetify config extensions vantagraph-settings.js
spicetify apply
```

Tras aplicar, Spotify se reinicia con Vantagraph activo. Aparece un **icono de engranaje** en la esquina superior derecha de la barra; haz clic para abrir el panel de ajustes.

### Volver a Spotify estándar

```bash
spicetify config inject_css 0 replace_colors 0 overwrite_assets 0 inject_theme_js 0
spicetify config current_theme marketplace
spicetify config extensions vantagraph-settings.js-
spicetify config extensions vantagraph-volume-plus.js-
spicetify config extensions vantagraph-lyric-miniplayer.js-
spicetify config extensions vantagraph-loopyloop.js-
spicetify apply
```

El `-` al final del nombre de cada extensión es la sintaxis de "desinstalar" de Spicetify.

---

## ⚙️ Tour de ajustes

El panel de ajustes de Vantagraph se abre desde el **icono de engranaje** en la barra superior y funciona totalmente dentro de la app. Es un modal de 5 pestañas: Tema, Fuente, Diseño, Fondo, Snippets.

<div align="center">
<img src="./screenshots/3.MainShowcaseSettings.png" width="80%" alt="Panel de ajustes"/>
</div>

<table>
<tr>
  <td align="center" width="33%">
    <img src="./screenshots/Settings-ThemeSelect.png" width="100%" alt="Pestaña de selección de tema"/><br/>
    <sub><b>🎨 Tema</b><br/>Elige entre grupos oscuro / claro. Cada fila muestra una previsualización de 3 muestras (panel · ventana · acento). Debajo de la lista: interruptor de <b>Iconos Personalizados</b> y selector de <b>Color de Acento Personalizado</b> (aplicar / restablecer).</sub>
  </td>
  <td align="center" width="33%">
    <img src="./screenshots/Settings-Font.png" width="100%" alt="Pestaña de fuente"/><br/>
    <sub><b>✏️ Fuente</b><br/>Elige un preset (Inter, JetBrains Mono, etc.) o escribe cualquier familia de Google Fonts y Vantagraph genera la URL. El slider de <b>Tamaño</b> va de 10-20px y se aplica a cada elemento tipográfico Encore.</sub>
  </td>
  <td align="center" width="33%">
    <img src="./screenshots/Settings-Layout.png" width="100%" alt="Pestaña de diseño"/><br/>
    <sub><b>📐 Diseño</b><br/>Tres sliders + un selector de densidad. <b>Tamaño de Icono</b> 12-34px, <b>Densidad</b> compact / default / comfortable, <b>Esquinas</b> radio de borde 0-24px. Cada slider tiene un botón <b>DEF</b> que restaura los valores nativos de Spotify.</sub>
  </td>
</tr>
<tr>
  <td align="center">
    <img src="./screenshots/Settings-Background.png" width="100%" alt="Pestaña de fondo"/><br/>
    <sub><b>🖼️ Fondo</b><br/>Pega cualquier URL de imagen, o activa <b>Portada del álbum como BG</b> para usar la portada que suena. Sliders de filtro: desenfoque, brillo, contraste, saturación. Consejo: selecciona un tema primero y luego activa el fondo.</sub>
  </td>
  <td align="center">
    <img src="./screenshots/Settings-SnippetsPT1.png" width="100%" alt="Snippets parte 1"/><br/>
    <sub><b>✂️ Snippets · Visual y Ocultar botones</b><br/>Imágenes redondeadas, scrollbar moderna, parar animación de vinilo. Y luego una larga lista de interruptores para barra del reproductor / barra superior: Friend Activity, What's New, Pantalla completa, Letras, Mini Player, Cola, Aleatorio, Repetir, Conectar dispositivo, Barra de volumen, Widget Now-Playing.</sub>
  </td>
  <td align="center">
    <img src="./screenshots/Settings-SnippetsPT2.png" width="100%" alt="Snippets parte 2"/><br/>
    <sub><b>✂️ Snippets · Ocultar elementos, Diseño y Dev Tools</b><br/>Oculta secciones del Home (Made for You, Top Mixes, Jump Back In, New Releases, etc.), banner de anuncios, filtro de podcasts. Diseño: filas finas de biblioteca, auto-ocultar sidebar bajo 1200px. Dev Tools: rejilla de diseño, resaltador de elementos, visualizador de espaciado, monitor de variables CSS, registrador de mutaciones DOM, Encore audit.</sub>
  </td>
</tr>
</table>

Al pie del panel: un botón rojo **↻ Restablecer valores predeterminados** que borra cada clave `vantagraph:*` de localStorage, elimina las etiquetas `<style>` y `<link>` inyectadas, limpia las variables inline `--spice-*` / `--vg-*` de `:root`, quita clases del body y vuelve a aplicar el tema Spotify Default.

---

## 🧩 Extensiones

### Vantagraph Taskbar Player

<div align="center">
<img src="./screenshots/4.MainShowcaseTaskBarPlays.png" width="80%" alt="Previsualización del Taskbar Player"/>
</div>

Un mini reproductor sin bordes y siempre visible, construido sobre la API experimental `documentPictureInPicture`. Sobrevive a los borrados de navegación SPA de Spotify mediante un `MutationObserver` sobre el `<html>` del PiP más un centinela rAF. Incluye letras en vivo, seek, volumen, aleatorio / repetir / me gusta, y adapta su ancho cuando las letras se desactivan. Opcional - actívalo aparte.

### Otras extensiones incluidas

| Extensión | Qué hace |
|---|---|
| `vantagraph-settings.js` | El modal de ajustes integrado (icono de engranaje). Necesario para que aparezca el panel. |
| `vantagraph-icons.js` | Reemplaza 66 SVG de Encore por el set de iconos Vantagraph. Se puede activar/desactivar desde la pestaña Tema. |
| `vantagraph-volume-plus.js` | Rueda del ratón sobre la barra de volumen, clic central para silenciar, tooltip de porcentaje, overlay de presets rápidos (25/50/75/100%), preset activo con brillo dorado, barra ancha de 250px. Solo API pública (sin acceso a `_volume` privado). |
| `vantagraph-lyric-miniplayer.js` | Ventana PiP de letras con karaoke sincronizado palabra a palabra (loop rAF), 8 presets de animación, traducciones, vinilo, selector de alineación, control de tamaño de fuente, "Me gusta" en la cabecera, popup de ajustes separado. |
| `vantagraph-loopyloop.js` | Clic derecho en la barra de progreso para fijar inicio / fin del bucle. Los bucles persisten por URI de pista en localStorage. Empuje basado en proximidad al hacer scroll para ajuste fino. |
| `vantagraph-taskbarplayer.js` | Reproductor PiP flotante, sin bordes y siempre visible (ver arriba). |
| `vantagraph-debug.js` | Herramienta de consola que imprime, para cualquier variable CSS, la cadena de sobrescritura en 3 capas: predeterminado de Spotify Encore → Spicetify `--spice-*` → sobrescritura inline de Vantagraph. Pégalo en DevTools o cárgalo como extensión. |

---

## 🙏 Créditos & Inspiración

Tres de las extensiones incluidas son reescrituras completas construidas sobre trabajo previo brillante. Muchas gracias a sus autores:

### Inspiración para Volume+

- **Autor:** [Aspecky](https://github.com/Aspecky)
- **Repo original:** <https://github.com/Aspecky/spicetify-extensions/tree/main/volume-plus>
- **Concepto original tomado:** volumen con rueda del ratón + tooltip.
- **Añadidos de Vantagraph:** reescrita desde cero con clic central para silenciar, overlay de presets rápidos (con indicador activo de brillo dorado y restauración del "volumen preferido" con doble clic), ancho de barra forzado a 250px, etiqueta de fallback Tippy, integración del icono Vantagraph, selectores `data-testid` modernos, restauración del volumen al inicio, pista de clic central en el primer uso, solo API pública (sin acceso a `_events` / `_volume`).

### Inspiración para Loopy Loop

- **Autor original:** khanhas y los mantenedores de [Spicetify](https://github.com/spicetify)
- **Repo original:** <https://github.com/spicetify/cli/tree/main/Extensions>
- **Concepto original tomado:** clic derecho en la barra de progreso para fijar inicio / fin del bucle.
- **Añadidos de Vantagraph:** selectores modernizados que usan el sistema de mapeo de clases de Vantagraph, `createElement` nativo en lugar de la API obsoleta `_HTMLContextMenuItem`, colores conscientes del tema (`--spice-accent`, `--spice-player`, `--spice-highlight`), persistencia de bucle por canción en localStorage por URI de pista, empuje basado en proximidad al hacer scroll.

### Inspiración para Lyric Miniplayer

- **Autor original:** FO-SS
- **Repo original:** <https://github.com/FO-SS/Spictify-Lyric-Miniplayer>
- **Concepto original tomado:** ventana flotante Picture-in-Picture de letras.
- **Añadidos de Vantagraph:** theming en vivo con `--spice-*`, loop de render rAF, integración con `VantagraphData`, diseño tipo Spotify, ventana popup de ajustes separada, 8 presets de animación, traducciones, vinilo, selector de alineación, control de tamaño de fuente, brillo de karaoke, repetir / me gusta / volumen inline.

La dirección visual del README está inspirada en los estilos de showcase de [Catppuccin](https://github.com/catppuccin), [Tokyo Night](https://github.com/folke/tokyonight.nvim), [Dracula](https://draculatheme.com/), [Nord](https://www.nordtheme.com/) y [Gruvbox](https://github.com/morhetz/gruvbox). Spotify, el logotipo de Spotify, "Spicetify" y todos los nombres de proyectos de terceros mencionados aquí pertenecen a sus respectivos propietarios; su uso es nominativo y no implica afiliación ni respaldo.

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor lee primero [CONTRIBUTING.md](./CONTRIBUTING.md) y [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Al contribuir aceptas licenciar tu trabajo bajo AGPL-3.0.

## 🛡️ Seguridad

¿Encontraste una vulnerabilidad? No abras un issue público. Sigue el proceso privado en [SECURITY.md](./SECURITY.md).

## 📄 Licencia

Vantagraph está licenciado bajo la **GNU Affero General Public License v3.0 (AGPL-3.0)**, junto con los términos suplementarios del archivo [LICENSE](./LICENSE). En resumen:

- Puedes usar, estudiar, modificar, redistribuir e incluso monetizar este trabajo de forma gratuita **mientras** mantengas el código fuente completo disponible bajo AGPL-3.0 (incluido el uso alojado / SaaS / en red - AGPL §13) y preserves la atribución del autor a continuación.
- Para uso de código cerrado, propietario o no-AGPL, se requiere una **licencia comercial escrita separada** (que puede incluir regalías / participación en ingresos). Véase [LICENSE](./LICENSE) §8.

### Atribución obligatoria (AGPL §7(b))

La siguiente atribución debe preservarse, visible y sin modificar, en cada copia, fork o despliegue:

> **Miabeyefendi (Mustafa Ihsan Albayrak)** - <https://github.com/Miabeyefendi>

Véase [NOTICE](./NOTICE) para la declaración completa.

## ⚠️ Aviso legal

Este software se proporciona "tal cual", sin garantía de ningún tipo. Lo ejecutas enteramente bajo tu propio riesgo y eres el único responsable de tu uso, incluido el cumplimiento de los Términos de Servicio de cualquier plataforma de terceros con la que interactúe (especialmente Spotify). Spotify no está afiliado a este proyecto ni lo respalda; su nombre y marcas pertenecen a Spotify AB. El autor no acepta responsabilidad por bloqueos de cuenta, pérdida de datos ni ningún otro daño, hasta donde lo permita la ley aplicable. Los términos completos están en el archivo [LICENSE](./LICENSE).

## 📬 Contacto

- **GitHub:** [@Miabeyefendi](https://github.com/Miabeyefendi)
- **Licenciamiento comercial:** contáctame a través de mi perfil de GitHub.

---

<div align="center">
<sub>Hecho con ☕ y demasiadas declaraciones <code>!important</code> por <a href="https://github.com/Miabeyefendi">Miabeyefendi</a></sub>
</div>
