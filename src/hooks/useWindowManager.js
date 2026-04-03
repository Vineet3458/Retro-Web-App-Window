// hooks/useWindowManager.js
// Manages all open windows: position, size, z-index, minimize/maximize state
import { useState, useCallback, useRef } from 'react'

let windowIdCounter = 0

export const APPS = {
  ABOUT: 'about',
  NOTEPAD: 'notepad',
  PAINT: 'paint',
  TERMINAL: 'terminal',
  MINESWEEPER: 'minesweeper',
  MEDIA_PLAYER: 'media_player',
  FILE_EXPLORER: 'file_explorer',
  CALCULATOR: 'calculator',
  SETTINGS: 'settings',
  PORTFOLIO: 'portfolio',
}

const DEFAULT_WINDOWS = {
  [APPS.ABOUT]: { title: 'About PixelOS', width: 480, height: 340, x: 80, y: 60 },
  [APPS.NOTEPAD]: { title: 'Notepad', width: 520, height: 400, x: 120, y: 80 },
  [APPS.PAINT]: { title: 'MS Paint', width: 600, height: 460, x: 100, y: 60 },
  [APPS.TERMINAL]: { title: 'Terminal', width: 560, height: 380, x: 140, y: 100 },
  [APPS.MINESWEEPER]: { title: 'Minesweeper', width: 300, height: 360, x: 200, y: 120 },
  [APPS.MEDIA_PLAYER]: { title: 'Media Player', width: 420, height: 360, x: 160, y: 80 },
  [APPS.FILE_EXPLORER]: { title: 'File Explorer', width: 560, height: 420, x: 110, y: 70 },
  [APPS.CALCULATOR]: { title: 'Calculator', width: 260, height: 380, x: 240, y: 100 },
  [APPS.SETTINGS]: { title: 'Display Settings', width: 440, height: 400, x: 130, y: 80 },
  [APPS.PORTFOLIO]: { title: 'My Portfolio', width: 580, height: 460, x: 90, y: 60 },
}

export function useWindowManager() {
  const [windows, setWindows] = useState([])
  const [topZ, setTopZ] = useState(10)

  const openWindow = useCallback((appId) => {
    setWindows(prev => {
      const existing = prev.find(w => w.appId === appId)
      if (existing) {
        // Focus and restore it
        const newZ = topZ + 1
        setTopZ(newZ)
        return prev.map(w => w.appId === appId
          ? { ...w, zIndex: newZ, minimized: false }
          : w
        )
      }
      const defaults = DEFAULT_WINDOWS[appId]
      const newZ = topZ + 1
      setTopZ(newZ)
      const spread = prev.length * 20
      return [...prev, {
        id: ++windowIdCounter,
        appId,
        title: defaults.title,
        x: Math.min(defaults.x + spread, window.innerWidth - defaults.width - 20),
        y: Math.min(defaults.y + spread, window.innerHeight - defaults.height - 60),
        width: defaults.width,
        height: defaults.height,
        zIndex: newZ,
        minimized: false,
        maximized: false,
        prevBounds: null,
      }]
    })
  }, [topZ])

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [])

  const focusWindow = useCallback((id) => {
    setTopZ(prev => {
      const newZ = prev + 1
      setWindows(wins => wins.map(w =>
        w.id === id ? { ...w, zIndex: newZ } : w
      ))
      return newZ
    })
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: !w.minimized } : w
    ))
  }, [])

  const maximizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w
      if (w.maximized) {
        return {
          ...w,
          maximized: false,
          ...(w.prevBounds || {}),
          prevBounds: null,
        }
      }
      return {
        ...w,
        maximized: true,
        prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
        x: 0, y: 0,
        width: window.innerWidth,
        height: window.innerHeight - 36,
      }
    }))
  }, [])

  const moveWindow = useCallback((id, x, y) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w))
  }, [])

  const resizeWindow = useCallback((id, width, height) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w))
  }, [])

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    resizeWindow,
  }
}
