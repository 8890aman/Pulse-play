import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Target, Sword, Building2, MessageCircle, Pickaxe, Play, Folder, Eye } from 'lucide-react';
  
  // Mock data for live channels
  const liveChannels = [
    {
    id: 1,
      title: "Ranked Grind to Radiant",
      streamer: "Hiko",
      game: "VALORANT",
      viewers: 25000,
      duration: "2:15:30",
    thumbnail: "https://imgs.search.brave.com/u5e1xSE-TqfcYvDSzvf2LfyiLEYBTSvwX6VqPcWUvi8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lbG9r/aW5nLmNvbS9zdG9y/YWdlL2Jsb2ctaW1h/Z2VzL2UwaVQ4UVox/UmZRdXpOVUJXSXhX/MGtFa2pWNmpGbDd5/LmpwZw",
      tags: ["Ranked", "Radiant", "Pro"]
    },
    {
    id: 2,
      title: "CS:GO Major Qualifiers",
      streamer: "ESL_CSGO",
    game: "Counter-Strike 2",
      viewers: 18000,
      duration: "4:30:15",
    thumbnail: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg",
      tags: ["Major", "Qualifiers", "Pro"]
    },
    {
    id: 3,
      title: "League of Legends Worlds 2023",
      streamer: "RiotGames",
      game: "League of Legends",
      viewers: 95000,
      duration: "6:45:20",
    thumbnail: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872a966297484acd0efe49f34edd5aed",
      tags: ["Worlds", "Championship", "Pro"]
    },
    {
    id: 4,
      title: "Fortnite Battle Royale",
      streamer: "Ninja",
      game: "Fortnite",
      viewers: 15000,
      duration: "1:30:45",
    thumbnail: "https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg",
      tags: ["Battle Royale", "Solo", "Pro"]
    },
    {
    id: 5,
      title: "Just Chatting with the Community",
    streamer: "ivy",
      game: "Just Chatting",
      viewers: 12000,
      duration: "0:45:30",
    thumbnail: "https://imgs.search.brave.com/jqdUg0ifihHoPwPf27YB-8RR2Df6WibgLiawXgxjH9w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE3LzBl/LzUzLzE3MGU1MzAw/ZmJlM2IyZjg0YWQ3/YjNkZThlY2RmOWIy/LmpwZw",
      tags: ["Community", "Q&A", "IRL"]
    },
    {
    id: 6,
      title: "Marvel Rivals Tournament",
      streamer: "MarvelGames",
      game: "Marvel Rivals",
      viewers: 8000,
      duration: "3:15:10",
    thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/997070/capsule_616x353.jpg",
      tags: ["Tournament", "Pro", "Marvel"]
    },
    {
    id: 7,
      title: "Apex Legends Ranked",
    streamer: "Aceu",
      game: "Apex Legends",
      viewers: 22000,
      duration: "2:00:15",
    thumbnail: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg",
      tags: ["Ranked", "Solo", "Pro"]
    },
    {
    id: 8,
      title: "Minecraft Survival Series",
      streamer: "Dream",
      game: "Minecraft",
      viewers: 18000,
      duration: "1:45:30",
    thumbnail: "https://imgs.search.brave.com/8Bnc3WkdHr8qOapvd0z6xACFRHzTyx-9Zw4F5aNMy8Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5hcGkucGxheXN0/YXRpb24uY29tL3Z1/bGNhbi9hcC9ybmQv/MjAyNDA3LzA0MDEv/MTY1YjFhZmRmMTRj/MjYzMjFhZjkwNzQ2/ZTRhNDJlMjM0MTZi/Yjc0ZWFmZDM0YjBj/LnBuZw",
      tags: ["Survival", "Series", "Pro"]
  },
  {
    id: 9,
    title: "GTA RP NoPixel",
    streamer: "xQc",
    game: "Grand Theft Auto V",
    viewers: 45000,
    duration: "5:20:15",
    thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    tags: ["RP", "NoPixel", "Adventure"]
  },
  {
    id: 10,
    title: "Dota 2 International",
    streamer: "PGL",
    game: "Dota 2",
    viewers: 85000,
    duration: "3:45:20",
    thumbnail: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg",
    tags: ["Tournament", "Pro", "International"]
  },
  {
    id: 11,
    title: "Warzone Tournaments",
    streamer: "NICKMERCS",
    game: "Call of Duty: Warzone",
    viewers: 32000,
    duration: "4:10:30",
    thumbnail: "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw-wz/WZ-Season-Three-Announce-TOUT.jpg",
    tags: ["Tournament", "BR", "Squad"]
  },
  {
    id: 12,
    title: "FIFA 24 Ultimate Team",
    streamer: "Castro_1021",
    game: "EA FC 24",
    viewers: 28000,
    duration: "2:50:45",
    thumbnail: "https://imgs.search.brave.com/fpeAm4ZS_2GFEGgiKVy1wV6qsPPEAVOH7A_FjZxkLGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRiLzkz/LzM0LzRiOTMzNDg5/ODI4NWQ0NTNmZDZm/OWY0YzlmOTYxZmQx/LmpwZw",
    tags: ["Ultimate Team", "Pack Opening", "FUT"]
  }
];

const AnimatedViewerCount = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(count);
  
  useEffect(() => {
    const duration = 1000;
    const steps = 20;
    const stepDuration = duration / steps;
    const increment = (count - displayCount) / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep === steps) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(prev => Math.round(prev + increment));
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [count]);

  return displayCount.toLocaleString();
};

const LiveChip = ({ viewers }) => {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="flex items-center gap-0.5 sm:gap-3 flex-wrap">
      <div className="bg-red-600 backdrop-blur-sm px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 shadow-lg hover:bg-red-500 transition-colors group">
        <span className={`inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${isBlinking ? 'bg-white animate-pulse' : 'bg-white/80'}`}></span>
        <span className="text-white font-semibold">LIVE</span>
      </div>
      <div className="bg-black/70 backdrop-blur px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-md">
        <span className="text-white font-semibold text-xs sm:text-sm whitespace-nowrap">
          <AnimatedViewerCount count={viewers} /> viewers
        </span>
      </div>
    </div>
  );
};

const Home = () => {
  const [channels, setChannels] = useState(liveChannels);
  const [loading, setLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoKey, setVideoKey] = useState(Date.now());
  const loaderRef = useRef(null);
  const videoRef = useRef(null);
  const location = useLocation();
  
  // Mock data for featured streamer
  const featuredStreamer = {
    id: 1,
    title: "VALORANT Champions Tour 2023 - Grand Finals",
    streamer: "RiotGames",
    game: "VALORANT",
    viewers: 125000,
    thumbnail: "https://imgs.search.brave.com/u5e1xSE-TqfcYvDSzvf2LfyiLEYBTSvwX6VqPcWUvi8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lbG9r/aW5nLmNvbS9zdG9y/YWdlL2Jsb2ctaW1h/Z2VzL2UwaVQ4UVox/UmZRdXpOVUJXSXhX/MGtFa2pWNmpGbDd5/LmpwZw",
    videoId: "btpWg1gDXIE"
  };

  // Effect to refresh video when navigating to Home
  useEffect(() => {
    if (location.pathname === '/') {
      console.log("Home page loaded, refreshing video element");
      // Force a complete refresh of the video element by changing its key
      setVideoKey(Date.now());
      setVideoLoaded(false);
    }
  }, [location.pathname]);

  // Effect to attempt playing the video on mount AND when navigating back to Home
  useEffect(() => {
    // Only try to play if we are on the Home page
    if (location.pathname === '/' && videoRef.current) {
      console.log("Home page detected, attempting to play video");
      
      // Simple approach: reset the video and play it
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
        
        // Use a small timeout to ensure the DOM is fully updated
        setTimeout(() => {
          if (videoRef.current) {
            console.log("Playing video after timeout");
            videoRef.current.play()
              .then(() => console.log("Video playback started successfully"))
              .catch(error => {
                console.error("Video playback failed:", error);
                // Add user interaction fallback
                document.addEventListener('click', function playOnFirstClick() {
                  console.log("User clicked, trying to play video");
                  if (videoRef.current) {
                    videoRef.current.play().catch(e => console.error("Still couldn't play after click:", e));
                  }
                  document.removeEventListener('click', playOnFirstClick);
                }, { once: true });
              });
          }
        }, 100);
      } catch (error) {
        console.error("Error during video setup:", error);
      }
    }
  }, [location.pathname]);

  // Helper function to play video - simplified
  const playVideo = () => {
    if (videoRef.current) {
      console.log("Direct playVideo function called");
      videoRef.current.play()
        .then(() => console.log("Video started via playVideo function"))
        .catch(error => console.error("Error in playVideo function:", error));
    }
  };

  // Simulate random viewer count updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setChannels(prevChannels => 
        prevChannels.map(channel => ({
          ...channel,
          viewers: Math.max(100, channel.viewers + Math.floor(Math.random() * 201) - 100)
        }))
      );
    }, 5000);

    return () => clearInterval(updateInterval);
  }, []);

  // Simulate loading more channels
  const loadMoreChannels = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const newChannels = [...channels, ...liveChannels.map(channel => ({
        ...channel,
        id: channel.id + channels.length
      }))];
      setChannels(newChannels);
      setLoading(false);
    }, 1000);
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading) {
          loadMoreChannels();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loading]);

  return (
    <div className="bg-[#1A1A1D] min-h-screen">
      {/* Featured Stream - Use consistent styling for all screen sizes */}
      <div className="relative h-[400px] overflow-hidden rounded-xl shadow-2xl bg-[#2A2A2D]">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Local Video with key for refreshing */}
          <video
            key={videoKey}
            ref={videoRef}
            className="absolute w-full h-full object-cover z-10 rounded-xl"
            src="/assets/valo.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => {
              console.log("Video loaded event fired");
              setVideoLoaded(true);
              playVideo();
            }}
            style={{ opacity: videoLoaded ? 1 : 0 }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 pointer-events-none z-20 rounded-xl"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end pointer-events-auto z-30">
          <div className="w-full px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 mb-3 sm:mb-0">
                <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#EBD3F8] flex items-center justify-center text-[#1A1A1D] font-bold">
                    {featuredStreamer.streamer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{featuredStreamer.streamer}</p>
                    <p className="text-white/70">{featuredStreamer.game}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-row items-center gap-2">
                <LiveChip viewers={featuredStreamer.viewers} />
                <Link to={`/stream/${featuredStreamer.id}`} className="inline-flex items-center px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg bg-white hover:bg-white/90 text-[#1A1A1D] font-medium transition-all duration-300 gap-1.5 sm:gap-2">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Watch Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8 xl:p-12">
        <div className="max-w-7xl mx-auto xl:max-w-8xl">
          {/* Live Channels Section */}
          <div>
            <h2 className="text-[#EBD3F8] text-xl font-semibold mb-4 flex items-center">
              <Play className="h-5 w-5 mr-2 text-[#EBD3F8]" />
              Live channels we think you'll like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {channels.map((channel) => (
                <Link to={`/stream/${channel.id}`} key={channel.id} className="group">
                  {/* Thumbnail */}
                  <div className="relative rounded-lg overflow-hidden shadow-lg group-hover:shadow-[#EBD3F8]/20 transition-all duration-300">
                    <img
                      src={channel.thumbnail}
                      alt={channel.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 scale-90 sm:scale-100 origin-bottom-left">
                      <LiveChip viewers={channel.viewers} />
                    </div>
                  </div>
                  
                  {/* Stream Info - improved mobile layout */}
                  <div className="mt-2 sm:mt-3">
                    <div className="flex">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EBD3F8] flex-shrink-0 flex items-center justify-center text-[#1A1A1D] font-bold">
                        {channel.streamer.charAt(0)}
                      </div>
                      <div className="ml-2 overflow-hidden">
                        <h3 className="text-[#EBD3F8] text-sm sm:text-base font-medium truncate group-hover:text-[#EBD3F8]/80 transition-colors">
                          {channel.title}
                        </h3>
                        <div className="flex items-center">
                          <p className="text-[#EBD3F8]/80 text-xs sm:text-sm mr-1">{channel.streamer}</p>
                          <span className="hidden xs:inline-block text-[#EBD3F8]/60 text-xs">•</span>
                          <p className="hidden xs:block text-[#EBD3F8]/60 text-xs sm:text-sm ml-1">{channel.game}</p>
                        </div>
                        <p className="block xs:hidden text-[#EBD3F8]/60 text-xs sm:text-sm">{channel.game}</p>
                        <div className="flex gap-1 sm:gap-2 mt-1 flex-wrap">
                          {channel.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="px-1.5 sm:px-2 py-0.5 bg-[#2A2A2D] text-[#EBD3F8]/80 text-xs rounded-full hidden sm:inline-block sm:first:inline-block sm:nth-child(2):inline-block"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Categories Section */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#EBD3F8] text-xl font-semibold flex items-center">
                <Folder className="h-5 w-5 mr-2 text-[#EBD3F8]" />
                Popular Categories
              </h2>
              <Link 
                to="/browse" 
                className="flex items-center px-4 py-2 rounded-lg bg-[#2A2A2D] hover:bg-[#2A2A2D]/80 text-[#EBD3F8] transition-all duration-300 group"
              >
                <span className="text-sm font-medium mr-2">View All</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { 
                  name: 'VALORANT',
                  banner: 'https://imgs.search.brave.com/8-w--1UhNtnEM2CW2f2zcxQejwExb6lTJf_4r8_hhN8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmFsb3JhbnQt/MzA1a2VzY3h3NWRw/dXA3eS5qcGc',
                  viewers: '125K'
                },
                { 
                  name: 'Counter-Strike',
                  banner: 'https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg',
                  viewers: '98K'
                },
                { 
                  name: 'League of Legends',
                  banner: 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872a966297484acd0efe49f34edd5aed',
                  viewers: '75K'
                },
                { 
                  name: 'Fortnite',
                  banner: 'https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg',
                  viewers: '62K'
                },
                { 
                  name: 'Minecraft',
                  banner: 'https://imgs.search.brave.com/8Oxf6gaPVgYJzRYTgCV_JNcTye45UX1dDGZBF_Rxa7Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWluZWNyYWZ0Lm5l/dC9jb250ZW50L2Rh/bS9taW5lY3JhZnRu/ZXQvZ2FtZXMvZHVu/Z2VvbnMva2V5LWFy/dC9Ib21lcGFnZV9D/b2xsZWN0YWJsZXMt/Q2Fyb3VzZWwtSC0w/X01DRF80MTR4NDE0/XzAxLmpwZw',
                  viewers: '28K'
                }
              ].map((category, index) => (
                <Link to={`/category/${index + 1}`} key={index} className="group relative overflow-hidden rounded-xl">
                  <div className="aspect-[16/9] relative overflow-hidden rounded-xl">
                    {/* Banner Image */}
                    <img 
                      src={category.banner}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#EBD3F8] transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Eye className="w-3.5 h-3.5 text-[#EBD3F8] mr-1.5" />
                          <span className="text-[#EBD3F8] text-sm font-medium">
                            {category.viewers}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Infinite Scroll Section */}
          <div className="mt-12">
            <h2 className="text-[#EBD3F8] text-xl font-semibold mb-6 flex items-center">
              <Play className="h-5 w-5 mr-2 text-[#EBD3F8]" />
              Discover More Streams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {channels.map((channel) => (
                <Link to={`/stream/${channel.id}`} key={channel.id} className="group">
                  <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-[#EBD3F8]/20 transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="aspect-video relative">
                      <img
                        src={channel.thumbnail}
                        alt={channel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Live Badge & Duration */}
                      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 scale-90 sm:scale-100 origin-top-left">
                        <LiveChip viewers={channel.viewers} />
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                    </div>

                    {/* Stream Info - improved mobile layout */}
                    <div className="p-2 sm:p-4 bg-[#2A2A2D]">
                      <div className="flex">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EBD3F8] flex-shrink-0 flex items-center justify-center text-[#1A1A1D] font-bold">
                          {channel.streamer.charAt(0)}
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <h3 className="text-[#EBD3F8] text-sm sm:text-base font-medium line-clamp-1 group-hover:text-[#EBD3F8]/80 transition-colors">
                            {channel.title}
                          </h3>
                          <div className="flex items-center">
                            <p className="text-[#EBD3F8]/80 text-xs sm:text-sm mr-1">{channel.streamer}</p>
                            <span className="hidden xs:inline-block text-[#EBD3F8]/60 text-xs">•</span>
                            <p className="hidden xs:block text-[#EBD3F8]/60 text-xs sm:text-sm ml-1">{channel.game}</p>
                          </div>
                          <p className="block xs:hidden text-[#EBD3F8]/60 text-xs sm:text-sm">{channel.game}</p>
                          <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2 flex-wrap">
                            {channel.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="px-1.5 sm:px-2 py-0.5 bg-[#1A1A1D] text-[#EBD3F8]/80 text-xs rounded-full hidden sm:inline-block sm:first:inline-block sm:nth-child(2):inline-block"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Loading Indicator */}
            <div 
              ref={loaderRef} 
              className="flex justify-center items-center py-8"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#EBD3F8] animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#EBD3F8] animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#EBD3F8] animate-bounce"></div>
                </div>
              ) : (
                <div className="h-8" /> // Spacer for intersection observer
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;