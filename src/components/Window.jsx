import React from "react";

const Window = ({ url, title, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50">

      {/* Top Bar */}
      <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2">
        <span>{title}</span>
        <button onClick={onClose}>✕</button>
      </div>

      {/* App Content */}
      <iframe
        src={url}
        title={title}
        className="w-full h-[calc(100%-40px)] border-none"
      ></iframe>

    </div>
  );
};

export default Window;