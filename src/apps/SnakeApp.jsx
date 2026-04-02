import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeApp = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    setDir({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
  };

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowUp': if (dir.y === 0) setDir({ x: 0, y: -1 }); break;
      case 'ArrowDown': if (dir.y === 0) setDir({ x: 0, y: 1 }); break;
      case 'ArrowLeft': if (dir.x === 0) setDir({ x: -1, y: 0 }); break;
      case 'ArrowRight': if (dir.x === 0) setDir({ x: 1, y: 0 }); break;
      default: break;
    }
  }, [dir]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameOver) return;
    const moveSnake = () => {
      setSnake(prev => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || prev.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    };
    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  return (
    <div className="flex flex-col h-full bg-[#111] font-pixel p-4 items-center justify-center focus:outline-none" tabIndex={0}>
       <div className="w-full max-w-[320px] bg-[#c0c0c0] pixel-border p-4 flex flex-col items-center">
          <div className="w-full flex justify-between bg-black text-[#00ff00] p-2 mb-4 pixel-border-in text-[10px] items-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#ff0055] rounded-full animate-pulse"></div>
              <span>HI-SCORE: 9999</span>
            </div>
            <span>SCORE: {score}</span>
          </div>

          <div 
            className="relative bg-[#9bbc0f] border-4 border-[#0f380f]"
            style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
          >
            {snake.map((s, i) => (
              <div key={i} className="absolute bg-[#0f380f] border-[1px] border-[#9bbc0f]" style={{ left: s.x * CELL_SIZE, top: s.y * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE }} />
            ))}
            <div className="absolute bg-[#0f380f] flex items-center justify-center" style={{ left: food.x * CELL_SIZE, top: food.y * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE }}>
              <div className="w-2 h-2 bg-[#0f380f] rotate-45"></div>
            </div>
            
            {gameOver && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
                <span className="text-[#ff0055] text-lg mb-4 font-bold border-2 border-[#ff0055] px-2 py-1 uppercase tracking-tighter">Game Over</span>
                <button className="pixel-btn px-4 py-2 text-black bg-[#c0c0c0] text-[10px] font-bold" onClick={resetGame}>REBOOT</button>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 w-full text-[8px] opacity-70 text-black pointer-events-none">
             <div className="col-span-3 text-center border-b border-gray-400 pb-1 mb-1 font-bold italic">HANDHELD SYSTEM</div>
             <div className="col-start-2 flex justify-center"><div className="w-6 h-6 pixel-btn bg-gray-400 flex items-center justify-center font-bold">▲</div></div>
             <div className="col-start-1 flex justify-center"><div className="w-6 h-6 pixel-btn bg-gray-400 flex items-center justify-center font-bold">◀</div></div>
             <div className="col-start-2 flex justify-center"><div className="w-6 h-6 pixel-btn bg-gray-400 flex items-center justify-center font-bold">▼</div></div>
             <div className="col-start-3 flex justify-center"><div className="w-6 h-6 pixel-btn bg-gray-400 flex items-center justify-center font-bold">▶</div></div>
          </div>
       </div>
    </div>
  );
};

export default SnakeApp;

