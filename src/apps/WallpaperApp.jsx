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
    <div className="flex flex-col h-full">
      <h2 className="font-pixel mb-4 text-center">Select Wallpaper</h2>
      <div className="grid grid-cols-2 gap-4 flex-1 overflow-auto p-2">
        {wallpapers.map((w, idx) => (
          <button
            key={idx}
            className="flex flex-col items-center justify-center pixel-btn p-2 h-24 font-pixel text-xs"
            onClick={() => setWallpaper(w)}
          >
            <div 
              className="w-16 h-12 mb-2 border border-black" 
              style={{ background: w.url ? `url(${w.url}) center/cover` : w.color }}
            ></div>
            <span>{w.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WallpaperApp;
