# Spotify SVG Icon Catalog - Vantagraph Reference

> Harvested from Spotify Desktop Client via SVG Scanner tool.
> Deduplicated from 2 scan sessions (87 + 59 raw → **76 unique icons**).

---

## 1. TOP BAR (`#global-nav-bar` / `.Root__globalNav` / `.vg-global-nav`)

### Navigation Buttons (`.main-globalNav-historyButtons`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 1 | ← Back Arrow | Go back | 0 0 24 24 | 1 | `.main-globalNav-historyButtons` |
| 2 | → Forward Arrow | Go forward | 0 0 24 24 | 1 | `.main-globalNav-historyButtons` |

### Spicetify NavLinks (`.custom-navlinks-scrollable_container`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 3 | 🛒 Marketplace | Marketplace | (none) | 1 | `.spicetify-sc-contentArea` |
| 4 | ‹ Chevron Left | - | 0 0 16 16 | 1 | `.spicetify-sc-chevronStart` |
| 5 | › Chevron Right | - | 0 0 16 16 | 1 | `.spicetify-sc-chevronEnd` |

### Search Section (`.main-globalNav-searchSection`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 6a | 🏠 Home (outline) | Home | 0 0 24 24 | 1 | `.main-globalNav-searchContainer` |
| 6b | 🏠 Home (filled) | Home | 0 0 24 24 | 1 | same - active state |
| 7 | 🔍 Search | Search | 0 0 24 24 | 1 | `.main-globalNav-searchInputSection` |
| 8 | ✕ Clear Search | Clear search field | 0 0 24 24 | 1 | `.e-10310-form-input-icon__icon--trailing` |
| 9a | 🎵 Browse (outline) | Browse | 0 0 24 24 | 2 | `.main-globalNav-browseButtonWrapper` |
| 9b | 🎵 Browse (filled) | Browse | 0 0 24 24 | 1 | same - active state |

### Right Action Buttons (`.vg-topbar-right` / `.main-topBar-topbarContentRight`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 10 | ⚙️ VG Settings | Vantagraph Settings | 0 0 16 16 | 1 | `.vg-topbar-btn` |
| 11 | 🎵 Lyric Mini | Lyric Miniplayer | 0 0 16 16 | 1 | `.vg-topbar-btn` |
| 12a | 🔔 What's New (outline) | What's New | 0 0 16 16 | 1 | `.main-actionButtons` |
| 12b | 🔔 What's New (filled) | What's New | 0 0 16 16 | 1 | same - active state |
| 13a | 👥 Friend Activity (outline) | Friend Activity | 0 0 16 16 | 1 | `.main-actionButtons` |
| 13b | 👥 Friend Activity (filled) | Friend Activity | 0 0 16 16 | 1 | same - active state |

---

## 2. LEFT SIDEBAR (`.Root__nav-bar` / `.main-yourLibraryX-*`)

### Library Header (`.main-yourLibraryX-headerContent`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 14 | 📚 Library (collapsed) | Open Your Library | 0 0 24 24 | 1 | `.main-yourLibraryX-collapseButton` |
| 15 | 📚→ Library expand | Open Your Library | 0 0 24 24 | 2 | `.main-yourLibraryX-collapseButton` |
| 16 | + Create | Create | 0 0 16 16 | 1 | `.main-yourLibraryX-headerContent` |
| 69 | ◁ Collapse Library | Collapse Your Library | 0 0 16 16 | 2 | `.main-yourLibraryX-collapseButton` |

### Library Content

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 17 | 🎵 Liked Songs pin | Your Library | 0 0 16 16 | 1 | sidebar list subtitle |
| 70 | ▦ Grid View | Custom order, Default grid view | 0 0 16 16 | 1 | `.main-yourLibraryX-libraryFilter` |
| 71 | 🎵+ Create playlist | - | 0 0 24 24 | 1 | `.e-10310-legacy-list-row` |
| 72 | 🌙 Moon/Crescent | - | (none) | 1 | `.e-10310-legacy-list-row` |
| 73 | 📁 Folder | - | 0 0 24 24 | 1 | `.e-10310-legacy-list-row` |
| 74 | 👤 Artist/Podcast | - | 0 0 24 24 | 1 | `.e-10310-legacy-list-row` |

---

## 3. MAIN VIEW (`.Root__main-view`)

### Action Bar (`.main-actionBar-ActionBar`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 33 | ▶ Play (large) | Play {name} | 0 0 24 24 | 1 | `.main-playButton-PlayButton` |
| 34 | ▶ Explore Play | Explore {name} | 0 0 16 16 | 1 | `.main-actionBar-exploreButton` |
| 35 | 🔀 Shuffle (large) | Enable Shuffle | 0 0 24 24 | 2 | `.main-actionBar-ActionBarRow` |
| 36 | + Save to Library | Save to Your Library | 0 0 24 24 | 2 | `.main-actionBar-ActionBarRow` |
| 37 | ⬇ Download | Download | 0 0 24 24 | 2 | `.main-actionBar-ActionBarRow` |
| 38 | ••• More Options | More options for {name} | 0 0 24 24 | 1 | `.main-actionBar-ActionBarRow` |

### Playlist Controls

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 39 | 🔍 Filter | {name} | 0 0 16 16 | 1 | `.x-filterBox-searchIconContainer` |
| 40 | ≡ Sort/List | {name} | 0 0 16 16 | 1 | `.x-sortBox-sortDropdown` |
| 41 | ‹ Carousel Left | {name} | 0 0 16 16 | 1 | `.search-searchCategory-carouselButton` |
| 42 | › Carousel Right | {name} | 0 0 16 16 | 1 | `.search-searchCategory-carouselButton` |

### Track List (`.main-trackList-*`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 43 | ⏱ Duration | Duration | 0 0 16 16 | 2 | `.main-trackList-durationHeader` |
| 44 | ▼ Columns | Change visible columns | 0 0 16 16 | 1 | `.main-trackList-trackListHeader` |
| 45 | ••• Track Options | More options for {track} | 0 0 16 16 | 1 | `.main-trackList-rowSectionEnd` |
| 46 | + Add to Liked | Add to Liked Songs | 0 0 16 16 | 2 | `.main-trackList-rowSectionEnd` |
| 82 | 🎬 Music Video | Music video | 0 0 16 16 | 2 | `.x-music-video` |

### Misc Main View

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 63 | ℹ Info | {playlist name} | 0 0 24 24 | 2 | `.encore-announcement-set` |
| 80 | ✏️ Edit Profile | {username} | 0 0 24 24 | 1 | `.main-editImageButton-icon` |
| 81 | ⚙️ Settings | Go to settings | 0 0 24 24 | 1 | `.main-actionBar-ActionBarRow` (profile) |
| 83 | 👥 Followers | Followers | 0 0 24 24 | 1 | `.main-card-imageContainer` |

---

## 4. PLAYER BAR (`.Root__now-playing-bar` / `.vg-now-playing`)

### Now Playing Left (`.main-nowPlayingBar-left` / `.vg-np-left`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 18 | 🎵 Cover Placeholder | Now playing view | 0 0 24 24 | 1 | `.cover-art-icon` |
| 19 | ✕ Hide in Album | Hide in this album | 0 0 16 16 | 1 | `.main-nowPlayingWidget-actionButtonWrapper` |
| 20 | ✓ Added to Playlist | Add to playlist | 0 0 16 16 | 1 | `.main-nowPlayingWidget-actionButtonWrapper` |

### Player Controls (`.player-controls__buttons` / `.vg-player-controls`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 21 | 🔀 Shuffle | Shuffle | 0 0 16 16 | 2 | `.player-controls__left` |
| 22 | ⏮ Previous | Previous | 0 0 16 16 | 1 | `.player-controls__left` |
| 23 | ⏸ Pause | Pause | 0 0 16 16 | 1 | `.vg-control-playpause` |
| 24 | ⏭ Next | Next | 0 0 16 16 | 1 | `.player-controls__right` |
| 25 | 🔁 Repeat | Disable repeat | 0 0 16 16 | 1 | `.player-controls__right` |

### Extra Controls Right (`.main-nowPlayingBar-extraControls` / `.vg-np-extra-controls`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 26 | 📝 Lyrics | Lyrics | 0 0 16 16 | 1 | `.vg-np-extra-controls` |
| 27 | 📋 Queue | Queue | 0 0 16 16 | 1 | `.vg-np-extra-controls` |
| 28 | 📱 Connect | Connect to a device | 0 0 16 16 | 2 | `.vg-np-extra-controls` |
| 29 | 🔊 Volume | Volume high | 0 0 16 16 | 2 | `.vg-volume-bar` |
| 30 | 🎚 VG Vol Preset | Now playing bar | 0 0 16 16 | 0 | `.vg-vol-preset-trigger` (custom) |
| 31 | 🖼 Miniplayer | Open Miniplayer | 0 0 16 16 | 2 | `.vg-np-extra-controls` |
| 32 | ⛶ Fullscreen | Enter Full screen | 0 0 16 16 | 1 | `.vg-np-extra-controls` |

---

## 5. RIGHT SIDEBAR (`.Root__right-sidebar` / `.vg-right`)

### Now Playing View (`.main-nowPlayingView-*`)

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 47 | ◁ Hide NP View | Hide Now Playing view | 0 0 16 16 | 2 | `.main-nowPlayingView-headerWrapper` |
| 48 | ↗ Expand NP View | Expand Now Playing view | 0 0 16 16 | 1 | `.main-nowPlayingView-headerButtonWrapper` |
| 49 | 📋 Copy Link | Copy link to Song | 0 0 24 24 | 2 | `.main-nowPlayingView-contextItemInfo` |
| 50 | + Add to Playlist | Add to playlist | 0 0 24 24 | 1 | `.main-nowPlayingWidget-plusButtonWrapper` |

### Friend Activity Panel

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 66 | 📍 Location dot | Friend Activity | 0 0 16 16 | 2 | `.qKkBPOLIT60aoLCL` (friend item) |
| 67 | 🎵 Music note | Friend Activity | 0 0 16 16 | 1 | `.qKkBPOLIT60aoLCL` (friend item) |
| 68 | ❤️ Heart/Like | Friend Activity | 0 0 16 16 | 1 | `.qKkBPOLIT60aoLCL` (friend item) |

### Misc Right Panel

| # | Icon | aria-ctx | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 50b | ‹ Show NP View | Show Now Playing view | 0 0 16 16 | 1 | collapsed state toggle |

---

## 6. CONTEXT MENU (`#context-menu` / `.main-contextMenu-menu`)

| # | Icon | Function | viewBox | Paths | Key Selector |
|---|------|----------|---------|-------|-------------|
| 51 | ≡ Add to Queue | queue action | 0 0 16 16 | 1 | `.main-contextMenu-menuItemButton` |
| 52 | 🔄 Go to Radio | radio action | 0 0 16 16 | 1 | `.main-contextMenu-menuItemButton` |
| 53 | ⬡ Song Credits | credits | 0 0 16 16 | 2 | `.main-contextMenu-menuItemButton` |
| 54 | ↗ External Link | open external | 0 0 16 16 | 2 | `.main-contextMenu-menuItemIconWrapper` |
| 55 | ⬇ Download | download | 0 0 16 16 | 2 | `.main-contextMenu-menuItemButton` |
| 56 | ⊗ Hide/Remove | block/hide | 0 0 16 16 | 2 | `.main-contextMenu-menuItemButton` |
| 57 | 📁 Move to Folder | folder action | 0 0 16 16 | 1 | `.main-contextMenu-menuItemButton` |
| 58 | ▲ Submenu Arrow | submenu indicator | 0 0 16 16 | 1 | `.main-contextMenu-menuItemIconWrapper` |
| 59 | 📋 Share | share action | 0 0 16 16 | 2 | `.main-contextMenu-menuItemButton` |
| 60 | 📋 Copy | copy submenu | 0 0 16 16 | 2 | submenu `.main-contextMenu-menu` |
| 61 | 🔲 Embed | embed submenu | 0 0 16 16 | 2 | submenu `.main-contextMenu-menu` |
| 64 | 📢 Audio Quality | playback quality | 0 0 16 16 | 2 | `.PFBppJUhKQcz1UV4` |
| 77 | ✕ Dismiss | footer dismiss | 0 0 16 16 | 2 | footer element |
| 78 | + Add to Playlist | context add | (none) | 2 | `.main-contextMenu-menuItemButton` |
| 79 | ▦ QR/Grid | scan code | (none) | 1 | `.main-contextMenu-menuItemButton` |
| 84 | 🗑 Delete | delete action | 0 0 16 16 | 2 | `.main-contextMenu-menuItemButton` |
| 85 | 🎵 Song/Playlist | music item | 0 0 16 16 | 1 | `.main-contextMenu-menuItemButton` |
| 86 | 👤 Artist | artist menu | 0 0 16 16 | 1 | `.main-contextMenu-menuItemButton` |
| 87 | 🚫 Block | block action | 0 0 16 16 | 1 | `.main-contextMenu-menuItemButton` |

---

## Summary Statistics

| Region | Count | Notes |
|--------|-------|-------|
| **Top Bar** | 17 | Includes outline/filled state variants |
| **Left Sidebar** | 10 | Library controls + list item icons |
| **Main View** | 17 | Action bar + track list + misc |
| **Player Bar** | 15 | Controls + extra controls |
| **Right Sidebar** | 7 | Now Playing View + Friend Activity |
| **Context Menu** | 20 | All right-click menu icons |
| **TOTAL** | **76 unique** | After dedup from 87+59 raw |
