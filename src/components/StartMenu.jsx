import React from 'react';
import { HiUser, HiArrowLeftOnRectangle, HiCog, HiQuestionMarkCircle, HiFolder, HiCommandLine } from 'react-icons/hi2';

const StartMenu = ({ isOpen, onClose, apps, onOpenApp }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-12 left-0 w-64 md:w-72 bg-[#c0c0c0] pixel-border z-[10001] shadow-2xl overflow-hidden flex">
      {/* Left sidebar banner */}
      <div className="w-8 shrink-0 bg-[#000080] bg-gradient-to-t from-[#000080] to-[#1084d0] flex items-end justify-center py-4 overflow-hidden border-r border-[#ffffff]">
        <span className="text-white font-bold text-lg origin-center -rotate-90 whitespace-nowrap tracking-widest opacity-80 select-none pb-2" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
          PIXEL OS
        </span>
      </div>

      {/* Menu content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* User profile */}
        <div className="p-3 border-b border-gray-500 bg-[#dfdfdf] flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-400 pixel-border-in flex items-center justify-center">
            <HiUser size={20} />
          </div>
          <span className="font-pixel text-[10px] text-black">Guest User</span>
        </div>

        {/* App list */}
        <div className="flex-1 py-1 overflow-y-auto max-h-[400px] bg-white">
          {apps.map(app => (
            <button
              key={app.id}
              onClick={() => {
                onOpenApp(app);
                onClose();
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white transition-colors group"
            >
              <img src={app.src} className="w-5 h-5 object-contain" alt="" style={{ imageRendering: 'pixelated' }} />
              <span className="font-pixel text-[9px] uppercase">{app.label}</span>
            </button>
          ))}
          
          <div className="h-px bg-gray-500 mx-1 my-2"></div>
          
          <button className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white transition-colors group">
             <HiCommandLine size={20} className="text-gray-700 group-hover:text-white" />
             <span className="font-pixel text-[9px]">TERMINAL</span>
          </button>
          <button className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white transition-colors group">
             <HiCog size={20} className="text-gray-700 group-hover:text-white" />
             <span className="font-pixel text-[9px]">CONTROL PANEL</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-1 border-t border-gray-500 flex flex-col">
          <button className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#000080] hover:text-white transition-colors group">
            <HiArrowLeftOnRectangle size={20} className="text-gray-700 group-hover:text-white" strokeWidth={3} />
            <span className="font-pixel text-[10px]">SHUT DOWN...</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
