import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Share2, Heart, MessageCircle, Image, Smile, ChevronLeft, ChevronRight, Gift, X, Search, ChevronDown, Check } from 'lucide-react';
import ReactPlayer from 'react-player';
import 'plyr/dist/plyr.css';
import ShareModel from './ShareModel';
import DonationModal from './DonationModal';

const StreamPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("about");
  const [chatMessage, setChatMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      user: "User123", 
      message: "Hello everyone! 👋", 
      time: "2:34 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User123",
      role: "moderator",
      badges: ["mod", "subscriber"],
      reactions: { "❤️": 2, "😂": 1 },
      type: "text"
    },
    { 
      id: 2, 
      user: "Viewer456", 
      message: "Great stream! 🔥", 
      time: "2:35 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Viewer456",
      role: "subscriber",
      badges: ["subscriber"],
      reactions: { "🔥": 3 },
      type: "text"
    },
    { 
      id: 3, 
      user: "StreamFan", 
      message: "That play was insane! 😱", 
      time: "2:36 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=StreamFan",
      role: "viewer",
      badges: [],
      reactions: { "😱": 2 },
      type: "text"
    },
    { 
      id: 4, 
      user: "GamerPro", 
      message: "What rank are you aiming for?", 
      time: "2:37 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro",
      role: "viewer",
      badges: [],
      reactions: {},
      type: "text"
    },
    { 
      id: 5, 
      user: "NewViewer", 
      message: "First time here, loving the content!", 
      time: "2:38 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NewViewer",
      role: "viewer",
      badges: [],
      reactions: {},
      type: "text"
    }
  ]);
  const mobileChatRef = useRef(null);
  const desktopChatRef = useRef(null);
  const [gifs] = useState([
    {
      id: 'pogchamp',
      url: 'https://media.giphy.com/media/e37RbTLYjfc1q/giphy.gif?cid=790b7611xaxg6rjah6a3h31akou9pce0lyxjzz2gurrpf8t4&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      title: 'PogChamp'
    },
    {
      id: 'kappa',
      url: 'https://media.giphy.com/media/e37RbTLYjfc1q/giphy.gif?cid=790b7611xaxg6rjah6a3h31akou9pce0lyxjzz2gurrpf8t4&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      title: 'Kappa'
    },
    {
      id: 'lul',
      url: 'https://media.giphy.com/media/e37RbTLYjfc1q/giphy.gif?cid=790b7611xaxg6rjah6a3h31akou9pce0lyxjzz2gurrpf8t4&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      title: 'LUL'
    },
    {
      id: 'pog',
      url: 'https://media.giphy.com/media/e37RbTLYjfc1q/giphy.gif?cid=790b7611xaxg6rjah6a3h31akou9pce0lyxjzz2gurrpf8t4&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      title: 'POG'
    },
    {
      id: 'catjam',
      url: 'https://media.giphy.com/media/e37RbTLYjfc1q/giphy.gif?cid=790b7611xaxg6rjah6a3h31akou9pce0lyxjzz2gurrpf8t4&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      title: 'CatJam'
    }
  ]);

  const [stickers] = useState([
    {
      id: 'pepe',
      url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWJ6djdja3ZxajJxZThiYXUyN3drMXE3YXB1M2lrbXV5YmJ0M2w3cyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/CKqTAwtMSLl0lz4cUM/giphy.gif',
      title: 'Happy Pepe'
    },
    {
      id: 'peepohappy',
      url: 'https://media.giphy.com/media/VIKa3CjZDCoymNcBY5/giphy.gif?cid=790b76111bzv7ckvqj2qe8bau27wk1q7apu3ikmuybbt3l7s&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
      title: 'PeepoHappy'
    },
    {
      id: 'peeposad',
      url: 'https://media.giphy.com/media/C3brYLms1bhv2/giphy.gif?cid=790b76114ddnebxmrq8htte24b3se4d21c46iswr0tcnfs0u&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      title: 'PeepoSad'
    },
    {
      id: 'peepoclap',
      url: 'https://media.giphy.com/media/C3brYLms1bhv2/giphy.gif?cid=790b76114ddnebxmrq8htte24b3se4d21c46iswr0tcnfs0u&ep=v1_gifs_search&rid=giphy.gif&ct=g',
      title: 'PeepoClap'
    }
  ]);
  
  const [streamData, setStreamData] = useState({
    id: 1,
    title: "FINALLY PLAYING RANKED!",
    streamer: "shanks_ttv",
    game: "VALORANT",
    viewers: 4200,
    followers: 12500,
    isLive: true,
    tags: ["English", "Competitive", "Ranked"],
    description: "Stream description goes here. This is where the streamer can write about what they're doing, their schedule, or any other information they want to share with their viewers.",
    schedule: "Streaming every day at 8PM EST",
    socials: {
      twitter: "https://twitter.com/shanks_ttv",
      instagram: "https://instagram.com/shanks_ttv",
      youtube: "https://youtube.com/shanks_ttv"
    }
  });

  const [relatedStreams, setRelatedStreams] = useState([
    {
      id: 1,
      title: "Road to Radiant",
      streamer: "TenZ",
      game: "VALORANT",
      viewers: 15000,
      isLive: true,
      thumbnail: "https://imgs.search.brave.com/bZSgCQfiEVGUL6nQdEAuUR0h04MUfysQZFGJVvs3Mow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/NW93Z3A3MzJrdXA0/MS5wbmc_d2lkdGg9/NDA5NiZmb3JtYXQ9/cG5nJmF1dG89d2Vi/cCZzPWFiZTEzNTlk/Y2ZmMTY2OWFkMDVk/ZDc3OTJiN2IzMTU3/MzFhMzM4MDE"
    },
    {
      id: 2,
      title: "Competitive Matches",
      streamer: "Shroud",
      game: "Counter-Strike 2",
      viewers: 25000,
      isLive: true,
      thumbnail: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg"
    },
    {
      id: 3,
      title: "League Ranked Grind",
      streamer: "Faker",
      game: "League of Legends",
      viewers: 12000,
      isLive: false,
      thumbnail: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872a966297484acd0efe49f34edd5aed"
    },
    {
      id: 4,
      title: "Minecraft Hardcore",
      streamer: "Dream",
      game: "Minecraft",
      viewers: 18000,
      isLive: true,
      thumbnail: "https://imgs.search.brave.com/fvKNKgwgGnxmhRq0gaNUe1J1U_Z8FWx-8-65qZRYQ-U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMubmludGVuZG8u/Y29tL2ltYWdlL3Vw/bG9hZC9hcl8xNjo5/LGNfbHBhZCx3XzEy/NDAvYl93aGl0ZS9m/X2F1dG8vcV9hdXRv/L25jb20vc29mdHdh/cmUvc3dpdGNoLzcw/MDEwMDAwMDAwOTY0/L2EyOGE4MTI1M2U5/MTkyOThiZWFiMjI5/NWUzOWE1NmI3YTUx/NDBlZjE1YWJkYjU2/MTM1NjU1ZTVjMjIx/YjJhM2E"
    },
    {
      id: 5,
      title: "Fortnite Tournament",
      streamer: "Ninja",
      game: "Fortnite",
      viewers: 9000,
      isLive: false,
      thumbnail: "https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg"
    }
  ]);

  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Add viewer count update effect
  useEffect(() => {
    const updateViewerCounts = () => {
      // Update main stream viewers
      setStreamData(prev => ({
        ...prev,
        viewers: Math.max(100, prev.viewers + Math.floor(Math.random() * 201) - 100)
      }));

      // Update related streams viewers
      setRelatedStreams(prev => prev.map(stream => ({
        ...stream,
        viewers: Math.max(100, stream.viewers + Math.floor(Math.random() * 201) - 100)
      })));
    };

    const interval = setInterval(updateViewerCounts, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add auto-generated chat messages
  useEffect(() => {
    const generateRandomUsername = () => {
      const adjectives = ['Happy', 'Cool', 'Pro', 'Epic', 'Super', 'Mega', 'Ultra'];
      const nouns = ['Gamer', 'Player', 'Streamer', 'Fan', 'Viewer', 'Champion'];
      const number = Math.floor(Math.random() * 1000);
      return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${number}`;
    };

    const addRandomMessage = () => {
      const username = generateRandomUsername();
      const messageContent = getRandomMessage();
      const badges = getRandomBadges();
      const reactions = getRandomReactions();

      const newMessage = {
        id: Date.now(),
        user: username,
        ...messageContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        role: badges.includes('mod') ? 'moderator' : badges.includes('subscriber') ? 'subscriber' : 'viewer',
        badges: badges,
        reactions: reactions
      };

      // Keep only the most recent 15 messages
      setChatMessages(prev => {
        const updatedMessages = [...prev, newMessage];
        if (updatedMessages.length > 15) {
          return updatedMessages.slice(updatedMessages.length - 15);
        }
        return updatedMessages;
      });
    };

    // Generate a new message every 5-10 seconds (less frequent)
    const interval = setInterval(() => {
      addRandomMessage();
    }, Math.random() * 5000 + 5000);

    return () => clearInterval(interval);
  }, []);

  // Add a ref for the fullscreen chat container
  const fullscreenChatRef = useRef(null);

  // Auto-scroll chat to bottom - modify the existing effect to include fullscreen chat
  useEffect(() => {
    const scrollChat = (ref) => {
      if (ref && ref.current) {
        // Always scroll to the bottom for new messages
        requestAnimationFrame(() => {
          ref.current.scrollTo({
            top: ref.current.scrollHeight,
          behavior: 'smooth'
          });
        });
      }
    };
    
    // Apply scrolling to all chat containers
    scrollChat(mobileChatRef);
    scrollChat(desktopChatRef);
    scrollChat(fullscreenChatRef);
    
  }, [chatMessages]);

  // Empty handler for scroll events
  const handleChatScroll = () => {
    // We're now auto-scrolling, so we don't need to track scroll position
  };

  const getRandomMessage = () => {
    const messageTypes = ['text', 'gif', 'sticker', 'donation'];
    const randomType = messageTypes[Math.floor(Math.random() * (messageTypes.length - 1))]; // Exclude donations from random generation

    if (randomType === 'gif') {
      return {
        type: 'gif',
        gifId: gifs[Math.floor(Math.random() * gifs.length)].id,
        gifUrl: gifs[Math.floor(Math.random() * gifs.length)].url,
        message: ''
      };
    } else if (randomType === 'sticker') {
      return {
        type: 'sticker',
        stickerUrl: stickers[Math.floor(Math.random() * stickers.length)].url,
        message: ''
      };
    } else {
      // Enhanced text messages with more meaningful content
      const valorantMessages = [
        "That Operator shot was clean 👌",
        "Can you play Chamber next round?",
        "Sage wall saved the round!",
        "Nice clutch! 💪",
        "Breach flash was perfect",
        "Sova dart totally revealed them all",
        "Let's rush B next round!",
        "Nice spike defuse with 0.1 sec left!",
        "That flash around the corner was perfect",
        "Brim's ult just wiped the site! 🔥",
        "KAY/O knife shutdown their abilities nicely",
        "That Raze rocket was insane!",
        "Viper's pit secured the site perfectly",
        "That Killjoy ult was so well timed",
        "Skye's flash into that eco rush was perfect",
        "Perfect Astra combo with the pull",
        "OMG that 180° flick was insane! 🔥",
        "Immortal gameplay right there!",
        "Are you a radiant smurf? 😱",
        "What's your sens and DPI?",
        "Which Vandal skin is that?",
        "PogChamp",
        "KEKW that enemy missed everything",
        "MonkaS with that 1v3",
        "LUL that spray transfer",
        "VAC, reported 🤣",
        "This is better than the VCT matches!",
        "Your crosshair placement is insane!",
        "Do you play professionally?",
        "Can you share your settings after this game?",
        "You should start streaming on Pulse Play!",
        "What's your rank? Must be at least Diamond!",
        "That ace was incredible, clip that!",
        "Love your gameplay style, very tactical",
        "You make this game look easy honestly"
      ];
      return {
        type: 'text',
        message: valorantMessages[Math.floor(Math.random() * valorantMessages.length)]
      };
    }
  };

  const getRandomBadges = () => {
    const badges = ['mod', 'subscriber', 'vip'];
    return badges.filter(() => Math.random() > 0.7);
  };

  const getRandomReactions = () => {
    const reactions = {
      "❤️": Math.floor(Math.random() * 5),
      "😂": Math.floor(Math.random() * 3),
      "🔥": Math.floor(Math.random() * 4),
      "😱": Math.floor(Math.random() * 2)
    };
    return Object.fromEntries(Object.entries(reactions).filter(([, count]) => count > 0));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: "You",
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        role: "viewer",
        badges: [],
        reactions: {},
        type: "text"
      };
      
      // Keep only the most recent 15 messages
      setChatMessages(prev => {
        const updatedMessages = [...prev, newMessage];
        if (updatedMessages.length > 15) {
          return updatedMessages.slice(updatedMessages.length - 15);
        }
        return updatedMessages;
      });
      
      setChatMessage("");
      setShowEmojiPicker(false);
    }
  };

  const [isChatOpen, setIsChatOpen] = useState(true);

  // Add useEffect to check screen size and set chat visibility accordingly
  useEffect(() => {
    const handleResize = () => {
      // Check if we're on desktop (xl breakpoint in tailwind is typically 1280px)
      const isDesktop = window.innerWidth >= 1280;
      
      // Always show chat on desktop, preserve user choice on mobile
      if (isDesktop) {
        setIsChatOpen(true);
      }
    };

    // Run once on initial render
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowAnimating, setIsFollowAnimating] = useState(false);
  const followAudioRef = useRef(null);
  const [showShareModel, setShowShareModel] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const playerRef = useRef(null);
  const [buffering, setBuffering] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const lastProgressRef = useRef({ played: 0, playedSeconds: 0 });
  const stuckCheckTimerRef = useRef(null);
  
  // Add this effect near the top with other useEffect hooks
  useEffect(() => {
    // Create and configure audio element
    const audio = new Audio('/assets/sound effect.m4a');
    audio.preload = 'auto';
    audio.volume = 1.0;
    
    // Store the audio element in the ref
    followAudioRef.current = audio;
    
    // Preload the audio
    const preloadAudio = async () => {
      try {
        await audio.load();
        console.log('Follow sound preloaded successfully');
      } catch (err) {
        console.error('Error preloading follow sound:', err);
      }
    };
    
    preloadAudio();
    
    // Cleanup
    return () => {
      if (followAudioRef.current) {
        followAudioRef.current.pause();
        followAudioRef.current = null;
      }
    };
  }, []);
  
  const handleFollow = () => {
    if (!isFollowing) {
      setIsFollowing(true);
      setIsFollowAnimating(true);
      
      // Play sound with optimized playback
      if (followAudioRef.current) {
        followAudioRef.current.currentTime = 0;
        const playPromise = followAudioRef.current.play();
        
        // Vibrate device if supported (200ms)
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Error playing follow sound:", err);
            // Fallback for browsers requiring user interaction
            const playOnInteraction = () => {
              followAudioRef.current.play().catch(e => console.error("Fallback play failed:", e));
              document.removeEventListener('click', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction, { once: true });
          });
        }
      }
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setIsFollowAnimating(false);
      }, 1000);
    } else {
      setIsFollowing(false);
    }
  };

  const handleShareClick = () => {
    console.log("Share button clicked");
    setShowShareModel(true);
  };

  const handleCloseShare = () => {
    console.log("Closing share model");
    setShowShareModel(false);
  };

  // Enhance the handleUnmute function to better control the video element
  const handleUnmute = () => {
    // Toggle mute state
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    console.log("Mute toggled, new state:", newMutedState ? "Muted" : "Unmuted");
    
    // Direct access to video element for more reliable control
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();
      
      if (videoElement) {
        try {
          // Set the muted property directly on the video element
          videoElement.muted = newMutedState;
          
          // Also set volume to ensure it's audible when unmuted
          if (!newMutedState) {
            videoElement.volume = 1.0;
            
            // Some browsers require a user interaction to play audio
            // This simulates that interaction
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.error("Play with sound error:", error);
                // Try one more time with user interaction context
                document.addEventListener('click', function tryPlayOnce() {
                  videoElement.play().catch(e => console.error("Second attempt failed:", e));
                  document.removeEventListener('click', tryPlayOnce);
                }, { once: true });
              });
            }
          }
        } catch (error) {
          console.error("Error toggling mute:", error);
        }
      } else {
        console.warn("Video element not accessible for direct mute control");
      }
    }
  };

  // Add a volume toggle function for the volume button
  const toggleVolume = () => {
    handleUnmute(); // Reuse our enhanced unmute function
  };

  // Function to toggle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Add effect to ensure sound is enabled when the video plays
  useEffect(() => {
    // Enable sound after component mounts
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        player.muted = false;
        console.log("Video sound enabled");
      }
    }
  }, []);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef(null);
  
  // Add a state to control the fullscreen chat overlay visibility
  const [showFullscreenChat, setShowFullscreenChat] = useState(false);
  
  // Add state to detect if we're on a mobile device
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Add state for screen orientation
  const [isLandscape, setIsLandscape] = useState(false);

  // Add effect to detect mobile devices and screen orientation
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
      );
      setIsMobileDevice(mobile);
      
      // Check orientation
      if (window.matchMedia) {
        const isLandscapeOrientation = window.matchMedia("(orientation: landscape)").matches;
        setIsLandscape(isLandscapeOrientation);
      } else {
        // Fallback for browsers without matchMedia
        setIsLandscape(window.innerWidth > window.innerHeight);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Add orientation change listener
    window.addEventListener('orientationchange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // Modify the fullscreen chat overlay to be responsive
  // Change the fullscreen chat div styles to be responsive
  <div className={`absolute ${isMobileDevice ? 'inset-0' : 'right-4 top-4 bottom-16 w-[350px]'} z-30 transition-all duration-300 bg-black/70 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col shadow-xl border border-[#EBD3F8]/20`}>
    {/* Adjust the header to be more mobile-friendly */}
    <div className="p-2 bg-black/80 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-[#EBD3F8]" />
        <h3 className="text-sm font-medium text-[#EBD3F8]">Live Chat</h3>
        {isMobileDevice && (
          <span className="ml-2 text-xs text-[#EBD3F8]/50">(Swipe down to minimize)</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isMobileDevice && (
          <button 
            onClick={() => setShowFullscreenChat(false)}
            className="p-1 rounded-full hover:bg-[#1A1A1D]/60 text-[#EBD3F8]/70"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
        {!isMobileDevice && (
          <button 
            onClick={() => setShowFullscreenChat(false)}
            className="p-1 rounded-full hover:bg-[#1A1A1D]/60 text-[#EBD3F8]/70"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
    
    {/* Rest of the chat overlay remains the same */}
  </div>

  // Modify the handleFullscreen function to be mobile-aware
  const handleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!isFullscreen) {
      // Enter fullscreen
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
          // Show fullscreen chat option when entering fullscreen
          // Only automatically show chat on desktops, not mobile
          if (isChatOpen && !isMobileDevice) {
            setShowFullscreenChat(true);
          }
          // For mobile in landscape, optimize layout
          if (isMobileDevice && isLandscape) {
            optimizeLandscapeLayout();
          }
        }).catch(err => {
          console.error("Error entering fullscreen:", err);
        });
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
        setIsFullscreen(true);
        if (isChatOpen && !isMobileDevice) setShowFullscreenChat(true);
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
        setIsFullscreen(true);
        if (isChatOpen && !isMobileDevice) setShowFullscreenChat(true);
      } else if (videoContainerRef.current.mozRequestFullScreen) {
        videoContainerRef.current.mozRequestFullScreen();
        setIsFullscreen(true);
        if (isChatOpen && !isMobileDevice) setShowFullscreenChat(true);
      }
    } else {
      // Exit fullscreen - same as before
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
          setShowFullscreenChat(false);
        }).catch(err => {
          console.error("Error exiting fullscreen:", err);
        });
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        setIsFullscreen(false);
        setShowFullscreenChat(false);
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        setIsFullscreen(false);
        setShowFullscreenChat(false);
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        setIsFullscreen(false);
        setShowFullscreenChat(false);
      }
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = document.fullscreenElement || 
                                   document.webkitFullscreenElement || 
                                   document.mozFullScreenElement || 
                                   document.msFullscreenElement;
      setIsFullscreen(!!isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Function to handle player errors and recovery attempts
  const handlePlayerError = (e) => {
    console.error("ReactPlayer error:", e);
    setPlaybackError(true);
    
    // Attempt to recover from error
    if (playerRef.current) {
      // Wait a moment then try reloading the player
      setTimeout(() => {
        console.log("Attempting to recover from playback error...");
        setPlaybackError(false);
        
        // Force reload the video
        playerRef.current.seekTo(0);
        
        // If we have a video element directly, try some additional recovery methods
        const videoElement = playerRef.current.getInternalPlayer();
        if (videoElement) {
          videoElement.load();
        }
        
        // Restart playback
        setIsPlaying(true);
      }, 1000);
    }
  };
  
  // Monitor for video getting stuck
  useEffect(() => {
    // Start monitoring for stuck video
    const startStuckDetection = () => {
      // Clear any existing stuck detection
      if (stuckCheckTimerRef.current) {
        clearInterval(stuckCheckTimerRef.current);
      }
      
      // Set up a new interval to check if video is progressing
      stuckCheckTimerRef.current = setInterval(() => {
        if (!playerRef.current || !isPlaying || buffering) return;
        
        try {
          const currentProgress = playerRef.current.getCurrentTime();
          const lastProgress = lastProgressRef.current.playedSeconds;
          
          // If we're not at the end of the video and progress hasn't changed in 3 seconds
          if (currentProgress > 0 && 
              currentProgress === lastProgress && 
              currentProgress < playerRef.current.getDuration() - 0.5) {
            
            console.log("Video appears to be stuck, attempting to recover...");
            
            // Try to unstick by seeking forward slightly and restarting playback
            playerRef.current.seekTo(currentProgress + 0.1);
            
            // If we have direct access to the video element
            const videoElement = playerRef.current.getInternalPlayer();
            if (videoElement) {
              // Force a reload if seeking didn't help
              videoElement.load();
              videoElement.currentTime = currentProgress + 0.1;
              videoElement.play().catch(e => console.error("Error restarting video:", e));
            }
          }
          
          // Update last progress
          lastProgressRef.current.playedSeconds = currentProgress;
        } catch (err) {
          console.error("Error in stuck detection:", err);
        }
      }, 3000); // Check every 3 seconds
    };
    
    // Start monitoring when the component mounts
    startStuckDetection();
    
    // Clean up when component unmounts
    return () => {
      if (stuckCheckTimerRef.current) {
        clearInterval(stuckCheckTimerRef.current);
      }
    };
  }, [isPlaying, buffering]);
  
  // Handle video progress updates
  const handleProgress = (progress) => {
    // Track progress for stuck detection
    lastProgressRef.current = progress;
  };
  
  // Handle video buffer state changes
  const handleBuffer = (buffering) => {
    setBuffering(buffering);
  };
  
  // Handle video ready state
  const handleReady = () => {
    console.log("ReactPlayer ready");
    
    // Reset error state when player is ready
    setPlaybackError(false);
    
    // Try to access the internal player for direct manipulation
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();
      
      if (videoElement) {
        // Set properties directly on the video element
        videoElement.muted = isMuted;
        
        // Set higher quality where possible
        if (videoElement.getVideoPlaybackQuality) {
          try {
            videoElement.quality = "high";
          } catch (e) {
            console.warn("Could not set video quality:", e);
          }
        }
        
        // Increase buffer size if browser supports it
        if (typeof videoElement.preload !== 'undefined') {
          videoElement.preload = "auto";
        }
        
        // Enable hardware acceleration where possible
        videoElement.style.transform = "translateZ(0)";
      }
    }
  };

  // Add state for fullscreen chat input
  const [fullscreenChatMessage, setFullscreenChatMessage] = useState("");
  const [showFullscreenEmojiPicker, setShowFullscreenEmojiPicker] = useState(false);

  // Add a method to handle sending messages from fullscreen mode
  const handleFullscreenSendMessage = (e) => {
    e.preventDefault();
    if (fullscreenChatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: "You",
        message: fullscreenChatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        role: "viewer",
        badges: [],
        reactions: {},
        type: "text"
      };
      
      // Keep only the most recent 15 messages
      setChatMessages(prev => {
        const updatedMessages = [...prev, newMessage];
        if (updatedMessages.length > 15) {
          return updatedMessages.slice(updatedMessages.length - 15);
        }
        return updatedMessages;
      });
      
      setFullscreenChatMessage("");
      setShowFullscreenEmojiPicker(false);
    }
  };

  // Add a useEffect hook to handle scroll locking on mobile
  useEffect(() => {
    if (isMobileDevice && isChatOpen) {
      // Prevent scrolling on the body when mobile chat is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // Restore scrolling when chat is closed or on desktop
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isMobileDevice, isChatOpen]);

  // Add state for donation modal
  const [showDonationModal, setShowDonationModal] = useState(false);
  
  // ... existing code - add before handleSendMessage function
  
  // Add this near the other modal handling functions
  const handleDonationClick = () => {
    console.log("Donation button clicked");
    setShowDonationModal(true);
  };

  const handleCloseDonation = () => {
    console.log("Closing donation modal");
    setShowDonationModal(false);
  };
  
  // Add donation handler
  const handleDonation = (amount, message) => {
    // Define the generateRandomUsername function inside this scope if it's not accessible
    const generateRandomUsername = () => {
      const adjectives = ['Happy', 'Cool', 'Pro', 'Epic', 'Super', 'Mega', 'Ultra'];
      const nouns = ['Gamer', 'Player', 'Streamer', 'Fan', 'Viewer', 'Champion'];
      const number = Math.floor(Math.random() * 1000);
      return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${number}`;
    };
    
    // Predefined donation celebration messages
    const celebrationPhrases = [
      "Thanks for the support!",
      "You're amazing!",
      "Much appreciated!",
      "Thank you so much!",
      "You rock!",
      "This helps a lot!",
      "Wow, thank you!",
      "You're the best!",
      "Thanks for keeping the stream going!",
      "This means a lot!"
    ];
    
    // Create a special donation message object
    const newMessage = {
      id: Date.now(),
      user: "You",
      type: "donation",
      amount: amount,
      isPoints: true,
      message: message || celebrationPhrases[Math.floor(Math.random() * celebrationPhrases.length)],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      role: "viewer",
      badges: ["Donor"],
      reactions: { "🙏": 3, "❤️": 5, "👑": 2 }
    };
    
    // Add the donation message to chat
    setChatMessages(prev => {
      const updatedMessages = [...prev, newMessage];
      if (updatedMessages.length > 15) {
        return updatedMessages.slice(updatedMessages.length - 15);
      }
      return updatedMessages;
    });
    
    // Emit the same pointsPurchase event as the GiftModel to update the navbar points counter
    // Simulate the user's current points and calculate the new balance after donation
    const userCurrentPoints = 1000; // This would normally be fetched from a user state or context
    const newPoints = userCurrentPoints - amount;
    
    // Create and dispatch the event to update the navbar
    const pointsUpdateEvent = new CustomEvent('pointsPurchase', {
      detail: { 
        currentPoints: userCurrentPoints,
        newPoints: newPoints,
        purchasedPoints: -amount, // Negative since we're spending points
        isChatDonation: true
      }
    });
    window.dispatchEvent(pointsUpdateEvent);
    
    // Add automated thank-you responses from other users after a short delay
    setTimeout(() => {
      // Random thankful responses from other users
      const thankfulResponses = [
        "Thanks for supporting the stream!",
        "Wow, generous donation!",
        "You're awesome for donating!",
        "Legend status confirmed!",
        "Much respect for the donation!",
        "Top tier supporter right here!"
      ];
      
      // Using the generateRandomUsername function from the outer scope
      const username = generateRandomUsername();
      
      const responseMessage = {
        id: Date.now() + 1,
        user: username,
        type: "text",
        message: thankfulResponses[Math.floor(Math.random() * thankfulResponses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        role: "viewer",
        badges: getRandomBadges(),
        reactions: { "👍": Math.floor(Math.random() * 5) + 1 }
      };
      
      setChatMessages(prev => {
        const updatedMessages = [...prev, responseMessage];
        if (updatedMessages.length > 15) {
          return updatedMessages.slice(updatedMessages.length - 15);
        }
        return updatedMessages;
      });
      
      // Scroll chat to bottom
      if (desktopChatRef.current) {
        desktopChatRef.current.scrollTop = desktopChatRef.current.scrollHeight;
      }
      if (isFullscreen && fullscreenChatRef.current) {
        fullscreenChatRef.current.scrollTop = fullscreenChatRef.current.scrollHeight;
      }
    }, 1500);
  };

  // Function to optimize video layout for landscape mode
  const optimizeLandscapeLayout = () => {
    if (!isMobileDevice || !isLandscape || !isFullscreen) return;

    // If we have access to the video element
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();
      if (videoElement) {
        // Apply optimal video sizing for landscape
        videoElement.style.objectFit = "contain";
        
        // Show chat in a side panel rather than overlay
        setShowFullscreenChat(true);
      }
    }
  };

  // Listen for orientation changes while in fullscreen
  useEffect(() => {
    if (isFullscreen && isMobileDevice) {
      optimizeLandscapeLayout();
    }
  }, [isLandscape, isFullscreen, isMobileDevice]);

  return (
    <div className="bg-[#1A1A1D] min-h-screen">
      {/* Share Model */}
      <ShareModel 
        open={showShareModel} 
        onClose={handleCloseShare} 
        streamData={streamData}
      />
      
      {/* Donation Modal */}
      <DonationModal 
        isOpen={showDonationModal} 
        onClose={handleCloseDonation} 
        streamerName={streamData.streamer}
        onDonate={handleDonation}
      />
      
      {/* Main Stream Container */}
      <div className="max-w-[2000px] mx-auto p-4 md:p-6 xl:p-12">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Stream and Info Section */}
          <div className="w-full lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] 2xl:w-[calc(100%-450px)]">
            {/* Player */}
            <div 
              ref={videoContainerRef} 
              className="relative aspect-video w-full bg-[#2A2A2D] rounded-none md:rounded-lg shadow-lg overflow-hidden group" 
              style={{ maxHeight: 'calc(100vh - 64px)' }}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {/* Playback Error Screen */}
              {playbackError && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-40">
                  <div className="text-center p-4">
                    <h3 className="text-[#EBD3F8] text-xl mb-2">Playback Error</h3>
                    <p className="text-[#EBD3F8]/70 mb-4">There was an error playing this stream</p>
                    <button 
                      className="bg-[#EBD3F8] text-[#1A1A1D] px-4 py-2 rounded-lg font-medium hover:bg-[#EBD3F8]/90 transition-colors"
                      onClick={() => {
                        setPlaybackError(false);
                        if (playerRef.current) {
                          playerRef.current.seekTo(0);
                          setIsPlaying(true);
                        }
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
              
              {/* Loading Indicator */}
              {buffering && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none z-10">
                  <div className="rounded-full h-16 w-16 border-4 border-[#EBD3F8]/30 border-t-[#EBD3F8] animate-spin"></div>
                </div>
              )}
              
            <ReactPlayer
                ref={playerRef}
              className="w-full h-full object-cover"
              url="/assets/valo.mp4"
                playing={isPlaying}
                controls={false}
                loop={true}
              width="100%"
              height="100%"
                playsinline={true}
                muted={isMuted}
                volume={1.0}
                onReady={handleReady}
                onStart={() => console.log("ReactPlayer started")}
                onPlay={() => {
                  console.log("ReactPlayer playing");
                  setPlaybackError(false);
                }}
                onPause={() => console.log("ReactPlayer paused")}
                onBuffer={() => handleBuffer(true)}
                onBufferEnd={() => handleBuffer(false)}
                onError={handlePlayerError}
                onProgress={handleProgress}
                onVolumeChange={(e) => {
                  // Update our state when volume changes internally
                  if (e && typeof e.isMuted !== 'undefined') {
                    setIsMuted(e.isMuted);
                  }
                }}
                progressInterval={1000} // Update progress every second
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                      playsInline: true,
                      preload: "auto",
                      poster: "/src/assets/poster.jpg", // Add a placeholder image while loading
                      style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }
                    },
                    forceVideo: true,
                    forceSafariHLS: true, // Better performance on Safari
                    forceHLS: false, // Use native video first for better performance
                    hlsOptions: {
                      enableWorker: true, // Use Web Worker for better performance
                      lowLatencyMode: true,
                      backBufferLength: 90 // Increase buffer for smoother playback
                    }
                  }
                }}
              />
              
              {isFullscreen && showFullscreenChat && (
                <div className={`absolute ${isMobileDevice ? (isLandscape ? 'right-0 top-0 bottom-0 w-[35%] max-w-[350px]' : 'inset-0') : 'right-4 top-4 bottom-16 w-[350px]'} z-30 transition-all duration-300 bg-black/70 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col shadow-xl border border-[#EBD3F8]/20`}>
                  {/* Adjust the header to be more mobile-friendly */}
                  <div className="p-2 bg-black/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-[#EBD3F8]" />
                      <h3 className="text-sm font-medium text-[#EBD3F8]">Live Chat</h3>
                      {isMobileDevice && !isLandscape && (
                        <span className="ml-2 text-xs text-[#EBD3F8]/50">(Swipe down to minimize)</span>
                      )}
                      {isMobileDevice && isLandscape && (
                        <span className="ml-2 text-xs text-[#EBD3F8]/50">(Rotate for full view)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isMobileDevice && (
                        <button 
                          onClick={() => setShowFullscreenChat(false)}
                          className="p-1 rounded-full hover:bg-[#1A1A1D]/60 text-[#EBD3F8]/70"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      )}
                      {!isMobileDevice && (
                        <button 
                          onClick={() => setShowFullscreenChat(false)}
                          className="p-1 rounded-full hover:bg-[#1A1A1D]/60 text-[#EBD3F8]/70"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Fullscreen Chat Messages */}
                  <div 
                    ref={fullscreenChatRef}
                    className="flex-1 overflow-y-auto p-3 pb-16 space-y-3 [&::-webkit-scrollbar]:w-0 scrollbar-hide"
                  >
                    {chatMessages.slice(-12).map((message) => (
                      <div key={message.id} className="bg-black/40 p-2 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start space-x-2">
                          <img 
                            src={message.avatar}
                            alt={message.user}
                            className="w-6 h-6 rounded-full flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-1">
                              <span className={`font-medium text-sm ${message.role === 'moderator' ? 'text-red-400' : 'text-[#EBD3F8]'} truncate`}>
                                {message.user}
                              </span>
                              {message.badges?.length > 0 && (
                                <span className="text-xs px-1 py-0.5 rounded bg-[#EBD3F8]/10 text-[#EBD3F8] capitalize">
                                  {message.badges[0]}
                                </span>
                              )}
                            </div>
                            {message.type === 'gif' ? (
                              <div className="mt-1 rounded-lg overflow-hidden">
                                <img 
                                  src={message.gifUrl || `https://media.giphy.com/media/${message.gifId}/giphy.gif`}
                                  alt={message.message || "GIF"}
                                  className="w-full max-w-[200px] rounded-lg"
                                />
                              </div>
                            ) : message.type === 'sticker' ? (
                              <div className="mt-1 rounded-lg overflow-hidden inline-block">
                                <img 
                                  src={message.stickerUrl}
                                  alt={message.message || "Sticker"}
                                  className="max-h-24 max-w-full object-contain"
                                />
                              </div>
                            ) : message.type === 'donation' ? (
                              <div className="mt-1 p-2 bg-gradient-to-r from-[#EBD3F8]/10 to-[#EBD3F8]/20 rounded-lg">
                                <div className="flex items-center text-[#EBD3F8] font-bold mb-1">
                                  <Gift className="h-4 w-4 mr-1" />
                                  <span>Donated {message.isPoints ? message.amount : `$${message.amount}`} {message.isPoints ? 'Points' : ''}</span>
                                </div>
                                {message.message && <p className="text-[#EBD3F8]/90 text-sm">{message.message}</p>}
                              </div>
                            ) : (
                              <p className="text-[#EBD3F8]/90 text-sm mt-0.5 break-words">
                                {message.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fullscreen Chat Input */}
                  <div className="p-2 bg-black/80 border-t border-[#1A1A1D]">
                    <form onSubmit={handleFullscreenSendMessage} className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          value={fullscreenChatMessage}
                          onChange={(e) => setFullscreenChatMessage(e.target.value)}
                          placeholder="Send a message..."
                          className="w-full py-3 pl-12 pr-20 bg-[#1A1A1D] text-[#EBD3F8] placeholder-[#EBD3F8]/50 rounded-lg border-none focus:ring-1 focus:ring-[#EBD3F8] transition-colors outline-none"
                        />
                        
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                          {/* Donation Button */}
                          <button
                            type="button"
                            onClick={handleDonationClick}
                            className="p-1.5 text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors"
                            title="Donate"
                          >
                            <Gift className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                          {/* Emoji Button */}
                          <button 
                            type="button"
                            onClick={() => setShowFullscreenEmojiPicker(!showFullscreenEmojiPicker)}
                            className="text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors p-1 rounded-md"
                            aria-label="Emojis"
                          >
                            <Smile className="h-4 w-4" /> 
                          </button>
                          
                          {/* Send Button */}
                          <button 
                            type="submit"
                            className="bg-[#EBD3F8] text-[#1A1A1D] p-1 rounded-lg hover:bg-[#EBD3F8]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!fullscreenChatMessage.trim()}
                            aria-label="Send message"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Emoji Picker Panel */}
                      {showFullscreenEmojiPicker && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#1A1A1D] rounded-lg shadow-xl p-2 border border-[#2A2A2D] max-h-[150px] overflow-y-auto scrollbar-hide">
                          <div className="flex flex-wrap gap-2">
                            {["😀", "😂", "❤️", "👍", "🔥", "😍", "🎮", "👏", "🤔", "😱", "🤣", "😎", "🙌", "🚀", "💯"].map(emoji => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => {
                                  setFullscreenChatMessage(prev => prev + emoji);
                                  setShowFullscreenEmojiPicker(false);
                                }}
                                className="text-2xl p-1 hover:bg-[#2A2A2D] rounded transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              )}
              
              {/* Small unmute indicator in corner when muted instead of full overlay */}
              {isMuted && (
                <div 
                  className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2 cursor-pointer"
                  onClick={handleUnmute}
                >
                  <VolumeX className="h-4 w-4 text-white" />
                  <span className="text-white text-xs font-medium">Muted</span>
                </div>
              )}
              
              {/* Custom Video Controls */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent ${isMobileDevice && isLandscape && isFullscreen ? 'p-2' : 'p-4'} transition-opacity duration-300 ${showControls || isMuted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handlePlayPause} 
                      className="text-white hover:text-[#EBD3F8] transition-colors"
                    >
                      {isPlaying ? <Pause className={`${isMobileDevice && isLandscape && isFullscreen ? 'h-5 w-5' : 'h-6 w-6'}`} /> : <Play className={`${isMobileDevice && isLandscape && isFullscreen ? 'h-5 w-5' : 'h-6 w-6'}`} />}
                    </button>
                    
                    <button 
                      onClick={toggleVolume} 
                      className="text-white hover:text-[#EBD3F8] transition-colors flex items-center space-x-2"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="h-6 w-6" />
                          <span className="text-sm">Unmute</span>
                        </>
                      ) : (
                        <Volume2 className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Chat toggle button for fullscreen mode */}
                    {isFullscreen && (
                      <button 
                        className="text-white hover:text-[#EBD3F8] transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFullscreenChat(!showFullscreenChat);
                        }}
                        aria-label={showFullscreenChat ? "Hide chat" : "Show chat"}
                      >
                        <MessageCircle className="h-6 w-6" />
                      </button>
                    )}

                    {/* Fullscreen toggle button */}
                    <button 
                      className="text-white hover:text-[#EBD3F8] transition-colors"
                      onClick={handleFullscreen}
                      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                      {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Add a chat toggle button to the video controls */}
              {/* Add this in the right side div of the video controls, before the fullscreen button */}
              <button 
                className={`text-white hover:text-[#EBD3F8] transition-colors ${!isFullscreen ? 'hidden' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullscreenChat(!showFullscreenChat);
                }}
                aria-label={showFullscreenChat ? "Hide chat" : "Show chat"}
              >
                <MessageCircle className="h-6 w-6" />
              </button>
          </div>

            {/* --- Start Moved Mobile Chat Block --- */}
            {isChatOpen && (
              <div className="xl:hidden" style={{ position: 'relative', zIndex: 55 }}>
                <Card 
                  className="bg-[#1A1A1D] border-none shadow-xl fixed z-[55] bottom-0 left-0 right-0 rounded-none rounded-t-xl overflow-hidden"
                  style={{ 
                    maxHeight: isLandscape ? '60vh' : '70vh',
                    touchAction: isMobileDevice ? 'none' : 'auto',
                    width: isLandscape ? '50%' : '100%',
                    right: isLandscape ? '0' : 'auto',
                    left: isLandscape ? 'auto' : '0'
                  }}
                >
                  <div className="flex flex-col min-h-[40vh] max-h-[60vh] border-t-2 border-[#EBD3F8]"> {/* Decreased from min-h-[45vh] max-h-[65vh] */}
                    {/* Chat Header with Close Button */}
                    <div className="p-3 border-b border-[#1A1A1D] sticky top-0 bg-[#2A2A2D]/50 backdrop-blur-sm z-[5]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <MessageCircle className="h-5 w-5 text-[#EBD3F8] mr-2" />
                          <h3 className="font-semibold text-[#EBD3F8]">Live Chat</h3>
                        </div>
                        {/* Close Button - now on the right */}
                        <button 
                          onClick={() => setIsChatOpen(false)}
                          className="p-2 rounded-lg bg-[#1A1A1D] text-[#EBD3F8]/70 hover:text-[#EBD3F8] hover:bg-[#3a3a3d] hover:scale-105 active:scale-95 transition-all duration-200 group relative ml-auto"
                          aria-label="Close chat"
                        >
                          <X className="h-4 w-4 transform group-hover:rotate-90 transition-transform duration-200" />
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EBD3F8] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-200"></span>
                        </button>
                      </div>
                      {/* Message count */}
                      <div className="flex items-center text-[#EBD3F8]/60 text-sm">
                        <div className="flex-1 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          <span>{chatMessages.length} messages</span>
                        </div>
                        <div>{streamData.viewers.toLocaleString()} viewers</div>
                      </div>
                    </div>
                    {/* Chat Messages */}
                    <div 
                      ref={mobileChatRef} 
                      onScroll={handleChatScroll}
                      className="flex-1 overflow-y-auto p-2 pb-16 space-y-2.5 relative scrollbar-hide"
                    >
                      {chatMessages.map((message) => (
                        <div key={message.id} className="group bg-[#1A1A1D]/80 p-2 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 rounded-full bg-[#EBD3F8] flex-shrink-0 flex items-center justify-center text-[#1A1A1D] font-bold">
                            {message.user.charAt(0)}
                          </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center flex-wrap gap-1">
                                <span className={`font-semibold ${message.role === 'moderator' ? 'text-red-400' : 'text-[#EBD3F8]'} truncate`}>
                                  {message.user}
                                </span>
                                {message.badges && message.badges.length > 0 && message.badges.map((badge, index) => (
                                  <span 
                                    key={index}
                                    className="text-xs px-1 py-0.5 rounded bg-[#EBD3F8]/10 text-[#EBD3F8] capitalize"
                                  >
                                    {badge}
                                  </span>
                                ))}
                                <span className="text-xs text-[#EBD3F8]/50 ml-auto">
                                  {message.time}
                                </span>
                              </div>
                              {/* Support for both text and GIF messages */}
                              {message.type === 'gif' ? (
                                <div className="mt-1.5 rounded-lg overflow-hidden scrollbar-hide">
                                  <img 
                                    src={message.gifUrl || `https://media.giphy.com/media/${message.gifId}/giphy.gif`}
                                    alt={message.message || "GIF"}
                                    className="w-full max-w-[200px] rounded-lg"
                                  />
                                </div>
                              ) : message.type === 'sticker' ? (
                                <div className="mt-1 rounded-lg overflow-hidden inline-block">
                                  <img 
                                    src={message.stickerUrl}
                                    alt={message.message || "Sticker"}
                                    className="max-h-24 max-w-full object-contain"
                                  />
                                </div>
                              ) : message.type === 'donation' ? (
                                <div className="mt-1 p-2 bg-gradient-to-r from-[#EBD3F8]/10 to-[#EBD3F8]/20 rounded-lg">
                                  <div className="flex items-center text-[#EBD3F8] font-bold mb-1">
                                    <Gift className="h-4 w-4 mr-1" />
                                    <span>Donated {message.isPoints ? message.amount : `$${message.amount}`} {message.isPoints ? 'Points' : ''}</span>
                                  </div>
                                  {message.message && <p className="text-[#EBD3F8]/90 text-sm">{message.message}</p>}
                                </div>
                              ) : (
                                <p className="text-[#EBD3F8]/90 mt-1 break-words">
                                  {message.message}
                                </p>
                              )}
                              {/* Display reactions if any */}
                              {message.reactions && Object.entries(message.reactions).length > 0 && (
                                <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
                                  {Object.entries(message.reactions).map(([emoji, count], index) => (
                                    <div 
                                      key={index}
                                      className="flex items-center space-x-1 text-xs bg-[#2A2A2D] text-[#EBD3F8] px-1.5 py-0.5 rounded-full"
                                    >
                                      <span>{emoji}</span>
                                      <span>{count}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Chat Input */}
                    <div className="p-2 border-t border-[#1A1A1D] sticky bottom-0 bg-[#2A2A2D]/90 backdrop-blur-sm z-[15] relative">
                      <form onSubmit={handleSendMessage} className="relative">
                        <div className="relative">
                        <input
                          type="text"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Send a message"
                            className="w-full py-3 pl-12 pr-20 bg-[#1A1A1D] text-[#EBD3F8] placeholder-[#EBD3F8]/50 rounded-lg border border-[#1A1A1D] focus:border-[#EBD3F8] focus:ring-1 focus:ring-[#EBD3F8] transition-colors outline-none"
                          />
                          
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                            {/* Donation Button */}
                            <button
                              type="button"
                              onClick={handleDonationClick}
                              className="p-1.5 text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors"
                              title="Donate"
                            >
                              <Gift className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                            {/* Emoji Button */}
                            <button 
                              type="button"
                              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                              className="text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors p-1.5 rounded-md bg-[#2A2A2D]"
                              aria-label="Emojis"
                            >
                              <Smile className="h-4 w-4" /> 
                            </button>
                            
                            {/* GIF Button */}
                           

                            {/* Send Button */}
                            <button 
                              type="submit"
                              className="bg-[#EBD3F8] text-[#1A1A1D] p-1.5 rounded-lg hover:bg-[#EBD3F8]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!chatMessage.trim()}
                              aria-label="Send message"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            {/* --- End Moved Mobile Chat Block --- */}

            {/* Related Streams Carousel */}
          
          {/* Stream Info */}
            <Card className="p-4 bg-[#2A2A2D]/50 border-none shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium flex items-center">
                    <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                    LIVE
                  </span>
                    <span className="ml-3 text-[#EBD3F8]/80 text-sm">{streamData.viewers.toLocaleString()} viewers</span>
                </div>
                  <h1 className="text-2xl font-bold mb-2 text-[#EBD3F8]">{streamData.title}</h1>
              <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#EBD3F8] flex-shrink-0 flex items-center justify-center text-[#1A1A1D] font-bold">
                    {streamData.streamer.charAt(0)}
                  </div>
                  <div className="ml-3">
                      <h2 className="font-semibold text-[#EBD3F8]">{streamData.streamer}</h2>
                      <p className="text-[#EBD3F8]/70 text-sm">{streamData.game}</p>
                    </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                {/* Mobile Chat Button */}
                {!isChatOpen && (
                <Button 
                    onClick={() => setIsChatOpen(true)}
                    className="bg-[#EBD3F8] hover:bg-[#EBD3F8]/90 text-[#1A1A1D] normal-case xl:hidden flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </Button>
                )}
                
                <Button 
                  className={`relative overflow-hidden ${isFollowing 
                    ? 'bg-[#2A2A2D] border border-[#EBD3F8] text-[#EBD3F8]' 
                    : 'bg-[#EBD3F8] text-[#1A1A1D]'} 
                    hover:bg-[#2A2A2D] hover:border-[#EBD3F8] hover:text-[#EBD3F8]
                    normal-case flex items-center gap-2 transition-all duration-300`}
                  onClick={handleFollow}
                  type="button"
                >
                  {/* Enhanced particles animation */}
                  {isFollowAnimating && (
                    <>
                      {/* Heart particle effects */}
                      {Array.from({ length: 20 }).map((_, i) => {
                        const size = Math.random() * 8 + 4; // Larger hearts
                        const startPos = 45 + (Math.random() * 10 - 5); // More centered
                        const delay = Math.random() * 0.3;
                        const duration = Math.random() * 0.8 + 0.6; // Longer animation
                        const xDir = Math.random() > 0.5 ? -1 : 1;
                        const rotation = Math.random() * 360;
                        
                        return (
                          <span 
                            key={i}
                            className="absolute z-10 drop-shadow-md"
                            style={{
                              width: `${size}px`,
                              height: `${size}px`,
                              top: '50%',
                              left: `${startPos}%`,
                              opacity: 0,
                              color: "#EBD3F8", // Theme color for all hearts
                              textShadow: "0 0 2px #9D4EDD",
                              animation: `buttonParticle ${duration}s ease-out ${delay}s forwards`,
                              transform: `translateY(0) translateX(0) scale(0) rotate(${rotation}deg)`,
                              '--x-dir': `${xDir * (Math.random() * 25 + 15)}px`, // 15-40px left/right
                              '--y-dir': `${-1 * (Math.random() * 25 + 15)}px`, // 15-40px up
                            }}
                          >
                            💜
                          </span>
                        );
                      })}
                      
                      {/* Button glow effect */}
                      <span 
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(235,211,248,0.8) 0%, rgba(235,211,248,0) 70%)',
                          animation: 'buttonGlow 0.8s ease-out forwards',
                          opacity: 0
                        }}
                      />
                    </>
                  )}
                  
                  {/* Add keyframes for particle animation if not already defined */}
                  <style jsx>{`
                    @keyframes buttonParticle {
                      0% {
                        opacity: 0.8;
                        transform: translateY(0) translateX(0) scale(0.2);
                      }
                      100% {
                        opacity: 0;
                        transform: translateY(var(--y-dir)) translateX(var(--x-dir)) scale(1);
                      }
                    }
                    
                    @keyframes buttonGlow {
                      0% { opacity: 0; }
                      50% { opacity: 0.8; }
                      100% { opacity: 0; }
                    }
                  `}</style>
                  
                  {/* Heart icon with animation */}
                  {isFollowing ? (
                    <Heart 
                      className={`h-4 w-4 fill-[#EBD3F8] text-[#EBD3F8] ${isFollowAnimating ? 'animate-heartBeat' : ''}`}
                      style={{ zIndex: 2, position: 'relative' }}
                    />
                  ) : (
                    <Heart className="h-4 w-4" style={{ zIndex: 2, position: 'relative' }} />
                  )}
                  
                  {/* Button text */}
                  <span style={{ zIndex: 2, position: 'relative' }}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </span>
                </Button>
                <Button 
                  variant="outlined" 
                  className="border-[#EBD3F8] text-[#EBD3F8] hover:bg-[#EBD3F8]/10 normal-case flex items-center gap-2"
                  onClick={handleShareClick}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {streamData.tags.map((tag, index) => (
                <span 
                  key={index}
                    className="px-3 py-1 bg-[#1A1A1D] text-[#EBD3F8] text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
          
          {/* Stream Content Tabs */}
            <Card className="bg-[#2A2A2D]/50 border-none shadow-xl">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                <TabsHeader className="bg-transparent border-b border-[#1A1A1D]">
                <Tab value="about" className="text-[#EBD3F8] hover:text-white data-[active]:text-[#1A1A1D] data-[active]:font-bold data-[active]:bg-[#EBD3F8] data-[active]:border-[#EBD3F8]">
                  About
                </Tab>
                  <Tab value="schedule" className="text-[#EBD3F8] hover:text-white data-[active]:text-[#1A1A1D] data-[active]:font-bold data-[active]:bg-[#EBD3F8] data-[active]:border-[#EBD3F8]">
                  Schedule
                </Tab>
                  <Tab value="clips" className="text-[#EBD3F8] hover:text-white data-[active]:text-[#1A1A1D] data-[active]:font-bold data-[active]:bg-[#EBD3F8] data-[active]:border-[#EBD3F8]">
                  Clips
                </Tab>
              </TabsHeader>
              <TabsBody className="p-4 min-h-[200px]">
                <TabPanel value="about" className="p-0 h-[200px] overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2 text-[#EBD3F8]">About this stream</h3>
                        <p className="text-[#EBD3F8]">
                        {streamData.description}
                      </p>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold mb-2 text-[#EBD3F8]">Social Media</h3>
                      <div className="flex space-x-4">
                          <a href={streamData.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-[#EBD3F8] hover:text-white transition-colors">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                          <a href={streamData.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-[#EBD3F8] hover:text-white transition-colors">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                          </svg>
                        </a>
                          <a href={streamData.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-[#EBD3F8] hover:text-white transition-colors">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="schedule" className="p-0 h-[200px] overflow-y-auto">
                  <div>
                      <h3 className="font-semibold mb-2 text-[#EBD3F8]">Streaming Schedule</h3>
                      <p className="text-[#EBD3F8]">
                      {streamData.schedule}
                    </p>
                  </div>
                </TabPanel>
                <TabPanel value="clips" className="p-0 h-[200px] overflow-y-auto">
                  <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-[#EBD3F8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                      <p className="text-[#EBD3F8]">No clips available yet</p>
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </Card>

            <Card className="bg-[#2A2A2D]/50 border-none shadow-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#EBD3F8] flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Related Streams
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => scrollCarousel('left')}
                    className="p-2 rounded-full bg-[#1A1A1D] text-[#EBD3F8] hover:bg-[#1A1A1D]/80 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    className="p-2 rounded-full bg-[#1A1A1D] text-[#EBD3F8] hover:bg-[#1A1A1D]/80 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
        </div>
        
              <div 
                ref={carouselRef}
                className="overflow-x-auto [&::-webkit-scrollbar]:h-0 scrollbar-hide"
              >
                <div className="flex space-x-4 pb-4">
                  {relatedStreams.map((stream) => (
                    <div 
                      key={stream.id}
                      className="flex-none w-[300px]"
                    >
                      <div className="group cursor-pointer">
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={stream.thumbnail}
                            alt={stream.title}
                            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-2">
                            {stream.isLive && (
                              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                                LIVE
                              </div>
                            )}
                            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {stream.viewers.toLocaleString()} viewers
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h3 className="font-medium text-[#EBD3F8] truncate group-hover:text-[#EBD3F8]/80 transition-colors">
                            {stream.title}
                </h3>
                          <p className="text-[#EBD3F8]/70 text-sm">{stream.streamer}</p>
                          <p className="text-[#EBD3F8]/50 text-sm">{stream.game}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

          
          </div>
          
          {/* Conditionally Render Desktop Chat Area (Fixed on right side) */}
          {isChatOpen && (
          <div className="hidden xl:block xl:col-span-3">
              <div className="fixed top-16 right-4 w-[18%] max-w-md">
                <Card className="bg-[#2A2A2D]/50 border-none shadow-xl h-[calc(100vh-4rem)]">
                <div className="h-full flex flex-col">
                      {/* Desktop Chat Header with Close Button */}
                  <div className="p-3 border-b border-[#1A1A1D] bg-[#2A2A2D]/50 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <MessageCircle className="h-5 w-5 text-[#EBD3F8] mr-2" />
                          <h3 className="font-semibold text-[#EBD3F8]">Live Chat</h3>
                        </div>
                      </div>
                          {/* Message count */}
                      <div className="flex items-center text-[#EBD3F8]/60 text-sm">
                        <div className="flex-1 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          <span>{chatMessages.length} messages</span>
                      </div>
                        <div>{streamData.viewers.toLocaleString()} viewers</div>
                    </div>
                  </div>
                    {/* Chat Messages */}
                  <div 
                    ref={desktopChatRef}
                    onScroll={handleChatScroll}
                      className="flex-1 overflow-y-auto p-3 pb-16 space-y-3 [&::-webkit-scrollbar]:w-0 scrollbar-hide relative"
                  >
                    {chatMessages.map((message) => (
                      <div 
                        key={message.id} 
                            className="group bg-[#1A1A1D] p-2.5 rounded-lg hover:bg-[#1A1A1D]/80 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 shadow-md hover:shadow-lg"
                      >
                        <div className="flex items-start space-x-2">
                          <img 
                                src={message.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.user}`}
                            alt={message.user}
                                className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-[#EBD3F8]/50 hover:scale-110 transition-transform duration-200"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-1.5">
                                  <span className={`font-semibold ${message.role === 'moderator' ? 'text-red-400' : 'text-[#EBD3F8]'} truncate hover:text-opacity-80 transition-colors`}>
                                    {message.user}
                                  </span>
                              {message.badges && message.badges.length > 0 && message.badges.map((badge, index) => (
                                <span 
                                  key={index}
                                      className="text-xs px-1.5 py-0.5 rounded bg-[#EBD3F8]/10 text-[#EBD3F8] capitalize hover:bg-[#EBD3F8]/20 transition-colors"
                                >
                                  {badge}
                                </span>
                              ))}
                                  <span className="text-xs text-[#EBD3F8]/50 ml-auto pl-2 group-hover:text-[#EBD3F8]/70 transition-colors">
                                    {message.time}
                                  </span>
                            </div>
                            {message.type === 'gif' ? (
                                  <div className="relative mt-2 rounded-lg overflow-hidden">
                              <img 
                                src={message.gifUrl || `https://media.giphy.com/media/${message.gifId}/giphy.gif`}
                                      alt={message.message || "GIF"}
                                      className="w-full max-w-[240px] rounded-lg border border-[#EBD3F8]/20 hover:border-[#EBD3F8]/40 transition-colors"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                  </div>
                                  ) : message.type === 'sticker' ? (
                                    <div className="relative mt-2 rounded-lg overflow-hidden">
                                      <img 
                                        src={message.stickerUrl}
                                        alt={message.message || "Sticker"}
                                        className="w-full max-w-[240px] object-contain"
                                      />
                                      <div className="absolute inset-0 bg-black/50"></div>
                                    </div>
                                  ) : message.type === 'donation' ? (
                                    <div className="mt-1 p-2 bg-gradient-to-r from-[#EBD3F8]/10 to-[#EBD3F8]/20 rounded-lg">
                                      <div className="flex items-center text-[#EBD3F8] font-bold mb-1">
                                        <Gift className="h-4 w-4 mr-1" />
                                        <span>Donated {message.isPoints ? message.amount : `$${message.amount}`} {message.isPoints ? 'Points' : ''}</span>
                                      </div>
                                      {message.message && <p className="text-[#EBD3F8]/90 text-sm">{message.message}</p>}
                                  </div>
                                ) : (
                                  <p className="text-[#EBD3F8]/90 mt-1 break-words hover:text-[#EBD3F8] transition-colors">
                                    {message.message}
                                  </p>
                            )}
                            {message.reactions && Object.entries(message.reactions).length > 0 && (
                              <div className="flex items-center flex-wrap gap-1.5 mt-2">
                                {Object.entries(message.reactions).map(([emoji, count], index) => (
                                  <button 
                                    key={index}
                                        className="flex items-center space-x-1 text-xs bg-[#2A2A2D] text-[#EBD3F8] px-2 py-1 rounded-full hover:bg-[#3a3a3d] hover:scale-105 transition-all duration-200"
                                  >
                                    <span>{emoji}</span>
                                    <span>{count}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                    {/* Chat Input */}
                    <div className="p-3 border-t border-[#1A1A1D] bg-[#2A2A2D]/90 backdrop-blur-sm z-[15] relative">
                    <form onSubmit={handleSendMessage} className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Send a message"
                            className="w-full py-3 pl-12 pr-20 bg-[#1A1A1D] text-[#EBD3F8] placeholder-[#EBD3F8]/50 rounded-lg border border-[#1A1A1D] focus:border-[#EBD3F8] focus:ring-1 focus:ring-[#EBD3F8] transition-colors outline-none"
                          />
                          
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                            {/* Donation Button */}
                            <button
                              type="button"
                              onClick={handleDonationClick}
                              className="p-1.5 text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors"
                              title="Donate"
                            >
                              <Gift className="w-5 h-5" />
                            </button>
                          </div>
                          
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                            {/* Emoji Button */}
                                <button 
                                  type="button"
                              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                  className="text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors p-1.5 rounded-md bg-[#2A2A2D]"
                                  aria-label="Emojis"
                                >
                                  <Smile className="h-4 w-4" /> 
                                </button>
                            
                            {/* GIF Button */}
                          <button 
                            type="button"
                              onClick={() => setShowGifPicker(!showGifPicker)}
                                  className="text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors p-1.5 rounded-md bg-[#2A2A2D]"
                                  aria-label="GIFs"
                          >
                                  <Gift className="h-4 w-4" />
                          </button>

                              {/* Send Button */}
                        <button 
                          type="submit"
                                className="bg-[#EBD3F8] text-[#1A1A1D] p-1.5 rounded-lg hover:bg-[#EBD3F8]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!chatMessage.trim()}
                                aria-label="Send message"
                        >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                            </div>
                              </div>
                  </form>
                </div>
              </div>
            </Card>
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add animations to document head
const style = document.createElement('style');
style.textContent = `
  @keyframes buttonParticle {
    0% {
      opacity: 0.8;
      transform: translateY(0) translateX(0) scale(0.2);
    }
    100% {
      opacity: 0;
      transform: translateY(var(--y-dir)) translateX(var(--x-dir)) scale(1);
    }
  }
  
  @keyframes buttonGlow {
    0% { opacity: 0; }
    50% { opacity: 0.8; }
    100% { opacity: 0; }
  }
  
  @keyframes heartBeat {
    0% { transform: scale(1); }
    20% { transform: scale(1.5); }
    40% { transform: scale(1); }
    60% { transform: scale(1.3); }
    80% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

export default StreamPage; 