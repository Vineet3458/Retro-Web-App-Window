import React from 'react';
import { HiHeart } from "react-icons/hi2";

const AboutApp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 font-pixel text-black bg-[#dfdfdf]">
      <div className="w-24 h-24 bg-white pixel-border flex items-center justify-center p-2 mb-4 animate-bounce">
        <HiHeart size={64} className="text-red-500 fill-current" />
      </div>
      
      <div className="text-center space-y-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold tracking-widest uppercase border-b-4 border-black pb-2">
          PIXELCORE OS
        </h1>
        
        <p className="font-pixel text-[11px] text-gray-800 leading-6 drop-shadow-sm">
          A high-fidelity retro experience built with React, Tailwind CSS, and React Icons.
        </p>

        <div className="flex gap-2 justify-center py-4">
          <div className="px-2 py-1 bg-black text-white text-[8px]">v1.0.4</div>
          <div className="px-2 py-1 bg-blue-700 text-white text-[8px]">STABLE</div>
          <div className="px-2 py-1 bg-green-600 text-white text-[8px]">PROUDLY PIXELATED</div>
        </div>

        <div className="bg-[#c0c0c0] pixel-border-in p-4 text-[9px] text-left space-y-2">
          <p>&gt; SYSTEM_ID: PX-OS-9981</p>
          <p>&gt; KERNEL: REACT_19.2.0</p>
          <p>&gt; UI_ENGINE: TAILWIND_CSS_4.0</p>
          <p>&gt; BUILD_STATUS: SUCCESSFUL</p>
        </div>

        <p className="text-[8px] text-gray-600 mt-6 mt-4">
           DEVELOPED BY THE PIXELCORE TEAM. ALL RIGHTS RESERVED 2026.
        </p>
      </div>
    </div>
  );
};

export default AboutApp;
