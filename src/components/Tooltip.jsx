import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../utils/cn'

/**
 * Tooltip component for displaying additional information on hover
 * 
 * @param {ReactNode} children - The element that triggers the tooltip
 * @param {string} content - The tooltip content
 * @param {string} position - Tooltip position (top, bottom, left, right)
 * @param {string} className - Additional CSS classes
 * @param {number} delay - Delay before showing the tooltip (ms)
 */
function Tooltip({ 
  children, 
  content, 
  position = 'top', 
  className,
  delay = 300,
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const timerRef = useRef(null)
  
  // Position the tooltip based on the trigger element
  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return
    
    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    
    let x = 0
    let y = 0
    
    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)
        y = triggerRect.top - tooltipRect.height - 8
        break
      case 'bottom':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)
        y = triggerRect.bottom + 8
        break
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2)
        break
      case 'right':
        x = triggerRect.right + 8
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2)
        break
      default:
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)
        y = triggerRect.top - tooltipRect.height - 8
    }
    
    // Ensure tooltip stays within viewport
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8))
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8))
    
    setCoords({ x, y })
  }
  
  // Show tooltip after delay
  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true)
      // Update position after tooltip is visible
      setTimeout(updatePosition, 0)
    }, delay)
  }
  
  // Hide tooltip and clear timer
  const handleMouseLeave = () => {
    clearTimeout(timerRef.current)
    setIsVisible(false)
  }
  
  // Update position when window is resized
  useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition)
      
      return () => {
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition)
      }
    }
  }, [isVisible])
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])
  
  // Position classes
  const positionClasses = {
    top: 'origin-bottom',
    bottom: 'origin-top',
    left: 'origin-right',
    right: 'origin-left',
  }
  
  return (
    <div 
      className="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      ref={triggerRef}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'fixed z-50 px-2 py-1 text-tiny font-medium rounded bg-surface-hover text-text-primary shadow-md',
            'animate-fade-in',
            positionClasses[position],
            className
          )}
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
          }}
          role="tooltip"
          {...props}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Tooltip

