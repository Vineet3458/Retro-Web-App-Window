// apps/About.jsx
import React, { useState, useEffect } from 'react'

export default function About() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); return 100 }
        return p + 2
      })
    }, 60)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setPhase(Math.floor(progress / 25))
  }, [progress])

  const phases = ['Loading kernel...', 'Initializing UI...', 'Mounting filesystem...', 'Starting desktop...']

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#000080] p-6 gap-4">
      {/* Logo */}
      <div className="text-center">
        <div style={{ fontSize: 48, marginBottom: 8 }}>🪟</div>
        <div style={{ fontFamily: "'Press Start 2P'", fontSize: 18, color: '#ffffff' }}>PixelOS 98</div>
        <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, color: '#aaaaff', marginTop: 4 }}>
          A Retro Desktop Experience
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '80%', height: 2, background: 'rgba(255,255,255,0.3)' }} />

      {/* Features */}
      <div className="grid grid-cols-2 gap-3" style={{ width: '90%' }}>
        {[
          { icon: '🖥️', title: 'Window Manager', desc: 'Drag, resize & multi-window' },
          { icon: '🎨', title: 'MS Paint', desc: 'Canvas drawing app' },
          { icon: '⬛', title: 'Terminal', desc: 'Shell with 15+ commands' },
          { icon: '💣', title: 'Minesweeper', desc: 'Classic game' },
          { icon: '📁', title: 'File Explorer', desc: 'Tree-based FS navigation' },
          { icon: '🎵', title: 'Media Player', desc: 'Playlist with visualizer' },
          { icon: '🔢', title: 'Calculator', desc: 'Full scientific calc' },
          { icon: '📝', title: 'Notepad', desc: 'Text editor' },
        ].map(f => (
          <div
            key={f.title}
            className="flex items-start gap-2 p-2"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span style={{ fontSize: 18, flexShrink: 0 }}>{f.icon}</span>
            <div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: '#ffffff' }}>{f.title}</div>
              <div style={{ fontFamily: "'VT323'", fontSize: 13, color: '#aaaaff' }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ width: '90%' }}>
        <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: '#aaaaff', marginBottom: 4 }}>
          {phases[Math.min(phase, 3)]} {progress}%
        </div>
        <div className="pixel-progress" style={{ width: '100%' }}>
          <div className="pixel-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: '#888888' }}>
        Built with React + Vite + Tailwind CSS • BTech 2025
      </div>
    </div>
  )
}
