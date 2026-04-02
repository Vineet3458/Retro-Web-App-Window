import React from 'react';
import { HiFolder, HiDocument, HiMagnifyingGlass, HiChevronRight, HiScale } from "react-icons/hi2";

const FileExplorerApp = () => {
  const files = [
    { name: 'Documents', type: 'folder', items: 3 },
    { name: 'Photos', type: 'folder', items: 12 },
    { name: 'Downloads', type: 'folder', items: 0 },
    { name: 'resume.pdf', type: 'file', size: '1.2 MB' },
    { name: 'notes.txt', type: 'file', size: '4 KB' },
    { name: 'todo.md', type: 'file', size: '2 KB' },
  ];

  return (
    <div className="flex h-full bg-white text-black font-pixel text-[10px] select-none">
      {/* Sidebar */}
      <div className="w-40 border-r border-gray-400 bg-[#dfdfdf] flex flex-col p-2 gap-2">
        <div className="flex items-center gap-1 p-1 bg-[#c0c0c0] pixel-border mb-2">
          <HiScale size={14} />
          <span>Local Disk (C:)</span>
        </div>
        <div className="flex items-center gap-1 p-1 hover:bg-[#000080] hover:text-white transition-colors cursor-pointer">
          <HiFolder size={14} />
          <span>Desktop</span>
        </div>
        <div className="flex items-center gap-1 p-1 hover:bg-[#000080] hover:text-white transition-colors cursor-pointer">
          <HiFolder size={14} />
          <span>Documents</span>
        </div>
        <div className="flex items-center gap-1 p-1 hover:bg-[#000080] hover:text-white transition-colors cursor-pointer">
          <HiFolder size={14} />
          <span>Downloads</span>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="h-10 border-b border-gray-400 bg-[#dfdfdf] flex items-center px-2 gap-4">
          <div className="flex gap-1">
            <button className="pixel-btn !p-1"><HiChevronRight className="rotate-180" size={14} /></button>
            <button className="pixel-btn !p-1"><HiChevronRight size={14} /></button>
          </div>
          <div className="flex-1 pixel-border-in bg-white h-7 flex items-center px-2 gap-2 opacity-80">
            <HiFolder size={14} className="text-yellow-600" />
            <span className="truncate">C:\Users\Guest\Desktop</span>
          </div>
          <div className="w-32 pixel-border-in bg-white h-7 flex items-center px-2 gap-2 opacity-80">
            <HiMagnifyingGlass size={14} />
            <span>Search...</span>
          </div>
        </div>

        {/* File View */}
        <div className="flex-1 p-4 grid grid-cols-4 md:grid-cols-6 gap-6 content-start overflow-y-auto">
          {files.map(f => (
            <div key={f.name} className="flex flex-col items-center gap-1 hover:bg-[#000080] hover:text-white transition-colors group p-1 h-fit cursor-pointer">
              {f.type === 'folder' ? (
                 <HiFolder size={32} className="text-yellow-600 group-hover:text-yellow-300" />
              ) : (
                <HiDocument size={32} className="text-gray-400 group-hover:text-white" />
              )}
              <span className="text-center break-all">{f.name}</span>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="h-6 border-t border-gray-400 bg-[#dfdfdf] flex items-center px-3 text-[8px] justify-between">
          <span>{files.length} items</span>
          <span>1.4 GB available</span>
        </div>
      </div>
    </div>
  );
};

export default FileExplorerApp;
