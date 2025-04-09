import React, { useState } from 'react';
import { Card, Button } from "@material-tailwind/react";
import { X, Gift, Star, Crown, Zap, CreditCard, DollarSign } from 'lucide-react';

const GiftModel = ({ isOpen, onClose, streamerName = "shanks_ttv" }) => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  
  // Subscription tiers
  const subscriptionTiers = [
    {
      id: 'tier1',
      name: 'Tier 1',
      price: 4.99,
      benefits: [
        'Subscriber badge',
        'Custom emotes',
        'Ad-free viewing',
        'Subscriber-only chat'
      ],
      icon: Star,
      color: 'text-blue-500',
      bgColor: 'bg-[#2A2A2D]'
    },
    {
      id: 'tier2',
      name: 'Tier 2',
      price: 9.99,
      benefits: [
        'All Tier 1 benefits',
        'Extra emotes',
        'Special badge upgrade',
        'Highlighted messages'
      ],
      icon: Zap,
      color: 'text-purple-500',
      bgColor: 'bg-[#2A2A2D]'
    },
    {
      id: 'tier3',
      name: 'Tier 3',
      price: 24.99,
      benefits: [
        'All Tier 2 benefits',
        'VIP badge',
        'Full emote set',
        'Priority in viewer games',
        'Monthly special discord role'
      ],
      icon: Crown,
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
    console.log(`Subscribing with ${selectedSubscription.name}`);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      <Card className="bg-[#1A1A1D] border border-[#2A2A2D] shadow-xl w-full max-w-md mx-auto z-[9999] overflow-hidden">
        <div className="p-4 border-b border-[#2A2A2D] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-[#EBD3F8]" />
            <h2 className="text-lg font-semibold text-white">Subscriptions</h2>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-[#2A2A2D] text-white hover:text-[#EBD3F8] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <p className="text-white/80 text-sm mb-2">
            Support <span className="text-[#EBD3F8] font-medium">{streamerName}</span> with a monthly subscription.
          </p>
          
          <div className="grid grid-cols-3 gap-2">
            {subscriptionTiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex flex-col items-center p-2 rounded-lg ${tier.bgColor} border-2 transition-all cursor-pointer ${
                  selectedSubscription?.id === tier.id
                    ? 'border-[#EBD3F8]'
                    : 'border-transparent hover:border-[#EBD3F8]/50'
                }`}
                onClick={() => setSelectedSubscription(tier)}
              >
                <tier.icon className={`h-8 w-8 mb-1 ${tier.color}`} />
                <h3 className="text-white font-bold text-center">{tier.name}</h3>
                <span className="text-white font-bold">${tier.price}/mo</span>
                <span className="text-white/50 text-xs mt-1">{tier.benefits.length} benefits</span>
              </div>
            ))}
          </div>
          
          {selectedSubscription && (
            <div className="pt-4 border-t border-[#2A2A2D] mt-2">
              <h3 className="text-white font-semibold mb-2">Benefits</h3>
              <ul className="text-white/90 text-sm space-y-1 mb-4">
                {selectedSubscription.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-[#EBD3F8]">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-white font-semibold mb-3">Payment Method</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center p-3 rounded-lg bg-[#2A2A2D] cursor-pointer hover:bg-[#3A3A3D] transition-colors ${method.id === 'card' ? 'border-2 border-[#EBD3F8]' : 'border-2 border-transparent'}`}
                    onClick={() => {}}
                  >
                    <method.icon className="h-5 w-5 text-[#EBD3F8] mr-3" />
                    <span className="text-white">{method.name}</span>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={handleBuy}
                className="w-full bg-gradient-to-r from-[#EBD3F8] to-[#B392AC] text-[#1A1A1D] normal-case font-bold"
              >
                Subscribe for ${selectedSubscription.price}/month
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default GiftModel; 