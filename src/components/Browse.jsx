import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Gamepad2, MessageCircle, Palette, Music2, Code2 } from 'lucide-react';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories] = useState([
    {
      id: 'games',
      name: 'Games',
      icon: <Gamepad2 className="w-5 h-5" />,
      categories: [
  { 
    id: 1,
          name: "VALORANT",
    viewers: 125000,
          tags: ["FPS", "Competitive", "Action"],
          image: "https://imgs.search.brave.com/8-w--1UhNtnEM2CW2f2zcxQejwExb6lTJf_4r8_hhN8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvdmFsb3JhbnQt/MzA1a2VzY3h3NWRw/dXA3eS5qcGc"
  },
  { 
    id: 2,
          name: "Counter-Strike 2",
    viewers: 98000,
          tags: ["FPS", "Competitive", "Tactical"],
          image: "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg"
  },
  { 
    id: 3,
          name: "League of Legends",
    viewers: 75000,
          tags: ["MOBA", "Strategy", "Team"],
          image: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872a966297484acd0efe49f34edd5aed"
        }
      ]
    },
    {
      id: 'irl',
      name: 'IRL',
      icon: <MessageCircle className="w-5 h-5" />,
      categories: [
  { 
    id: 4,
          name: "Just Chatting",
          viewers: 250000,
          tags: ["IRL", "Chat", "Social"],
          image: "https://imgs.search.brave.com/jqdUg0ifihHoPwPf27YB-8RR2Df6WibgLiawXgxjH9w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE3LzBl/LzUzLzE3MGU1MzAw/ZmJlM2IyZjg0YWQ3/YjNkZThlY2RmOWIy/LmpwZw"
  },
  { 
    id: 5,
          name: "Art",
    viewers: 45000,
          tags: ["Creative", "Drawing", "Digital Art"],
          image: "https://imgs.search.brave.com/yNiVtD26zZ2Vl699pkiCi9XEawINY2EGs_jD_QGG_Xw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtd2l4bXAtZWQz/MGE4NmI4YzRjYTg4/Nzc3MzU5NGMyLndp/eG1wLmNvbS9mL2Rh/Zjk1M2VlLTNiMTAt/NDA3MS05NWMyLTM4/ZjEyNjcxNmE5NS9k/aHh2eHUzLTAzZGYx/ZDJkLTY1OTUtNDk5/Mi04Y2ExLTk4MGE4/NzBiYTQ1ZS5wbmc_/dG9rZW49ZXlKMGVY/QWlPaUpLVjFRaUxD/SmhiR2NpT2lKSVV6/STFOaUo5LmV5Snpk/V0lpT2lKMWNtNDZZ/WEJ3T2pkbE1HUXhP/RGc1T0RJeU5qUXpO/ek5oTldZd1pEUXhO/V1ZoTUdReU5tVXdJ/aXdpYVhOeklqb2lk/WEp1T21Gd2NEbzNa/VEJrTVRnNE9UZ3lN/alkwTXpjellUVm1N/R1EwTVRWbFlUQmtN/alpsTUNJc0ltOWlh/aUk2VzF0N0luQmhk/R2dpT2lKY0wyWmNM/MlJoWmprMU0yVmxM/VE5pTVRBdE5EQTNN/UzA1TldNeUxUTTRa/akV5TmpjeE5tRTVO/Vnd2WkdoNGRuaDFN/eTB3TTJSbU1XUXla/QzAyTlRrMUxUUTVP/VEl0T0dOaE1TMDVP/REJoT0Rjd1ltRTBO/V1V1Y0c1bkluMWRY/U3dpWVhWa0lqcGJJ/blZ5YmpwelpYSjJh/V05sT21acGJHVXVa/RzkzYm14dllXUWlY/WDAuc0tVMkJZbnBm/RDV4LUpzMjV1RHBw/b1JlRXU4cHhhSUlm/Y3NLRUUzckhQZw"
  },
  { 
    id: 6,
          name: "Music",
          viewers: 35000,
          tags: ["Performance", "Live", "Singing"],
          image: "https://imgs.search.brave.com/6cUyqoYO5ThRYHbATDu8uVmNHx5AkoLUJHqbm4E2L0I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGQlpM/d1RZVmMvMy8wLzE2/MDB3L2NhbnZhLXBp/bmstYW5kLWdyZWVu/LXBpYW5vLW5hdHVy/ZS1tdXNpYy15b3V0/dWJlLXRodW1ibmFp/bC1YZHl1RWtJelhk/QS5qcGc"
        }
      ]
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: <Palette className="w-5 h-5" />,
      categories: [
  { 
    id: 7,
          name: "Digital Art",
          viewers: 15000,
          tags: ["Art", "Digital", "Creative"],
          image: "https://imgs.search.brave.com/FG3zwNirZqN--75qC2gSH4E8c-u6WTFtetUtXK-K9Is/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZW5k/ZXIuZmluZWFydGFt/ZXJpY2EuY29tL2lt/YWdlcy9pbWFnZXMt/cHJvZmlsZS1mbG93/LzQwMC9pbWFnZXMv/YXJ0d29ya2ltYWdl/cy9tZWRpdW1sYXJn/ZS8zL21vdmllcy1i/aW5nZS13YXRjaGlu/Zy10di1wcm9ncmFt/bWVzLXNob3ctc2Vy/aWVzLWNyYXp5LXNx/dWlycmVsLmpwZw"
        }
      ]
    },
    {
      id: 'music',
      name: 'Music',
      icon: <Music2 className="w-5 h-5" />,
      categories: [
  { 
    id: 8,
          name: "Music Production",
          viewers: 8000,
          tags: ["Production", "Electronic", "Live"],
          image: "https://imgs.search.brave.com/cWK_Ns7mlZJaY76Nx4c8r96P_wZPPsmhc0v9cusNjM0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9kb3dubG9h/ZHMvNDkyZDZhMjEt/NDdjOC00ZTUxLTk0/MTAtN2U4OGM3NDg3/MjFhXzQ1MC5qcGVn"
        }
      ]
    },
    {
      id: 'development',
      name: 'Development',
      icon: <Code2 className="w-5 h-5" />,
      categories: [
  { 
    id: 9,
          name: "Programming",
          viewers: 12000,
          tags: ["Coding", "Tech", "Education"],
          image: "https://imgs.search.brave.com/sTHX1o4Ftf-UhautxFYUB9lscaM1gQU7jk3xjnBihU8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iLnRo/dW1icy5yZWRkaXRt/ZWRpYS5jb20vUlhf/YnJ6RFRmbWFOU2h5/MTR3bnBVQml5M1F2/NFlpMVVGZmIzR3pM/Q01Sby5qcGc"
  }
      ]
    }
  ]);

  // Animation state
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const filteredCategories = categories.map(section => ({
    ...section,
    categories: section.categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(section => section.categories.length > 0);

  console.log('Search query:', searchQuery);
  console.log('Filtered categories count:', filteredCategories.length);

  return (
    <div className="bg-[#1A1A1D] min-h-screen p-4 md:p-8 xl:p-12">
      <div className="max-w-7xl mx-auto xl:max-w-8xl">
        {/* Search Bar */}
        <div className={`mb-8 transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2A2A2D] text-[#EBD3F8] rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EBD3F8]/50"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#EBD3F8]/60 w-5 h-5" />
          </div>
        </div>

        {/* No Results Message */}
        {filteredCategories.length === 0 && searchQuery.trim() !== '' && (
          <div className="flex flex-col items-center justify-center py-20 bg-[#2A2A2D]/30 rounded-lg">
            <div className="w-16 h-16 bg-[#2A2A2D] rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-[#EBD3F8]/50" />
            </div>
            <h3 className="text-[#EBD3F8] text-xl font-medium mb-2">No results found</h3>
            <p className="text-[#EBD3F8]/60 text-center max-w-md">
              We couldn't find any categories matching "{searchQuery}". 
              Try different keywords or check out our popular categories.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-[#9D4EDD] text-white rounded-md hover:bg-[#C77DFF] transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Categories */}
        {filteredCategories.map((section, sectionIndex) => (
          <div 
            key={section.id} 
            className={`mb-12 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${200 + (sectionIndex * 100)}ms` }}
          >
            <h2 className="text-[#EBD3F8] text-2xl font-semibold mb-6 flex items-center">
              {section.icon}
              <span className="ml-3">{section.name}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`group relative overflow-hidden rounded-xl transform transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${300 + (sectionIndex * 100) + (index * 50)}ms` }}
                >
                  <div className="aspect-[16/9] relative overflow-hidden rounded-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#EBD3F8] transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Eye className="w-3.5 h-3.5 text-[#EBD3F8] mr-1.5" />
                          <span className="text-[#EBD3F8] text-sm font-medium">
                            {(category.viewers / 1000).toFixed(1)}K viewers
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-[#EBD3F8]/10 text-[#EBD3F8] text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse; 