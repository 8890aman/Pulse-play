import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Target, Sword, Building2, MessageCircle, Pickaxe, Home, Star, Compass, TrendingUp, Calendar, Eye, Settings, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  
  // Mock data for categories with enhanced visuals
  const categories = [
    { 
      id: 1, 
      name: "VALORANT", 
      viewers: 125000,
      logo: "https://www.citypng.com/public/uploads/preview/hd-valorant-neon-purple-logo-with-symbol-png-701751694787833402mgonhhe.png",
      useIcon: false,
      icon: <Gamepad2 className="w-5 h-5" />, 
      color: "from-[#9D4EDD] to-[#C77DFF]",
      tagColor: "bg-[#9D4EDD]"
    },
    { 
      id: 2, 
      name: "Counter-Strike", 
      viewers: 98000,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/600px-Counter-Strike_CS_logo.svg.png",
      useIcon: false,
      icon: <Target className="w-5 h-5" />, 
      color: "from-orange-500 to-red-500",
      tagColor: "bg-orange-500"
    },
    { 
      id: 3, 
      name: "League of Legends", 
      viewers: 75000,
      logo: "https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-0.png",
      useIcon: false,
      icon: <Sword className="w-5 h-5" />, 
      color: "from-blue-500 to-indigo-500",
      tagColor: "bg-blue-500"
    },
    { 
      id: 4, 
      name: "Fortnite", 
      viewers: 62000,
      logo: "https://imgs.search.brave.com/01Ox3eMghxgR07fMDbWR-062GFdBanTObhOZ7a3aqkA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ZWYwOTQ2MGYzZDBh/ZjAwMDRhZDE3NzYu/cG5n",
      useIcon: false,
      icon: <Building2 className="w-5 h-5" />, 
      color: "from-pink-500 to-rose-500",
      tagColor: "bg-pink-500"
    },
    { 
      id: 6, 
      name: "Minecraft", 
      viewers: 28000,
      logo: "https://res.cloudinary.com/zenbusiness/q_auto,w_1050/v1670445040/logaster/logaster-2020-06-image14-3.avif",
      useIcon: false,
      icon: <Pickaxe className="w-5 h-5" />, 
      color: "from-green-500 to-emerald-500",
      tagColor: "bg-green-500"
    }
  ];

  // Helper function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', icon: <Home />, label: 'Home' },
    { path: '/following', icon: <Star />, label: 'Following' },
    { path: '/browse', icon: <Compass />, label: 'Browse' },
    { path: '/trending', icon: <TrendingUp />, label: 'Trending' },
    { path: '/events', icon: <Calendar />, label: 'Events' },
  ];

  const toggleCategories = () => {
    setCategoriesExpanded(!categoriesExpanded);
  };

  return (
    <div className="hidden md:flex flex-col bg-gradient-to-b from-[#1A1A1D] to-[#1F1F23] h-screen fixed left-0 top-16 w-60 border-r border-[#2A2A2D]/50 shadow-xl">
      {/* Navigation Links */}
      <div className="py-5 px-2">
        <div className="space-y-1.5">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`group flex items-center px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive(link.path) 
                  ? 'bg-gradient-to-r from-[#9D4EDD]/20 to-[#C77DFF]/20 text-[#C77DFF] font-medium' 
                  : 'text-[#EBD3F8]/70 hover:bg-[#2A2A2D]/40 hover:text-[#EBD3F8]'
              }`}
            >
              <div className={`${
                isActive(link.path) 
                  ? 'bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] shadow-lg shadow-[#9D4EDD]/10' 
                  : 'bg-[#2A2A2D] group-hover:bg-gradient-to-br group-hover:from-[#9D4EDD]/50 group-hover:to-[#C77DFF]/50'
              } w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-300 mr-3`}>
                {React.cloneElement(link.icon, { 
                  className: `h-4 w-4 ${isActive(link.path) ? 'text-white' : 'text-[#EBD3F8]/70 group-hover:text-white'}`,
                  strokeWidth: isActive(link.path) ? 2.5 : 2
                })}
              </div>
              <span className="font-medium text-sm flex-1">
                {link.label}
              </span>
              {isActive(link.path) && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#C77DFF] animate-pulse"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Divider with gradient */}
      <div className="px-5 py-1">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2A2A2D] to-transparent"></div>
      </div>
      
      {/* Categories Section */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div 
          className="px-5 py-3 flex items-center justify-between cursor-pointer group"
          onClick={toggleCategories}
        >
          <h2 className="text-sm font-bold text-[#EBD3F8] uppercase tracking-wide group-hover:text-[#C77DFF] transition-colors">
            Top Categories
          </h2>
          <button className="text-[#EBD3F8]/60 group-hover:text-[#C77DFF] transition-colors">
            {categoriesExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
        
        <div className={`overflow-y-auto px-2 ${categoriesExpanded ? 'flex-1' : 'h-0'} transition-all duration-300 hide-scrollbar`}>
          <div className="space-y-1.5 pb-20">
            {categoriesExpanded && categories.map(category => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 ${
                  isActive(`/category/${category.id}`) 
                    ? 'bg-[#2A2A2D]/80 shadow-md' 
                    : 'hover:bg-[#2A2A2D]/40 hover:translate-x-1'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  {category.useIcon ? (
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} p-1.5 shadow-lg group-hover:shadow-[#EBD3F8]/10 transition-all duration-300 flex items-center justify-center`}>
                      <div className="text-white">
                        {React.cloneElement(category.icon, { className: "w-4 h-4" })}
                      </div>
                    </div>
                  ) : (
                    <div className={`w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 shadow-md ${
                      isActive(`/category/${category.id}`) 
                        ? 'ring-2 ring-[#C77DFF]/50' 
                        : 'group-hover:ring-2 group-hover:ring-[#C77DFF]/30'
                    } transition-all duration-300`}>
                      <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 p-1 flex items-center justify-center">
                        <img 
                          src={category.logo} 
                          alt={category.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <span className={`font-medium text-sm truncate ${
                    isActive(`/category/${category.id}`) 
                      ? 'text-[#C77DFF]' 
                      : 'text-[#EBD3F8]/80 group-hover:text-[#EBD3F8]'
                  } transition-colors duration-300`}>
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center pl-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    isActive(`/category/${category.id}`)
                      ? 'bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] text-white'
                      : 'bg-[#2A2A2D] text-[#EBD3F8]/70 group-hover:bg-[#2A2A2D]/80 group-hover:text-[#EBD3F8]'
                  } transition-all duration-300`}>
                    {(category.viewers / 1000).toFixed(0)}K
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto py-4 px-4 border-t border-[#2A2A2D]/50 bg-[#1A1A1D]/40 backdrop-blur-sm">
        <div className="flex justify-around">
          <button className="text-[#EBD3F8]/60 hover:text-[#C77DFF] transition-colors duration-300 p-1 rounded-lg hover:bg-[#2A2A2D]/50">
            <Eye className="h-5 w-5" />
          </button>
          <button className="text-[#EBD3F8]/60 hover:text-[#C77DFF] transition-colors duration-300 p-1 rounded-lg hover:bg-[#2A2A2D]/50">
            <Settings className="h-5 w-5" />
          </button>
          <button className="text-[#EBD3F8]/60 hover:text-[#C77DFF] transition-colors duration-300 p-1 rounded-lg hover:bg-[#2A2A2D]/50">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Add custom CSS for hide-scrollbar */}
      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(203, 125, 255, 0.3);
          border-radius: 20px;
        }
        
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(203, 125, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Sidebar; 