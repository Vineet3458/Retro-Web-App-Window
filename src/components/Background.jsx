import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Icon from "./Icon";
import Window from "./Window";
import CalculatorApp from "../apps/CalculatorApp";
import NotepadApp from "../apps/NotepadApp";
import ChatbotApp from "../apps/ChatbotApp";
import PersonalSpaceApp from "../apps/PersonalSpaceApp";
import SnakeApp from "../apps/SnakeApp";
import SystemSettingsApp from "../apps/SystemSettingsApp";
import AboutApp from "../apps/AboutApp";
import TerminalApp from "../apps/TerminalApp";
import FileExplorerApp from "../apps/FileExplorerApp";
import MediaApp from "../apps/MediaApp";
import PaintApp from "../apps/PaintApp";
import PortfolioApp from "../apps/PortfolioApp";
import StartMenu from "./StartMenu";
import BootScreen from "./BootScreen";

const INITIAL_APPS = [
  { id: "portfolio",  label: "My Portfolio",   emoji: "👤",  component: PortfolioApp },
  { id: "files",      label: "File Explorer",  emoji: "📁",  component: FileExplorerApp },
  { id: "notepad",    label: "Notepad",         emoji: "📝",  component: NotepadApp },
  { id: "paint",      label: "MS Paint",        emoji: "🎨",  component: PaintApp },
  { id: "terminal",   label: "Terminal",        emoji: "🖥️", component: TerminalApp },
  { id: "chatbot",    label: "Music Screamer",  emoji: "🎵",  component: ChatbotApp },
  { id: "media",      label: "Media Player",    emoji: "📻",  component: MediaApp },
  { id: "calculator", label: "Calculator",      emoji: "🧮",  component: CalculatorApp },
  { id: "settings",   label: "Settings",        emoji: "⚙️", component: SystemSettingsApp },
  { id: "about",      label: "About PixelOS",   emoji: "ℹ️", component: AboutApp },
];

const Background = () => {
  const [apps, setApps] = useState(
    INITIAL_APPS.map((app, index) => ({
      ...app,
      posX: 10,
      posY: 10 + index * 72,
      selected: false,
    }))
  );

  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bgColor, setBgColor] = useState("#008080");
  const [bgImage, setBgImage] = useState(null);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const setWallpaper = ({ url, color }) => {
    if (url) { setBgImage(url); setBgColor(null); }
    else { setBgImage(null); setBgColor(color || "#008080"); }
  };

  const selectApp = (id) =>
    setApps(apps.map((app) => ({ ...app, selected: app.id === id })));

  const openApp = (app) => {
    if (!openWindows.find((w) => w.id === app.id)) {
      setOpenWindows([...openWindows, { ...app, zIndex: openWindows.length + 2 }]);
    }
    setActiveWindow(app.id);
    setApps(apps.map((a) => ({ ...a, selected: false })));
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const focusWindow = (id) => {
    if (activeWindow === id) return;
    const maxZ = Math.max(...openWindows.map((w) => w.zIndex), 1);
    setOpenWindows(
      openWindows.map((w) => ({ ...w, zIndex: w.id === id ? maxZ + 1 : w.zIndex }))
    );
    setActiveWindow(id);
  };

  const onDragStop = (id, d) =>
    setApps(apps.map((app) => (app.id === id ? { ...app, posX: d.x, posY: d.y } : app)));

  const desktopStyle = bgImage
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor: bgColor };

  return (
    <div
      className="w-full h-screen relative overflow-hidden flex flex-col font-pixel cursor-pixel"
      style={desktopStyle}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setApps(apps.map((a) => ({ ...a, selected: false })));
          setActiveWindow(null);
          setIsStartMenuOpen(false);
        }
      }}
    >
      {/* Desktop dot pattern overlay */}
      {!bgImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
      )}

      {/* Boot screen */}
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}

      {/* CRT scanlines */}
      <div className="scanlines" />
      <div className="crt-overlay" />

      {/* Desktop icon area */}
      <div className="flex-1 relative z-10 w-full h-full">
        {apps.map((app) => (
          <Rnd
            key={app.id}
            position={{ x: app.posX, y: app.posY }}
            onDragStop={(e, d) => onDragStop(app.id, d)}
            enableResizing={false}
            bounds="parent"
          >
            <Icon
              emoji={app.emoji}
              label={app.label}
              isSelected={app.selected}
              onClick={(e) => { e.stopPropagation(); selectApp(app.id); }}
              onDoubleClick={() => openApp(app)}
            />
          </Rnd>
        ))}
      </div>

      {/* Open windows */}
      {openWindows.map((app) => (
        <div
          key={app.id}
          onMouseDown={() => focusWindow(app.id)}
          style={{ zIndex: app.zIndex, position: "absolute", top: 0, left: 0, width: "100%", height: "calc(100% - 48px)" }}
        >
          <Window
            title={app.label}
            emoji={app.emoji}
            onClose={() => closeWindow(app.id)}
            isActive={activeWindow === app.id}
          >
            {(() => {
              const AppComponent = app.component;
              return (
                <AppComponent
                  setWallpaper={
                    app.id === "settings" ? setWallpaper : undefined
                  }
                />
              );
            })()}
          </Window>
        </div>
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        apps={INITIAL_APPS}
        onOpenApp={(app) => { openApp(app); setIsStartMenuOpen(false); }}
      />

      {/* ── Taskbar ── */}
      <div
        className="h-12 pixel-border flex items-center px-1 justify-between z-[99999] relative shrink-0"
        style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderBottom: "none" }}
      >
        {/* LEFT: Start + open apps */}
        <div className="flex gap-1 h-full items-center py-1">
          {/* START button */}
          <button
            id="start-button"
            className={`pixel-btn h-full px-3 font-bold text-black flex items-center gap-2 text-xs ${
              isStartMenuOpen ? "pixel-border-in bg-[#e0e0e0]" : "bg-[#c0c0c0]"
            }`}
            onClick={(e) => { e.stopPropagation(); setIsStartMenuOpen(!isStartMenuOpen); }}
          >
            {/* Windows 95 flag logo */}
            <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
              <rect x="0" y="0" width="7" height="7" fill="#f25022"/>
              <rect x="9" y="0" width="7" height="7" fill="#7fba00"/>
              <rect x="0" y="9" width="7" height="7" fill="#00a4ef"/>
              <rect x="9" y="9" width="7" height="7" fill="#ffb900"/>
            </svg>
            <span className="font-bold">Start</span>
          </button>

          {/* Running apps */}
          <div className="flex gap-1 h-full pl-1 border-l border-gray-500 overflow-x-auto">
            {openWindows.map((app) => (
              <button
                key={app.id}
                className={`pixel-btn px-2 flex items-center gap-1.5 text-[10px] truncate min-w-[80px] max-w-[140px] text-black ${
                  activeWindow === app.id
                    ? "pixel-border-in bg-[#e0e0e0] font-bold"
                    : "bg-[#c0c0c0]"
                }`}
                onClick={() => focusWindow(app.id)}
              >
                <span className="text-sm leading-none">{app.emoji}</span>
                <span className="truncate hidden sm:inline font-pixel text-[9px]">{app.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: System tray */}
        <div className="flex items-center gap-1 ml-auto h-full py-1 pl-2">
          {/* PixelOS info block */}
          <div className="pixel-border-in px-2 py-0.5 h-full flex flex-col justify-center text-[7px] text-black bg-[#e0e0e0] leading-tight">
            <span className="font-bold text-[8px]">PixelOS 98</span>
            <span className="text-gray-600">RTechi Email: Now</span>
            <span className="text-gray-600">Project 2026</span>
          </div>

          {/* Network / volume icons */}
          <div className="pixel-border-in px-2 py-1 h-full flex items-center gap-2 bg-[#e0e0e0]">
            {/* Network icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" className="text-black shrink-0">
              <rect x="5" y="8" width="4" height="3" fill="currentColor" rx="0.5"/>
              <rect x="3" y="5" width="8" height="2" fill="currentColor" rx="0.5"/>
              <rect x="1" y="2" width="12" height="2" fill="currentColor" rx="0.5"/>
            </svg>
            {/* Volume icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" className="text-black shrink-0">
              <polygon points="2,5 2,9 5,9 9,12 9,2 5,5" fill="currentColor"/>
              <path d="M10.5 4.5 C12 5.5 12 8.5 10.5 9.5" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
            {/* Clock */}
            <span className="font-pixel text-[9px] font-bold whitespace-nowrap">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
