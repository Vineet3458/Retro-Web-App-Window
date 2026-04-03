# 🪟 PixelOS 98 — Retro Desktop OS

> A pixel-perfect Windows 98-inspired desktop environment built entirely with **Vite + React + Tailwind CSS**.  
> BTech Final Year Project — 2025

---

## 📸 Features

| App | Description |
|---|---|
| 🖥️ Window Manager | Drag, resize, minimize, maximize, multi-window z-index stacking |
| 🎨 MS Paint | Canvas drawing — pencil, brush, eraser, fill bucket, shapes, 24-color palette |
| ⬛ Terminal | Interactive shell with 15+ commands (`neofetch`, `ls`, `matrix`, `skills`…) |
| 💣 Minesweeper | Classic 9×9 game with timer, flag counter, flood-fill reveal |
| 📁 File Explorer | Tree sidebar + icon/list view toggle, hierarchical virtual filesystem |
| ▶️ Media Player | Playlist, animated equalizer visualizer, play/pause/skip/volume/shuffle/repeat |
| 🔢 Calculator | Full scientific calculator with memory buttons and history panel |
| 📝 Notepad | Text editor with word count, char count, word-wrap toggle |
| ⚙️ Settings | Wallpaper color picker (live), display/sound settings |
| 👤 Portfolio | Tabbed developer portfolio — Home, Projects, Skills, Contact |
| 🖱️ Desktop | Clickable icons, right-click context menu, animated boot screen |
| 📌 Taskbar | Start menu, window buttons, live clock, system tray |

---

## 🛠️ Tech Stack

- **React 18** — UI components and state management
- **Vite 5** — Lightning-fast dev server and build tool
- **Tailwind CSS 3** — Utility-first styling
- **Press Start 2P** — Pixel font (Google Fonts)
- **VT323** — Monospace terminal font (Google Fonts)
- **HTML5 Canvas** — MS Paint drawing engine

---

## 📁 Folder Structure

```
pixel-os-98/
├── index.html                  # Vite HTML entry point
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind theme (pixel colors, fonts, shadows)
├── postcss.config.js           # PostCSS for Tailwind
│
└── src/
    ├── main.jsx                # ReactDOM.createRoot() entry
    ├── App.jsx                 # OS shell: boot screen, window manager, desktop
    ├── index.css               # Global pixel styles (@layer base & components)
    │
    ├── hooks/
    │   └── useWindowManager.js # Custom hook: open/close/drag/resize/z-index
    │
    ├── components/
    │   ├── Window.jsx          # Draggable, resizable window chrome
    │   ├── Taskbar.jsx         # Bottom bar: Start menu, window buttons, clock
    │   └── Desktop.jsx         # Desktop icons grid + wallpaper
    │
    └── apps/
        ├── About.jsx           # Animated boot/about screen
        ├── Notepad.jsx         # Text editor
        ├── Paint.jsx           # Canvas drawing app
        ├── Terminal.jsx        # Interactive terminal emulator
        ├── Minesweeper.jsx     # Classic minesweeper game
        ├── MediaPlayer.jsx     # Music player with visualizer
        ├── FileExplorer.jsx    # File system browser
        ├── Calculator.jsx      # Scientific calculator
        ├── Settings.jsx        # OS display & sound settings
        └── Portfolio.jsx       # Developer portfolio showcase
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build       # Output to /dist
npm run preview     # Preview production build
```

---

## 🎮 How to Use

1. **Boot Screen** loads automatically on start
2. **Double-click** desktop icons to open apps
3. **Drag** window title bars to move windows
4. **Drag** bottom-right corner to resize windows  
5. **Right-click** desktop for context menu
6. **Taskbar** shows all open windows — click to focus/minimize
7. **Start Menu** → click 🪟 Start to see all apps

### Terminal Commands
```
help       about      neofetch   ls         pwd
whoami     date       echo       cat        clear
skills     projects   contact    joke       matrix
```

---

## 🏗️ Architecture Notes

### Window Manager (`useWindowManager.js`)
Custom React hook that manages all window state:
- `open(appId)` — Opens or focuses an app window
- `close(id)` — Removes window from state
- `focus(id)` — Brings window to front (bumps z-index)
- `minimize/maximize(id)` — Toggle window states
- `move(id, x, y)` — Update position on drag
- `resize(id, w, h)` — Update size on resize

### Window Component (`Window.jsx`)
Handles all pointer event logic:
- `onMouseDown` on title bar → starts drag (tracks delta from initial click)
- `onMouseDown` on resize handle → starts resize
- Both attach `mousemove`/`mouseup` to `window` to capture outside-element movement

### App Routing (`App.jsx`)
`renderApp(appId)` is a simple switch statement mapping app IDs to JSX.  
Each app is a fully self-contained React component that fills its window's content area.

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  }
}
```

Zero runtime dependencies beyond React — no UI libraries, no animation frameworks.

---

## 👨‍💻 Author

**BTech Final Year Project — Computer Science Engineering, 2025**

Built with ❤️ and lots of nostalgia for Windows 98.

---

## 📄 License

MIT License — free to use, modify, and distribute.
