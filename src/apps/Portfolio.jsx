// apps/Portfolio.jsx
import React, { useState } from 'react'

const PROJECTS = [
  {
    name: 'PixelOS 98',
    tech: ['React', 'Vite', 'Tailwind'],
    desc: 'A retro-styled desktop OS simulation with draggable windows, multiple apps, and pixel-perfect UI.',
    emoji: '🖥️',
    color: '#000080',
    year: '2025',
    status: 'Live',
  },
  {
    name: 'ChatApp',
    tech: ['React', 'Socket.io', 'MongoDB'],
    desc: 'Real-time messaging application with rooms, direct messages, and emoji reactions.',
    emoji: '💬',
    color: '#006400',
    year: '2024',
    status: 'Completed',
  },
  {
    name: 'E-Commerce',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    desc: 'Full-stack online store with cart, payments, inventory management and admin dashboard.',
    emoji: '🛒',
    color: '#800000',
    year: '2024',
    status: 'Completed',
  },
  {
    name: 'ML Dashboard',
    tech: ['Python', 'TensorFlow', 'FastAPI'],
    desc: 'Machine learning model training interface with real-time metrics and visualization.',
    emoji: '🤖',
    color: '#4B0082',
    year: '2024',
    status: 'In Progress',
  },
]

const SKILLS = [
  { cat: 'Frontend', items: [['React', 95], ['HTML/CSS', 90], ['Tailwind', 88], ['TypeScript', 75]] },
  { cat: 'Backend', items: [['Node.js', 80], ['Python', 75], ['Express', 78], ['FastAPI', 65]] },
  { cat: 'Database', items: [['MongoDB', 82], ['PostgreSQL', 70], ['MySQL', 68], ['Redis', 55]] },
  { cat: 'Tools', items: [['Git', 90], ['Docker', 65], ['Figma', 70], ['AWS', 55]] },
]

export default function Portfolio() {
  const [tab, setTab] = useState('home')

  const TABS = [
    { id: 'home', label: '🏠 Home' },
    { id: 'projects', label: '📁 Projects' },
    { id: 'skills', label: '⚡ Skills' },
    { id: 'contact', label: '📧 Contact' },
  ]

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      {/* Tab bar */}
      <div className="flex gap-1 px-2 pt-2 border-b-2 border-[#808080]">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontFamily: "'Press Start 2P'", fontSize: 7,
              padding: '4px 10px',
              background: tab === t.id ? '#c0c0c0' : '#a0a0a0',
              borderTop: '2px solid ' + (tab === t.id ? '#fff' : '#888'),
              borderLeft: '2px solid ' + (tab === t.id ? '#fff' : '#888'),
              borderRight: '2px solid ' + (tab === t.id ? '#808080' : '#555'),
              borderBottom: 'none',
              position: 'relative',
              bottom: tab === t.id ? -2 : 0,
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {/* HOME */}
        {tab === 'home' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div style={{ fontSize: 60 }}>🧑‍💻</div>
            <div>
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 14, color: '#000080' }}>
                John Doe
              </div>
              <div style={{ fontFamily: "'VT323'", fontSize: 20, color: '#444', marginTop: 4 }}>
                Full Stack Developer • BTech CSE • 2025
              </div>
            </div>
            <div
              className="pixel-border-in p-3 w-full text-left"
              style={{ background: 'white', fontFamily: "'VT323'", fontSize: 17, lineHeight: 1.6 }}
            >
              Welcome to my digital portfolio! I'm a passionate developer who loves building
              elegant solutions to complex problems. This entire portfolio is built as a
              retro Windows 98-inspired OS — my BTech final year project.
              <br/><br/>
              I specialize in React, Node.js, and Python. I enjoy creating pixel-perfect UIs
              and scalable backend systems.
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {['📧 Email', '🐙 GitHub', '💼 LinkedIn', '🌐 Website'].map(c => (
                <button key={c} className="pixel-btn">{c}</button>
              ))}
            </div>
            <div className="flex gap-4" style={{ fontFamily: "'Press Start 2P'", fontSize: 8 }}>
              <div className="text-center">
                <div style={{ fontSize: 20, fontFamily: "'VT323'" }}>15+</div>
                <div>Projects</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: 20, fontFamily: "'VT323'" }}>8+</div>
                <div>Tech Stack</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: 20, fontFamily: "'VT323'" }}>3yr</div>
                <div>Coding</div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: 20, fontFamily: "'VT323'" }}>100%</div>
                <div>Passion</div>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {tab === 'projects' && (
          <div className="flex flex-col gap-3">
            {PROJECTS.map(p => (
              <div key={p.name} className="pixel-border-out p-3 flex gap-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: 50, height: 50, background: p.color, fontSize: 24 }}
                >
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ fontFamily: "'Press Start 2P'", fontSize: 9 }}>{p.name}</span>
                    <span
                      style={{
                        fontFamily: "'Press Start 2P'", fontSize: 6,
                        background: p.status === 'Live' ? '#008000' : p.status === 'In Progress' ? '#808000' : '#000080',
                        color: 'white', padding: '1px 4px'
                      }}
                    >
                      {p.status}
                    </span>
                    <span style={{ fontFamily: "'Press Start 2P'", fontSize: 6, color: '#888' }}>{p.year}</span>
                  </div>
                  <div style={{ fontFamily: "'VT323'", fontSize: 15, color: '#444', margin: '4px 0' }}>
                    {p.desc}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.map(t => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "'Press Start 2P'", fontSize: 6,
                          background: '#c0c0c0', border: '1px solid #808080',
                          padding: '1px 4px',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {tab === 'skills' && (
          <div className="flex flex-col gap-4">
            {SKILLS.map(cat => (
              <div key={cat.cat}>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, marginBottom: 8 }}>
                  {cat.cat}
                </div>
                <div className="flex flex-col gap-2">
                  {cat.items.map(([skill, pct]) => (
                    <div key={skill} className="flex items-center gap-3">
                      <span style={{ fontFamily: "'Press Start 2P'", fontSize: 7, width: 80, flexShrink: 0 }}>
                        {skill}
                      </span>
                      <div className="flex-1 pixel-progress" style={{ height: 16 }}>
                        <div
                          className="pixel-progress-bar"
                          style={{ width: `${pct}%`, transition: 'width 1s ease' }}
                        />
                      </div>
                      <span style={{ fontFamily: "'VT323'", fontSize: 16, minWidth: 35, textAlign: 'right' }}>
                        {pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONTACT */}
        {tab === 'contact' && (
          <div className="flex flex-col gap-4">
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8 }}>📬 Get In Touch</div>
            {[
              { icon: '📧', label: 'Email', value: 'john.doe@example.com' },
              { icon: '🐙', label: 'GitHub', value: 'github.com/johndoe' },
              { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/johndoe' },
              { icon: '🐦', label: 'Twitter', value: '@johndoe_dev' },
              { icon: '🌐', label: 'Website', value: 'johndoe.dev' },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-3 pixel-border-out p-2 bg-white">
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Press Start 2P'", fontSize: 7 }}>{c.label}</div>
                  <div style={{ fontFamily: "'VT323'", fontSize: 16, color: '#0000ff' }}>{c.value}</div>
                </div>
              </div>
            ))}
            <div className="mt-2">
              <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, marginBottom: 8 }}>💌 Send Message</div>
              <div className="flex flex-col gap-2">
                <input className="pixel-input" placeholder="Your name..." />
                <input className="pixel-input" placeholder="Your email..." />
                <textarea className="pixel-input" rows={3} placeholder="Your message..." style={{ resize: 'vertical' }} />
                <button className="pixel-btn">Send Message ✉️</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
