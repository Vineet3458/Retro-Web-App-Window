import React, { useState, useEffect, useRef } from 'react';

const TerminalApp = () => {
  const [history, setHistory] = useState([
    'PIXELCORE OS [Version 1.0.4]',
    '(C) 2026 PIXELCORE Corporation. All rights reserved.',
    '',
    'Type "help" to see available commands.',
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `> ${input}`];

      switch (cmd) {
        case 'help':
          newHistory.push('Available commands: help, clear, version, echo, time, whoami');
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'version':
          newHistory.push('PIXELCORE OS v1.0.4 - "Aesthetic Release"');
          break;
        case 'time':
          newHistory.push(new Date().toLocaleTimeString());
          break;
        case 'whoami':
          newHistory.push('guest_user@pixelcore_os');
          break;
        case 'ls':
          newHistory.push('documents/  apps/  system/  secret.txt');
          break;
        default:
          if (cmd.startsWith('echo ')) {
            newHistory.push(input.substring(5));
          } else if (cmd !== '') {
            newHistory.push(`'${cmd}' is not recognized as an internal or external command.`);
          }
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#00ff00] font-pixel text-[10px] p-2 overflow-hidden">
      <div className="flex-1 overflow-y-auto mb-2 custom-terminal-scrollbar">
        {history.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-2">
        <span>&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-[#00ff00] caret-[#00ff00]"
        />
      </div>
    </div>
  );
};

export default TerminalApp;
