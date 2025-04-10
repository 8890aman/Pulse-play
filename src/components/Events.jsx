import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Eye, X, ChevronLeft, ChevronRight, ExternalLink, Share2 } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Animation state
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const events = {
    upcoming: [
      {
        id: 1,
        title: "VALORANT Champions Tour 2024",
        game: "VALORANT",
        date: "March 15-30, 2024",
        location: "Los Angeles, CA",
        prizePool: "$1,000,000",
        participants: 16,
        viewers: 0,
        status: "upcoming",
        image: "https://imgs.search.brave.com/u5e1xSE-TqfcYvDSzvf2LfyiLEYBTSvwX6VqPcWUvi8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lbG9r/aW5nLmNvbS9zdG9y/YWdlL2Jsb2ctaW1h/Z2VzL2UwaVQ4UVox/UmZRdXpOVUJXSXhX/MGtFa2pWNmpGbDd5/LmpwZw",
        description: "The VALORANT Champions Tour 2024 brings together the best teams from around the world to compete for the title of world champion. With a prize pool of $1,000,000, the stakes are higher than ever.",
        teams: ["Sentinels", "100 Thieves", "Cloud9", "Team Liquid", "Fnatic", "G2 Esports", "DRX", "ZETA DIVISION"],
        schedule: [
          { date: "March 15-17", stage: "Group Stage", matches: 8 },
          { date: "March 22-24", stage: "Playoffs", matches: 4 },
          { date: "March 29-30", stage: "Finals", matches: 2 }
        ]
      },
      {
        id: 2,
        title: "CS2 Major Spring 2024",
        game: "Counter-Strike 2",
        date: "April 1-14, 2024",
        location: "Copenhagen, Denmark",
        prizePool: "$1,250,000",
        participants: 24,
        viewers: 0,
        status: "upcoming",
        image: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg",
        description: "The CS2 Major Spring 2024 is the first major tournament for the new Counter-Strike 2. Teams will battle for glory and a share of the $1,250,000 prize pool in Copenhagen, Denmark.",
        teams: ["FaZe Clan", "NAVI", "Vitality", "G2 Esports", "Astralis", "Heroic", "NIP", "ENCE"],
        schedule: [
          { date: "April 1-4", stage: "Challengers Stage", matches: 16 },
          { date: "April 5-9", stage: "Legends Stage", matches: 16 },
          { date: "April 10-14", stage: "Champions Stage", matches: 7 }
        ]
      }
    ],
    ongoing: [
      {
        id: 3,
        title: "League of Legends Spring Split 2024",
        game: "League of Legends",
        date: "January 15 - March 15, 2024",
        location: "Multiple Locations",
        prizePool: "$500,000",
        participants: 10,
        viewers: 125000,
        status: "live",
        image: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872a966297484acd0efe49f34edd5aed",
        description: "The League of Legends Spring Split 2024 features the top teams from regions around the world competing for championship points and a spot at the Mid-Season Invitational.",
        teams: ["T1", "Gen.G", "Cloud9", "Team Liquid", "G2 Esports", "Fnatic", "JD Gaming", "Top Esports"],
        schedule: [
          { date: "January 15 - February, 15", stage: "Regular Season", matches: 45 },
          { date: "February 24 - March 5", stage: "Playoffs", matches: 10 },
          { date: "March 10-15", stage: "Finals", matches: 5 }
        ],
        stream: "https://www.twitch.tv/lol"
      }
    ],
    completed: [
      {
        id: 4,
        title: "Dota 2 International 2023",
        game: "Dota 2",
        date: "October 12-29, 2023",
        location: "Seattle, WA",
        prizePool: "$18,000,000",
        participants: 20,
        peakViewers: 1250000,
        status: "completed",
        winner: "Team Spirit",
        image: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg",
        description: "The International is the pinnacle of Dota 2 esports, featuring the world's top teams competing for the largest prize pool in esports history. The 2023 edition concluded with Team Spirit claiming their second Aegis of Champions.",
        teams: ["Team Spirit", "PSG.LGD", "OG", "Team Liquid", "Evil Geniuses", "Virtus.pro", "Vici Gaming", "Tundra Esports"],
        finalResults: [
          { place: "1st", team: "Team Spirit", prize: "$8,200,000" },
          { place: "2nd", team: "PSG.LGD", prize: "$3,600,000" },
          { place: "3rd", team: "OG", prize: "$1,700,000" }
        ],
        highlights: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ]
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // No navigation - just show the selected event details
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="bg-gradient-to-b from-[#1A1A1D] to-[#1F1F23] min-h-screen p-4 sm:p-6 md:p-8 xl:p-12 custom-scrollbar">
      <div className="max-w-7xl mx-auto xl:max-w-8xl">
        {/* Header */}
        <div className={`mb-8 md:mb-12 transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2 flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] flex items-center justify-center shadow-lg shadow-[#9D4EDD]/10 mr-3">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            Esports Events
          </h1>
          <p className="text-[#EBD3F8]/70 text-base md:text-lg">
            Stay updated with the biggest esports tournaments and events
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex border-b border-[#2A2A2D] mb-6 md:mb-8 overflow-x-auto no-scrollbar transition-all duration-600 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
             style={{ transitionDelay: '100ms' }}>
          {['upcoming', 'ongoing', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 font-medium text-sm md:text-base capitalize flex-shrink-0 ${
                activeTab === tab
                  ? 'text-[#C77DFF] border-b-2 border-[#9D4EDD]'
                  : 'text-[#EBD3F8]/70 hover:text-[#EBD3F8]'
              } transition-colors`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
             style={{ transitionDelay: '200ms' }}>
          {events[activeTab].map((event, index) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className={`group bg-[#2A2A2D] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${300 + (index * 100)}ms` }}
            >
              {/* Event Image */}
              <div className="aspect-[2/1] relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
                
                {/* Status Badge */}
                {event.status === 'live' && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="flex items-center bg-red-500 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse mr-2"></span>
                      <span className="text-white font-medium">LIVE</span>
                    </div>
                    <div className="flex items-center bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Eye className="w-4 h-4 text-[#EBD3F8] mr-2" />
                      <span className="text-[#EBD3F8] font-medium">
                        {(event.viewers / 1000).toFixed(1)}K watching
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Top highlight line that appears on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-[#EBD3F8] font-semibold text-lg sm:text-xl mb-2 group-hover:text-[#C77DFF] transition-colors line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-[#EBD3F8]/60 mb-4 text-sm sm:text-base">{event.game}</p>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center text-[#EBD3F8]/80">
                    <Clock className="w-4 h-4 flex-shrink-0 mr-2" />
                    <span className="text-xs sm:text-sm truncate">{event.date}</span>
                  </div>
                  <div className="flex items-center text-[#EBD3F8]/80">
                    <MapPin className="w-4 h-4 flex-shrink-0 mr-2" />
                    <span className="text-xs sm:text-sm truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center text-[#EBD3F8]/80">
                    <Trophy className="w-4 h-4 flex-shrink-0 mr-2" />
                    <span className="text-xs sm:text-sm truncate">{event.prizePool}</span>
                  </div>
                  <div className="flex items-center text-[#EBD3F8]/80">
                    <Users className="w-4 h-4 flex-shrink-0 mr-2" />
                    <span className="text-xs sm:text-sm truncate">{event.participants} Teams</span>
                  </div>
                </div>

                {event.status === 'completed' && (
                  <div className="mt-4 pt-4 border-t border-[#1A1A1D]">
                    <div className="flex items-center justify-between text-[#EBD3F8]/80">
                      <span className="text-sm">Winner</span>
                      <span className="font-medium">{event.winner}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#EBD3F8]/60 mt-2">
                      <span className="text-sm">Peak Viewers</span>
                      <span className="font-medium">{(event.peakViewers / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                )}
                
                {/* Go to event button */}
                <div className="mt-5">
                  <div className="bg-gradient-to-r from-[#9D4EDD]/10 to-[#C77DFF]/10 text-[#C77DFF] text-center py-2 rounded-lg font-medium text-sm group-hover:from-[#9D4EDD]/20 group-hover:to-[#C77DFF]/20 transition-all">
                    View Details
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events[activeTab].length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#EBD3F8]/70 text-lg">
              No {activeTab} events at the moment
            </p>
          </div>
        )}
        
        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-0">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeEventDetails}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-[#1A1A1D] rounded-xl overflow-hidden w-full max-w-4xl relative z-[10000] max-h-[90vh] flex flex-col shadow-2xl">
              {/* Header Image */}
              <div className="relative h-64 w-full">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1D] via-[#1A1A1D]/60 to-transparent"></div>
                
                {/* Close Button */}
                <button 
                  onClick={closeEventDetails}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Status Badge */}
                {selectedEvent.status === 'live' && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="flex items-center bg-red-500 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse mr-2"></span>
                      <span className="text-white font-medium">LIVE NOW</span>
                    </div>
                  </div>
                )}
                
                {/* Event Title & Info */}
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-1">{selectedEvent.title}</h2>
                  <p className="text-[#EBD3F8]/80 text-lg">{selectedEvent.game}</p>
                </div>
              </div>
              
              {/* Event Content - Scrollable */}
              <div className="overflow-y-auto p-6 flex-1 custom-scrollbar fancy-scrollbar">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-[#C77DFF] font-semibold text-xl mb-3">About the Event</h3>
                  <p className="text-[#EBD3F8]/80 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
                
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#2A2A2D] p-4 rounded-lg">
                    <h4 className="text-[#EBD3F8]/60 text-sm mb-1">Date</h4>
                    <p className="text-[#EBD3F8] font-medium">{selectedEvent.date}</p>
                  </div>
                  <div className="bg-[#2A2A2D] p-4 rounded-lg">
                    <h4 className="text-[#EBD3F8]/60 text-sm mb-1">Location</h4>
                    <p className="text-[#EBD3F8] font-medium">{selectedEvent.location}</p>
                  </div>
                  <div className="bg-[#2A2A2D] p-4 rounded-lg">
                    <h4 className="text-[#EBD3F8]/60 text-sm mb-1">Prize Pool</h4>
                    <p className="text-[#EBD3F8] font-medium">{selectedEvent.prizePool}</p>
                  </div>
                  <div className="bg-[#2A2A2D] p-4 rounded-lg">
                    <h4 className="text-[#EBD3F8]/60 text-sm mb-1">Teams</h4>
                    <p className="text-[#EBD3F8] font-medium">{selectedEvent.participants} Participants</p>
                  </div>
                </div>
                
                {/* Teams Section */}
                {selectedEvent.teams && (
                  <div className="mb-8">
                    <h3 className="text-[#C77DFF] font-semibold text-xl mb-3">Participating Teams</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {selectedEvent.teams.map((team, index) => (
                        <div key={index} className="bg-[#2A2A2D] p-2 rounded-lg text-center">
                          <p className="text-[#EBD3F8] font-medium truncate">{team}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Schedule */}
                {selectedEvent.schedule && (
                  <div className="mb-8">
                    <h3 className="text-[#C77DFF] font-semibold text-xl mb-3">Schedule</h3>
                    <div className="space-y-3">
                      {selectedEvent.schedule.map((stage, index) => (
                        <div key={index} className="bg-[#2A2A2D] p-4 rounded-lg flex justify-between items-center">
                          <div>
                            <h4 className="text-[#EBD3F8] font-medium">{stage.stage}</h4>
                            <p className="text-[#EBD3F8]/60 text-sm">{stage.date}</p>
                          </div>
                          <div className="text-[#EBD3F8]/80">{stage.matches} Matches</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Results for completed events */}
                {selectedEvent.finalResults && (
                  <div className="mb-8">
                    <h3 className="text-[#C77DFF] font-semibold text-xl mb-3">Final Results</h3>
                    <div className="space-y-3">
                      {selectedEvent.finalResults.map((result, index) => (
                        <div key={index} className="bg-[#2A2A2D] p-4 rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${
                              index === 0 ? 'bg-yellow-500 text-[#1A1A1D]' : 
                              index === 1 ? 'bg-gray-300 text-[#1A1A1D]' : 
                              'bg-orange-700 text-[#1A1A1D]'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-[#EBD3F8] font-medium">{result.team}</h4>
                              <p className="text-[#EBD3F8]/60 text-sm">{result.place}</p>
                            </div>
                          </div>
                          <div className="text-[#C77DFF] font-bold">{result.prize}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Watch/Stream Links */}
                {selectedEvent.status === 'live' && selectedEvent.stream && (
                  <div className="mb-8">
                    <a 
                      href={selectedEvent.stream} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] text-white px-4 py-3 rounded-lg font-medium text-lg hover:shadow-lg hover:shadow-[#C77DFF]/20 transition-all"
                    >
                      Watch Live Stream <ExternalLink className="ml-2 w-5 h-5" />
                    </a>
                  </div>
                )}
                
                {/* Highlights Link */}
                {selectedEvent.status === 'completed' && selectedEvent.highlights && (
                  <div className="mb-8">
                    <a 
                      href={selectedEvent.highlights} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-[#2A2A2D] hover:bg-[#2A2A2D]/80 text-[#C77DFF] px-4 py-3 rounded-lg font-medium text-lg transition-all"
                    >
                      Watch Highlights <ExternalLink className="ml-2 w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
              
              {/* Footer Action Buttons */}
              <div className="p-4 border-t border-[#2A2A2D] flex justify-between">
                <button 
                  onClick={closeEventDetails}
                  className="px-4 py-2 bg-[#2A2A2D] hover:bg-[#2A2A2D]/80 rounded-lg text-[#EBD3F8] transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#2A2A2D] hover:bg-[#2A2A2D]/80 rounded-lg text-[#EBD3F8] transition-colors flex items-center">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom scrollbar styles */}
      <style jsx="true">{`
        /* Basic scrollbar styling for browsers that support it */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(42, 42, 45, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(157, 78, 221, 0.3);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(157, 78, 221, 0.5);
        }
        
        /* Enhanced scrollbar for modal content */
        .fancy-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .fancy-scrollbar::-webkit-scrollbar-track {
          background: rgba(42, 42, 45, 0.5);
          border-radius: 10px;
          margin: 4px;
        }
        
        .fancy-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9D4EDD, #C77DFF);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
          transition: all 0.3s ease;
        }
        
        .fancy-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #C77DFF, #9D4EDD);
          background-clip: padding-box;
        }

        /* Hide scrollbar for tabs while allowing scroll functionality */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        
        /* Make scrollbar appear on hover only for a cleaner look */
        .fancy-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(157, 78, 221, 0.5) rgba(42, 42, 45, 0.2);
        }
        
        /* Add smooth scrolling to all scrollable elements */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Events; 