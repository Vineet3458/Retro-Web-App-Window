import React from 'react';
import tumblrImage from '../assets/tumblrImage.gif';

const Background = () => (
  <>
    <div >
      <img src={tumblrImage} alt="Tumblr Image" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"/>
    </div>
  </>
);

export default Background;