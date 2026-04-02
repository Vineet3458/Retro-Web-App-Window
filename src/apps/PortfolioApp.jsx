import React, { useState } from 'react';

const PortfolioApp = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = ['about', 'projects', 'skills', 'contact'];

  const projects = [
    { name: 'Pixel OS', desc: 'A retro Windows 95-style OS simulation built with React', tech: 'React • Vite • CSS', status: 'LIVE' },
    { name: 'Retro Pixelizer', desc: 'Convert images to pixel art with retro filters', tech: 'JavaScript • Canvas', status: 'LIVE' },
    { name: 'AI Chatbot', desc: 'Gemini-powered chat bot with a retro terminal interface', tech: 'React • Gemini API', status: 'BETA' },
    { name: 'Snake JS', desc: 'Classic snake game built in pure JavaScript', tech: 'JavaScript • Canvas', status: 'LIVE' },
  ];

  const skills = [
    { name: 'React', pct: 90 }, { name: 'JavaScript', pct: 88 },
    { name: 'CSS / Tailwind', pct: 85 }, { name: 'Node.js', pct: 72 },
    { name: 'Python', pct: 68 }, { name: 'Git', pct: 80 },
  ];

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] font-pixel text-black select-none overflow-hidden">
      {/* Header */}
      <div className="pixel-bar py-3 px-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white pixel-border flex items-center justify-center text-2xl shrink-0">👤</div>
        <div>
          <div className="text-white font-bold text-sm tracking-wider">MY PORTFOLIO</div>
          <div className="text-[9px] text-blue-200 uppercase">Developer · Designer · Pixel Enthusiast</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-600 bg-[#dfdfdf] shrink-0">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[9px] uppercase font-bold border-r border-gray-500 transition-colors
              ${activeTab === tab ? 'bg-white border-b-2 border-b-white -mb-px text-[#000080]' : 'hover:bg-[#c0c0c0] text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-20 h-20 bg-[#c0c0c0] pixel-border flex items-center justify-center text-4xl shrink-0">👨‍💻</div>
              <div>
                <h2 className="text-sm font-bold text-[#000080] mb-1">VINEET</h2>
                <p className="text-[9px] text-gray-700 leading-5">
                  Full-stack developer passionate about retro aesthetics, pixel art, and building fun interactive experiences.
                  I love combining nostalgia with modern web tech.
                </p>
              </div>
            </div>
            <div className="bg-[#c0c0c0] pixel-border p-3 space-y-1 text-[9px]">
              <div className="flex justify-between"><span className="text-gray-600">STATUS:</span><span className="text-green-700 font-bold">AVAILABLE FOR HIRE</span></div>
              <div className="flex justify-between"><span className="text-gray-600">LOCATION:</span><span>INDIA 🇮🇳</span></div>
              <div className="flex justify-between"><span className="text-gray-600">EXPERIENCE:</span><span>2+ YEARS</span></div>
              <div className="flex justify-between"><span className="text-gray-600">FOCUS:</span><span>WEB · UI/UX · RETRO</span></div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.name} className="bg-[#dfdfdf] pixel-border p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[#000080] text-[10px]">{p.name}</span>
                  <span className={`text-[7px] px-1 py-0.5 ${p.status === 'LIVE' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-black'}`}>{p.status}</span>
                </div>
                <p className="text-[9px] text-gray-700 mb-1">{p.desc}</p>
                <div className="text-[8px] text-gray-500 italic">{p.tech}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-3">
            {skills.map(s => (
              <div key={s.name}>
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="font-bold">{s.name}</span>
                  <span className="text-gray-600">{s.pct}%</span>
                </div>
                <div className="w-full h-3 bg-[#c0c0c0] pixel-border-in">
                  <div
                    className="h-full bg-[#000080] transition-all duration-500"
                    style={{ width: `${s.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="bg-[#dfdfdf] pixel-border p-3 space-y-2 text-[9px]">
              <div className="flex items-center gap-2"><span>📧</span><span>vineet@pixelmail.dev</span></div>
              <div className="flex items-center gap-2"><span>🐙</span><span>github.com/vineet</span></div>
              <div className="flex items-center gap-2"><span>💼</span><span>linkedin.com/in/vineet</span></div>
              <div className="flex items-center gap-2"><span>🌐</span><span>vineet.dev</span></div>
            </div>
            <div className="bg-[#000080] text-white pixel-border p-3 text-[9px] text-center">
              <div className="text-lg mb-1">📬</div>
              <div>DROP A MESSAGE ANYTIME!</div>
              <div className="text-blue-300 mt-1">RESPONSE WITHIN 24 HOURS</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioApp;
