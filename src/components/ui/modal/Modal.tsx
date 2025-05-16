'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  description?: string;
  hideCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full mx-4',
};

export function Modal({ 
  open, 
  onClose, 
  children, 
  title, 
  description,
  hideCloseButton = false,
  size = 'md' 
}: ModalProps) {
  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/25 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div 
        className={cn(
          "bg-white rounded-lg shadow-lg w-full",
          "transform animate-in fade-in-0 zoom-in-95 duration-200",
          "border border-gray-200",
          sizeClasses[size]
        )}
      >
        {/* Modal Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Close modal"
              >
                <X size={18} className="text-gray-500" />
              </button>
            )}
          </div>
        )}
        
        {/* Modal Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
