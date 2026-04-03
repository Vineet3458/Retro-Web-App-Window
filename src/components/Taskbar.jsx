// components/Taskbar.jsx
// Bottom taskbar with Start menu, clock, and window buttons
import React, { useState, useEffect, useRef } from 'react'
import { APPS } from '../hooks/useWindowManager'

const START_MENU_ITEMS = [
  { label: 'My Portfolio', appId: APPS.PORTFOLIO, icon: '👤' },
  { label: 'File Explorer', appId: APPS.FILE_EXPLORER, icon: '📁' },
  { label: 'Notepad', appId: APPS.NOTEPAD, icon: '📝' },
  { label: 'MS Paint', appId: APPS.PAINT, icon: '🎨' },
  { label: 'Terminal', appId: APPS.TERMINAL, icon: '⬛' },
  { label: 'Minesweeper', appId: APPS.MINESWEEPER, icon: '💣' },
  { label: 'Media Player', appId: APPS.MEDIA_PLAYER, icon: '▶️' },
  { label: 'Calculator', appId: APPS.CALCULATOR, icon: '🔢' },
  { label: 'Settings', appId: APPS.SETTINGS, icon: '⚙️' },
  { divider: true },
  { label: 'About PixelOS', appId: APPS.ABOUT, icon: 'ℹ️' },
]

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (n) => String(n).padStart(2, '0')
  const h = time.getHours()
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12

  return (
    <div
      className="pixel-border-in px-2 h-7 flex items-center gap-2"
      title={time.toDateString()}
    >
      <span className="text-[8px]" style={{ fontFamily: "'Press Start 2P'" }}>
        {`${fmt(h12)}:${fmt(time.getMinutes())} ${ampm}`}
      </span>
    </div>
  )
}

export default function Taskbar({ windows, onOpenWindow, onFocusWindow, onMinimizeWindow, activeWindowId }) {
  const [startOpen, setStartOpen] = useState(false)
  const startRef = useRef(null)

  // Close start menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (startRef.current && !startRef.current.contains(e.target)) {
        setStartOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleStartItem = (appId) => {
    setStartOpen(false)
    onOpenWindow(appId)
  }

  return (
    <div className="taskbar" style={{ userSelect: 'none' }}>
      {/* Start Button */}
      <div ref={startRef} className="relative flex-shrink-0">
        <button
          className={`start-btn ${startOpen ? 'active' : ''}`}
          onClick={() => setStartOpen(v => !v)}
        >
          <span className="text-base">🪟</span>
          <span style={{ fontFamily: "'Press Start 2P'", fontSize: 10, fontWeight: 'bold' }}>
            Start
          </span>
        </button>

        {/* Start Menu */}
        {startOpen && (
          <div
            className="absolute bottom-full left-0 mb-0 dropdown-menu"
            style={{ width: 220, zIndex: 9999 }}
          >
            {/* Header */}
            <div
              className="py-2 px-3 flex items-end gap-2"
              style={{
                background: 'linear-gradient(180deg, #000080, #1084d0)',
                minHeight: 60,
              }}
            >
              <span className="text-white text-2xl">🪟</span>
              <div>
                <div className="text-white font-bold" style={{ fontFamily: "'Press Start 2P'", fontSize: 9 }}>
                  PixelOS 98
                </div>
                <div className="text-blue-200" style={{ fontFamily: "'Press Start 2P'", fontSize: 7 }}>
                  v1.0.0
                </div>
              </div>
            </div>

            {/* Menu Items */}
            {START_MENU_ITEMS.map((item, i) =>
              item.divider ? (
                <div key={i} className="dropdown-divider" />
              ) : (
                <div
                  key={item.appId}
                  className="dropdown-item"
                  onClick={() => handleStartItem(item.appId)}
                >
                  <span className="w-5 text-center">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="pixel-border-in w-px self-stretch mx-1" />

      {/* Window Buttons */}
      <div className="flex gap-1 flex-1 overflow-x-auto">
        {windows.map(w => (
          <button
            key={w.id}
            className={`taskbar-item ${activeWindowId === w.id && !w.minimized ? 'active' : ''}`}
            onClick={() => {
              if (activeWindowId === w.id && !w.minimized) {
                onMinimizeWindow(w.id)
              } else {
                onFocusWindow(w.id)
                if (w.minimized) onMinimizeWindow(w.id) // un-minimize
              }
            }}
          >
            <span>{getAppIcon(w.appId)}</span>
            <span className="truncate">{w.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="pixel-border-in flex items-center gap-2 px-2 h-7 ml-1 flex-shrink-0">
        <span className="text-sm">🔊</span>
        <span className="text-sm">📶</span>
        <Clock />
      </div>
    </div>
  )
}

function getAppIcon(appId) {
  const icons = {
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
  return icons[appId] || '🖥️'
}
