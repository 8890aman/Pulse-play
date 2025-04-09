import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[2001] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-md transform rounded-2xl bg-[#1A1A1D] p-6 text-left shadow-xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-[#EBD3F8]/60 hover:text-[#EBD3F8] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            {title && (
              <h2 className="text-xl font-semibold text-[#EBD3F8] mb-6">
                {title}
              </h2>
            )}

            {/* Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 