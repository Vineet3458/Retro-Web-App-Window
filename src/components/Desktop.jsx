// components/Desktop.jsx
// Desktop with icons grid
import React, { useState } from 'react'
import { APPS } from '../hooks/useWindowManager'

const ICONS = [
  { id: APPS.PORTFOLIO, label: 'My\nPortfolio', emoji: '👤', big: '🧑‍💻' },
  { id: APPS.FILE_EXPLORER, label: 'File\nExplorer', emoji: '📁', big: '📂' },
  { id: APPS.NOTEPAD, label: 'Notepad', emoji: '📝', big: '📄' },
  { id: APPS.PAINT, label: 'MS Paint', emoji: '🎨', big: '🖌️' },
  { id: APPS.TERMINAL, label: 'Terminal', emoji: '⬛', big: '💻' },
  { id: APPS.MINESWEEPER, label: 'Mine\nSweeper', emoji: '💣', big: '🎮' },
  { id: APPS.MEDIA_PLAYER, label: 'Media\nPlayer', emoji: '▶️', big: '🎵' },
  { id: APPS.CALCULATOR, label: 'Calculator', emoji: '🔢', big: '🧮' },
  { id: APPS.SETTINGS, label: 'Settings', emoji: '⚙️', big: '🖥️' },
  { id: APPS.ABOUT, label: 'About\nPixelOS', emoji: 'ℹ️', big: 'ℹ️' },
]

// Pixel art folder icon rendered in SVG
function PixelIcon({ emoji, selected }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 40, height: 36 }}
    >
      <span
        style={{
          fontSize: 32,
          filter: selected ? 'brightness(0.7) sepia(1) hue-rotate(200deg)' : 'none',
          display: 'block',
          lineHeight: 1,
        }}
      >
        {emoji}
      </span>
    </div>
  )
}

export default function Desktop({ onOpen }) {
  const [selected, setSelected] = useState(null)

  const handleClick = (id) => setSelected(id)
  const handleDoubleClick = (id) => {
    onOpen(id)
    setSelected(null)
  }

  return (
    <div
      className="absolute inset-0 desktop-pattern"
      style={{ paddingBottom: 36 }}
      onClick={() => setSelected(null)}
    >
      {/* Desktop icons in left column */}
      <div className="flex flex-col gap-2 p-3" style={{ width: 88 }}>
        {ICONS.map(icon => (
          <div
            key={icon.id}
            className={`desktop-icon ${selected === icon.id ? 'selected' : ''}`}
            onClick={(e) => { e.stopPropagation(); handleClick(icon.id) }}
            onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(icon.id) }}
          >
            <PixelIcon emoji={icon.big} selected={selected === icon.id} />
            <span
              className="icon-label"
              style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}
            >
              {icon.label}
            </span>
          </div>
        ))}
      </div>

      {/* Watermark */}
      <div
        className="absolute bottom-10 right-4 text-right opacity-30"
        style={{ color: 'white', fontFamily: "'Press Start 2P'", fontSize: 8, lineHeight: 1.8 }}
      >
        <div>PixelOS 98</div>
        <div>BTech Final Year</div>
        <div>Project 2025</div>
      </div>
    </div>
  )
}
