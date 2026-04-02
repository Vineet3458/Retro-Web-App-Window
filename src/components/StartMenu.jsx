import React from "react";

const StartMenu = ({ isOpen, onClose, apps, onOpenApp }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-12 left-0 w-64 bg-[#c0c0c0] pixel-border z-[100000] shadow-2xl overflow-hidden flex"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left sidebar banner */}
      <div className="w-8 shrink-0 flex items-end justify-center py-3 overflow-hidden border-r border-[#ffffff]"
        style={{ background: "linear-gradient(to top, #000080, #1084d0)" }}>
        <span
          className="text-white font-bold text-sm origin-center whitespace-nowrap select-none tracking-widest opacity-90"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            textShadow: "1px 1px 0px rgba(0,0,0,0.6)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "9px",
          }}
        >
          PixelOS 98
        </span>
      </div>

      {/* Menu content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* User profile */}
        <div className="p-2 border-b border-gray-500 bg-[#dfdfdf] flex items-center gap-2">
          <div className="w-8 h-8 bg-[#c0c0c0] pixel-border flex items-center justify-center text-lg">
            👤
          </div>
          <span className="font-pixel text-[9px] text-black">Guest User</span>
        </div>

        {/* App list */}
        <div className="flex-1 py-1 overflow-y-auto max-h-[380px] bg-white">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => { onOpenApp(app); onClose(); }}
              className="w-full text-left px-3 py-1.5 flex items-center gap-3 hover:bg-[#000080] hover:text-white transition-colors group"
            >
              <span className="text-xl leading-none shrink-0 w-6 text-center">{app.emoji}</span>
              <span className="font-pixel text-[9px] uppercase truncate group-hover:text-white text-black">{app.label}</span>
            </button>
          ))}

          <div className="h-px bg-gray-400 mx-2 my-1" />

          <button className="w-full text-left px-3 py-1.5 flex items-center gap-3 hover:bg-[#000080] hover:text-white transition-colors group">
            <span className="text-xl leading-none shrink-0 w-6 text-center">🖥️</span>
            <span className="font-pixel text-[9px] uppercase text-black group-hover:text-white">Run...</span>
          </button>
        </div>

        {/* Divider + Shutdown */}
        <div className="border-t border-gray-500">
          <button className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-[#000080] hover:text-white transition-colors group">
            <span className="text-xl leading-none shrink-0 w-6 text-center">🔌</span>
            <span className="font-pixel text-[10px] text-black group-hover:text-white">Shut Down...</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
