import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '../utils/cn'
import Button from './Button'

/**
 * Modal component for displaying content in a dialog
 * 
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Function to call when the modal is closed
 * @param {string} title - Modal title
 * @param {ReactNode} children - Modal content
 * @param {string} className - Additional CSS classes for the modal container
 * @param {string} size - Modal size (sm, md, lg, xl, full)
 * @param {boolean} closeOnOutsideClick - Whether to close the modal when clicking outside
 * @param {boolean} showCloseButton - Whether to show the close button
 */
function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  className,
  size = 'md',
  closeOnOutsideClick = true,
  showCloseButton = true,
}) {
  const modalRef = useRef(null);
  
  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  // Handle outside click
  const handleBackdropClick = (e) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4 sm:mx-8',
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className={cn(
          'relative bg-surface rounded-lg shadow-xl w-full mx-4 my-8 max-h-[90vh] overflow-hidden animate-fade-in',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-dark">
          <h2 id="modal-title" className="text-heading2 text-text-primary">{title}</h2>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
