import React from 'react';

const wallpapers = [
  { name: 'Original Space', url: '../assets/wallpaper.gif', color: '#008080' },
  { name: 'Win95 Classic', color: '#008080' },
  { name: 'Retro Grid City', url: 'https://media.giphy.com/media/xThuWpe7SExZemT5kY/giphy.gif', color: '#000000' },
  { name: 'Pixel Forest', url: 'https://media.giphy.com/media/L0IWW0t50z0pIVp7Wv/giphy.gif', color: '#2b2b2b' },
  { name: 'Night City', url: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif', color: '#000000' },
  { name: 'Sunset Vibe', url: 'https://media.giphy.com/media/3o8cH1d2yqH3F3Y6b2/giphy.gif', color: '#ff6600' },
  { name: 'Vaporwave', url: 'https://media.giphy.com/media/xT1XGzYMwHOiaHUd20/giphy.gif', color: '#ff00ff' },
  { name: '8-Bit Space', url: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif', color: '#0b0c10' },
  { name: 'Cozy Room', url: 'https://media.giphy.com/media/l41JQK1uJ1XmN430Q/giphy.gif', color: '#2c3e50' },
  { name: 'Mario World', url: 'https://media.giphy.com/media/131R11n4VLY78Q/giphy.gif', color: '#5c94fc' }
];

const WallpaperApp = ({ setWallpaper }) => {
  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] font-pixel p-2">
      <div className="mb-4 text-center p-2 border-b-2 border-dashed border-gray-400">
        <h2 className="text-xs uppercase tracking-widest text-[#000080] font-bold">Display Properties</h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-[#dfdfdf] pixel-border-in custom-scrollbar">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {wallpapers.map((w, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center group transition-transform hover:scale-105 active:scale-95"
              onClick={() => setWallpaper(w)}
            >
              <div className="p-1 pixel-border bg-white mb-2 group-hover:border-[#000080]">
                <div 
                  className="w-24 h-16 border border-black shadow-inner" 
                  style={{ 
                    background: w.url ? `url(${w.url}) center/cover` : w.color,
                    imageRendering: 'pixelated'
                  }}
                ></div>
              </div>
              <span className="text-[8px] font-bold text-center text-black uppercase">{w.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="pixel-btn text-[9px] px-4 py-1" onClick={() => {}}>OK</button>
        <button className="pixel-btn text-[9px] px-4 py-1" onClick={() => {}}>CANCEL</button>
      </div>
    </div>
  );
};

export default WallpaperApp;

