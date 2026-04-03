// apps/Settings.jsx
import React, { useState } from 'react'

export default function Settings({ onWallpaperChange }) {
  const [tab, setTab] = useState('display')
  const [wallpaper, setWallpaper] = useState('teal')
  const [resolution, setResolution] = useState('1920x1080')
  const [colorDepth, setColorDepth] = useState('32-bit')
  const [refreshRate, setRefreshRate] = useState('60Hz')
  const [fontSize, setFontSize] = useState('normal')
  const [animations, setAnimations] = useState(true)
  const [sound, setSound] = useState(true)

  const WALLPAPERS = [
    { id: 'teal', color: '#008080', label: 'Teal' },
    { id: 'navy', color: '#000080', label: 'Navy' },
    { id: 'wine', color: '#800000', label: 'Wine' },
    { id: 'forest', color: '#006400', label: 'Forest' },
    { id: 'purple', color: '#4B0082', label: 'Purple' },
    { id: 'black', color: '#000000', label: 'Black' },
  ]

  const TABS = ['display', 'sound', 'about']

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Tab bar */}
      <div className="flex border-b-2 border-[#808080] px-2 pt-2">
        {TABS.map(t => (
          <div
            key={t}
            className={`px-4 py-1 cursor-pointer capitalize`}
            style={{
              fontFamily: "'Press Start 2P'",
              fontSize: 8,
              background: tab === t ? '#c0c0c0' : '#a0a0a0',
              borderTop: '2px solid ' + (tab === t ? '#ffffff' : '#888'),
              borderLeft: '2px solid ' + (tab === t ? '#ffffff' : '#888'),
              borderRight: '2px solid ' + (tab === t ? '#808080' : '#555'),
              marginRight: 2,
              position: 'relative',
              bottom: tab === t ? -2 : 0,
            }}
            onClick={() => setTab(t)}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {tab === 'display' && (
          <div className="flex flex-col gap-4">
            <div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, marginBottom: 8 }}>
                🖼️ Wallpaper Color
              </div>
              <div className="flex flex-wrap gap-2">
                {WALLPAPERS.map(w => (
                  <div
                    key={w.id}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    onClick={() => { setWallpaper(w.id); onWallpaperChange && onWallpaperChange(w.color) }}
                  >
                    <div
                      style={{
                        width: 40, height: 30,
                        background: w.color,
                        border: wallpaper === w.id ? '3px solid #ffff00' : '2px solid #808080',
                      }}
                    />
                    <span style={{ fontFamily: "'Press Start 2P'", fontSize: 6 }}>{w.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dropdown-divider" />

            <div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, marginBottom: 8 }}>🖥️ Display</div>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Resolution', value: resolution, setValue: setResolution, options: ['800x600', '1024x768', '1280x720', '1920x1080', '2560x1440'] },
                  { label: 'Color Depth', value: colorDepth, setValue: setColorDepth, options: ['8-bit', '16-bit', '24-bit', '32-bit'] },
                  { label: 'Refresh Rate', value: refreshRate, setValue: setRefreshRate, options: ['30Hz', '60Hz', '75Hz', '120Hz', '144Hz'] },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span style={{ fontFamily: "'Press Start 2P'", fontSize: 7, width: 100 }}>{item.label}</span>
                    <select
                      className="pixel-select"
                      value={item.value}
                      onChange={e => item.setValue(e.target.value)}
                    >
                      {item.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="dropdown-divider" />

            <div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, marginBottom: 8 }}>⚡ Performance</div>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Animations', value: animations, toggle: () => setAnimations(a => !a) },
                  { label: 'Sound Effects', value: sound, toggle: () => setSound(s => !s) },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className="pixel-btn pressed cursor-pointer"
                      style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}
                      onClick={item.toggle}
                    >
                      {item.value ? '✓' : ''}
                    </div>
                    <span style={{ fontFamily: "'Press Start 2P'", fontSize: 7 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button className="pixel-btn">Apply</button>
              <button className="pixel-btn">OK</button>
              <button className="pixel-btn">Cancel</button>
            </div>
          </div>
        )}

        {tab === 'sound' && (
          <div className="flex flex-col gap-4">
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8 }}>🔊 Sound Events</div>
            {['Startup', 'Shutdown', 'Error', 'Notification', 'Click', 'Minimize'].map(ev => (
              <div key={ev} className="flex items-center gap-3">
                <span style={{ fontFamily: "'Press Start 2P'", fontSize: 7, width: 100 }}>{ev}</span>
                <select className="pixel-select" style={{ flex: 1 }}>
                  <option>(None)</option>
                  <option>beep.wav</option>
                  <option>chime.wav</option>
                  <option>click.wav</option>
                  <option>tada.wav</option>
                </select>
                <button className="pixel-btn" style={{ fontSize: 10 }}>▶</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'about' && (
          <div className="flex flex-col gap-3 items-center text-center">
            <div style={{ fontSize: 48 }}>🪟</div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 12 }}>PixelOS 98</div>
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8 }}>Version 1.0.0</div>
            <div className="dropdown-divider w-full" />
            <div style={{ fontFamily: "'VT323'", fontSize: 16, lineHeight: 1.6 }}>
              Built with React 18, Vite 5, Tailwind CSS 3<br/>
              BTech Final Year Project — 2025<br/>
              All rights reserved © PixelOS Team
            </div>
            <div className="pixel-border-in p-2 w-full" style={{ background: 'white' }}>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, marginBottom: 4 }}>System Info</div>
              <div style={{ fontFamily: "'VT323'", fontSize: 16, textAlign: 'left' }}>
                Browser: {navigator.userAgent.split(' ')[0]}<br/>
                Platform: {navigator.platform}<br/>
                Screen: {screen.width}×{screen.height}<br/>
                Memory: {navigator.deviceMemory || 'N/A'} GB
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
