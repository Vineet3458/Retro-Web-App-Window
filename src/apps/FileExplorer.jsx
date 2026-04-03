// apps/FileExplorer.jsx
import React, { useState } from 'react'

const FS = {
  name: 'My Computer',
  type: 'root',
  children: [
    {
      name: 'C: Drive', type: 'drive', icon: '💾',
      children: [
        {
          name: 'Documents', type: 'folder', icon: '📁',
          children: [
            { name: 'Resume.docx', type: 'file', icon: '📄', size: '24 KB', modified: '12/01/2025' },
            { name: 'Project_Report.pdf', type: 'file', icon: '📋', size: '1.2 MB', modified: '15/02/2025' },
            { name: 'Notes.txt', type: 'file', icon: '📝', size: '4 KB', modified: '10/03/2025' },
          ]
        },
        {
          name: 'Pictures', type: 'folder', icon: '🖼️',
          children: [
            { name: 'Screenshot.png', type: 'file', icon: '🖼️', size: '2.1 MB', modified: '01/03/2025' },
            { name: 'Profile.jpg', type: 'file', icon: '🖼️', size: '856 KB', modified: '14/02/2025' },
          ]
        },
        {
          name: 'Projects', type: 'folder', icon: '📁',
          children: [
            {
              name: 'PixelOS', type: 'folder', icon: '📁',
              children: [
                { name: 'src', type: 'folder', icon: '📁', children: [] },
                { name: 'package.json', type: 'file', icon: '📄', size: '1.2 KB', modified: '01/04/2025' },
                { name: 'README.md', type: 'file', icon: '📝', size: '3.4 KB', modified: '01/04/2025' },
                { name: 'vite.config.js', type: 'file', icon: '⚙️', size: '0.3 KB', modified: '01/04/2025' },
              ]
            },
            { name: 'ChatApp', type: 'folder', icon: '📁', children: [] },
          ]
        },
        { name: 'config.sys', type: 'file', icon: '⚙️', size: '1 KB', modified: '01/01/2025' },
        { name: 'autoexec.bat', type: 'file', icon: '⚡', size: '2 KB', modified: '01/01/2025' },
      ]
    },
    {
      name: 'D: Downloads', type: 'drive', icon: '💿',
      children: [
        { name: 'react-18.zip', type: 'file', icon: '📦', size: '12 MB', modified: '10/03/2025' },
        { name: 'tailwindcss.zip', type: 'file', icon: '📦', size: '3.2 MB', modified: '10/03/2025' },
      ]
    },
    {
      name: 'Network', type: 'drive', icon: '🌐',
      children: [
        { name: 'SharedDocs', type: 'folder', icon: '📁', children: [] },
      ]
    },
    { name: 'Recycle Bin', type: 'drive', icon: '🗑️', children: [] },
  ]
}

function TreeNode({ node, level = 0, onSelect, selected }) {
  const [open, setOpen] = useState(level < 1)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selected === node

  return (
    <div>
      <div
        className="flex items-center gap-1 cursor-pointer hover:bg-blue-100 px-1"
        style={{
          paddingLeft: level * 16 + 4,
          background: isSelected ? '#000080' : 'transparent',
          color: isSelected ? 'white' : 'inherit',
          fontFamily: "'Press Start 2P'", fontSize: 7,
          height: 20,
        }}
        onClick={(e) => { e.stopPropagation(); onSelect(node); if (hasChildren) setOpen(o => !o) }}
        onDoubleClick={() => hasChildren && setOpen(o => !o)}
      >
        {hasChildren
          ? <span style={{ fontSize: 8 }}>{open ? '▼' : '▶'}</span>
          : <span style={{ width: 8 }} />
        }
        <span>{node.icon || (node.type === 'folder' ? '📁' : '📄')}</span>
        <span className="truncate">{node.name}</span>
      </div>
      {open && hasChildren && node.children.map((child, i) => (
        <TreeNode key={i} node={child} level={level + 1} onSelect={onSelect} selected={selected} />
      ))}
    </div>
  )
}

export default function FileExplorer() {
  const [selected, setSelected] = useState(null)
  const [path, setPath] = useState('My Computer')
  const [view, setView] = useState('icons') // 'icons' | 'list'

  const handleSelect = (node) => {
    setSelected(node)
    setPath(node.name)
  }

  const items = selected?.children || FS.children

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Toolbar */}
      <div className="menu-bar">
        <div className="menu-item">File</div>
        <div className="menu-item">Edit</div>
        <div className="menu-item">View</div>
        <div className="menu-item">Go</div>
        <div className="menu-item">Help</div>
      </div>

      <div className="flex items-center gap-2 p-1 border-b border-[#808080]">
        {['◀', '▶', '🔼'].map(b => (
          <button key={b} className="pixel-btn" style={{ width: 24, height: 22, fontSize: 10, padding: 0 }}>{b}</button>
        ))}
        <div className="flex items-center gap-1 flex-1">
          <span style={{ fontFamily: "'Press Start 2P'", fontSize: 7 }}>Address:</span>
          <div className="flex-1 pixel-border-in px-2" style={{ fontFamily: "'Press Start 2P'", fontSize: 7, height: 20, display: 'flex', alignItems: 'center', background: 'white' }}>
            📁 {path}
          </div>
        </div>
        <div className="flex gap-1">
          <button className={`pixel-btn ${view === 'icons' ? 'pressed' : ''}`} onClick={() => setView('icons')} style={{ fontSize: 10 }}>⊞</button>
          <button className={`pixel-btn ${view === 'list' ? 'pressed' : ''}`} onClick={() => setView('list')} style={{ fontSize: 10 }}>☰</button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tree */}
        <div
          className="overflow-auto flex-shrink-0 border-r border-[#808080]"
          style={{ width: 180, background: 'white' }}
        >
          <TreeNode node={FS} level={0} onSelect={handleSelect} selected={selected} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-2 bg-white">
          {view === 'icons' ? (
            <div className="flex flex-wrap gap-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 p-2 cursor-pointer hover:bg-blue-100 w-16"
                  style={{ textAlign: 'center' }}
                  onDoubleClick={() => handleSelect(item)}
                >
                  <span style={{ fontSize: 28 }}>{item.icon || (item.type === 'folder' ? '📁' : '📄')}</span>
                  <span style={{ fontFamily: "'Press Start 2P'", fontSize: 6, wordBreak: 'break-all' }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <table style={{ width: '100%', fontFamily: "'Press Start 2P'", fontSize: 7, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #808080', background: '#c0c0c0' }}>
                  <th style={{ textAlign: 'left', padding: '4px 8px' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '4px 8px' }}>Size</th>
                  <th style={{ textAlign: 'left', padding: '4px 8px' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '4px 8px' }}>Modified</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: '1px solid #eee', cursor: 'pointer' }}
                    className="hover:bg-blue-100"
                    onDoubleClick={() => handleSelect(item)}
                  >
                    <td style={{ padding: '4px 8px' }}><span className="mr-1">{item.icon}</span>{item.name}</td>
                    <td style={{ padding: '4px 8px' }}>{item.size || '--'}</td>
                    <td style={{ padding: '4px 8px' }}>{item.type}</td>
                    <td style={{ padding: '4px 8px' }}>{item.modified || '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {items.length === 0 && (
            <div style={{ fontFamily: "'Press Start 2P'", fontSize: 8, color: '#888', textAlign: 'center', marginTop: 40 }}>
              This folder is empty.
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="pixel-border-in mx-1 mb-1 px-2 py-1" style={{ fontFamily: "'Press Start 2P'", fontSize: 7 }}>
        {items.length} object(s) {selected?.size ? `| ${selected.size}` : ''}
      </div>
    </div>
  )
}
