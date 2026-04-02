import React from "react";

const Icon = ({ emoji, label, onDoubleClick, isSelected, onClick }) => {
  // Shorten long labels for display
  const shortLabel = label.length > 12 ? label.slice(0, 11) + "…" : label;

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`icon-container cursor-pixel flex flex-col items-center justify-start w-[72px] h-[66px] select-none ${isSelected ? "active" : ""}`}
      title={label}
    >
      {/* Emoji icon */}
      <div
        className="w-9 h-9 flex items-center justify-center text-[26px] pointer-events-none leading-none mt-1 shrink-0"
      >
        {emoji}
      </div>

      {/* Label — single line, truncated to fit */}
      <span
        className={`text-white font-pixel text-center leading-tight mt-0.5 pointer-events-none drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] whitespace-nowrap ${
          isSelected ? "bg-[#000080] outline outline-1 outline-[#808080] px-0.5" : ""
        }`}
        style={{ fontSize: "7px" }}
      >
        {shortLabel}
      </span>
    </div>
  );
};

export default Icon;