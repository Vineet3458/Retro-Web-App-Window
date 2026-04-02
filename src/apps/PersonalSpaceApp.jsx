import React from 'react';

const PersonalSpaceApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#dfdfdf] font-pixel p-1 overflow-y-auto">
      <div className="flex-1 bg-[#c0c0c0] pixel-border p-6 flex flex-col items-center">
        <div className="relative mb-6 group">
          <div className="w-28 h-28 bg-white pixel-border-in flex items-center justify-center text-6xl group-hover:bg-blue-50 transition-colors">
            👾
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 pixel-border px-2 py-0.5 text-[8px] text-black font-bold">
            LVL 99
          </div>
        </div>

        <h1 className="text-sm mb-6 text-[#000080] font-bold uppercase tracking-widest border-b-2 border-dashed border-blue-800 pb-1 w-full text-center">
          Agent Profile
        </h1>

        <div className="w-full space-y-4">
          <div className="bg-white pixel-border-in p-4 space-y-3 shadow-inner">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">IDENTIFIER:</span>
              <span className="text-black font-bold">GUEST_0402</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">CLASS TYPE:</span>
              <span className="text-[#aa0000] font-bold">RETRO_ENTHUSIAST</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">LOCATION:</span>
              <span className="text-black font-bold">PIXEL_CITY_NET</span>
            </div>
          </div>

          <div className="bg-[#000000] text-[#00ff00] p-3 pixel-border text-[9px] leading-relaxed italic opacity-90">
            "NAVIGATING THE 16-BIT COSMOS ONE PIXEL AT A TIME. DESTINY IS RENDERED IN 640x480."
          </div>
        </div>

        <div className="mt-8 flex gap-3 w-full">
          <button className="flex-1 pixel-btn bg-[#c0c0c0] text-[9px] py-2 uppercase font-bold text-black border-2">
            Settings
          </button>
          <button className="flex-1 pixel-btn bg-[#000080] text-white text-[9px] py-2 uppercase font-bold border-2">
            Save Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalSpaceApp;

