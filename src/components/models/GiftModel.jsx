import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from "@material-tailwind/react";
import { X, Gift, Coins, CreditCard, DollarSign, Sparkles, Zap, Rocket, Check } from 'lucide-react';

const GiftModel = ({ isOpen, onClose, streamerName = "shanks_ttv" }) => {
  const [selectedPoints, setSelectedPoints] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [animatingPoints, setAnimatingPoints] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(1000);
  const [targetPoints, setTargetPoints] = useState(1000);
  const slotMachineRef = useRef(null);
  
  // Points packages
  const pointsPackages = [
    {
      id: 'basic',
      name: '100 Points',
      points: 100,
      price: 4.99,
      bonus: 0,
      icon: Coins,
      color: 'text-blue-500',
      bgColor: 'bg-[#2A2A2D]'
    },
    {
      id: 'popular',
      name: '500 Points',
      points: 500,
      price: 19.99,
      bonus: 50,
      icon: Zap,
      color: 'text-purple-500',
      bgColor: 'bg-[#2A2A2D]',
      popular: true
    },
    {
      id: 'premium',
      name: '1200 Points',
      points: 1200,
      price: 49.99,
      bonus: 200,
      icon: Rocket,
      color: 'text-amber-500',
      bgColor: 'bg-[#2A2A2D]'
    }
  ];
  
  // Payment methods
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit Card',
      icon: CreditCard,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: DollarSign,
    }
  ];
  
  const handleBuy = () => {
    console.log(`Purchasing ${selectedPoints.points} points package`);
    setPurchaseSuccess(true);
    
    // Update points with animation
    const newPoints = currentPoints + selectedPoints.points + (selectedPoints.bonus || 0);
    setTargetPoints(newPoints);
    setAnimatingPoints(true);
    
    // Emit a custom event that Navbar can listen to 
    const pointsPurchaseEvent = new CustomEvent('pointsPurchase', {
      detail: { 
        currentPoints: currentPoints,
        newPoints: newPoints,
        purchasedPoints: selectedPoints.points,
        bonusPoints: selectedPoints.bonus || 0
      }
    });
    window.dispatchEvent(pointsPurchaseEvent);
    
    // Close the modal after animation completes
    setTimeout(() => {
      setPurchaseSuccess(false);
      setSelectedPoints(null);
      setCurrentPoints(newPoints);
    onClose();
    }, 3500);
  };
  
  // Slot machine animation effect
  useEffect(() => {
    if (animatingPoints && slotMachineRef.current) {
      let animationFrames = 0;
      let lastTimestamp = 0;
      const totalDuration = 2000; // 2 seconds animation
      
      const animate = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        // Increase the counter based on elapsed time
        const progress = Math.min(1, animationFrames / totalDuration);
        const easedProgress = easeOutExpo(progress);
        
        // Current value to display
        const pointsToDisplay = Math.floor(currentPoints + (targetPoints - currentPoints) * easedProgress);
        
        // Update the display
        if (slotMachineRef.current) {
          slotMachineRef.current.textContent = pointsToDisplay.toLocaleString();
        }
        
        // Continue the animation
        if (progress < 1) {
          animationFrames += elapsed;
          requestAnimationFrame(animate);
        } else {
          // Animation finished
          setAnimatingPoints(false);
          setCurrentPoints(targetPoints);
        }
      };
      
      // Easing function for smoother animation
      const easeOutExpo = (x) => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };
      
      // Start the animation
      requestAnimationFrame(animate);
    }
  }, [animatingPoints, currentPoints, targetPoints]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-8 sm:pt-16 px-3 sm:px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      <Card className="bg-[#1A1A1D] border border-[#2A2A2D] shadow-xl w-full max-w-md mx-auto z-[9999] overflow-hidden max-h-[90vh] overflow-y-auto">
        {purchaseSuccess ? (
          // Success animation view
          <div className="w-full h-full py-8 sm:py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-r from-[#EBD3F8] to-[#B392AC] flex items-center justify-center mb-4 sm:mb-6 animate-pulse">
              <Check className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-[#EBD3F8] mb-2">Success!</h2>
            <p className="text-[#EBD3F8]/70 mb-6 sm:mb-8 text-center text-sm sm:text-base">
              You've purchased {selectedPoints.points}{selectedPoints.bonus > 0 ? ` + ${selectedPoints.bonus} bonus` : ''} points
            </p>
            
            {/* Slot machine animation for points */}
            <div className="mb-8 sm:mb-10 relative">
              <div className="flex items-center justify-center mb-2">
                <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-[#EBD3F8] mr-2" />
                <div className="text-base sm:text-lg text-[#EBD3F8]/80">Current Balance</div>
              </div>
              
              <div className="relative flex justify-center">
                <div className="relative bg-[#2A2A2D] px-6 sm:px-8 py-2 sm:py-3 rounded-lg overflow-hidden">
                  {/* Slot machine effect with flickering digits */}
                  <div className="flex items-center">
                    <div 
                      ref={slotMachineRef}
                      className="text-xl sm:text-2xl font-bold text-[#EBD3F8] min-w-[80px] sm:min-w-[100px] text-center slot-machine-text"
                    >
                      {currentPoints.toLocaleString()}
                    </div>
                    <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-[#EBD3F8] ml-1" />
                  </div>
                  
                  {/* Glowing highlight for the new points */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#EBD3F8]/0 via-[#EBD3F8]/30 to-[#EBD3F8]/0 animate-sheen"></div>
                </div>
              </div>
              
              {/* Animated particles going up */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => {
                  const size = Math.random() * 8 + 4;
                  const left = Math.random() * 100;
                  const delay = Math.random() * 1;
                  const duration = Math.random() * 1.5 + 1.5;
                  
                  return (
                    <div 
                      key={i}
                      className="absolute bottom-0 rounded-full bg-[#EBD3F8]/80"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}%`,
                        opacity: 0,
                        animation: `floatUpParticle ${duration}s ease-out ${delay}s forwards`
                      }}
                    />
                  );
                })}
              </div>
            </div>
            
            <Button
              onClick={() => {
                setPurchaseSuccess(false);
                setSelectedPoints(null);
                onClose();
              }}
              className="bg-gradient-to-r from-[#EBD3F8] to-[#B392AC] text-[#1A1A1D] normal-case font-bold"
            >
              Continue
            </Button>
          </div>
        ) : (
          // Normal points purchase view
          <>
            <div className="p-3 sm:p-4 border-b border-[#2A2A2D] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-[#EBD3F8]" />
                <h2 className="text-base sm:text-lg font-semibold text-white">Get Points</h2>
              </div>
              
              <button 
                onClick={onClose}
                className="p-1 rounded-full bg-[#2A2A2D] text-white hover:text-[#EBD3F8] transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Current balance display */}
              <div className="flex items-center justify-between p-2 sm:p-3 bg-[#2A2A2D]/50 rounded-lg">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-[#EBD3F8] mr-2" />
                  <span className="text-sm sm:text-base text-[#EBD3F8]/80">Your Balance</span>
                </div>
                <div className="font-bold text-sm sm:text-base text-[#EBD3F8]">{currentPoints.toLocaleString()} Points</div>
              </div>
              
              <p className="text-white/80 text-xs sm:text-sm mb-1 sm:mb-2">
                Purchase points to donate to your favorite streamers like <span className="text-[#EBD3F8] font-medium">{streamerName}</span>.
              </p>
              
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {pointsPackages.map((package_) => (
                  <div
                    key={package_.id}
                    className={`relative flex flex-col items-center p-2 sm:p-3 rounded-lg ${package_.bgColor} border-2 transition-all cursor-pointer ${
                      selectedPoints?.id === package_.id
                      ? 'border-[#EBD3F8]'
                      : 'border-transparent hover:border-[#EBD3F8]/50'
                    }`}
                    onClick={() => setSelectedPoints(package_)}
                  >
                    {package_.popular && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#EBD3F8] to-[#B392AC] text-[#1A1A1D] text-[9px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                        Best Value
                      </div>
                    )}
                    <package_.icon className={`h-6 w-6 sm:h-8 sm:w-8 mb-1 ${package_.color}`} />
                    <h3 className="text-white text-xs sm:text-sm font-bold text-center">{package_.name}</h3>
                    {package_.bonus > 0 && (
                      <div className="flex items-center text-green-400 text-[9px] sm:text-xs">
                        <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                        <span>+{package_.bonus} Bonus</span>
                      </div>
                    )}
                    <span className="text-white text-xs sm:text-base font-bold mt-0.5 sm:mt-1">${package_.price}</span>
                  </div>
                ))}
              </div>
              
              {selectedPoints && (
                <div className="pt-3 sm:pt-4 border-t border-[#2A2A2D] mt-1 sm:mt-2">
                  <div className="bg-[#2A2A2D]/50 p-2 sm:p-3 rounded-lg mb-3 sm:mb-4">
                    <h3 className="text-white text-sm sm:text-base font-semibold mb-1.5 sm:mb-2">What you can do with points:</h3>
                    <ul className="text-white/90 text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                      <li className="flex items-start">
                        <Gift className="h-3 w-3 sm:h-4 sm:w-4 text-[#EBD3F8] mr-1.5 sm:mr-2 mt-0.5" />
                        <span>Donate to your favorite streamers</span>
                      </li>
                      <li className="flex items-start">
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#EBD3F8] mr-1.5 sm:mr-2 mt-0.5" />
                        <span>Send animated donations that appear on stream</span>
                      </li>
                      <li className="flex items-start">
                        <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-[#EBD3F8] mr-1.5 sm:mr-2 mt-0.5" />
                        <span>Unlock special chat features and emotes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <h3 className="text-white text-sm sm:text-base font-semibold mb-2 sm:mb-3">Payment Method</h3>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center p-2 sm:p-3 rounded-lg bg-[#2A2A2D] cursor-pointer hover:bg-[#3A3A3D] transition-colors ${method.id === 'card' ? 'border-2 border-[#EBD3F8]' : 'border-2 border-transparent'}`}
                        onClick={() => {}}
                      >
                        <method.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#EBD3F8] mr-2 sm:mr-3" />
                        <span className="text-white text-xs sm:text-sm">{method.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={handleBuy}
                    className="w-full bg-gradient-to-r from-[#EBD3F8] to-[#B392AC] text-[#1A1A1D] normal-case text-sm sm:text-base font-bold py-2 sm:py-3"
                  >
                    <div className="flex items-center justify-center">
                      <Coins className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      <span>Buy {selectedPoints.points + (selectedPoints.bonus > 0 ? ` + ${selectedPoints.bonus} bonus` : '')} Points</span>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </Card>
      
      {/* Add animation styles */}
      <style jsx="true">{`
        @keyframes floatUpParticle {
          0% { transform: translateY(0); opacity: 0.7; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
        
        @keyframes sheen {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-sheen {
          animation: sheen 2s ease-in-out infinite;
        }
        
        .slot-machine-text {
          font-variant-numeric: tabular-nums;
          transition: color 0.2s ease;
        }
        
        @keyframes textFlicker {
          0% { color: rgba(235, 211, 248, 0.5); }
          50% { color: rgba(235, 211, 248, 1); }
          100% { color: rgba(235, 211, 248, 0.5); }
        }
      `}</style>
    </div>
  );
};

export default GiftModel; 