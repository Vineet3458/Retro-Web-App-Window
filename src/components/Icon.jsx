import React from "react";

const Icon = ({ src, IconComponent, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pixel flex flex-col items-center justify-center w-24 hover:bg-black/20 p-2 rounded active:bg-black/40 border border-transparent hover:border-white/50 border-dashed"
      title={label}
    >
      {src ? (
        <img src={src} alt={label} className="w-10 h-10 object-cover pixel-border-in mb-1" />
      ) : IconComponent ? (
        <div className="w-10 h-10 flex items-center justify-center text-white drop-shadow-md mb-1 pb-1">
          <IconComponent size={32} />
        </div>
      ) : null}
      <span className="text-white text-[11px] font-pixel text-center px-1 bg-black/50 drop-shadow-md pb-1 break-words">
        {label}
      </span>
    </div>
  );
};

export default Icon;