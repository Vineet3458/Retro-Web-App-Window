import React, { useState, useEffect } from 'react';

const BootScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "ROM BIOS Version 2.10 A",
    "Copyright (C) 1994, 2026 PIXELCORE INC.",
    "",
    "Memory Test: 640K OK",
    "Floppy Drive A: 1.44MB",
    "Primary Master: 2.1GB Disk",
    "Secondary Master: CD-ROM",
    "",
    "Initializing PIXELCORE Kernel...",
    "Loading React drivers... OK",
    "Mounting TailwindCSS... OK",
    "Starting Graphical User Interface...",
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100000] flex flex-col items-center justify-center font-pixel text-[#00ff00] text-xs p-10 cursor-none">
      <div className="w-full max-w-2xl flex flex-col gap-2">
        <div className="mb-8 flex items-center gap-4">
           <div className="w-16 h-16 bg-[#00ff00] animate-pulse"></div>
           <div className="font-pixel text-2xl uppercase font-bold tracking-[0.2em] shadow-[0_0_10px_#00ff00]">PIXEL OS</div>
        </div>
        
        <div className="flex flex-col gap-1 min-h-[300px]">
          {logs.map((log, i) => (
            <div key={i} className={i === logs.length - 1 ? 'animate-pulse' : ''}>
               {log === "" ? "\u00A0" : `> ${log}`}
            </div>
          ))}
        </div>

        <div className="mt-10 w-full bg-[#111] pixel-border h-4 relative overflow-hidden">
          <div 
            className="h-full bg-[#00ff00]" 
            style={{ 
              width: `${(logs.length / bootLogs.length) * 100}%`,
              transition: 'width 0.2s linear'
            }}
          />
        </div>
        <div className="text-right text-[8px] opacity-70 mt-2 uppercase">System initialization in progress...</div>
      </div>
    </div>
  );
};

export default BootScreen;
