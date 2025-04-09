import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { Search, Menu, User, LogIn, UserPlus, Bell, Gift, Settings, HelpCircle, Home, Star, Compass, TrendingUp, Calendar, Gamepad2, Play, Coins } from 'lucide-react';
import NotificationModel from '../models/NotificationModel';
import GiftModel from '../models/GiftModel';

const Navbar = ({ onOpenLogin, onOpenSignup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [giftModelOpen, setGiftModelOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [points, setPoints] = useState(1000);
  const [animatingPoints, setAnimatingPoints] = useState(false);
  // eslint-disable-next-line
  const [targetPoints, setTargetPoints] = useState(1000);
  const pointsRef = useRef(null);
  const mobilepointsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Animation function for points count
  const animatePointsChange = (startValue, endValue, duration = 2000) => {
    setAnimatingPoints(true);
    setTargetPoints(endValue);
    
    let startTime;
    const refs = [pointsRef, mobilepointsRef].filter(ref => ref.current);
    
    const animateFrame = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      
      // Easing function for smoother animation
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
      
      // Update all refs with the current value
      refs.forEach(ref => {
        if (ref.current) {
          ref.current.textContent = currentValue.toLocaleString();
          
          // Add flickering effect during animation
          if (progress < 1) {
            ref.current.classList.add('points-animating');
          } else {
            ref.current.classList.remove('points-animating');
          }
        }
      });
      
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      } else {
        setPoints(endValue);
        setAnimatingPoints(false);
      }
    };
    
    requestAnimationFrame(animateFrame);
  };
  
  // Easing function
  const easeOutExpo = (x) => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };
  
  // Listen for points purchase events and openPointsStore events
  useEffect(() => {
    const handlePointsPurchase = (event) => {
      const { currentPoints, newPoints, isChatDonation } = event.detail;
      
      // Different animation duration based on source
      const animationDuration = isChatDonation ? 1000 : 2000;
      animatePointsChange(currentPoints, newPoints, animationDuration);
    };
    
    const handleOpenPointsStore = () => {
      setGiftModelOpen(true);
    };
    
    window.addEventListener('pointsPurchase', handlePointsPurchase);
    window.addEventListener('openPointsStore', handleOpenPointsStore);
    
    return () => {
      window.removeEventListener('pointsPurchase', handlePointsPurchase);
      window.removeEventListener('openPointsStore', handleOpenPointsStore);
    };
  }, []);

  // Navigation links - same as in Sidebar
  const navLinks = [
    { path: '/', icon: <Home />, label: 'Home' },
    { path: '/following', icon: <Star />, label: 'Following' },
    { path: '/browse', icon: <Compass />, label: 'Browse' },
    { path: '/trending', icon: <TrendingUp />, label: 'Trending' },
    { path: '/events', icon: <Calendar />, label: 'Events' },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const menuButton = document.getElementById('mobile-menu-button');
        if (!menuButton || !menuButton.contains(event.target)) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        const userButton = document.getElementById('user-menu-button');
        if (!userButton || !userButton.contains(event.target)) {
          setUserMenuOpen(false);
        }
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <>
      <nav className="bg-[#1A1A1D] fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-300 shadow-lg">
        <div className="h-16 flex items-center justify-between max-w-[2000px] mx-auto px-4 md:px-6">
          {/* Left section - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative overflow-hidden w-10 h-10 flex items-center justify-center mr-2">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#9D4EDD] to-[#C77DFF] rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300 shadow-lg animate-pulse-slow"></div>
                
                {/* 3D lighting and depth effects */}
                <div className="absolute inset-0.5 bg-gradient-to-bl from-white/20 to-transparent rounded-full"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-[#9D4EDD]/30 to-[#C77DFF]/20 backdrop-blur-sm"></div>
                <div className="absolute top-0.5 left-1 w-3 h-3 rounded-full bg-white/20 blur-sm"></div>
                
                {/* Orbiting particles */}
                <div className="absolute inset-0 rotate-orbit">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/70 blur-[0.5px]"></div>
                </div>
                <div className="absolute inset-0 rotate-orbit-reverse">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70 blur-[0.5px]"></div>
                </div>
                <div className="absolute inset-0 rotate-orbit-slow">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C77DFF]/70 blur-[1px]"></div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Pulse waves animation */}
                  <div className="absolute w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/30 animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 animate-ping" style={{animationDelay: '300ms'}}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 animate-ping" style={{animationDelay: '600ms'}}></div>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Energy glow behind play button */}
                  <div className="absolute w-5 h-5 rounded-full bg-white/10 blur-md"></div>
                  
                  {/* Play icon */}
                  <div className="flex items-center justify-center w-full h-full z-10">
                    <Play className="w-5 h-5 text-white fill-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold leading-none tracking-tight group-hover:text-[#EBD3F8] transition-colors">
                  Pulse<span className="bg-gradient-to-r from-[#C77DFF] to-[#9D4EDD] text-transparent bg-clip-text">Play</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Search Input (now more centered/expanded) */}
          <div className="hidden md:block flex-1 max-w-2xl mx-4 lg:mx-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search streams, creators, or categories"
                className="w-full bg-[#2A2A2D]/50 text-[#EBD3F8] border-none focus:ring-2 focus:ring-[#C77DFF]/30 placeholder-[#EBD3F8]/60 rounded-xl pr-12 pl-4 py-2 transition-all duration-200 outline-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EBD3F8]/50 hover:text-[#C77DFF] transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Search Hotkey Hint */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:flex items-center">
                <kbd className="hidden lg:flex items-center justify-center h-5 w-5 rounded border border-[#EBD3F8]/20 bg-[#2A2A2D] font-mono text-xs text-[#EBD3F8]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  /
                </kbd>
              </div>
            </div>
          </div>

          {/* Right section - User actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notification Bell */}
            <button 
              className="text-[#EBD3F8]/70 hover:text-[#C77DFF] transition-colors hidden sm:flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#2A2A2D]/70 relative group"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C77DFF]/50 opacity-75"></span>
                <span className="relative inline-flex justify-center items-center rounded-full h-3.5 w-3.5 bg-[#C77DFF] text-[9px] font-bold text-white">3</span>
              </span>
            </button>
            
            {/* Points Button with Animation */}
            <button 
              className="text-[#EBD3F8]/70 hover:text-[#C77DFF] transition-colors hidden sm:flex items-center justify-center h-8 rounded-full hover:bg-[#2A2A2D]/70 px-3 relative"
              onClick={() => setGiftModelOpen(true)}
            >
              <div className="flex items-center relative z-10">
                <Coins className="w-5 h-5 mr-1.5" />
                <span className="font-medium text-sm whitespace-nowrap points-value-container">
                  <span ref={pointsRef} className="points-value font-variant-numeric: tabular-nums">{points.toLocaleString()}</span> Points
                </span>
              </div>
              {/* Animated glow effect when points change */}
              {animatingPoints && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EBD3F8]/0 via-[#EBD3F8]/30 to-[#EBD3F8]/0 animate-points-glow"></div>
              )}
            </button>
            
            {/* Auth Buttons - Shown when user is not logged in */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button 
                variant="text" 
                className="text-[#EBD3F8] hover:text-[#C77DFF] normal-case flex items-center px-3 py-1.5 text-sm"
                onClick={onOpenLogin}
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5" />
                Log In
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] text-white hover:shadow-lg hover:shadow-[#C77DFF]/20 normal-case flex items-center px-3.5 py-1.5 text-sm transition-all duration-300"
                onClick={onOpenSignup}
              >
                <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                Sign Up
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <button 
              id="mobile-menu-button"
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#2A2A2D]/70 text-[#EBD3F8] hover:text-[#C77DFF] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* User profile button */}
            <button 
              id="user-menu-button"
              className="text-[#EBD3F8] hover:text-[#C77DFF] relative group"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#1A1A1D] flex items-center justify-center group-hover:bg-[#2A2A2D] transition-colors">
                  <User className="h-4 w-4" />
                </div>
              </div>
            </button>
            
            {/* User Profile Dropdown */}
            {userMenuOpen && (
              <div 
                ref={userMenuRef}
                className="absolute top-16 right-4 w-64 bg-[#1A1A1D] border border-[#2A2A2D] rounded-xl shadow-xl p-3 z-50"
              >
                <div className="border-b border-[#2A2A2D] pb-2 mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] p-0.5 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-[#1A1A1D] flex items-center justify-center">
                        <User className="h-5 w-5 text-[#C77DFF]" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[#EBD3F8] font-medium truncate">Guest User</div>
                      <div className="text-[#EBD3F8]/60 text-xs">Not signed in</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1 mb-2">
                  <Link to="" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#EBD3F8]/80 hover:bg-[#2A2A2D] hover:text-[#EBD3F8] transition-colors">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Settings</span>
                  </Link>
                  <Link to="" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#EBD3F8]/80 hover:bg-[#2A2A2D] hover:text-[#EBD3F8] transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-sm">Help & Support</span>
                  </Link>
                </div>
                
                <div className="border-t border-[#2A2A2D] pt-2 space-y-2">
                  <Button 
                    variant="text" 
                    className="w-full text-[#EBD3F8] hover:text-[#C77DFF] normal-case flex items-center justify-center px-3 py-1.5 text-sm"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onOpenLogin();
                    }}
                  >
                    <LogIn className="w-3.5 h-3.5 mr-1.5" />
                    Log In
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] text-white hover:shadow-lg hover:shadow-[#C77DFF]/20 normal-case flex items-center justify-center px-3 py-1.5 text-sm transition-all duration-300"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onOpenSignup();
                    }}
                  >
                    <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden bg-[#1A1A1D] border-t border-[#2A2A2D]/50 absolute w-full z-[999] shadow-xl max-h-[80vh] overflow-y-auto scrollbar-hide"
          >
            <div className="px-4 py-3 space-y-3">
              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search streams, creators, or categories"
                  className="w-full bg-[#2A2A2D]/50 text-[#EBD3F8] border-none focus:ring-2 focus:ring-[#C77DFF]/30 placeholder-[#EBD3F8]/60 rounded-xl pr-12 pl-4 py-2 outline-none"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EBD3F8]/50 hover:text-[#C77DFF] transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links - Added from Sidebar */}
              <div className="py-3 space-y-1.5 border-t border-[#2A2A2D]/50">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-300 ${
                      isActive(link.path) 
                      ? 'bg-gradient-to-r from-[#9D4EDD]/20 to-[#C77DFF]/20 text-[#C77DFF] font-medium' 
                      : 'text-[#EBD3F8]/70 hover:bg-[#2A2A2D]/40 hover:text-[#EBD3F8]'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`${
                      isActive(link.path) 
                      ? 'bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] shadow-lg shadow-[#9D4EDD]/10' 
                      : 'bg-[#2A2A2D] hover:bg-gradient-to-br hover:from-[#9D4EDD]/50 hover:to-[#C77DFF]/50'
                    } w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-300 mr-3`}>
                      {React.cloneElement(link.icon, { 
                        className: `h-4 w-4 ${isActive(link.path) ? 'text-white' : 'text-[#EBD3F8]/70'}`,
                        strokeWidth: isActive(link.path) ? 2.5 : 2
                      })}
                    </div>
                    <span className="font-medium text-sm flex-1">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="py-3 flex items-center space-x-4 border-t border-[#2A2A2D]/50">
                <button 
                  className="flex-1 flex items-center justify-center space-x-2 py-2.5 text-[#EBD3F8]/80 hover:text-[#C77DFF] transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setNotificationsOpen(true);
                  }}
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                  <div className="flex h-5 w-5 items-center justify-center bg-[#C77DFF] text-white text-xs rounded-full">3</div>
                </button>
                
                <button 
                  className="flex-1 flex items-center justify-center space-x-2 py-2.5 text-[#EBD3F8]/80 hover:text-[#C77DFF] transition-colors relative"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setGiftModelOpen(true);
                  }}
                >
                  <div className="flex items-center z-10">
                    <Coins className="w-5 h-5 mr-1.5" />
                    <span className="font-medium text-sm whitespace-nowrap">
                      <span ref={mobilepointsRef} className="points-value font-variant-numeric: tabular-nums">{points.toLocaleString()}</span> Points
                    </span>
                  </div>
                  {/* Animated glow effect when points change */}
                  {animatingPoints && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#EBD3F8]/0 via-[#EBD3F8]/30 to-[#EBD3F8]/0 animate-points-glow"></div>
                  )}
                </button>
              </div>

              {/* Login/Signup Buttons */}
              <div className="pt-3 flex space-x-2 border-t border-[#2A2A2D]/50">
                <Button 
                  variant="text" 
                  className="text-[#EBD3F8] hover:text-[#C77DFF] normal-case flex-1 flex items-center justify-center"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenLogin();
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Log In
                </Button>
                <Button 
                  className="bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] text-white hover:shadow-lg hover:shadow-[#C77DFF]/20 normal-case flex-1 flex items-center justify-center"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenSignup();
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Notification Modal */}
      <NotificationModel 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />

      {/* Gift Modal */}
      <GiftModel 
        isOpen={giftModelOpen} 
        onClose={() => setGiftModelOpen(false)} 
      />
      
      {/* Add CSS for animations */}
      <style jsx="true">{`
        .clip-path-triangle {
          clip-path: polygon(0% 0%, 0% 100%, 100% 50%);
        }
        
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
        
        @keyframes rotate-orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes rotate-orbit-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        
        .rotate-orbit {
          animation: rotate-orbit 6s linear infinite;
        }
        
        .rotate-orbit-reverse {
          animation: rotate-orbit-reverse 8s linear infinite;
        }
        
        .rotate-orbit-slow {
          animation: rotate-orbit 12s linear infinite;
        }
        
        @keyframes points-glow {
          0% { opacity: 0; transform: scaleX(0.9); }
          50% { opacity: 1; transform: scaleX(1.1); }
          100% { opacity: 0; transform: scaleX(0.9); }
        }
        
        .animate-points-glow {
          animation: points-glow 1s ease-in-out infinite;
        }
        
        .points-animating {
          animation: textFlicker 0.2s linear infinite;
        }
        
        @keyframes textFlicker {
          0% { color: rgba(235, 211, 248, 0.7); }
          50% { color: rgba(235, 211, 248, 1); }
          100% { color: rgba(235, 211, 248, 0.7); }
        }
        
        .points-value {
          font-variant-numeric: tabular-nums;
          transition: color 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default Navbar; 