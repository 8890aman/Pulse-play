import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Eye, Users, Clock } from 'lucide-react';

const Trending = () => {
  // Animation state
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const trendingStreams = [
    {
      id: 1,
      title: "VALORANT Champions Tour 2023",
      streamer: "RiotGames",
      game: "VALORANT",
      viewers: 245000,
      peakViewers: 320000,
      duration: "5:45:20",
      thumbnail: "https://imgs.search.brave.com/u5e1xSE-TqfcYvDSzvf2LfyiLEYBTSvwX6VqPcWUvi8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lbG9r/aW5nLmNvbS9zdG9y/YWdlL2Jsb2ctaW1h/Z2VzL2UwaVQ4UVox/UmZRdXpOVUJXSXhX/MGtFa2pWNmpGbDd5/LmpwZw"
    },
    {
      id: 2,
      title: "CS2 Major Qualifiers - Finals",
      streamer: "ESL_CSGO",
      game: "Counter-Strike 2",
      viewers: 185000,
      peakViewers: 220000,
      duration: "4:30:15",
      thumbnail: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg"
    },
    {
      id: 3,
      title: "League of Legends Worlds 2023",
      streamer: "LCS",
      game: "League of Legends",
      viewers: 165000,
      peakViewers: 180000,
      duration: "6:15:30",
      thumbnail: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872a966297484acd0efe49f34edd5aed"
    }
  ];

  const trendingCategories = [
    {
      id: 1,
      name: "VALORANT",
      viewers: 425000,
      channels: 8500,
      growth: "+25%",
      image: "https://imgs.search.brave.com/8-w--1UhNtnEM2CW2f2zcxQejwExb6lTJf_4r8_hhN8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmFsb3JhbnQt/MzA1a2VzY3h3NWRw/dXA3eS5qcGc"
    },
    {
      id: 2,
      name: "Counter-Strike 2",
      viewers: 385000,
      channels: 6200,
      growth: "+40%",
      image: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg"
    },
    {
      id: 3,
      name: "League of Legends",
      viewers: 350000,
      channels: 5800,
      growth: "+15%",
      image: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872a966297484acd0efe49f34edd5aed"
    },
    {
      id: 4,
      name: "Just Chatting",
      viewers: 320000,
      channels: 12500,
      growth: "+10%",
      image: "https://imgs.search.brave.com/jqdUg0ifihHoPwPf27YB-8RR2Df6WibgLiawXgxjH9w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE3LzBl/LzUzLzE3MGU1MzAw/ZmJlM2IyZjg0YWQ3/YjNkZThlY2RmOWIy/LmpwZw"
    }
  ];

  return (
    <div className="bg-[#1A1A1D] min-h-screen p-4 md:p-8 xl:p-12">
      <div className="max-w-7xl mx-auto xl:max-w-8xl">
        {/* Header */}
        <div className={`mb-12 transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-[#EBD3F8] text-3xl font-bold mb-2 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3" />
            Trending Now
          </h1>
          <p className="text-[#EBD3F8]/70 text-lg">
            Discover what's hot across StreamIt
          </p>
        </div>

        {/* Trending Streams */}
        <div className={`mb-12 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
             style={{ transitionDelay: '100ms' }}>
          <h2 className="text-[#EBD3F8] text-2xl font-semibold mb-6">
            Top Trending Streams
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trendingStreams.map((stream, index) => (
              <Link
                key={stream.id}
                to={`/stream/${stream.id}`}
                className={`group relative bg-[#2A2A2D] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${200 + (index * 100)}ms` }}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
                  
                  {/* Live Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <div className="flex items-center bg-red-500 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse mr-2"></span>
                      <span className="text-white font-medium text-sm">LIVE</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {stream.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-[#EBD3F8] font-semibold text-lg mb-2 line-clamp-1">
                    {stream.title}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#EBD3F8]/80 text-sm">{stream.streamer}</span>
                    <span className="text-[#EBD3F8]/60 text-sm">{stream.game}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#EBD3F8]/80 text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      {(stream.viewers / 1000).toFixed(1)}K watching
                    </div>
                    <div className="flex items-center text-[#EBD3F8]/60 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      Peak: {(stream.peakViewers / 1000).toFixed(1)}K
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Categories */}
        <div className={`transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
             style={{ transitionDelay: '500ms' }}>
          <h2 className="text-[#EBD3F8] text-2xl font-semibold mb-6">
            Trending Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`group relative bg-[#2A2A2D] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${600 + (index * 100)}ms` }}
              >
                {/* Image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
                  
                  {/* Growth Badge */}
                  <div className="absolute top-2 right-2 bg-green-500/90 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {category.growth}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-[#EBD3F8] font-semibold text-lg mb-3">
                    {category.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-[#EBD3F8]/80 text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        {(category.viewers / 1000).toFixed(1)}K viewers
                      </div>
                      <div className="flex items-center text-[#EBD3F8]/60 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        {(category.channels / 1000).toFixed(1)}K channels
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending; 