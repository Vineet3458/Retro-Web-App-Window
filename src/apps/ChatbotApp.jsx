import React, { useState, useRef, useEffect } from 'react';

const ChatbotApp = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'SYSTEM_BOOT_SUCCESSFUL...\n\nHELLO_USER! I AM RETRO_AI_v1.0. HOW CAN I ASSIST YOU TODAY?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { sender: 'User', text: input }];
    setMessages(newMsgs);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'AI', 
        text: `LOGGING_INPUT: "${input}"\n\nI AM SEARCHING MY KNOWLEDGE BASE... FOUND 0 RESULTS. JUST KIDDING. I AM ALWAYS HERE TO HELP!` 
      }]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-[#111111] font-pixel p-1 relative overflow-hidden">
      {/* Matrix-like subtle glow effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_#00ff00_0%,_transparent_70%)]"></div>
      
      <div className="flex-1 overflow-auto p-4 pixel-border-in mb-2 bg-[#0a0a0a] border-green-900 border-2 custom-scrollbar z-10">
        {messages.map((m, i) => (
          <div key={i} className={`mb-4 ${m.sender === 'AI' ? 'text-green-500' : 'text-blue-400'}`}>
            <div className="flex items-center gap-2 mb-1.5 border-b border-green-950 pb-1">
              <span className="text-[8px] opacity-70">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-[10px] font-bold">
                {m.sender === 'AI' ? 'CORE.EXE' : 'USER_ROOT'}
              </span>
            </div>
            <div className="pl-3 border-l border-green-900 ml-1 text-xs leading-relaxed whitespace-pre-wrap">
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 h-12 z-10">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-[#000000] text-green-400 pixel-border-in px-4 outline-none font-pixel uppercase text-[10px] shadow-none"
          placeholder="ENTER_PROMPT..."
        />
        <button 
          onClick={handleSend}
          className="pixel-btn bg-[#00aa00] text-black px-4 active:bg-[#008800] uppercase text-[10px] font-bold"
        >
          EXEC
        </button>
      </div>
    </div>
  );
};

export default ChatbotApp;

