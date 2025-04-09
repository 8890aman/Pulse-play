import React, { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import { Gift, X, Check, Heart, Sparkles, Coins, Star } from 'lucide-react';
import ReactConfetti from 'react-confetti';

const DonationModal = ({ isOpen, onClose, streamerName = "shanks_ttv", onDonate }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [donationSent, setDonationSent] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [animationProgress, setAnimationProgress] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  // State to track available points, synced with navbar
  const [availablePoints, setAvailablePoints] = useState(1000);
  
  // Effect to listen for point updates from navbar or gift model
  useEffect(() => {
    const handlePointsUpdate = (event) => {
      const { newPoints } = event.detail;
      setAvailablePoints(newPoints);
    };
    
    window.addEventListener('pointsPurchase', handlePointsUpdate);
    return () => {
      window.removeEventListener('pointsPurchase', handlePointsUpdate);
    };
  }, []);
  
  // Get window dimensions for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation progress effect
  useEffect(() => {
    let animationTimer;
    if (donationSent) {
      setAnimationProgress(0);
      
      // Create animation frames
      const animate = () => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            return 100;
          }
          return prev + 1;
        });
      };
      
      // Run animation at 60fps for 2.5 seconds
      const interval = 2500 / 100;
      animationTimer = setInterval(animate, interval);
      
      // Clean up after animation
      const cleanupTimer = setTimeout(() => {
        clearInterval(animationTimer);
        
        // Only close after animation completes
        setTimeout(() => {
          setDonationSent(false);
          setAmount('');
          setMessage('');
          setSelectedEmoji('');
          onClose();
        }, 500);
      }, 2500);
      
      return () => {
        clearInterval(animationTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, [donationSent, onClose]);
  
  const handleDonate = () => {
    // Validate that user has enough points
    if (parseInt(amount) > availablePoints) {
      alert("You don't have enough points! Purchase more points from the Points Store.");
      return;
    }
    
    // Simulate donation process
    console.log(`Donating ${amount} points to ${streamerName} with message: ${message} and emoji: ${selectedEmoji}`);
    setDonationSent(true);
    
    // Emit a point purchase/update event to sync with navbar
    const pointsUpdateEvent = new CustomEvent('pointsPurchase', {
      detail: { 
        currentPoints: availablePoints,
        newPoints: availablePoints - parseInt(amount),
        purchasedPoints: -parseInt(amount), // Negative since we're spending points
        isChatDonation: true
      }
    });
    window.dispatchEvent(pointsUpdateEvent);
    
    // Call the onDonate callback to add a donation message to chat
    if (onDonate) {
      const messageWithEmoji = selectedEmoji ? `${selectedEmoji} ${message}`.trim() : message;
      onDonate(parseInt(amount), messageWithEmoji);
    }
  };
  
  if (!isOpen) return null;
  
  const presetAmounts = [50, 100, 200, 500, 1000];
  const donationEmojis = ['❤️', '🔥', '👏', '🎮', '🚀', '💯', '👑', '✨', '🙏', '💪'];
  
  // Generate random colors for confetti
  const confettiColors = ['#EBD3F8', '#B392AC', '#9D4EDD', '#C77DFF', '#ffffff'];
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* React Confetti - only show when donation is sent */}
      {donationSent && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          colors={confettiColors}
          tweenDuration={4000}
          initialVelocityY={15}
          initialVelocityX={5}
          opacity={0.8}
          run={animationProgress < 85}
        />
      )}
      
      <div className="relative bg-[#1A1A1D] rounded-xl w-full max-w-md shadow-xl border border-[#2A2A2D] z-[9999] overflow-hidden">
        {/* Colorful gradient border */}
        <div className="absolute inset-0 rounded-xl p-0.5 bg-gradient-to-r from-[#EBD3F8] via-[#B392AC] to-[#EBD3F8] opacity-70"></div>
        
        <div className="relative bg-[#1A1A1D] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#2A2A2D] flex items-center justify-between bg-gradient-to-r from-[#2A2A2D] to-[#2A2A2D]/70">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-[#EBD3F8]" />
              <h2 className="text-lg font-bold text-[#EBD3F8]">Support {streamerName}</h2>
            </div>
            
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6">
            {donationSent ? (
              <div className="text-center py-8 relative overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
                <p className="text-[#EBD3F8] mb-6 text-lg">
                  <span className="donation-amount text-[#9D4EDD] font-bold">{parseInt(amount).toLocaleString()}</span>
                  <span> Points</span> sent to {streamerName}
                </p>
                
                {/* Gift icon */}
                <div className="relative my-6">
                  <div className="w-16 h-16 mx-auto gift-float-subtle">
                    <Gift className="w-full h-full text-[#EBD3F8]" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Continue Button */}
                <Button
                  onClick={() => {
                    setDonationSent(false);
                    setAmount('');
                    setMessage('');
                    setSelectedEmoji('');
                    onClose();
                  }}
                  className="mt-3 bg-[#9D4EDD] text-white normal-case font-medium px-8 py-2.5 rounded-full hover:bg-[#B392AC] transition-colors"
                >
                  Continue
                </Button>
              </div>
            ) : (
              <>
                {/* Available points display */}
                <div className="mb-4 flex items-center justify-between p-3 rounded-lg bg-[#2A2A2D]/50">
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 text-[#EBD3F8] mr-2" />
                    <span className="text-sm text-[#EBD3F8]/80">Your Points</span>
                  </div>
                  <div 
                    className="font-bold text-[#EBD3F8] points-display"
                    data-points={availablePoints}
                  >
                    {availablePoints.toLocaleString()}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-[#EBD3F8] font-medium mb-2">
                    Choose amount
                  </label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {presetAmounts.map(preset => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset.toString())}
                        disabled={preset > availablePoints}
                        className={`py-2 rounded-lg text-center font-medium transition-all relative ${
                          amount === preset.toString()
                            ? 'bg-[#EBD3F8] text-[#1A1A1D]'
                            : preset > availablePoints
                              ? 'bg-[#2A2A2D]/30 text-[#EBD3F8]/30 cursor-not-allowed'
                              : 'bg-[#2A2A2D] text-[#EBD3F8] hover:bg-[#2A2A2D]/80'
                        }`}
                      >
                        {preset > availablePoints && (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1D]/70 rounded-lg">
                            <Coins className="h-3 w-3 text-[#EBD3F8]/50" />
                          </div>
                        )}
                        {preset}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-[#EBD3F8] flex items-center">
                      <Coins className="h-4 w-4 mr-1" />
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Don't allow more than available points
                        if (!value || parseInt(value) <= availablePoints) {
                          setAmount(value);
                        }
                      }}
                      placeholder="Custom amount"
                      max={availablePoints}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#2A2A2D] text-[#EBD3F8] placeholder-[#EBD3F8]/50 rounded-lg border border-[#2A2A2D] focus:border-[#EBD3F8] focus:ring-1 focus:ring-[#EBD3F8] transition-colors outline-none"
                    />
                  </div>
                  {parseInt(amount) > availablePoints && (
                    <p className="text-red-500 text-xs mt-1">
                      Not enough points. <button className="text-[#EBD3F8] underline" onClick={() => {onClose(); window.dispatchEvent(new Event('openPointsStore'))}}>Get more points</button>
                    </p>
                  )}
                </div>
                
                {/* Emoji Picker */}
                <div className="mb-4">
                  <label className="block text-[#EBD3F8] font-medium mb-2">
                    Add an emoji (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {donationEmojis.map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => setSelectedEmoji(selectedEmoji === emoji ? '' : emoji)}
                        className={`text-xl p-2 rounded-lg transition-all ${
                          selectedEmoji === emoji
                            ? 'bg-[#EBD3F8] text-[#1A1A1D]'
                            : 'bg-[#2A2A2D] hover:bg-[#2A2A2D]/70'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-[#EBD3F8] font-medium mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a message to display with your donation"
                    className="w-full px-4 py-2.5 bg-[#2A2A2D] text-[#EBD3F8] placeholder-[#EBD3F8]/50 rounded-lg border border-[#2A2A2D] focus:border-[#EBD3F8] focus:ring-1 focus:ring-[#EBD3F8] transition-colors outline-none h-24 resize-none"
                  />
                </div>
                
                <Button
                  onClick={handleDonate}
                  disabled={!amount || parseInt(amount) > availablePoints}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    amount && parseInt(amount) <= availablePoints
                      ? 'bg-gradient-to-r from-[#EBD3F8] to-[#B392AC] text-[#1A1A1D] hover:shadow-lg'
                      : 'bg-[#2A2A2D] text-[#EBD3F8]/50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>Send {amount || '0'} Points</span>
                    {amount && parseInt(amount) <= availablePoints && <Heart className="h-4 w-4 animate-pulse" />}
                  </div>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Add animation styles */}
      <style jsx="true">{`
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.3; }
          100% { transform: translateY(-10px); opacity: 1; }
        }
        
        .gift-float {
          animation: pulsate 2s ease-in-out infinite alternate;
        }
        
        .gift-float-subtle {
          animation: subtle-float 3s ease-in-out infinite;
        }
        
        @keyframes subtle-float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes pulsate {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-8px) scale(1.05); }
        }
        
        .donation-amount {
          display: inline-block;
          animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform: scale(0.5);
          opacity: 0;
        }
        
        @keyframes scaleUp {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .points-display {
          position: relative;
          font-variant-numeric: tabular-nums;
          transition: color 0.2s ease;
        }
        
        .points-display::after {
          content: attr(data-points);
          position: absolute;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default DonationModal; 