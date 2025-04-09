import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Mail, Lock, Github, Twitter } from 'lucide-react';
import Modal from '../common/Modal';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login form submitted:', formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome back!">
      <div className="space-y-6">
        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2A2A2D] hover:bg-[#2A2A2D]/80 text-[#EBD3F8] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#2A2A2D]/20">
            <Github className="w-5 h-5" />
            <span className="font-medium">GitHub</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2A2A2D] hover:bg-[#2A2A2D]/80 text-[#EBD3F8] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#2A2A2D]/20">
            <Twitter className="w-5 h-5" />
            <span className="font-medium">Twitter</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2A2A2D]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1A1A1D] text-[#EBD3F8]/60">
              or continue with
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-[#EBD3F8]/70" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2.5 bg-[#2A2A2D] text-[#EBD3F8] placeholder-[#EBD3F8]/50 rounded-xl border border-[#2A2A2D] focus:border-[#EBD3F8] focus:ring-1 focus:ring-[#EBD3F8] transition-colors outline-none"
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-[#EBD3F8]/70" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2.5 bg-[#2A2A2D] text-[#EBD3F8] placeholder-[#EBD3F8]/50 rounded-xl border border-[#2A2A2D] focus:border-[#EBD3F8] focus:ring-1 focus:ring-[#EBD3F8] transition-colors outline-none"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-[#EBD3F8]/70 hover:text-[#EBD3F8] transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#EBD3F8] to-[#B392AC] text-[#1A1A1D] py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-[#EBD3F8]/20 transition-all duration-300 normal-case text-base"
          >
            Log in
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <button
              type="button"
              className="text-[#EBD3F8]/70 hover:text-[#EBD3F8] text-sm transition-colors"
              onClick={onSwitchToSignup}
            >
              Don't have an account? <span className="font-medium text-[#EBD3F8]">Sign up</span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal; 