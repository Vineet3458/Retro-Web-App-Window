import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import wallpaperGif from "../assets/wallpaper.gif";
import RetroPixelizerImg from "../assets/RetroPixelizerImg.jpeg";
import Icon from "./Icon";
import Window from "./Window";
import CalculatorApp from "../apps/CalculatorApp";
import NotepadApp from "../apps/NotepadApp";
import WallpaperApp from "../apps/WallpaperApp";
import ChatbotApp from "../apps/ChatbotApp";
import PersonalSpaceApp from "../apps/PersonalSpaceApp";
import SnakeApp from "../apps/SnakeApp";
import SystemSettingsApp from "../apps/SystemSettingsApp";
import AboutApp from "../apps/AboutApp";
import TerminalApp from "../apps/TerminalApp";
import FileExplorerApp from "../apps/FileExplorerApp";
import MediaApp from "../apps/MediaApp";
import StartMenu from "./StartMenu";
import BootScreen from "./BootScreen";
import { HiSpeakerWave } from 'react-icons/hi2';

const INITIAL_APPS = [
  { id: "pixelizer", label: "Retro Pixelizer", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/camera.svg", component: null, isIframe: true, url: "https://retro-pixelizer.vercel.app/" },
  { id: "calculator", label: "Calculator", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/calculator.svg", component: CalculatorApp },
  { id: "notepad", label: "Notepad", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/article.svg", component: NotepadApp },
  { id: "snake", label: "Snake JS", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/gamepad.svg", component: SnakeApp },
  { id: "wallpaper", label: "Wallpapers", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/image.svg", component: WallpaperApp },
  { id: "chatbot", label: "AI Chatbot", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/robot.svg", component: ChatbotApp },
  { id: "personal", label: "User Space", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/user.svg", component: PersonalSpaceApp },
  { id: "media", label: "Media Player", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/radio-handheld.svg", component: MediaApp },
  { id: "settings", label: "Settings", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/sliders.svg", component: SystemSettingsApp },
  { id: "about", label: "About OS", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/info-box.svg", component: AboutApp },
  { id: "files", label: "File Explorer", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/folder.svg", component: FileExplorerApp },
  { id: "terminal", label: "Terminal", src: "https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/terminal.svg", component: TerminalApp },
];

const Background = () => {
  const [apps, setApps] = useState(
    INITIAL_APPS.map((app, index) => {
      const col = Math.floor(index / 6);
      const row = index % 6;
      return {
        ...app,
        posX: 20 + col * 90,
        posY: 20 + row * 90,
        selected: false
      };
    })
  );
  
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [wallpaper, setWallpaper] = useState({ url: wallpaperGif, color: '#008080' });
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const selectApp = (id) => {
    setApps(apps.map(app => ({
      ...app,
      selected: app.id === id
    })));
  };

  const openApp = (app) => {
    if (!openWindows.find(w => w.id === app.id)) {
      setOpenWindows([...openWindows, { ...app, zIndex: openWindows.length + 1 }]);
    }
    setActiveWindow(app.id);
    setApps(apps.map(a => ({ ...a, selected: false })));
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
      zIndex: w.id === id ? Math.max(...openWindows.map(ow => ow.zIndex), 0) + 1 : w.zIndex
    })));
    setActiveWindow(id);
  };

  const onDragStop = (id, d) => {
    setApps(apps.map(app => app.id === id ? { ...app, posX: d.x, posY: d.y } : app));
  };

  return (
    <div
      className="w-full h-screen relative bg-center bg-cover overflow-hidden flex flex-col font-pixel cursor-pixel desktop-pattern"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setApps(apps.map(a => ({ ...a, selected: false })));
          setActiveWindow(null);
          setIsStartMenuOpen(false);
        }
      }}
      style={{ background: wallpaper.url && wallpaper.url !== '#008080' ? `url(${wallpaper.url}) center/cover` : undefined }}
    >
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}
      <div className="scanlines"></div>
      <div className="crt-overlay"></div>

      <div className="flex-1 relative z-10 w-full h-full">
        {apps.map(app => (
          <Rnd
            key={app.id}
            position={{ x: app.posX, y: app.posY }}
            onDragStop={(e, d) => onDragStop(app.id, d)}
            enableResizing={false}
            bounds="parent"
          >
            <Icon
              src={app.src}
              label={app.label}
              isSelected={app.selected}
              onClick={(e) => {
                e.stopPropagation();
                selectApp(app.id);
              }}
              onDoubleClick={() => openApp(app)}
            />
          </Rnd>
        ))}
      </div>

      {openWindows.map(app => (
        <div key={app.id} onMouseDown={() => focusWindow(app.id)} style={{ zIndex: app.zIndex, position: 'absolute' }}>
          <Window 
            title={app.label} 
            icon={app.src} 
            onClose={() => closeWindow(app.id)}
            isActive={activeWindow === app.id}
          >
            {app.isIframe ? (
              <iframe
                src={app.url}
                title={app.label}
                className="w-full h-full border-none"
              ></iframe>
            ) : (
              (() => {
                const AppComponent = app.component;
                return <AppComponent setWallpaper={(app.id === 'wallpaper' || app.id === 'settings') ? setWallpaper : undefined} />;
              })()
            )}
          </Window>
        </div>
      ))}

      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        apps={INITIAL_APPS}
        onOpenApp={(app) => openApp(app)}
      />

      <div className="h-12 pixel-border flex items-center px-1 justify-between z-[99999] relative" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
        <div className="flex gap-2 h-full items-center py-1">
          <button 
            className={`pixel-btn h-full px-4 font-bold active:translate-y-px text-black flex items-center gap-2 ${isStartMenuOpen ? 'pixel-border-in bg-[#e0e0e0]' : 'bg-[#c0c0c0]'}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsStartMenuOpen(!isStartMenuOpen);
            }}
          >
            <img src="https://raw.githubusercontent.com/halfmage/pixelarticons/master/svg/windows.svg" className="w-5 h-5 flex-shrink-0" alt="win" style={{ imageRendering: 'pixelated' }} />
            <span className="text-[10px] sm:text-xs">START</span>
          </button>

          <button 
            title="Show Desktop"
            className="pixel-btn h-full px-1.5 bg-[#c0c0c0] hover:bg-[#dfdfdf]"
            onClick={() => setActiveWindow(null)}
          >
             <div className="w-4 h-4 border-2 border-slate-600 bg-slate-400 opacity-50"></div>
          </button>
          
          <div className="flex gap-1 h-full pl-2 border-l border-gray-500 overflow-x-auto scrollbar-hide shrink">
            {openWindows.map(app => (
              <button 
                key={app.id} 
                className={`pixel-btn px-2 flex items-center gap-2 text-xs truncate min-w-[30px] sm:min-w-[120px] max-w-[160px] text-black ${activeWindow === app.id ? 'pixel-border-in bg-[#e0e0e0] font-bold' : 'bg-[#c0c0c0]'}`}
                onClick={() => focusWindow(app.id)}
              >
                {app.src && <img src={app.src} className="w-4 h-4 object-contain" alt="" style={{ imageRendering: 'pixelated' }} />}
                <span className="truncate hidden sm:inline">{app.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 pr-1 ml-auto">
          <div className="pixel-border-in px-3 py-1 text-[10px] font-bold text-black cursor-default flex items-center gap-2 bg-[#e0e0e0] whitespace-nowrap shadow-inner">
            <HiSpeakerWave size={14} />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
