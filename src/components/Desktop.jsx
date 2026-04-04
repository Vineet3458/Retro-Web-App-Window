// components/Desktop.jsx
// Desktop with icons grid + wallpaper changer
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { APPS } from '../hooks/useWindowManager'

const WALLPAPERS = [
  {
    id: 'city',
    label: 'Neon City',
    emoji: '🌃',
    src: '/wallpaper_city.png',
    accent: '#00ffe7',
  },
  {
    id: 'alley',
    label: 'Neon Alley',
    emoji: '🏮',
    src: '/wallpaper_alley.png',
    accent: '#ff2d9b',
  },
  {
    id: 'rooftop',
    label: 'Rooftop Sky',
    emoji: '🌆',
    src: '/wallpaper_rooftop.png',
    accent: '#bf5fff',
  },
  {
    id: 'subway',
    label: 'Neon Subway',
    emoji: '🚇',
    src: '/wallpaper_subway.png',
    accent: '#00ff9f',
  },
  {
    id: 'forest',
    label: 'Neon Forest',
    emoji: '🌿',
    src: '/wallpaper_forest.png',
    accent: '#7b00ff',
  },
]

const STORAGE_KEY = 'pixelos_wallpaper'

const ICONS = [
  { id: APPS.PORTFOLIO,     label: 'My\nPortfolio',  big: '🧑‍💻' },
  { id: APPS.FILE_EXPLORER, label: 'File\nExplorer', big: '📂' },
  { id: APPS.NOTEPAD,       label: 'Notepad',        big: '📄' },
  { id: APPS.PAINT,         label: 'MS Paint',       big: '🖌️' },
  { id: APPS.TERMINAL,      label: 'Terminal',       big: '💻' },
  { id: APPS.MINESWEEPER,   label: 'Mine\nSweeper',  big: '🎮' },
  { id: APPS.MEDIA_PLAYER,  label: 'Media\nPlayer',  big: '🎵' },
  { id: APPS.CALCULATOR,    label: 'Calculator',     big: '🧮' },
  { id: APPS.SETTINGS,      label: 'Settings',       big: '🖥️' },
  { id: APPS.ABOUT,         label: 'About\nPixelOS', big: 'ℹ️' },
]

function PixelIcon({ emoji, selected }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 40, height: 36 }}>
      <span style={{
        fontSize: 32,
        filter: selected ? 'brightness(0.7) sepia(1) hue-rotate(200deg)' : 'none',
        display: 'block',
        lineHeight: 1,
      }}>
        {emoji}
      </span>
    </div>
  )
}

/* ─── Wallpaper Picker Panel ─────────────────────────────────── */
function WallpaperPicker({ current, onSelect, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 8000,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed',
        bottom: 46,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 8001,
        background: 'linear-gradient(160deg, #0a0a1a 0%, #0d0d2b 100%)',
        border: '2px solid #00ffe7',
        boxShadow: '0 0 32px #00ffe799, 0 0 8px #00ffe744 inset',
        padding: '16px 20px 20px',
        width: 520,
        fontFamily: "'Press Start 2P', monospace",
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 14,
          borderBottom: '1px solid #00ffe744',
          paddingBottom: 8,
        }}>
          <span style={{ color: '#00ffe7', fontSize: 9, letterSpacing: 1 }}>
            🖼️ WALLPAPER SELECT
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #ff2d9b',
              color: '#ff2d9b',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 8,
              padding: '2px 6px',
              lineHeight: 1,
            }}>
            ✕
          </button>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {WALLPAPERS.map(wp => {
            const isActive = current === wp.id
            return (
              <button
                key={wp.id}
                onClick={() => { onSelect(wp.id); onClose(); }}
                title={wp.label}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  padding: 6,
                  border: isActive ? `2px solid ${wp.accent}` : '2px solid transparent',
                  boxShadow: isActive ? `0 0 10px ${wp.accent}88` : 'none',
                  borderRadius: 2,
                  transition: 'all 0.18s',
                  background: isActive ? `${wp.accent}18` : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.border = `2px solid ${wp.accent}88`
                    e.currentTarget.style.background = `${wp.accent}0c`
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.border = '2px solid transparent'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  imageRendering: 'pixelated',
                  border: `1px solid ${wp.accent}55`,
                }}>
                  <img
                    src={wp.src}
                    alt={wp.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }}
                  />
                </div>
                {/* Label */}
                <span style={{
                  color: isActive ? wp.accent : '#aaaacc',
                  fontSize: 6,
                  textAlign: 'center',
                  lineHeight: 1.5,
                  whiteSpace: 'nowrap',
                  textShadow: isActive ? `0 0 6px ${wp.accent}` : 'none',
                }}>
                  {wp.emoji} {wp.label}
                </span>
                {isActive && (
                  <span style={{ color: wp.accent, fontSize: 5, letterSpacing: 1, opacity: 0.8 }}>
                    ▶ ACTIVE
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Footer hint */}
        <div style={{ color: '#555577', fontSize: 6, marginTop: 12, textAlign: 'center' }}>
          RIGHT-CLICK DESKTOP TO REOPEN &nbsp;|&nbsp; CHOICE IS SAVED
        </div>
      </div>
    </>
  )
}

/* ─── Context Menu ───────────────────────────────────────────── */
function ContextMenu({ x, y, onWallpaper, onClose }) {
  const ref = useRef(null)

  // close on outside click
  useEffect(() => {
    const handler = () => onClose()
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      onMouseDown={e => e.stopPropagation()}
      style={{
        position: 'fixed',
        top: y, left: x,
        zIndex: 7999,
        background: '#0a0a1a',
        border: '2px solid #00ffe7',
        boxShadow: '0 0 16px #00ffe755',
        minWidth: 180,
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      {[
        { label: '🖼️  Change Wallpaper', action: onWallpaper },
      ].map(item => (
        <div
          key={item.label}
          onClick={() => { item.action(); onClose() }}
          style={{
            padding: '8px 14px',
            fontSize: 7,
            color: '#00ffe7',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#00ffe722' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}

/* ─── Main Desktop ───────────────────────────────────────────── */
export default function Desktop({ onOpen }) {
  const [selected, setSelected] = useState(null)
  const [wallpaperId, setWallpaperId] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'city'
  )
  const [showPicker, setShowPicker] = useState(false)
  const [contextMenu, setContextMenu] = useState(null)

  const wallpaper = WALLPAPERS.find(w => w.id === wallpaperId) || WALLPAPERS[0]

  const handleSelectWallpaper = useCallback((id) => {
    setWallpaperId(id)
    localStorage.setItem(STORAGE_KEY, id)
  }, [])

  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <div
      className="absolute inset-0"
      style={{
        paddingBottom: 36,
        backgroundImage: `url(${wallpaper.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        imageRendering: 'pixelated',
        transition: 'background-image 0.4s ease',
      }}
      onClick={() => { setSelected(null); setContextMenu(null) }}
      onContextMenu={handleContextMenu}
    >
      {/* Subtle pixelated scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.08) 3px,
            rgba(0,0,0,0.08) 4px
          )
        `,
        zIndex: 1,
      }} />

      {/* Desktop icons */}
      <div className="flex flex-col gap-2 p-3" style={{ width: 88, position: 'relative', zIndex: 2 }}>
        {ICONS.map(icon => (
          <div
            key={icon.id}
            className={`desktop-icon ${selected === icon.id ? 'selected' : ''}`}
            onClick={(e) => { e.stopPropagation(); setSelected(icon.id) }}
            onDoubleClick={(e) => { e.stopPropagation(); onOpen(icon.id); setSelected(null) }}
          >
            <PixelIcon emoji={icon.big} selected={selected === icon.id} />
            <span className="icon-label" style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
              {icon.label}
            </span>
          </div>
        ))}
      </div>

      {/* Wallpaper quick-change button  (bottom-right, above taskbar) */}
      <button
        id="wallpaper-btn"
        onClick={e => { e.stopPropagation(); setShowPicker(v => !v) }}
        title="Change Wallpaper"
        style={{
          position: 'fixed',
          bottom: 44,
          right: 8,
          zIndex: 900,
          background: 'rgba(10,10,26,0.85)',
          border: `1px solid ${wallpaper.accent}`,
          color: wallpaper.accent,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7,
          padding: '5px 9px',
          cursor: 'pointer',
          boxShadow: `0 0 10px ${wallpaper.accent}88`,
          letterSpacing: 1,
          whiteSpace: 'nowrap',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${wallpaper.accent}22`; e.currentTarget.style.boxShadow = `0 0 20px ${wallpaper.accent}bb` }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,26,0.85)'; e.currentTarget.style.boxShadow = `0 0 10px ${wallpaper.accent}88` }}
      >
        🖼️ <span>{wallpaper.emoji} {wallpaper.label}</span>
      </button>

      {/* Watermark */}
      <div
        className="absolute bottom-10 right-4 text-right"
        style={{ color: 'white', fontFamily: "'Press Start 2P'", fontSize: 8, lineHeight: 1.8, opacity: 0.25, zIndex: 2 }}
      >
        <div>PixelOS 98</div>
        <div>BTech Final Year</div>
        <div>Project 2025</div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onWallpaper={() => setShowPicker(true)}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Wallpaper Picker Panel */}
      {showPicker && (
        <WallpaperPicker
          current={wallpaperId}
          onSelect={handleSelectWallpaper}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  )
}
