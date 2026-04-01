import React, { useState } from "react";
import wallpaperGif from "../assets/wallpaper.gif";
import RetroPixelizerImg from "../assets/RetroPixelizerImg.jpeg";
import Icon from "./Icon";
import Window from "./Window";
import CalculatorApp from "./apps/CalculatorApp";
import NotepadApp from "./apps/NotepadApp";
import WallpaperApp from "./apps/WallpaperApp";
import ChatbotApp from "./apps/ChatbotApp";
import PersonalSpaceApp from "./apps/PersonalSpaceApp";
import { Calculator, NotepadTextDashed, Image, Bot, User } from "lucide-react";

const APPS = [
  { id: "pixelizer", label: "Retro Pixelizer", src: RetroPixelizerImg, component: null, isIframe: true, url: "https://retro-pixelizer.vercel.app/" },
  { id: "calculator", label: "Calculator", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/calculator.svg", component: CalculatorApp },
  { id: "notepad", label: "Notepad", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/article.svg", component: NotepadApp },
  { id: "wallpaper", label: "Wallpapers", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/image.svg", component: WallpaperApp },
  { id: "chatbot", label: "AI Chatbot", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/robot.svg", component: ChatbotApp },
  { id: "personal", label: "User Space", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/user.svg", component: PersonalSpaceApp },
];

const Background = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [wallpaper, setWallpaper] = useState({ url: wallpaperGif, color: '#008080' });
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (app) => {
    if (!openWindows.find(w => w.id === app.id)) {
      setOpenWindows([...openWindows, { ...app, zIndex: openWindows.length + 1 }]);
    }
    setActiveWindow(app.id);
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const focusWindow = (id) => {
    if (activeWindow === id) return;
    setOpenWindows(openWindows.map(w => ({
      ...w,
      zIndex: w.id === id ? Math.max(...openWindows.map(ow => ow.zIndex)) + 1 : w.zIndex
    })));
    setActiveWindow(id);
  };

  return (
    <div
      className="w-full h-screen bg-center bg-cover relative overflow-hidden flex flex-col font-pixel cursor-pixel"
      style={{ background: wallpaper.url ? `url(${wallpaper.url}) center/cover` : wallpaper.color }}
    >
      {/* Desktop Area representing the windows */}
      <div className="flex-1 relative p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min content-start">
        {APPS.map(app => (
          <Icon
            key={app.id}
            src={app.src}
            IconComponent={app.IconComponent}
            label={app.label}
            onClick={() => openApp(app)}
          />
        ))}
      </div>

      {/* Render open windows */}
      {openWindows.map(app => (
        <div key={app.id} onMouseDown={() => focusWindow(app.id)} style={{ zIndex: app.zIndex, position: 'absolute' }}>
          <Window title={app.label} onClose={() => closeWindow(app.id)}>
            {app.isIframe ? (
              <iframe
                src={app.url}
                title={app.label}
                className="w-full h-full border-none"
              ></iframe>
            ) : (
              <app.component setWallpaper={app.id === 'wallpaper' ? setWallpaper : undefined} />
            )}
          </Window>
        </div>
      ))}

      {/* Retro Taskbar */}
      <div className="h-12 border-t-2 border-[#fff] outline outline-1 outline-[#000] pixel-bar flex items-center px-2 justify-between z-[9999] relative">
        <div className="flex gap-2 h-full items-center py-1.5">
          <button className="pixel-btn h-full px-4 font-bold active:translate-y-px text-black flex items-center gap-2">
            <img src="https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/windows.svg" className="w-4 h-4" alt="win" />
            START
          </button>
          {/* Open apps on taskbar */}
          <div className="hidden sm:flex gap-1 h-full pl-2 border-l-2 border-dashed border-gray-400">
            {openWindows.map(app => (
              <button 
                key={app.id} 
                className={`pixel-btn px-2 flex items-center gap-2 text-xs truncate max-w-[140px] text-black ${activeWindow === app.id ? 'pixel-border-in bg-[#dfdfdf]' : ''}`}
                onClick={() => focusWindow(app.id)}
              >
                {app.src && <img src={app.src} className="w-4 h-4 object-contain" alt="" />}
                {app.label}
              </button>
            ))}
          </div>
        </div>
        <div className="pixel-border-in px-2 py-1 text-xs font-bold text-black cursor-default">
          {time}
        </div>
      </div>
    </div>
  );
};

export default Background;
