import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { X, Minus, Square } from "lucide-react";

const Window = ({ title, onClose, children, defaultSize = { width: 600, height: 400 }, defaultPosition = { x: 100, y: 100 } }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  // When maximized, we disable Rnd dragging/resizing classes using bounds or custom styling
  // But to keep it simple, we'll just expand the size to 100%.
  
  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: isMaximized ? window.innerWidth : defaultSize.width,
        height: isMaximized ? window.innerHeight : defaultSize.height,
      }}
      size={isMaximized ? { width: '100vw', height: '100vh' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-handle"
      className={`pixel-border flex flex-col z-50 ${isMaximized ? '!transition-none !fixed !top-0 !left-0 !w-screen !h-screen' : ''}`}
      disableDragging={isMaximized}
    >
      {/* Top Bar - Drag Handle */}
      <div className="window-handle pixel-bar flex justify-between items-center px-2 py-1 cursor-pixel" style={{ cursor: isMaximized ? 'default' : 'move' }}>
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] sm:text-xs pt-1">{title}</span>
        </div>
        <div className="flex items-center gap-1 auto-cursor">
          <button className="pixel-btn bg-gray-300 px-1 py-0.5" onClick={() => {}}>
            <Minus size={14} className="text-black" />
          </button>
          <button className="pixel-btn bg-gray-300 px-1 py-0.5" onClick={() => setIsMaximized(!isMaximized)}>
            <Square size={14} className="text-black" />
          </button>
          <button className="pixel-btn bg-gray-300 px-1 py-0.5" onClick={onClose}>
            <X size={14} className="text-black" />
          </button>
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 bg-gray-200 pixel-border-in m-1 p-1 overflow-auto cursor-default text-black">
        {children}
      </div>
    </Rnd>
  );
};

export default Window;