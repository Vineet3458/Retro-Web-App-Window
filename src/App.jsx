// App.jsx
// The OS shell — renders desktop, windows, taskbar, and boot screen
import React, { useState, useEffect, useCallback } from 'react'
import { useWindowManager, APPS } from './hooks/useWindowManager'
import Window from './components/Window'
import Taskbar from './components/Taskbar'
import Desktop from './components/Desktop'

// Apps
import About from './apps/About'
import Notepad from './apps/Notepad'
import Paint from './apps/Paint'
import Terminal from './apps/Terminal'
import Minesweeper from './apps/Minesweeper'
import MediaPlayer from './apps/MediaPlayer'
import FileExplorer from './apps/FileExplorer'
import Calculator from './apps/Calculator'
import Settings from './apps/Settings'
import Portfolio from './apps/Portfolio'

const APP_ICONS = {
  [APPS.ABOUT]: 'ℹ️',
  [APPS.NOTEPAD]: '📝',
  [APPS.PAINT]: '🎨',
  [APPS.TERMINAL]: '⬛',
  [APPS.MINESWEEPER]: '💣',
  [APPS.MEDIA_PLAYER]: '▶️',
  [APPS.FILE_EXPLORER]: '📁',
  [APPS.CALCULATOR]: '🔢',
  [APPS.SETTINGS]: '⚙️',
  [APPS.PORTFOLIO]: '👤',
}

function renderApp(appId, windowDims, onWallpaperChange) {
  switch (appId) {
    case APPS.ABOUT:        return <About />
    case APPS.NOTEPAD:      return <Notepad />
    case APPS.PAINT:        return <Paint width={windowDims.width} height={windowDims.height} />
    case APPS.TERMINAL:     return <Terminal />
    case APPS.MINESWEEPER:  return <Minesweeper />
    case APPS.MEDIA_PLAYER: return <MediaPlayer />
    case APPS.FILE_EXPLORER:return <FileExplorer />
    case APPS.CALCULATOR:   return <Calculator />
    case APPS.SETTINGS:     return <Settings onWallpaperChange={onWallpaperChange} />
    case APPS.PORTFOLIO:    return <Portfolio />
    default:                return <div className="p-4">Unknown app</div>
  }
}

// ── Boot Screen ─────────────────────────────────────────────────────────────
function BootScreen({ onDone }) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')

  const BOOT_STEPS = [
    'BIOS v2.98 — PixelCorp',
    'Detecting hardware...',
    'Memory check: 640 KB OK',
    'Loading PixelOS 98...',
    'Initializing window manager...',
    'Starting desktop...',
    'Welcome to PixelOS 98!',
  ]

  useEffect(() => {
    let stepIdx = 0
    const stepTimer = setInterval(() => {
      stepIdx++
      setStep(stepIdx)
      if (stepIdx >= BOOT_STEPS.length - 1) {
        clearInterval(stepTimer)
        setTimeout(onDone, 800)
      }
    }, 400)

    const progTimer = setInterval(() => {
      setProgress(p => Math.min(p + 3, 100))
    }, 60)

    const dotsTimer = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)

    return () => {
      clearInterval(stepTimer)
      clearInterval(progTimer)
      clearInterval(dotsTimer)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: '#000000', zIndex: 99999 }}
    >
      {/* CRT scanlines */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6" style={{ width: 480 }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <div style={{ fontSize: 56, marginBottom: 8 }}>🪟</div>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 22, color: '#00aaff' }}>
            PixelOS 98
          </div>
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, color: '#4488aa', marginTop: 6 }}>
            BTech Final Year Project
          </div>
        </div>

        {/* Boot log */}
        <div
          style={{
            width: '100%',
            background: '#000',
            border: '2px solid #004400',
            padding: 12,
            height: 140,
            overflowY: 'auto',
          }}
        >
          {BOOT_STEPS.slice(0, step + 1).map((s, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: 18,
                color: i === step ? '#00ff00' : '#006600',
                lineHeight: 1.5,
              }}
            >
              {'>'} {s}{i === step ? dots : ' OK'}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              height: 20,
              background: '#001a00',
              border: '2px solid #004400',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'repeating-linear-gradient(90deg, #003300, #003300 8px, #00aa00 8px, #00aa00 16px)',
                transition: 'width 0.1s',
                boxShadow: '0 0 8px #00ff00',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "'Press Start 2P'",
              fontSize: 7,
              color: '#006600',
              textAlign: 'right',
              marginTop: 4,
            }}
          >
            {progress}%
          </div>
        </div>

        <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: '#333', textAlign: 'center' }}>
          © 1998–2025 PixelCorp. All rights reserved.
        </div>
      </div>
    </div>
  )
}

// ── Right-click context menu ─────────────────────────────────────────────────
function ContextMenu({ x, y, onClose, onOpen }) {
  const items = [
    { label: 'Refresh Desktop', icon: '🔄', action: onClose },
    { label: 'New Folder', icon: '📁', action: onClose },
    { divider: true },
    { label: 'Open Terminal', icon: '⬛', action: () => { onOpen(APPS.TERMINAL); onClose() } },
    { label: 'Open Notepad', icon: '📝', action: () => { onOpen(APPS.NOTEPAD); onClose() } },
    { divider: true },
    { label: 'Display Settings', icon: '⚙️', action: () => { onOpen(APPS.SETTINGS); onClose() } },
  ]

  return (
    <div
      className="dropdown-menu"
      style={{ position: 'fixed', left: x, top: y, zIndex: 9998 }}
      onMouseDown={e => e.stopPropagation()}
    >
      {items.map((item, i) =>
        item.divider ? (
          <div key={i} className="dropdown-divider" />
        ) : (
          <div key={i} className="dropdown-item" onClick={item.action}>
            <span className="w-5 text-center">{item.icon}</span>
            {item.label}
          </div>
        )
      )}
    </div>
  )
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [booted, setBooted] = useState(false)
  const [wallpaper, setWallpaper] = useState('#008080')
  const [contextMenu, setContextMenu] = useState(null)

  const {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    resizeWindow,
  } = useWindowManager()

  // Active window = highest z-index non-minimized
  const activeWindow = windows
    .filter(w => !w.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]

  const handleDesktopRightClick = useCallback((e) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }, [])

  const handleDesktopClick = useCallback(() => {
    setContextMenu(null)
  }, [])

  // Handle minimize from taskbar — un-minimize the window and focus it
  const handleTaskbarMinimize = useCallback((id) => {
    const win = windows.find(w => w.id === id)
    if (!win) return
    minimizeWindow(id)
    if (win.minimized) focusWindow(id)
  }, [windows, minimizeWindow, focusWindow])

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: wallpaper }}
      onContextMenu={handleDesktopRightClick}
      onMouseDown={handleDesktopClick}
    >
      {/* Desktop */}
      <Desktop onOpen={openWindow} />

      {/* Windows */}
      {windows.map(win => (
        <Window
          key={win.id}
          {...win}
          isActive={activeWindow?.id === win.id}
          icon={APP_ICONS[win.appId]}
          onClose={closeWindow}
          onFocus={focusWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onMove={moveWindow}
          onResize={resizeWindow}
        >
          {renderApp(win.appId, { width: win.width, height: win.height }, setWallpaper)}
        </Window>
      ))}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onOpen={openWindow}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onOpenWindow={openWindow}
        onFocusWindow={(id) => {
          focusWindow(id)
          const win = windows.find(w => w.id === id)
          if (win?.minimized) minimizeWindow(id)
        }}
        onMinimizeWindow={handleTaskbarMinimize}
        activeWindowId={activeWindow?.id}
      />
    </div>
  )
}
