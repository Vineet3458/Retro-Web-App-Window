import React, { useState } from 'react';

const ChatbotApp = () => {
  const [messages, setMessages] = useState([{ sender: 'AI', text: 'HELLO_USER! HOW CAN I ASSIST YOU TODAY?' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { sender: 'User', text: input }];
    setMessages(newMsgs);
    setInput('');
    
    setTimeout(() => {
      setMessages([...newMsgs, { sender: 'AI', text: `PROCESSING: "${input}"\nBEEP BOOP. I AM A RETRO AI. MY CAPABILITIES ARE LIMITED BUT MY NOSTALGIA IS INFINITE.` }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-black text-green-500 font-pixel p-1">
      <div className="flex-1 overflow-auto p-2 border border-green-800 mb-2">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <span className={m.sender === 'AI' ? 'text-green-300' : 'text-white'}>
              &gt; {m.sender}:
            </span>
            <span className="ml-2 whitespace-pre-wrap">{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 h-10">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-black text-green-400 border border-green-800 p-2 outline-none font-pixel uppercase shadow-none"
          placeholder="TYPE HERE..."
        />
        <button 
          onClick={handleSend}
          className="px-4 border border-green-800 hover:bg-green-900 active:bg-green-700 font-pixel cursor-crosshair"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default ChatbotApp;
