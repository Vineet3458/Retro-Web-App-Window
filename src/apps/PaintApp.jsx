import React, { useRef, useState, useEffect } from 'react';

const COLORS = [
  '#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080',
  '#ffffff','#c0c0c0','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff',
  '#ff8040','#804000','#80ff00','#004040','#0080ff','#8000ff','#ff0080','#ff8080',
  '#ffd700','#40ff40','#00c0c0','#4040ff','#c000c0','#804080','#c0c000','#00a040',
];

const TOOLS = ['pencil', 'fill', 'eraser', 'rect', 'ellipse', 'line'];

const PaintApp = () => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);
  const [selectingFg, setSelectingFg] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const floodFill = (ctx, x, y, fillColor) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
    const idx = (Math.round(y) * ctx.canvas.width + Math.round(x)) * 4;
    const [tr, tg, tb, ta] = [data[idx], data[idx+1], data[idx+2], data[idx+3]];
    const hex = fillColor.slice(1);
    const fr = parseInt(hex.slice(0,2),16), fg = parseInt(hex.slice(2,4),16), fb = parseInt(hex.slice(4,6),16);
    if (tr===fr && tg===fg && tb===fb) return;
    const stack = [[Math.round(x), Math.round(y)]];
    while(stack.length){
      const [cx, cy] = stack.pop();
      const i = (cy * ctx.canvas.width + cx) * 4;
      if(cx<0||cx>=ctx.canvas.width||cy<0||cy>=ctx.canvas.height) continue;
      if(data[i]!==tr||data[i+1]!==tg||data[i+2]!==tb||data[i+3]!==ta) continue;
      data[i]=fr; data[i+1]=fg; data[i+2]=fb; data[i+3]=255;
      stack.push([cx+1,cy],[cx-1,cy],[cx,cy+1],[cx,cy-1]);
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const startDraw = (e) => {
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    setIsDrawing(true);
    setStartPos(pos);
    if (tool === 'fill') {
      floodFill(ctx, pos.x, pos.y, color);
    } else {
      setSnapshot(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 4 : lineWidth;
    ctx.lineCap = 'round';

    if (tool === 'pencil' || tool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (snapshot) {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      if (tool === 'rect') {
        ctx.strokeRect(startPos.x, startPos.y, pos.x - startPos.x, pos.y - startPos.y);
      } else if (tool === 'ellipse') {
        ctx.ellipse(
          (startPos.x + pos.x) / 2, (startPos.y + pos.y) / 2,
          Math.abs(pos.x - startPos.x) / 2, Math.abs(pos.y - startPos.y) / 2,
          0, 0, 2 * Math.PI
        );
        ctx.stroke();
      } else if (tool === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
    }
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const toolIcons = { pencil: '✏️', fill: '🪣', eraser: '🧹', rect: '▭', ellipse: '◯', line: '╱' };

  return (
    <div className="flex h-full bg-[#c0c0c0] font-pixel text-[10px] text-black select-none overflow-hidden">
      {/* Left Toolbar */}
      <div className="w-14 flex flex-col items-center gap-1 p-1 border-r border-gray-500 bg-[#c0c0c0] shrink-0">
        <div className="grid grid-cols-2 gap-1 mb-2">
          {TOOLS.map(t => (
            <button
              key={t}
              title={t}
              onClick={() => setTool(t)}
              className={`w-6 h-6 flex items-center justify-center text-sm pixel-btn ${tool === t ? 'pixel-border-in !bg-[#dfdfdf]' : ''}`}
            >
              {toolIcons[t]}
            </button>
          ))}
        </div>

        <div className="w-full border-t border-gray-500 pt-1 mt-1">
          <div className="text-[7px] text-center mb-1 uppercase">Size</div>
          {[1, 2, 4, 8].map(s => (
            <button
              key={s}
              onClick={() => setLineWidth(s)}
              className={`w-full flex items-center justify-center my-0.5 ${lineWidth === s ? 'bg-[#000080]' : ''}`}
            >
              <div className="bg-black" style={{ height: s + 'px', width: '90%' }}></div>
            </button>
          ))}
        </div>

        <div className="w-full mt-2 border-t border-gray-500 pt-1">
          <div className="text-[7px] text-center mb-1 uppercase">Colors</div>
          <div className="relative w-10 h-10 mx-auto">
            <div className="absolute bottom-0 right-0 w-7 h-7 border border-black" style={{ backgroundColor: bgColor }}></div>
            <div
              className="absolute top-0 left-0 w-7 h-7 border-2 border-black cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => setSelectingFg(true)}
            ></div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Menu Bar */}
        <div className="h-7 bg-[#c0c0c0] border-b border-gray-500 flex items-center gap-3 px-2">
          {['File', 'Edit', 'View', 'Image', 'Colors', 'Help'].map(m => (
            <button key={m} className="text-[10px] px-1 hover:bg-[#000080] hover:text-white">{m}</button>
          ))}
          <button onClick={clearCanvas} className="ml-auto pixel-btn text-[8px] px-2">NEW</button>
        </div>

        <div className="flex-1 overflow-auto bg-[#808080] p-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="block bg-white cursor-crosshair"
            style={{ imageRendering: 'pixelated', maxWidth: '100%' }}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
          />
        </div>

        {/* Color Palette */}
        <div className="h-10 bg-[#c0c0c0] border-t border-gray-500 flex items-center gap-1 px-2 shrink-0">
          <div
            className="w-7 h-7 border-2 border-black mr-1 shrink-0 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => setSelectingFg(true)}
          ></div>
          <div
            className="w-5 h-5 border border-black mr-2 shrink-0 cursor-pointer"
            style={{ backgroundColor: bgColor }}
            onClick={() => setSelectingFg(false)}
          ></div>
          <div className="flex flex-wrap gap-0.5">
            {COLORS.map(c => (
              <div
                key={c}
                className="w-4 h-4 border border-gray-600 cursor-pointer hover:scale-110 transition-transform shrink-0"
                style={{ backgroundColor: c }}
                onClick={() => selectingFg ? setColor(c) : setBgColor(c)}
                onContextMenu={(e) => { e.preventDefault(); setBgColor(c); }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintApp;
