import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { HiXMark, HiMinus, HiSquare2Stack } from "react-icons/hi2";

const Window = ({ title, onClose, icon, children, isActive, defaultSize = { width: 600, height: 400 }, defaultPosition = { x: 100, y: 100 } }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      size={isMaximized ? { width: '100vw', height: 'calc(100vh - 48px)' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-handle"
      className={`pixel-border flex flex-col z-50 pixel-shadow animate-snap ${isMaximized ? '!transition-none !fixed !top-0 !left-0 !w-screen' : ''}`}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
    >
      {/* Top Bar - Drag Handle */}
      <div className={`window-handle flex justify-between items-center px-1.5 py-1 cursor-pixel select-none ${isActive ? 'pixel-bar' : 'pixel-bar-inactive'}`}>
        <div className="flex items-center gap-2 overflow-hidden">
          {icon && <img src={icon} className="w-4 h-4 object-contain" alt="" style={{ imageRendering: 'pixelated' }} />}
          <span className="font-pixel text-[9px] sm:text-[10px] truncate uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button className="pixel-btn !p-0.5 active:translate-y-0" onClick={() => {}}>
            <HiMinus size={12} strokeWidth={3} className="text-black" />
          </button>
          <button className="pixel-btn !p-0.5 active:translate-y-0" onClick={() => setIsMaximized(!isMaximized)}>
            <HiSquare2Stack size={10} strokeWidth={3} className="text-black" />
          </button>
          <button className="pixel-btn !p-0.5 !bg-[#c0c0c0] hover:!bg-[#cc0000] active:translate-y-0 group" onClick={onClose}>
            <HiXMark size={12} strokeWidth={3} className="text-black group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 pixel-border-in m-1 p-0.5 overflow-auto cursor-default text-black bg-white relative">
        <div className="h-full w-full overflow-auto p-2">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;