import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, IconButton, Typography, Input } from "@material-tailwind/react";
import { X, Copy, Twitter, Facebook, Link as LinkIcon, Mail, MessageCircle, Code, Instagram, Check } from 'lucide-react';

const ShareModel = ({ open, onClose, streamData }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('social');
  const shareAudioRef = useRef(null);
  
  useEffect(() => {
    console.log("ShareModel rendered with open:", open);
    
    // Add event listener for escape key to close modal
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [open, onClose]);
  
  // Mock URL for sharing
  const shareUrl = `https://streamit.com/${streamData?.streamer || 'channel'}`;
  const embedCode = `<iframe src="${shareUrl}/embed" width="720" height="405" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
  
  const handleCopy = (text) => {
    // Play sound when copied
    if (shareAudioRef.current) {
      shareAudioRef.current.currentTime = 0;
      
      const playPromise = shareAudioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Share sound playing successfully"))
          .catch(err => console.error("Failed to play share sound:", err));
      }
    }
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      
      // Add visual feedback with timeout
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy:", err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleShareClick = () => {
    // Play sound when shared
    if (shareAudioRef.current) {
      shareAudioRef.current.currentTime = 0;
      shareAudioRef.current.play().catch(err => console.error("Failed to play sound:", err));
    }
  };
  
  const socialPlatforms = [
    { 
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-blue-400',
      url: `https://twitter.com/intent/tweet?text=Check out ${streamData?.streamer || 'this'} on StreamIt!&url=${shareUrl}`
    },
    { 
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    },
    { 
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-green-500',
      url: `https://wa.me/?text=Check out ${streamData?.streamer || 'this stream'} on StreamIt! ${shareUrl}`
    },
    { 
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      color: 'bg-pink-500',
      url: `https://www.instagram.com/`
    },
    { 
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-gray-600',
      url: `mailto:?subject=Check out this stream on StreamIt&body=I thought you might enjoy watching ${streamData?.streamer || 'this stream'} on StreamIt! ${shareUrl}`
    }
  ];

  // Don't render anything if not open
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={() => onClose()}
    >
      {/* Hidden audio element for share sound */}
      <audio 
        ref={shareAudioRef} 
        src="/assets/sound effect.m4a" 
        preload="auto"
        style={{ display: 'none' }}
        onError={(e) => console.error("Error loading audio:", e)}
      />
      
      <div className="relative bg-[#1A1A1D] rounded-xl w-full max-w-md shadow-xl border border-[#2A2A2D] z-[2001]"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1A1A1D]">
          <Typography variant="h5" className="text-[#EBD3F8] font-bold">Share Stream</Typography>
          <IconButton 
            variant="text" 
            color="white"
            onClick={() => onClose()}
            className="rounded-full h-8 w-8 min-h-0 min-w-0 p-0 text-[#EBD3F8]/70 hover:text-[#EBD3F8] hover:bg-[#1A1A1D]/60"
          >
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Stream Info */}
          <div className="flex items-center mb-6 p-3 bg-[#1A1A1D] rounded-lg">
            {streamData?.streamer && (
              <div className="w-10 h-10 rounded-full bg-[#EBD3F8] flex-shrink-0 flex items-center justify-center text-[#1A1A1D] font-bold mr-3">
                {streamData.streamer.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <Typography variant="h6" className="text-[#EBD3F8] truncate">
                {streamData?.title || "Stream"}
              </Typography>
              <Typography variant="small" className="text-[#EBD3F8]/70">
                {streamData?.streamer || "Streamer"} • {streamData?.game || "Gaming"}
              </Typography>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <Button 
              variant={activeTab === 'social' ? 'filled' : 'text'} 
              color={activeTab === 'social' ? 'purple' : 'white'}
              className={`normal-case flex-1 ${activeTab === 'social' ? 'bg-[#EBD3F8] text-[#1A1A1D]' : 'text-[#EBD3F8]/70'}`}
              onClick={() => setActiveTab('social')}
            >
              Social
            </Button>
            <Button 
              variant={activeTab === 'link' ? 'filled' : 'text'} 
              color={activeTab === 'link' ? 'purple' : 'white'}
              className={`normal-case flex-1 ${activeTab === 'link' ? 'bg-[#EBD3F8] text-[#1A1A1D]' : 'text-[#EBD3F8]/70'}`}
              onClick={() => setActiveTab('link')}
            >
              Link
            </Button>
            <Button 
              variant={activeTab === 'embed' ? 'filled' : 'text'} 
              color={activeTab === 'embed' ? 'purple' : 'white'}
              className={`normal-case flex-1 ${activeTab === 'embed' ? 'bg-[#EBD3F8] text-[#1A1A1D]' : 'text-[#EBD3F8]/70'}`}
              onClick={() => setActiveTab('embed')}
            >
              Embed
            </Button>
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[180px]">
            {activeTab === 'social' && (
              <div className="grid grid-cols-3 gap-3">
                {socialPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center px-4 py-5 rounded-lg bg-[#1A1A1D] hover:bg-[#1A1A1D]/70 transition-colors text-center"
                    onClick={handleShareClick}
                  >
                    <div className={`${platform.color} rounded-full p-2 mb-2 text-white`}>
                      {platform.icon}
                    </div>
                    <Typography variant="small" className="text-[#EBD3F8]">
                      {platform.name}
                    </Typography>
                  </a>
                ))}
              </div>
            )}
            
            {activeTab === 'link' && (
              <div className="space-y-4">
                <Typography variant="small" className="text-[#EBD3F8]/70 block mb-2">
                  Copy and share this link with friends
                </Typography>
                <div className="relative flex items-center">
                  <div className="relative flex-1 overflow-hidden rounded-lg">
                    <Input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="!border-[#1A1A1D] focus:!border-[#EBD3F8] text-[#EBD3F8] font-medium bg-[#1A1A1D] ring-0 focus:ring-0 rounded-lg"
                      labelProps={{ className: "hidden" }}
                      containerProps={{ className: "min-w-0" }}
                    />
                  </div>
                  
                  <Button
                    size="md"
                    onClick={() => handleCopy(shareUrl)}
                    className={`ml-2 px-4 py-2.5 font-semibold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all duration-300 transform ${
                      copied 
                        ? 'bg-green-500 text-white scale-105' 
                        : 'bg-[#EBD3F8] text-[#1A1A1D] hover:bg-[#EBD3F8]/90 hover:shadow-lg'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 animate-pulse" />
                        <span className="transform animate-pulse">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>COPY</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'embed' && (
              <div className="space-y-4">
                <Typography variant="small" className="text-[#EBD3F8]/70 block mb-2">
                  Embed this stream on your website
                </Typography>
                <div className="bg-[#1A1A1D] p-3 rounded-lg">
                  <pre className="text-[#EBD3F8] text-xs overflow-x-auto whitespace-pre-wrap break-all">
                    {embedCode}
                  </pre>
                </div>
                <Button
                  onClick={() => handleCopy(embedCode)}
                  className={`flex items-center justify-center gap-2 mt-2 w-full py-2.5 transition-all duration-300 font-semibold tracking-wider ${
                    copied 
                      ? 'bg-green-500 text-white scale-105' 
                      : 'bg-[#EBD3F8] text-[#1A1A1D] hover:bg-[#EBD3F8]/90 hover:shadow-lg'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 animate-pulse" />
                      <span className="transform animate-pulse">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>COPY EMBED CODE</span>
                    </>
                  )}
                </Button>
                <div className="mt-4 bg-[#1A1A1D]/50 p-3 rounded-lg">
                  <Typography variant="small" className="text-[#EBD3F8]/70 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Preview will appear on your website
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-[#1A1A1D] bg-[#1A1A1D]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 text-[#EBD3F8]/70 mr-2" />
              <Typography variant="small" className="text-[#EBD3F8]/70">
                {streamData?.viewers?.toLocaleString() || "0"} viewers
              </Typography>
            </div>
            <Button
              variant="text"
              className="text-[#EBD3F8] normal-case"
              onClick={() => onClose()}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ShareModel; 