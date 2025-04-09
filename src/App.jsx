import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import StreamPage from './components/stream/StreamPage'
import Home from './components/Home'
import Browse from './components/Browse'
import Following from './components/Following'
import Trending from './components/Trending'
import Events from './components/Events'
import LoginModal from './components/auth/LoginModal'
import SignupModal from './components/auth/SignupModal'
import NotFound from './components/NotFound'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1D]">
      <Navbar 
        onOpenLogin={handleOpenLoginModal}
        onOpenSignup={handleOpenSignupModal}
      />
      <Sidebar />
      <main className="pt-16 md:pl-64 min-h-screen transition-all duration-300">
        <div className="max-w-[2000px] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stream/:id" element={<StreamPage />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/events" element={<Events />} />
            <Route path="/following" element={<Following />} />
            <Route path="/category/:id" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={handleOpenSignupModal}
      />
      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={handleOpenLoginModal}
      />
    </div>
  )
}

export default App
