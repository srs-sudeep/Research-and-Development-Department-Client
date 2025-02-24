import React, { useEffect } from 'react'
import Preloader from '/videos/Preloader.mp4'
const SplashScreen = () => {
  return (
    <div className="loader fixed inset-0 flex items-center justify-center bg-white">
      <video
        src={Preloader}
        autoPlay
        loop
        muted
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default SplashScreen
