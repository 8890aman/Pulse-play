import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Play } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="bg-[#1A1A1D] min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full mx-auto text-center">
        {/* Logo and Pulse Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Main purple circle with 404 */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#9D4EDD] to-[#C77DFF] flex items-center justify-center animate-pulse-slow">
              <span className="text-white font-bold text-4xl">404</span>
            </div>
            
            {/* Ripple effects - positioned relative to the parent container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-[#C77DFF]/50 h-32 w-32 absolute animate-ping" style={{animationDuration: '2s'}}></div>
              <div className="rounded-full border border-[#C77DFF]/30 h-40 w-40 absolute animate-ping" style={{animationDuration: '2.5s'}}></div>
              <div className="rounded-full border border-[#C77DFF]/10 h-48 w-48 absolute animate-ping" style={{animationDuration: '3s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Message */}
        <h1 className="text-[#EBD3F8] text-3xl font-bold mb-4">Stream Not Found</h1>
        <p className="text-[#EBD3F8]/70 mb-8">The stream you're looking for might have ended or never existed. Let's get you back on track.</p>
        
        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] text-white flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#C77DFF]/20 w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg bg-[#2A2A2D] text-[#EBD3F8] flex items-center justify-center gap-2 font-medium transition-colors duration-300 hover:bg-[#2A2A2D]/80 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
        
        {/* Suggested Streams */}
        <div className="mt-12 text-left">
          <h2 className="text-[#EBD3F8] text-lg font-medium mb-4 flex items-center">
            <Play className="w-5 h-5 mr-2" />
            <span>Recommended Streams</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 1, title: 'VALORANT Tournament Finals', streamer: 'RiotGames' },
              { id: 2, title: 'CS2 Pro Gameplay', streamer: 'ESL_CSGO' },
            ].map(stream => (
              <Link 
                key={stream.id}
                to={`/stream/${stream.id}`}
                className="p-3 rounded-lg bg-[#2A2A2D]/50 hover:bg-[#2A2A2D] transition-colors"
              >
                <h3 className="text-[#EBD3F8] font-medium truncate">{stream.title}</h3>
                <p className="text-[#EBD3F8]/60 text-sm">{stream.streamer}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-16 text-[#EBD3F8]/40 text-sm">
        <p>© {new Date().getFullYear()} PulsePlay. All rights reserved.</p>
      </div>

      {/* CSS for animations */}
      <style jsx="true">{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound; 