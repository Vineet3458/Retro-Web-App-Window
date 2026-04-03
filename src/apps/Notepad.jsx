// apps/Notepad.jsx
import React, { useState } from 'react'

export default function Notepad() {
  const [text, setText] = useState(
`Welcome to PixelOS Notepad!
================================
This is a retro-styled text editor.

Features:
- Type anything you want
- Select all, copy, paste
- Word wrap toggle
- Find & Replace (coming soon)

Built with: Vite + React + Tailwind CSS
Author: BTech Final Year Project
Year: 2025

Have fun typing! 🖊️
`
  )
  const [wordWrap, setWordWrap] = useState(true)
  const [fontSize, setFontSize] = useState(16)
  const [menuOpen, setMenuOpen] = useState(null)

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const charCount = text.length
  const lines = text.split('\n').length

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Menu Bar */}
      <div className="menu-bar relative">
        {['File', 'Edit', 'Format', 'View', 'Help'].map(m => (
          <div
            key={m}
            className={`menu-item ${menuOpen === m ? 'active' : ''}`}
            onClick={() => setMenuOpen(menuOpen === m ? null : m)}
            onMouseEnter={() => menuOpen && setMenuOpen(m)}
          >
            {m}
          </div>
        ))}

        {menuOpen === 'Format' && (
          <div className="dropdown-menu" style={{ top: '100%', left: 80 }}
            onMouseLeave={() => setMenuOpen(null)}>
            <div className="dropdown-item" onClick={() => { setWordWrap(!wordWrap); setMenuOpen(null) }}>
              <span>{wordWrap ? '✓' : ' '}</span> Word Wrap
            </div>
            <div className="dropdown-divider" />
            <div className="dropdown-item" onClick={() => { setFontSize(s => Math.max(10, s - 2)); setMenuOpen(null) }}>
              Decrease Font
            </div>
            <div className="dropdown-item" onClick={() => { setFontSize(s => Math.min(32, s + 2)); setMenuOpen(null) }}>
              Increase Font
            </div>
          </div>
        )}
        {menuOpen === 'Edit' && (
          <div className="dropdown-menu" style={{ top: '100%', left: 40 }}
            onMouseLeave={() => setMenuOpen(null)}>
            <div className="dropdown-item" onClick={() => { setText(''); setMenuOpen(null) }}>Clear All</div>
            <div className="dropdown-divider" />
            <div className="dropdown-item" onClick={() => { navigator.clipboard?.writeText(text); setMenuOpen(null) }}>Copy All</div>
          </div>
        )}
        {menuOpen && (
          <div className="fixed inset-0 z-[-1]" onClick={() => setMenuOpen(null)} />
        )}
      </div>

      {/* Text Area */}
      <textarea
        className="flex-1 resize-none outline-none p-2 bg-white pixel-border-in m-1"
        style={{
          fontFamily: "'VT323', monospace",
          fontSize,
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
          overflowX: wordWrap ? 'hidden' : 'auto',
          lineHeight: 1.4,
        }}
        value={text}
        onChange={e => setText(e.target.value)}
        spellCheck={false}
      />

      {/* Status Bar */}
      <div className="pixel-border-in mx-1 mb-1 px-2 py-1 flex gap-4 bg-[#c0c0c0]">
        <span style={{ fontFamily: "'Press Start 2P'", fontSize: 7 }}>
          Ln {lines}
        </span>
        <span style={{ fontFamily: "'Press Start 2P'", fontSize: 7 }}>
          Words: {wordCount}
        </span>
        <span style={{ fontFamily: "'Press Start 2P'", fontSize: 7 }}>
          Chars: {charCount}
        </span>
      </div>
    </div>
  )
}
