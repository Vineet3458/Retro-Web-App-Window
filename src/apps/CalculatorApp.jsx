import React, { useState } from 'react';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  
  const handlePress = (val) => {
    if (display === 'Error' || (display === '0' && val !== '.')) {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(display);
      setDisplay(Number.isFinite(result) ? String(Object.is(result, -0) ? 0 : result) : 'Error');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => setDisplay('0');

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] p-1">
      <div className="bg-[#ffffff] text-right p-3 text-2xl font-pixel pixel-border-in mb-3 truncate shadow-inner">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
          <button 
            key={btn} 
            className={`pixel-btn text-xs font-pixel active:translate-y-px ${btn === '=' ? 'bg-[#000080] text-white' : 'bg-[#c0c0c0] text-black'}`}
            onClick={() => {
              if (btn === '=') calculate();
              else handlePress(btn);
            }}
          >
            {btn}
          </button>
        ))}
        <button 
          className="col-span-4 pixel-btn font-pixel text-[10px] active:translate-y-px bg-[#808080] text-white mt-1" 
          onClick={clear}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default CalculatorApp;

