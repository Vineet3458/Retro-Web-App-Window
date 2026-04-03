// apps/Terminal.jsx
import React, { useState, useRef, useEffect } from 'react'

const COMMANDS = {
  help: () => `
Available commands:
  help          - Show this help message
  about         - About PixelOS
  ls            - List files
  pwd           - Print working directory
  whoami        - Current user
  date          - Current date & time
  echo [text]   - Print text
  clear         - Clear terminal
  cat [file]    - Read a file
  neofetch      - System info
  matrix        - Enter the Matrix
  joke          - Tell a joke
  skills        - Developer skills
  projects      - List projects
  contact       - Contact info
`,

  about: () => `
  ██████╗ ██╗██╗  ██╗███████╗██╗      ██████╗ ███████╗
  ██╔══██╗██║╚██╗██╔╝██╔════╝██║     ██╔═══██╗██╔════╝
  ██████╔╝██║ ╚███╔╝ █████╗  ██║     ██║   ██║███████╗
  ██╔═══╝ ██║ ██╔██╗ ██╔══╝  ██║     ██║   ██║╚════██║
  ██║     ██║██╔╝ ██╗███████╗███████╗╚██████╔╝███████║
  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝

  PixelOS 98 — v1.0.0
  A retro-styled desktop OS built with React.
  BTech Final Year Project | 2025
`,

  neofetch: () => `
  ${' '.repeat(4)}🖥️  PixelOS 98
  ${' '.repeat(4)}━━━━━━━━━━━━━━━━━━━━━━
  ${' '.repeat(4)}OS: PixelOS 98 x64
  ${' '.repeat(4)}Host: ReactMachine 1.0
  ${' '.repeat(4)}Kernel: Vite 5.1.0
  ${' '.repeat(4)}Shell: PixelBash 2.0
  ${' '.repeat(4)}Resolution: ${window.innerWidth}x${window.innerHeight}
  ${' '.repeat(4)}WM: PixelWM
  ${' '.repeat(4)}Framework: React 18.2.0
  ${' '.repeat(4)}Styling: Tailwind CSS 3.4
  ${' '.repeat(4)}Font: Press Start 2P
  ${' '.repeat(4)}Colors: 16 🎨
`,

  ls: () => `
  📁 Documents/
  📁 Downloads/
  📁 Pictures/
  📁 Projects/
  📄 README.txt
  📄 config.json
  📄 portfolio.html
`,

  pwd: () => `  /home/pixeluser/Desktop`,
  whoami: () => `  pixeluser`,
  date: () => `  ${new Date().toString()}`,

  cat: (args) => {
    const file = args[0]
    if (file === 'README.txt') return `
  # PixelOS README
  Welcome to PixelOS 98!
  A retro-styled OS built with React + Tailwind.
  This is a BTech Final Year Project.
`
    if (file === 'config.json') return `
  {
    "os": "PixelOS 98",
    "version": "1.0.0",
    "author": "BTech Student",
    "year": 2025,
    "stack": ["React", "Vite", "Tailwind"]
  }
`
    return `  cat: ${file || '(no file)'}: No such file or directory`
  },

  echo: (args) => `  ${args.join(' ')}`,

  skills: () => `
  💻 Frontend: React, HTML5, CSS3, Tailwind, TypeScript
  ⚙️  Backend: Node.js, Express, Django, FastAPI
  🗄️  Database: MongoDB, PostgreSQL, MySQL
  🛠️  Tools: Git, Docker, VS Code, Figma
  ☁️  Cloud: AWS, Firebase, Vercel
  📱 Mobile: React Native
`,

  projects: () => `
  🖥️  PixelOS 98       — Retro Desktop OS (current)
  🛒 E-Commerce App   — React + Node.js
  💬 Chat Application — Socket.io + MongoDB
  📊 Analytics Board  — D3.js + FastAPI
  🤖 ML Dashboard    — Python + TensorFlow
`,

  contact: () => `
  📧 Email: pixeldev@example.com
  🐙 GitHub: github.com/pixeldev
  💼 LinkedIn: linkedin.com/in/pixeldev
  🌐 Portfolio: pixeldev.io
`,

  joke: () => {
    const jokes = [
      "Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛",
      "Why do Java developers wear glasses?\nBecause they don't C#! 👓",
      "A SQL query walks into a bar, walks up to two tables and asks...\n'Can I join you?' 🍺",
      "Why did the developer go broke?\nBecause they used up all their cache! 💸",
    ]
    return `\n  ${jokes[Math.floor(Math.random() * jokes.length)]}`
  },

  matrix: () => `
  Wake up, Neo...
  The Matrix has you...
  Follow the white rabbit. 🐇
  
  [Initiating red pill sequence...]
  ██████████████████████████ 100%
  
  Welcome to the real world. 💊
`,
}

function processCommand(input) {
  const parts = input.trim().split(/\s+/)
  const cmd = parts[0].toLowerCase()
  const args = parts.slice(1)

  if (!cmd) return ''
  if (cmd === 'clear') return '__CLEAR__'
  if (COMMANDS[cmd]) return COMMANDS[cmd](args)
  return `  Command not found: '${cmd}'. Type 'help' for available commands.`
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: COMMANDS.neofetch() },
    { type: 'output', text: "Type 'help' for available commands.\n" },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [cmdIdx, setCmdIdx] = useState(-1)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const submit = () => {
    if (!input.trim()) { setHistory(h => [...h, { type: 'prompt', text: '' }]); return }
    const result = processCommand(input)
    if (result === '__CLEAR__') {
      setHistory([])
    } else {
      setHistory(h => [
        ...h,
        { type: 'prompt', text: input },
        { type: 'output', text: result },
      ])
    }
    setCmdHistory(h => [input, ...h])
    setCmdIdx(-1)
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') { submit(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(cmdIdx + 1, cmdHistory.length - 1)
      setCmdIdx(idx)
      setInput(cmdHistory[idx] || '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(cmdIdx - 1, -1)
      setCmdIdx(idx)
      setInput(idx === -1 ? '' : cmdHistory[idx])
    }
  }

  return (
    <div
      className="h-full flex flex-col crt scanlines relative"
      style={{ background: '#0a0a0a', color: '#00ff00' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto p-3" style={{ fontFamily: "'VT323', monospace", fontSize: 18, lineHeight: 1.4 }}>
        {history.map((line, i) => (
          <div key={i}>
            {line.type === 'prompt' && (
              <div>
                <span style={{ color: '#00ff00' }}>pixeluser@PixelOS</span>
                <span style={{ color: '#ffffff' }}>:</span>
                <span style={{ color: '#4488ff' }}>~$</span>
                <span style={{ color: '#ffffff' }}> {line.text}</span>
              </div>
            )}
            {line.type === 'output' && (
              <pre style={{ color: '#aaffaa', whiteSpace: 'pre-wrap', margin: 0 }}>{line.text}</pre>
            )}
          </div>
        ))}
        {/* Input line */}
        <div className="flex items-center">
          <span style={{ color: '#00ff00' }}>pixeluser@PixelOS</span>
          <span style={{ color: '#ffffff' }}>:</span>
          <span style={{ color: '#4488ff' }}>~$</span>
          <span style={{ color: '#ffffff' }}>&nbsp;</span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#ffffff', fontFamily: "'VT323', monospace", fontSize: 18, caretColor: '#00ff00' }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
