import React, { useState } from "react";
import wallpaper from "../assets/wallpaper.gif";
import RetroPixelizer from "../assets/RetroPixelizerImg.jpeg";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import Window from "./Window";

const Background = () => {
  const navigate = useNavigate();

  const [openPixelizer, setOpenPixelizer] = useState(false);

  return (
    <div
      className="w-full h-screen bg-center bg-cover p-6"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {/* Desktop Icon */}
      <Icon
        src={RetroPixelizer}
        label="Retro Pixelizer"
        onClick={() => navigate("/pixelizer")}
      />

      {/* Fullscreen App */}
      {openPixelizer && (
        <Window
          title="Retro Pixelizer"
          url="https://retro-pixelizer.vercel.app/"
          onClose={() => setOpenPixelizer(false)}
        />
      )}
    </div>
  );
};

export default Background;
