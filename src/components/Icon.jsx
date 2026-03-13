import React from "react";

const Icon = ({ src, label, onClick }) => {
  return (
    <span
      onClick={onClick}
      className="cursor-pointer w-20 hover:bg-white/20 p-2 rounded"
    >
      <img src={src} alt={label} className="w-6 h-6" />
      <br />
      <span className="text-white bg-stone-950 text-xl mt-1">{label}</span>
    </span>
  );
};

export default Icon;