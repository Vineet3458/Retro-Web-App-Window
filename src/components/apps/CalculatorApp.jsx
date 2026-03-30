import React, { useState } from 'react';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  
  const handlePress = (val) => {
    if (display === '0' && val !== '.') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const calculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => setDisplay('0');

  return (
    <div className="flex flex-col h-full bg-gray-200">
      <div className="bg-white text-right p-2 text-2xl font-pixel pixel-border-in mb-2 truncate">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
          <button 
            key={btn} 
            className="pixel-btn text-xl font-bold font-pixel active:translate-y-px"
            onClick={() => {
              if (btn === '=') calculate();
              else handlePress(btn);
            }}
          >
            {btn}
          </button>
        ))}
        <button className="col-span-4 pixel-btn font-pixel text-xl active:translate-y-px" onClick={clear}>
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default CalculatorApp;
