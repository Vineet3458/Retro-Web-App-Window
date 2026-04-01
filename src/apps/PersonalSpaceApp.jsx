import React from 'react';

const PersonalSpaceApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#008080] text-white p-4 items-center justify-center font-pixel overflow-y-auto">
      <div className="w-32 h-32 bg-black border-4 border-white mb-4 rounded-full flex items-center justify-center text-[50px]">
        👾
      </div>
      <h1 className="text-2xl mb-2 text-center text-yellow-300 shadow-black">USER PROFILE</h1>
      <div className="bg-black/50 p-4 border-2 border-dashed border-yellow-300 max-w-sm w-full">
        <p className="mb-2"><span className="text-gray-400">NAME:</span> GUEST</p>
        <p className="mb-2"><span className="text-gray-400">LEVEL:</span> 99</p>
        <p className="mb-2"><span className="text-gray-400">CLASS:</span> Retro Enthusiast</p>
        <p className="mt-4 text-xs text-center">"Living in an 8-bit world."</p>
      </div>
      <button className="mt-6 pixel-btn p-2 text-black bg-white hover:bg-gray-200 cursor-pixel">
        EDIT AVATAR
      </button>
    </div>
  );
};

export default PersonalSpaceApp;
