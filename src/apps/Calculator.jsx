// apps/Calculator.jsx
import React, { useState, useCallback } from 'react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [newNum, setNewNum] = useState(true)
  const [memory, setMemory] = useState(0)
  const [history, setHistory] = useState([])

  const pressNum = useCallback((n) => {
    if (newNum) {
      setDisplay(String(n))
      setNewNum(false)
    } else {
      setDisplay(d => d.length >= 12 ? d : (d === '0' ? String(n) : d + n))
    }
  }, [newNum])

  const pressDot = useCallback(() => {
    if (newNum) { setDisplay('0.'); setNewNum(false); return }
    if (!display.includes('.')) setDisplay(d => d + '.')
  }, [newNum, display])

  const pressOp = useCallback((o) => {
    const cur = parseFloat(display)
    if (prev !== null && !newNum) {
      const result = calculate(prev, cur, op)
      setDisplay(String(result))
      setPrev(result)
    } else {
      setPrev(cur)
    }
    setOp(o)
    setNewNum(true)
  }, [display, prev, op, newNum])

  function calculate(a, b, o) {
    switch (o) {
      case '+': return parseFloat((a + b).toFixed(10))
      case '-': return parseFloat((a - b).toFixed(10))
      case '×': return parseFloat((a * b).toFixed(10))
      case '÷': return b !== 0 ? parseFloat((a / b).toFixed(10)) : 'Error'
      case '%': return parseFloat((a % b).toFixed(10))
      default: return b
    }
  }

  const pressEquals = useCallback(() => {
    if (op === null || prev === null) return
    const cur = parseFloat(display)
    const result = calculate(prev, cur, op)
    const entry = `${prev} ${op} ${cur} = ${result}`
    setHistory(h => [entry, ...h].slice(0, 8))
    setDisplay(String(result))
    setPrev(null)
    setOp(null)
    setNewNum(true)
  }, [display, op, prev])

  const pressClear = useCallback(() => {
    setDisplay('0')
    setPrev(null)
    setOp(null)
    setNewNum(true)
  }, [])

  const pressCE = useCallback(() => { setDisplay('0'); setNewNum(true) }, [])

  const pressSign = useCallback(() => {
    setDisplay(d => String(-parseFloat(d)))
  }, [])

  const pressSqrt = useCallback(() => {
    const v = parseFloat(display)
    setDisplay(String(parseFloat(Math.sqrt(v).toFixed(10))))
    setNewNum(true)
  }, [display])

  const BTN = ({ label, onClick, wide, color = 'gray', small }) => (
    <button
      className={`pixel-btn flex items-center justify-center text-center
        ${wide ? 'col-span-2' : ''}
        ${color === 'blue' ? 'bg-blue-200 hover:bg-blue-300' : ''}
        ${color === 'red' ? 'bg-red-200 hover:bg-red-300' : ''}
        ${color === 'dark' ? 'bg-gray-400' : ''}
      `}
      style={{
        width: wide ? '100%' : 44,
        height: 34,
        fontFamily: "'Press Start 2P', monospace",
        fontSize: small ? 7 : 9,
        padding: 0,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  )

  const displayVal = display.length > 10 ? parseFloat(display).toExponential(4) : display

  return (
    <div className="h-full flex gap-2 p-2 bg-[#c0c0c0]">
      {/* Main calculator */}
      <div className="flex flex-col gap-2 flex-shrink-0">
        {/* Display */}
        <div
          className="pixel-border-in p-2 text-right"
          style={{ background: '#d4edda', minHeight: 50 }}
        >
          <div style={{ fontFamily: "'VT323', monospace", fontSize: 10, color: '#555', minHeight: 14 }}>
            {prev !== null ? `${prev} ${op || ''}` : '\u00a0'}
          </div>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: 28, color: '#000', letterSpacing: 1 }}>
            {displayVal}
          </div>
        </div>

        {/* Memory row */}
        <div className="flex gap-1">
          {[
            { label: 'MC', action: () => setMemory(0) },
            { label: 'MR', action: () => { setDisplay(String(memory)); setNewNum(false) } },
            { label: 'M+', action: () => setMemory(m => m + parseFloat(display)) },
            { label: 'M-', action: () => setMemory(m => m - parseFloat(display)) },
            { label: 'MS', action: () => setMemory(parseFloat(display)) },
          ].map(b => (
            <button
              key={b.label}
              className="pixel-btn"
              style={{ flex: 1, fontSize: 7, height: 24 }}
              onClick={b.action}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Buttons grid */}
        <div className="grid grid-cols-4 gap-1">
          <BTN label="%" onClick={() => pressOp('%')} color="dark" small />
          <BTN label="CE" onClick={pressCE} color="dark" small />
          <BTN label="C" onClick={pressClear} color="red" small />
          <BTN label="⌫" onClick={() => {
            if (newNum || display.length === 1) { setDisplay('0'); return }
            setDisplay(d => d.slice(0, -1) || '0')
          }} color="red" small />

          <BTN label="¹⁄ₓ" onClick={() => setDisplay(String(1 / parseFloat(display)))} color="dark" small />
          <BTN label="x²" onClick={() => setDisplay(String(parseFloat(display) ** 2))} color="dark" small />
          <BTN label="√" onClick={pressSqrt} color="dark" small />
          <BTN label="÷" onClick={() => pressOp('÷')} color="blue" />

          {[7,8,9].map(n => <BTN key={n} label={n} onClick={() => pressNum(n)} />)}
          <BTN label="×" onClick={() => pressOp('×')} color="blue" />

          {[4,5,6].map(n => <BTN key={n} label={n} onClick={() => pressNum(n)} />)}
          <BTN label="-" onClick={() => pressOp('-')} color="blue" />

          {[1,2,3].map(n => <BTN key={n} label={n} onClick={() => pressNum(n)} />)}
          <BTN label="+" onClick={() => pressOp('+')} color="blue" />

          <BTN label="+/-" onClick={pressSign} small />
          <BTN label="0" onClick={() => pressNum(0)} />
          <BTN label="." onClick={pressDot} />
          <BTN label="=" onClick={pressEquals} color="blue" />
        </div>
      </div>

      {/* History */}
      <div className="flex-1 flex flex-col min-w-0">
        <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7, marginBottom: 4 }}>HISTORY</div>
        <div className="pixel-border-in flex-1 overflow-auto p-1" style={{ background: 'white' }}>
          {history.length === 0
            ? <div style={{ fontFamily: "'VT323'", fontSize: 14, color: '#888' }}>No history yet...</div>
            : history.map((h, i) => (
              <div key={i} style={{ fontFamily: "'VT323'", fontSize: 14, borderBottom: '1px solid #eee', padding: '2px 0' }}>
                {h}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
