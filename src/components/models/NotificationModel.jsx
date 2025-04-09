import React, { useState } from 'react';
import { Card, Button } from "@material-tailwind/react";
import { X, Bell, Check, Clock, Users, Heart, Gift, MessageCircle } from 'lucide-react';

const NotificationModel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'live',
      user: 'TenZ',
      content: 'just went live: "VALORANT Ranked Grind"',
      time: '2 minutes ago',
      read: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TenZ',
      icon: Users
    },
    {
      id: 2,
      type: 'follower',
      user: 'Shroud',
      content: 'started following you',
      time: '1 hour ago',
      read: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shroud',
      icon: Heart
    },
    {
      id: 3,
      type: 'gift',
      user: 'Hiko',
      content: 'sent you a gift: "VIP Subscription"',
      time: '3 hours ago',
      read: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hiko',
      icon: Gift
    },
    {
      id: 4,
      type: 'mention',
      user: 'Aceu',
      content: 'mentioned you in chat',
      time: '5 hours ago',
      read: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aceu',
      icon: MessageCircle
    },
    {
      id: 5,
      type: 'scheduled',
      user: 'RiotGames',
      content: 'will be live in 30 minutes',
      time: 'Just now',
      read: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RiotGames',
      icon: Clock
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      
      <Card className="bg-[#1A1A1D] border border-[#2A2A2D] shadow-xl w-full max-w-md mx-auto z-[9999] overflow-hidden">
        <div className="p-4 border-b border-[#2A2A2D] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-[#EBD3F8]" />
            <h2 className="text-lg font-semibold text-[#EBD3F8]">Notifications</h2>
            {unreadCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center bg-[#EBD3F8] text-[#1A1A1D] text-xs font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button 
                variant="text" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-[#EBD3F8]/80 hover:text-[#EBD3F8] normal-case flex items-center gap-1 p-2"
              >
                <Check className="h-4 w-4" />
                <span className="text-xs">Mark all as read</span>
              </Button>
            )}
            
            <button 
              onClick={onClose}
              className="p-1 rounded-full bg-[#2A2A2D] text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Bell className="h-12 w-12 text-[#EBD3F8]/50 mb-3" />
              <p className="text-[#EBD3F8]/70">No notifications yet</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div 
                    key={notification.id}
                    className={`flex items-start p-4 hover:bg-[#2A2A2D]/30 transition-colors cursor-pointer ${!notification.read ? 'bg-[#2A2A2D]/20' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="relative mr-3">
                      <img 
                        src={notification.avatar} 
                        alt={notification.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="absolute -right-1 -bottom-1 p-1 rounded-full bg-[#1A1A1D]">
                        <Icon className={`h-3.5 w-3.5 ${
                          notification.type === 'live' ? 'text-red-500' : 
                          notification.type === 'follower' ? 'text-pink-500' :
                          notification.type === 'gift' ? 'text-amber-500' :
                          notification.type === 'mention' ? 'text-blue-500' : 'text-green-500'
                        }`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[#EBD3F8] font-medium">
                            <span className="font-bold">{notification.user}</span> {notification.content}
                          </p>
                          <p className="text-[#EBD3F8]/60 text-xs mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-[#EBD3F8] flex-shrink-0"></span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-[#2A2A2D] bg-[#1A1A1D]">
          <Button
            className="w-full bg-[#2A2A2D] text-[#EBD3F8] hover:bg-[#2A2A2D]/80 normal-case"
          >
            View all notifications
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotificationModel; 