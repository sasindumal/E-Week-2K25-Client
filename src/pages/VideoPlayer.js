import React from "react";

const UltraModernVideoPlayer = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-navy-900 to-black overflow-hidden">
            <div className="relative w-full max-w-4xl p-8 bg-navy-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-red-600/40 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-red-600/50">

                {/* Video Element with Enhanced Styling */}
                <video
                    className="w-full rounded-2xl shadow-lg transition-all duration-300 hover:brightness-110"
                    width="640"
                    height="360"
                    controls
                    controlsList="nodownload"
                    poster="/videos/thumbnail.jpg" // Optional: Add a poster image path
                    autoPlay // Optional: Auto-play for a modern feel (ensure it fits your use case)
                    muted // Optional: Muted auto-play for better user experience
                    loop // Optional: Loop the trailer for emphasis
                >
                    <source src="/videos/trailer.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

            

                {/* Gradient Accents for Ultra-Modern Look */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent animate-pulse" />
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-red-600 to-transparent animate-pulse" />

                {/* Subtle Particle Effect (Optional: Add via CSS or library for extra flair) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* You can add CSS animations here for particles or use a library like particles.js */}
                </div>
            </div>
        </div>
    );
};

export default UltraModernVideoPlayer;
