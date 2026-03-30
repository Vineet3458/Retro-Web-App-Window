import React from 'react';

const wallpapers = [
  { name: 'Default Space', url: '../assets/wallpaper.gif', color: '#008080' },
  { name: 'Win95 Teal', color: '#008080' },
  { name: 'Retro Grid', url: 'https://media.giphy.com/media/xThuWpe7SExZemT5kY/giphy.gif', color: '#000000' },
  { name: 'Pixel Forest', url: 'https://media.giphy.com/media/L0IWW0t50z0pIVp7Wv/giphy.gif', color: '#2b2b2b' }
];

const WallpaperApp = ({ setWallpaper }) => {
  return (
    <div className="flex flex-col h-full bg-gray-200">
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
