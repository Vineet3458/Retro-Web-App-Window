import React from "react";

const Icon = ({ src, IconComponent, label, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`icon-container cursor-pixel flex flex-col items-center justify-center w-24 ${isActive ? 'active' : ''}`}
      title={label}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-1 relative">
        {src ? (
          <img 
            src={src} 
            alt={label} 
            className="w-10 h-10 object-contain image-pixelated" 
            style={{ imageRendering: 'pixelated' }}
          />
        ) : IconComponent ? (
          <div className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
            <IconComponent size={32} strokeWidth={2.5} />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gray-400 pixel-border"></div>
        )}
      </div>
      <span className="text-white text-[10px] font-pixel text-center px-1 leading-tight drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
        {label}
      </span>
    </div>
  );
};

export default Icon;