import React, { useState } from "react";

const Icon = ({ src, IconComponent, label, onDoubleClick, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`icon-container cursor-pixel flex flex-col items-center justify-center w-20 h-24 select-none ${isSelected ? 'active' : ''}`}
      title={label}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-1 relative pointer-events-none">
        {src ? (
          <img 
            src={src} 
            alt={label} 
            className={`w-10 h-10 object-contain image-pixelated ${isSelected ? 'brightness-75' : ''}`} 
            style={{ imageRendering: 'pixelated' }}
          />
        ) : IconComponent ? (
          <div className={`text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] ${isSelected ? 'opacity-70' : ''}`}>
            <IconComponent size={32} strokeWidth={2.5} />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gray-400 pixel-border"></div>
        )}
      </div>
      <span className={`text-white text-[9px] font-pixel text-center px-1 leading-tight break-words max-w-full drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] ${isSelected ? 'bg-blue-800' : ''}`}>
        {label}
      </span>
    </div>
  );
};

export default Icon;
