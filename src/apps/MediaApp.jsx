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
          return p + 1.5; 
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black p-2 font-pixel">
      <div className="bg-[#000080] text-white p-1 mb-2 text-[8px] flex justify-between items-center px-2">
        <span className="uppercase tracking-widest font-bold italic">Retro Amp v1.0</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-[#dfdfdf]"></div>
          <div className="w-1.5 h-1.5 bg-[#dfdfdf]"></div>
        </div>
      </div>
      
      <div className="flex-1 bg-black border-2 border-[#808080] p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        {/* Dynamic Visualizer */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(transparent_0px,transparent_1px,#00ff00_2px)]"></div>
        
        {isPlaying ? (
          <div className="w-full flex justify-around items-end h-16 px-4 gap-1">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="w-full bg-[#00ff00] border-t-2 border-[#004400]"
                style={{ 
                  height: `${Math.floor(Math.random() * 80 + 20)}%`,
                  transition: 'height 0.15s ease-in-out',
                  boxShadow: '0 0 10px rgba(0,255,0,0.3)'
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-[#004400] text-[10px] uppercase font-bold tracking-widest italic animate-pulse">
            - LOAD_SYSTEM_AUDIO -
          </div>
        )}

        <div className="mt-4 text-[8px] text-[#00ff00] uppercase font-bold tracking-tighter w-full text-center truncate px-2">
          {isPlaying ? 'PLAYING: SYNTH_WAVE_01.MP3' : 'READY_TO_BOOT'}
        </div>
      </div>

      <div className="mt-4 bg-[#dfdfdf] pixel-border-in p-2 space-y-3">
        <div className="w-full bg-black h-2 relative border border-[#808080]">
          <div className="h-full bg-[#000080]" style={{ width: `${progress}%` }}></div>
          <div className="absolute top-0 w-1 h-3 bg-white -mt-0.5 border border-black" style={{ left: `${progress}%` }}></div>
        </div>

        <div className="flex justify-center items-center gap-3">
          <button className="pixel-btn !p-1 bg-[#c0c0c0]" onClick={() => setProgress(0)}>
            <div className="w-4 h-4 flex items-center justify-center text-[8px]">⏮</div>
          </button>
          <button className="pixel-btn !px-4 !py-1 bg-[#c0c0c0] font-bold text-[10px]" onClick={togglePlay}>
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          <button className="pixel-btn !p-1 bg-[#c0c0c0]">
            <div className="w-4 h-4 flex items-center justify-center text-[8px]">⏭</div>
          </button>
        </div>
      </div>

      <div className="mt-2 flex justify-between text-[7px] text-gray-600 uppercase font-bold px-1">
        <span>Vol: 100%</span>
        <span>Bal: Center</span>
      </div>
    </div>
  );
};

export default MediaApp;

