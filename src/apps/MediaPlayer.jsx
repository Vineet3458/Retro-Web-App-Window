// apps/MediaPlayer.jsx
import React, { useState, useEffect, useRef } from 'react'

const TRACKS = [
  { title: 'Pixel Dreams', artist: 'RetroWave', duration: '3:42', bpm: 128, genre: '8-Bit' },
  { title: 'Neon City', artist: 'CyberChip', duration: '4:15', bpm: 140, genre: 'Chiptune' },
  { title: 'Boot Screen', artist: 'OSTheme', duration: '0:32', bpm: 90, genre: 'System' },
  { title: 'Loading Zone', artist: 'PixelBeat', duration: '2:58', bpm: 110, genre: '8-Bit' },
  { title: 'Game Over', artist: 'ArcadeSound', duration: '1:20', bpm: 85, genre: 'Game' },
  { title: 'High Score', artist: 'ArcadeSound', duration: '0:45', bpm: 160, genre: 'Game' },
]

export default function MediaPlayer() {
  const [track, setTrack] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [viz, setViz] = useState(Array(20).fill(2))
  const timerRef = useRef(null)
  const vizRef = useRef(null)

  const current = TRACKS[track]

  // Simulate progress
  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            if (repeat) return 0
            const next = shuffle
              ? Math.floor(Math.random() * TRACKS.length)
              : (track + 1) % TRACKS.length
            setTrack(next)
            return 0
          }
          return p + 0.5
        })
      }, 150)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [playing, track, repeat, shuffle])

  // Visualizer animation
  useEffect(() => {
    if (playing) {
      vizRef.current = setInterval(() => {
        setViz(Array(20).fill(0).map(() => Math.floor(Math.random() * 28) + 2))
      }, 100)
    } else {
      clearInterval(vizRef.current)
      setViz(Array(20).fill(2))
    }
    return () => clearInterval(vizRef.current)
  }, [playing])

  const prev = () => setTrack(t => (t - 1 + TRACKS.length) % TRACKS.length)
  const next = () => setTrack(t => (t + 1) % TRACKS.length)

  const VIZ_COLORS = ['#00ff00', '#44ff00', '#88ff00', '#ccff00', '#ffcc00', '#ff8800', '#ff0000']

  return (
    <div className="h-full flex flex-col bg-[#1a1a2e] p-3 gap-3">
      {/* Album Art / Visualizer */}
      <div
        className="relative pixel-border-in flex items-end justify-center overflow-hidden"
        style={{ height: 100, background: '#000011' }}
      >
        {/* Visualizer bars */}
        <div className="flex items-end gap-px pb-1 px-2 w-full justify-center">
          {viz.map((h, i) => {
            const colorIdx = Math.min(Math.floor(h / 5), VIZ_COLORS.length - 1)
            return (
              <div
                key={i}
                style={{
                  width: 8,
                  height: h,
                  background: VIZ_COLORS[colorIdx],
                  transition: playing ? 'height 0.1s' : 'height 0.5s',
                  imageRendering: 'pixelated',
                  boxShadow: playing ? `0 0 4px ${VIZ_COLORS[colorIdx]}` : 'none',
                }}
              />
            )
          })}
        </div>
        {/* Track info overlay */}
        <div className="absolute top-2 left-2 right-2">
          <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, color: '#00ffff' }}>
            {current.title}
          </div>
          <div style={{ fontFamily: "'VT323'", fontSize: 14, color: '#888' }}>
            {current.artist} • {current.genre}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="pixel-progress" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          setProgress(((e.clientX - rect.left) / rect.width) * 100)
        }}>
          <div className="pixel-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-1" style={{ fontFamily: "'VT323'", fontSize: 14, color: '#aaa' }}>
          <span>0:00</span>
          <span>{current.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          className={`pixel-btn ${shuffle ? 'pressed' : ''}`}
          onClick={() => setShuffle(s => !s)}
          style={{ fontSize: 9 }}
          title="Shuffle"
        >🔀</button>
        <button className="pixel-btn" onClick={prev} style={{ fontSize: 10 }}>⏮</button>
        <button
          className="pixel-btn"
          onClick={() => setPlaying(p => !p)}
          style={{ width: 40, height: 32, fontSize: 14 }}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <button className="pixel-btn" onClick={next} style={{ fontSize: 10 }}>⏭</button>
        <button
          className={`pixel-btn ${repeat ? 'pressed' : ''}`}
          onClick={() => setRepeat(r => !r)}
          style={{ fontSize: 9 }}
          title="Repeat"
        >🔁</button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2">
        <span style={{ fontFamily: "'Press Start 2P'", fontSize: 8 }}>🔊</span>
        <input
          type="range"
          min="0" max="100"
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="flex-1"
        />
        <span style={{ fontFamily: "'VT323'", fontSize: 16, color: '#aaa', minWidth: 30 }}>{volume}%</span>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-auto pixel-border-in" style={{ background: '#0a0a1a' }}>
        {TRACKS.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-2 cursor-pointer"
            style={{
              height: 28,
              background: i === track ? '#000080' : 'transparent',
              color: i === track ? '#ffffff' : '#888',
              borderBottom: '1px solid #111',
            }}
            onDoubleClick={() => { setTrack(i); setPlaying(true); setProgress(0) }}
          >
            <span style={{ fontFamily: "'VT323'", fontSize: 14, minWidth: 16 }}>{i === track && playing ? '♪' : i + 1}</span>
            <span style={{ fontFamily: "'VT323'", fontSize: 16, flex: 1 }}>{t.title}</span>
            <span style={{ fontFamily: "'VT323'", fontSize: 14 }}>{t.duration}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
