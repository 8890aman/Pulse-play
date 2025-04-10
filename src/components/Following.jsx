import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Eye, Bell, Star, ChevronRight, Users, Clock } from 'lucide-react';

const Following = () => {
  const [followedChannels] = useState([
    {
      id: 1,
      streamer: "Hiko",
      avatar: "H",
      isLive: true,
      game: "VALORANT",
      title: "Ranked Grind to Radiant",
      viewers: 25000,
      lastSeen: "Now",
      thumbnail: "https://imgs.search.brave.com/bZSgCQfiEVGUL6nQdEAuUR0h04MUfysQZFGJVvs3Mow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/NW93Z3A3MzJrdXA0/MS5wbmc_d2lkdGg9/NDA5NiZmb3JtYXQ9/cG5nJmF1dG89d2Vi/cCZzPWFiZTEzNTlk/Y2ZmMTY2OWFkMDVk/ZDc3OTJiN2IzMTU3/MzFhMzM4MDE"
    },
    {
      id: 2,
      streamer: "Aceu",
      avatar: "A",
      isLive: true,
      game: "Apex Legends",
      title: "Solo Queue Adventures",
      viewers: 22000,
      lastSeen: "Now",
      thumbnail: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg"
    },
    {
      id: 3,
      streamer: "Shroud",
      avatar: "S",
      isLive: false,
      game: "Counter-Strike 2",
      title: "CS2 Competitive",
      lastSeen: "3h ago",
      thumbnail: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg"
    },
    {
      id: 4,
      streamer: "Pokimane",
      avatar: "P",
      isLive: false,
      game: "Just Chatting",
      title: "Chill Stream w/ Chat",
      lastSeen: "5h ago",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5PNETxg3zAXbqbSy9lA9JNzSzL9vIyGfRp9tMzhSe8kIKGK0VL4EJSd3lytON6BUf4vVXAB4fuv6o-CwEiXplpg"
    }
  ]);

  const [followedCategories] = useState([
    {
      id: 1,
      name: "VALORANT",
      image: "https://imgs.search.brave.com/8-w--1UhNtnEM2CW2f2zcxQejwExb6lTJf_4r8_hhN8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmFsb3JhbnQt/MzA1a2VzY3h3NWRw/dXA3eS5qcGc",
      liveChannels: 850,
      color: "from-[#9D4EDD] to-[#C77DFF]"
    },
    {
      id: 2,
      name: "Counter-Strike 2",
      image: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg",
      liveChannels: 620,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      name: "Apex Legends",
      image: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg",
      liveChannels: 450,
      color: "from-red-600 to-red-500"
    }
  ]);
  
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#1A1A1D] to-[#1F1F23] min-h-screen p-4 md:p-8 xl:p-12">
      <div className="max-w-7xl mx-auto xl:max-w-8xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Following</h1>
          <p className="text-[#EBD3F8]/60">Channels and categories you follow</p>
        </div>
        
        {/* Live Now Section */}
        <div className={`mb-12 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] flex items-center justify-center shadow-lg shadow-[#9D4EDD]/10 mr-3">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-[#EBD3F8] text-2xl font-semibold">Live Channels</h2>
            </div>
            <Link to="/browse" className="flex items-center text-[#C77DFF] text-sm hover:text-[#EBD3F8] transition-colors group">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {followedChannels.map((channel, index) => (
              <Link
                key={channel.id}
                // to={`/channel/${channel.id}`}
                className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail with gradient overlay */}
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={channel.thumbnail}
                    alt={channel.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1D] via-[#1A1A1D]/60 to-transparent opacity-90" />
                  
                  {/* Live badge */}
                  {channel.isLive && (
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <div className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center">
                        <span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></span>
                        LIVE
                      </div>
                      <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {(channel.viewers / 1000).toFixed(1)}K
                      </div>
                    </div>
                  )}
                  
                  {/* Offline badge */}
                  {!channel.isLive && (
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <div className="bg-gray-700/80 backdrop-blur-sm text-gray-300 text-xs font-medium px-2 py-1 rounded-md flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {channel.lastSeen}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] flex items-center justify-center text-white font-bold text-sm">
                        {channel.avatar}
                      </div>
                      {channel.isLive && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#1A1A1D] animate-pulse" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-[#C77DFF] transition-colors">
                        {channel.streamer}
                      </h3>
                      <p className="text-[#EBD3F8]/60 text-xs">
                        {channel.game}
                      </p>
                    </div>
                  </div>
                  
                  {channel.isLive && (
                    <p className="text-[#EBD3F8]/80 text-sm line-clamp-1 group-hover:text-[#EBD3F8] transition-colors">
                      {channel.title}
                    </p>
                  )}
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#9D4EDD]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className={`transition-all duration-700 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] flex items-center justify-center shadow-lg shadow-[#9D4EDD]/10 mr-3">
                <Star className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-[#EBD3F8] text-2xl font-semibold">Followed Categories</h2>
            </div>
            <Link to="/browse" className="flex items-center text-[#C77DFF] text-sm hover:text-[#EBD3F8] transition-colors group">
              <span>Discover More</span>
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {followedCategories.map((category, index) => (
              <Link
                key={category.id}
                // to={`/category/${category.id}`}
                className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${400 + (index * 100)}ms` }}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient overlays for visual appeal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#EBD3F8] transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-lg w-fit">
                        <Users className="w-3.5 h-3.5 text-[#C77DFF]" />
                        <span className="text-[#EBD3F8] text-xs font-medium">
                          {category.liveChannels} live channels
                        </span>
                      </div>
                      
                      <div className="h-1 w-full bg-black/50 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${category.color} group-hover:animate-pulse`} style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Top highlight line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Empty state for when there's nothing followed */}
        {followedChannels.length === 0 && followedCategories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9D4EDD]/20 to-[#C77DFF]/20 flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-[#C77DFF]" />
            </div>
            <h3 className="text-[#EBD3F8] text-xl font-semibold mb-2">Nothing followed yet</h3>
            <p className="text-[#EBD3F8]/60 max-w-md mb-6">Follow your favorite streamers and categories to see them here and get notified when they go live</p>
            <Link to="/browse" className="bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#C77DFF]/20 transition-all">
              Discover Content
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Following; 