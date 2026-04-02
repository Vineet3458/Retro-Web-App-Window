import React, { useState } from "react";
import { Rnd } from "react-rnd";

const Window = ({
  title,
  onClose,
  emoji,
  children,
  isActive,
  defaultSize = { width: 620, height: 420 },
  defaultPosition = { x: 120, y: 60 },
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) return null;

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      size={isMaximized ? { width: "100vw", height: "calc(100vh - 48px)" } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      minWidth={280}
      minHeight={180}
      bounds="parent"
      dragHandleClassName="window-handle"
      className={`pixel-border flex flex-col pixel-shadow animate-snap ${
        isMaximized ? "!transition-none" : ""
      }`}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
    >
      {/* ── Title Bar ── */}
      <div
        className={`window-handle flex justify-between items-center px-1.5 py-1 cursor-pixel select-none shrink-0 ${
          isActive ? "pixel-bar" : "pixel-bar-inactive"
        }`}
      >
        {/* Title */}
        <div className="flex items-center gap-1.5 overflow-hidden">
          {emoji && (
            <span className="text-sm leading-none shrink-0">{emoji}</span>
          )}
          <span className="font-pixel text-[9px] sm:text-[10px] truncate uppercase tracking-wider">
            {title}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Minimize */}
          <button
            className="pixel-btn !p-0 w-5 h-5 flex items-center justify-center active:translate-y-0 text-black text-xs font-bold"
            onClick={() => setIsMinimized(true)}
            title="Minimize"
          >
            _
          </button>
          {/* Maximize */}
          <button
            className="pixel-btn !p-0 w-5 h-5 flex items-center justify-center active:translate-y-0 text-black text-xs font-bold"
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? "❐" : "□"}
          </button>
          {/* Close */}
          <button
            className="pixel-btn !p-0 w-5 h-5 flex items-center justify-center active:translate-y-0 bg-[#c0c0c0] hover:!bg-[#cc0000] text-black hover:text-white text-xs font-bold group"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── App Content ── */}
      <div className="flex-1 pixel-border-in m-1 overflow-hidden cursor-default text-black bg-white relative">
        <div className="h-full w-full overflow-auto">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;