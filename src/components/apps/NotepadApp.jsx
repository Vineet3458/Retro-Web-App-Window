import React, { useState } from 'react';

const NotepadApp = () => {
  const [text, setText] = useState('Welcome to Notepad!');
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 mb-1">
        <button className="text-sm font-pixel px-1 hover:bg-blue-600 hover:text-white cursor-pointer">File</button>
        <button className="text-sm font-pixel px-1 hover:bg-blue-600 hover:text-white cursor-pointer">Edit</button>
        <button className="text-sm font-pixel px-1 hover:bg-blue-600 hover:text-white cursor-pointer">Format</button>
        <button className="text-sm font-pixel px-1 hover:bg-blue-600 hover:text-white cursor-pointer">View</button>
        <button className="text-sm font-pixel px-1 hover:bg-blue-600 hover:text-white cursor-pointer">Help</button>
      </div>
      <textarea 
        className="flex-1 w-full bg-white pixel-border-in p-2 font-pixel resize-none outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default NotepadApp;
