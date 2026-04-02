import React, { useState } from 'react';

const NotepadApp = () => {
  const [text, setText] = useState('Welcome to Notepad!\n\nThis is a simple retro text editor with pixel styling.');
  
  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      <div className="flex gap-4 px-2 py-1 border-b border-gray-400">
        {['File', 'Edit', 'Format', 'View', 'Help'].map(item => (
          <button key={item} className="text-[10px] font-pixel px-1 hover:bg-[#000080] hover:text-white cursor-pixel transition-colors">
            {item}
          </button>
        ))}
      </div>
      <div className="flex-1 p-1 bg-[#dfdfdf]">
        <textarea 
          className="w-full h-full bg-white pixel-border-in p-3 font-pixel text-xs resize-none outline-none leading-relaxed"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
      </div>
      <div className="h-5 px-2 bg-[#c0c0c0] border-t border-white flex items-center justify-between text-[8px] font-pixel text-gray-700">
        <span>Lines: {text.split('\n').length}</span>
        <span>Characters: {text.length}</span>
      </div>
    </div>
  );
};

export default NotepadApp;

