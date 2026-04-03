// components/Window.jsx
// Core draggable, resizable window component — the heart of the OS UI
import React, { useRef, useCallback, useEffect } from 'react'

export default function Window({
  id, title, x, y, width, height, zIndex,
  minimized, maximized,
  onClose, onFocus, onMinimize, onMaximize,
  onMove, onResize,
  isActive,
  icon,
  children,
}) {
  const windowRef = useRef(null)
  const dragRef = useRef(null)

  // ── Drag logic ──────────────────────────────────────────────
  const handleTitleMouseDown = useCallback((e) => {
    if (maximized) return
    if (e.button !== 0) return
    onFocus(id)

    const startX = e.clientX - x
    const startY = e.clientY - y

    const onMouseMove = (e) => {
      const nx = Math.max(0, Math.min(e.clientX - startX, window.innerWidth - width))
      const ny = Math.max(0, Math.min(e.clientY - startY, window.innerHeight - 76))
      onMove(id, nx, ny)
    }
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [id, x, y, width, maximized, onFocus, onMove])

  // ── Resize logic (SE corner) ─────────────────────────────────
  const handleResizeMouseDown = useCallback((e) => {
    if (maximized) return
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const startY = e.clientY
    const startW = width
    const startH = height

    const onMouseMove = (e) => {
      const nw = Math.max(200, startW + e.clientX - startX)
      const nh = Math.max(150, startH + e.clientY - startY)
      onResize(id, nw, nh)
    }
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [id, width, height, maximized, onResize])

  if (minimized) return null

  const style = {
    position: 'fixed',
    left: x,
    top: y,
    width,
    height,
    zIndex,
  }

  return (
    <div
      ref={windowRef}
      style={style}
      className={`window-chrome flex flex-col select-none ${isActive ? '' : 'opacity-95'}`}
      onMouseDown={() => onFocus(id)}
    >
      {/* ── Title Bar ── */}
      <div
        className={`title-bar ${isActive ? '' : 'inactive'}`}
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={() => onMaximize(id)}
      >
        {/* Icon */}
        <span className="text-xs flex-shrink-0">{icon || '🖥️'}</span>

        {/* Title */}
        <span className="flex-1 truncate text-[8px]">{title}</span>

        {/* Window Controls */}
        <div className="flex gap-1 ml-1" onMouseDown={e => e.stopPropagation()}>
          <button
            className="title-bar-btn hover:bg-gray-300"
            onClick={() => onMinimize(id)}
            title="Minimize"
          >
            <span className="block w-2 h-px bg-black mt-1" />
          </button>
          <button
            className="title-bar-btn hover:bg-gray-300"
            onClick={() => onMaximize(id)}
            title="Maximize"
          >
            <span className="block w-2 h-2 border border-black" />
          </button>
          <button
            className="title-bar-btn hover:bg-red-400"
            onClick={() => onClose(id)}
            title="Close"
          >
            <span className="block font-bold leading-none text-[10px]">✕</span>
          </button>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="flex-1 overflow-hidden relative bg-[#c0c0c0]">
        {children}
      </div>

      {/* ── Resize Handle ── */}
      {!maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10"
          onMouseDown={handleResizeMouseDown}
          style={{
            backgroundImage: `
              linear-gradient(135deg, transparent 60%, #808080 60%, #808080 70%, transparent 70%),
              linear-gradient(135deg, transparent 75%, #808080 75%, #808080 85%, transparent 85%),
              linear-gradient(135deg, transparent 90%, #808080 90%)
            `,
          }}
        />
      )}
    </div>
  )
}
