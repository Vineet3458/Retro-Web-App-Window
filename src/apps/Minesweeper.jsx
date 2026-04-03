// apps/Minesweeper.jsx
import React, { useState, useCallback, useEffect } from 'react'

const ROWS = 9, COLS = 9, MINES = 10

function createBoard() {
  const cells = Array(ROWS).fill(null).map(() =>
    Array(COLS).fill(null).map(() => ({
      mine: false, revealed: false, flagged: false, count: 0
    }))
  )
  // Place mines
  let placed = 0
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS)
    const c = Math.floor(Math.random() * COLS)
    if (!cells[r][c].mine) { cells[r][c].mine = true; placed++ }
  }
  // Calculate counts
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (cells[r][c].mine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && cells[nr][nc].mine) count++
        }
      cells[r][c].count = count
    }
  }
  return cells
}

function reveal(board, r, c) {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return board
  if (board[r][c].revealed || board[r][c].flagged) return board
  const newBoard = board.map(row => row.map(cell => ({...cell})))
  newBoard[r][c].revealed = true
  if (newBoard[r][c].count === 0 && !newBoard[r][c].mine) {
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++)
        if (dr !== 0 || dc !== 0)
          reveal(newBoard, r + dr, c + dc).forEach((row, ri) =>
            row.forEach((cell, ci) => { newBoard[ri][ci] = cell })
          )
  }
  return newBoard
}

const COUNT_COLORS = ['','#0000ff','#008000','#ff0000','#800080','#800000','#008080','#000000','#808080']

export default function Minesweeper() {
  const [board, setBoard] = useState(createBoard)
  const [status, setStatus] = useState('playing') // 'playing' | 'won' | 'lost'
  const [flagCount, setFlagCount] = useState(MINES)
  const [time, setTime] = useState(0)
  const [started, setStarted] = useState(false)
  const [face, setFace] = useState('😀')

  useEffect(() => {
    if (!started || status !== 'playing') return
    const t = setInterval(() => setTime(s => Math.min(s + 1, 999)), 1000)
    return () => clearInterval(t)
  }, [started, status])

  const reset = useCallback(() => {
    setBoard(createBoard())
    setStatus('playing')
    setFlagCount(MINES)
    setTime(0)
    setStarted(false)
    setFace('😀')
  }, [])

  const handleClick = useCallback((r, c) => {
    if (status !== 'playing') return
    const cell = board[r][c]
    if (cell.revealed || cell.flagged) return
    if (!started) setStarted(true)

    if (cell.mine) {
      // Reveal all mines
      const newBoard = board.map(row => row.map(cell => ({
        ...cell,
        revealed: cell.mine ? true : cell.revealed
      })))
      newBoard[r][c] = { ...newBoard[r][c], exploded: true }
      setBoard(newBoard)
      setStatus('lost')
      setFace('😵')
      return
    }

    const newBoard = reveal(board.map(row => row.map(c => ({...c}))), r, c)
    setBoard(newBoard)

    // Check win
    const unrevealed = newBoard.flat().filter(c => !c.revealed && !c.mine).length
    if (unrevealed === 0) {
      setStatus('won')
      setFace('😎')
    }
  }, [board, status, started])

  const handleRightClick = useCallback((e, r, c) => {
    e.preventDefault()
    if (status !== 'playing') return
    const cell = board[r][c]
    if (cell.revealed) return
    const newBoard = board.map((row, ri) => row.map((cell, ci) =>
      ri === r && ci === c ? { ...cell, flagged: !cell.flagged } : cell
    ))
    setBoard(newBoard)
    setFlagCount(f => f + (board[r][c].flagged ? 1 : -1))
  }, [board, status])

  const SegDisplay = ({ value, digits = 3 }) => (
    <div
      className="px-1 py-0.5"
      style={{
        background: '#000',
        color: '#ff0000',
        fontFamily: "'VT323', monospace",
        fontSize: 24,
        minWidth: digits * 16 + 8,
        textAlign: 'right',
        letterSpacing: 2,
      }}
    >
      {String(Math.max(0, value)).padStart(digits, '0')}
    </div>
  )

  return (
    <div
      className="flex flex-col items-center p-2 bg-[#c0c0c0] h-full"
      style={{ userSelect: 'none' }}
    >
      {/* Header */}
      <div className="pixel-border-in w-full flex items-center justify-between p-2 mb-2">
        <SegDisplay value={flagCount} />
        <button
          className="pixel-btn text-2xl px-3 py-1"
          onClick={reset}
          onMouseDown={() => setFace('😮')}
          onMouseUp={() => status === 'playing' && setFace('😀')}
        >
          {face}
        </button>
        <SegDisplay value={time} />
      </div>

      {/* Board */}
      <div className="pixel-border-in">
        {board.map((row, r) => (
          <div key={r} className="flex">
            {row.map((cell, c) => {
              let content = ''
              let style = {}
              let className = 'pixel-btn'

              if (cell.revealed) {
                className = 'pixel-border-in'
                if (cell.mine) {
                  content = cell.exploded ? '💥' : '💣'
                } else if (cell.count > 0) {
                  content = cell.count
                  style.color = COUNT_COLORS[cell.count]
                  style.fontWeight = 'bold'
                }
              } else if (cell.flagged) {
                content = '🚩'
              }

              return (
                <div
                  key={c}
                  className={`flex items-center justify-center cursor-pointer`}
                  style={{
                    width: 28, height: 28,
                    fontSize: 12,
                    fontFamily: "'Press Start 2P', monospace",
                    ...(cell.revealed
                      ? { background: '#c0c0c0', borderTop: '1px solid #808080', borderLeft: '1px solid #808080', borderBottom: '1px solid #fff', borderRight: '1px solid #fff' }
                      : { background: '#c0c0c0', borderTop: '2px solid #fff', borderLeft: '2px solid #fff', borderBottom: '2px solid #808080', borderRight: '2px solid #808080' }
                    ),
                    ...(cell.exploded && { background: '#ff0000' }),
                    ...style,
                  }}
                  onClick={() => handleClick(r, c)}
                  onContextMenu={(e) => handleRightClick(e, r, c)}
                >
                  {content}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Status */}
      {status !== 'playing' && (
        <div
          className="mt-3 text-center"
          style={{ fontFamily: "'Press Start 2P'", fontSize: 10 }}
        >
          <div>{status === 'won' ? '🎉 YOU WIN! 🎉' : '💥 GAME OVER 💥'}</div>
          <button className="pixel-btn mt-2" onClick={reset}>New Game</button>
        </div>
      )}
    </div>
  )
}
