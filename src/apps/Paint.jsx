// apps/Paint.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react'

const COLORS = [
  '#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080',
  '#ffffff','#c0c0c0','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff',
  '#ff8040','#804000','#80ff00','#004040','#0080ff','#8000ff','#ff0080','#ff8080',
]

const TOOLS = [
  { id: 'pencil', label: '✏️', title: 'Pencil' },
  { id: 'brush', label: '🖌️', title: 'Brush' },
  { id: 'eraser', label: '⬜', title: 'Eraser' },
  { id: 'fill', label: '🪣', title: 'Fill' },
  { id: 'line', label: '╲', title: 'Line' },
  { id: 'rect', label: '▭', title: 'Rectangle' },
  { id: 'circle', label: '◯', title: 'Circle' },
  { id: 'text', label: 'A', title: 'Text' },
]

export default function Paint({ width = 580, height = 430 }) {
  const canvasRef = useRef(null)
  const overlayRef = useRef(null)
  const [tool, setTool] = useState('pencil')
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [size, setSize] = useState(2)
  const [drawing, setDrawing] = useState(false)
  const [start, setStart] = useState(null)
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [activeColor, setActiveColor] = useState('fg') // 'fg' | 'bg'

  const canvasW = (width || 580) - 80
  const canvasH = (height || 430) - 100

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, c.width, c.height)
    saveHistory()
  }, [])

  const saveHistory = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const data = c.getContext('2d').getImageData(0, 0, c.width, c.height)
    setHistory(h => {
      const newH = h.slice(0, histIdx + 1).concat([data])
      setHistIdx(newH.length - 1)
      return newH
    })
  }, [histIdx])

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    }
  }

  const getCtx = () => canvasRef.current.getContext('2d')

  const draw = useCallback((e) => {
    if (!drawing) return
    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      const ctx = getCtx()
      const pos = getPos(e)
      ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over'
      ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : color
      ctx.lineWidth = tool === 'brush' ? size * 4 : tool === 'eraser' ? size * 6 : size
      ctx.lineCap = 'round'
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }
  }, [drawing, tool, color, size])

  const startDraw = useCallback((e) => {
    const pos = getPos(e)
    const ctx = getCtx()
    setDrawing(true)
    setStart(pos)

    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over'
      ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : color
      ctx.lineWidth = tool === 'brush' ? size * 4 : tool === 'eraser' ? size * 6 : size
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    } else if (tool === 'fill') {
      floodFill(pos.x, pos.y, color)
      saveHistory()
    }
  }, [tool, color, size, saveHistory])

  const endDraw = useCallback((e) => {
    if (!drawing) return
    setDrawing(false)
    const pos = getPos(e)
    const ctx = getCtx()

    if (tool === 'line') {
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    } else if (tool === 'rect') {
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.strokeRect(start.x, start.y, pos.x - start.x, pos.y - start.y)
    } else if (tool === 'circle') {
      const rx = Math.abs(pos.x - start.x) / 2
      const ry = Math.abs(pos.y - start.y) / 2
      const cx = Math.min(start.x, pos.x) + rx
      const cy = Math.min(start.y, pos.y) + ry
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.beginPath()
      ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI)
      ctx.stroke()
    }

    saveHistory()
    ctx.beginPath()
  }, [drawing, tool, color, size, start, saveHistory])

  function floodFill(startX, startY, fillColor) {
    const ctx = getCtx()
    const canvas = canvasRef.current
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const idx = (x, y) => (y * canvas.width + x) * 4
    const target = [...data.slice(idx(startX, startY), idx(startX, startY) + 4)]
    const fill = hexToRgba(fillColor)
    if (target.every((v, i) => v === fill[i])) return
    const stack = [[startX, startY]]
    while (stack.length) {
      const [x, y] = stack.pop()
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue
      const i = idx(x, y)
      if (!data.slice(i, i + 4).every((v, j) => v === target[j])) continue
      data[i] = fill[0]; data[i+1] = fill[1]; data[i+2] = fill[2]; data[i+3] = fill[3]
      stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1])
    }
    ctx.putImageData(imageData, 0, 0)
  }

  function hexToRgba(hex) {
    const r = parseInt(hex.slice(1,3),16)
    const g = parseInt(hex.slice(3,5),16)
    const b = parseInt(hex.slice(5,7),16)
    return [r,g,b,255]
  }

  const clear = () => {
    const ctx = getCtx()
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    saveHistory()
  }

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Menu */}
      <div className="menu-bar">
        <div className="menu-item">File</div>
        <div className="menu-item">Edit</div>
        <div className="menu-item">Image</div>
        <div className="menu-item">Colors</div>
        <button className="pixel-btn ml-auto mr-2" onClick={clear}>Clear</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col gap-1 p-1 w-16 flex-shrink-0 border-r border-[#808080]">
          {TOOLS.map(t => (
            <button
              key={t.id}
              className={`pixel-btn text-lg ${tool === t.id ? 'pressed' : ''}`}
              style={{ padding: '4px', fontSize: 14 }}
              onClick={() => setTool(t.id)}
              title={t.title}
            >
              {t.label}
            </button>
          ))}
          {/* Size */}
          <div className="mt-2 flex flex-col items-center gap-1">
            {[1,2,4,6].map(s => (
              <div
                key={s}
                className={`bg-black rounded-full cursor-pointer ${size === s ? 'ring-2 ring-yellow-400' : ''}`}
                style={{ width: s * 2 + 4, height: s * 2 + 4 }}
                onClick={() => setSize(s)}
              />
            ))}
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex-1 overflow-auto p-1 bg-[#808080]">
          <div className="pixel-border-in inline-block cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={canvasW}
              height={canvasH}
              className="block bg-white"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="flex items-center gap-2 p-1 border-t border-[#808080]">
        {/* Active colors */}
        <div className="relative w-10 h-10 flex-shrink-0">
          <div
            className="absolute bottom-0 right-0 w-6 h-6 pixel-border-out cursor-pointer"
            style={{ background: bgColor }}
            onClick={() => setActiveColor('bg')}
          />
          <div
            className="absolute top-0 left-0 w-6 h-6 pixel-border-out cursor-pointer"
            style={{ background: color, zIndex: 1 }}
            onClick={() => setActiveColor('fg')}
          />
        </div>
        {/* Palette */}
        <div className="flex flex-wrap gap-px" style={{ maxWidth: 200 }}>
          {COLORS.map(c => (
            <div
              key={c}
              className="w-4 h-4 cursor-pointer pixel-border-out hover:scale-110"
              style={{ background: c }}
              onClick={() => activeColor === 'fg' ? setColor(c) : setBgColor(c)}
              onContextMenu={(e) => { e.preventDefault(); activeColor === 'bg' ? setColor(c) : setBgColor(c) }}
            />
          ))}
        </div>
        <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, color: '#000' }}>
          FG: {color}<br/>BG: {bgColor}
        </div>
      </div>
    </div>
  )
}
