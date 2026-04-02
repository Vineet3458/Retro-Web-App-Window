import React, { useState } from 'react';
import { HiComputerDesktop, HiPhone, HiSpeakerWave, HiShieldCheck } from 'react-icons/hi2';

const SystemSettingsApp = ({ setWallpaper }) => {
  const themes = [
    { name: 'Classic Teal', color: '#008080' },
    { name: 'Retro Blue', color: '#000080' },
    { name: 'Midnight', color: '#1a1a1a' },
    { name: 'Cyber Neon', color: '#ff00ff' },
    { name: 'Muted Gray', color: '#404040' },
  ];

  const wallpapers = [
    { name: 'Retro Grid', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Pixel Sunset', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Matrix Rain', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 h-full bg-[#f0f0f0] overflow-y-auto">
      <div>
        <h2 className="font-pixel text-xs mb-3 text-black flex items-center gap-2 border-b-2 border-dashed border-gray-400 pb-1">
          <HiComputerDesktop size={18} /> DISPLAY SETTINGS
        </h2>
        <div className="space-y-4">
          <div>
            <span className="block font-pixel text-[10px] mb-2 text-gray-700 uppercase">Background Color</span>
            <div className="flex flex-wrap gap-2">
              {themes.map(t => (
                <button
                  key={t.name}
                  onClick={() => setWallpaper({ url: null, color: t.color })}
                  className="w-10 h-10 pixel-border hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: t.color }}
                  title={t.name}
                />
              ))}
            </div>
          </div>
          
          <div>
            <span className="block font-pixel text-[10px] mb-2 text-gray-700 uppercase">HD wallpapers</span>
            <div className="grid grid-cols-2 gap-2">
              {wallpapers.map(w => (
                <button
                  key={w.name}
                  onClick={() => setWallpaper({ url: w.url, color: '#000' })}
                  className="pixel-border overflow-hidden group hover:border-[#000080]"
                >
                  <img src={w.url} className="h-16 w-full object-cover group-hover:scale-105 transition-transform" alt={w.name} />
                  <span className="block text-[8px] bg-white p-1 truncate font-pixel">{w.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-pixel text-xs mb-3 text-black flex items-center gap-2 border-b-2 border-dashed border-gray-400 pb-1">
          <HiPhone size={18} /> OS INFO
        </h2>
        <div className="pixel-border-in bg-white p-3 space-y-2 text-[10px] font-pixel">
          <p className="flex justify-between"><span>OS VERSION</span> <span className="text-blue-700">1.0.4 - PIXELCORE</span></p>
          <p className="flex justify-between"><span>KERNEL</span> <span className="text-blue-700">REACT 18.2.0</span></p>
          <p className="flex justify-between"><span>STATUS</span> <span className="text-green-600 font-bold">OPTIMIZED</span></p>
          <p className="flex justify-between"><span>UPTIME</span> <span className="text-gray-500">2:45:12</span></p>
        </div>
      </div>

      <div className="mt-auto pt-4 flex gap-2">
        <button className="pixel-btn flex-1 py-1 font-pixel text-[10px]">APPLY</button>
        <button className="pixel-btn flex-1 py-1 font-pixel text-[10px]">CANCEL</button>
      </div>
    </div>
  );
};

export default SystemSettingsApp;
