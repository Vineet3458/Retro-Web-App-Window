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
    <div className="flex flex-col h-full bg-black text-white p-2 items-center justify-center font-pixel cursor-default focus:outline-none" tabIndex={0}>
      <div className="flex justify-between w-[300px] mb-2 px-1 border-b border-white">
        <span>SCORE: {score}</span>
      </div>
      <div 
        className="relative bg-black border-2 border-white"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {snake.map((s, i) => (
          <div key={i} className="absolute bg-[#00ff00] border border-black" style={{ left: s.x * CELL_SIZE, top: s.y * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE }} />
        ))}
        <div className="absolute bg-[#ff0055]" style={{ left: food.x * CELL_SIZE, top: food.y * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE, borderRadius: '50%' }} />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <span className="text-[#ff0055] text-xl mb-4 font-bold animate-pulse">GAME OVER</span>
            <button className="pixel-btn px-4 py-2 text-black bg-white" onClick={resetGame}>PLAY AGAIN</button>
          </div>
        )}
      </div>
      <div className="mt-4 text-[10px] text-gray-400 text-center">Use Arrow Keys to move</div>
    </div>
  );
};

export default SnakeApp;
