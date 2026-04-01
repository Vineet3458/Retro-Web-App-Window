import React, { useState, useEffect } from 'react';

const MediaApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 2; // fake progress
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col h-full bg-[#1e293b] text-[#f8fafc] p-4 font-pixel">
      <h2 className="text-center text-[#38bdf8] mb-4 text-xl tracking-widest border-b border-[#38bdf8] pb-2">RETRO AMP</h2>
      
      <div className="flex items-center justify-center h-32 mb-4 bg-black border border-[#475569] pixel-border-in relative overflow-hidden">
        {isPlaying ? (
          <div className="w-full flex justify-around items-end h-full px-2">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 bg-gradient-to-t from-green-500 via-yellow-500 to-red-500`}
                style={{ 
                  height: `${Math.random() * 80 + 20}%`,
                  transition: 'height 0.2s ease-in-out',
                  animation: `bounce 0.${Math.floor(Math.random() * 5) + 3}s infinite alternate`
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-[#475569] text-xs uppercase animate-pulse">■ STOPPED ■</div>
        )}
      </div>

      <div className="mb-4 text-xs text-center text-[#94a3b8]">TRACK 1: 8-BIT RUNNER</div>

      <div className="w-full bg-[#0f172a] h-4 mb-4 border border-[#475569]">
        <div className="h-full bg-[#38bdf8]" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex justify-center gap-4 cursor-pointer">
        <button className="pixel-btn bg-[#c0c0c0] text-black px-4 py-2 hover:bg-white active:bg-gray-400" onClick={() => setProgress(0)}>
          ⏮
        </button>
        <button className="pixel-btn bg-[#c0c0c0] text-black px-6 py-2 hover:bg-white active:bg-gray-400 text-lg" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="pixel-btn bg-[#c0c0c0] text-black px-4 py-2 hover:bg-white active:bg-gray-400">
          ⏭
        </button>
      </div>
    </div>
  );
};

export default MediaApp;
