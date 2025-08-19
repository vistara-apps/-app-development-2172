import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../utils/cn'

/**
 * Collapsible component for showing/hiding content
 * 
 * @param {ReactNode} children - The content to be collapsed/expanded
 * @param {ReactNode} trigger - The element that triggers the collapse/expand
 * @param {string} title - The title of the collapsible section
 * @param {boolean} defaultOpen - Whether the collapsible is open by default
 * @param {string} className - Additional CSS classes
 * @param {boolean} showIcon - Whether to show the expand/collapse icon
 */
function Collapsible({ 
  children, 
  trigger, 
  title,
  defaultOpen = false, 
  className,
  showIcon = true,
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [height, setHeight] = useState(defaultOpen ? 'auto' : 0)
  const contentRef = useRef(null)
  
  // Update height when content changes or when open state changes
  useEffect(() => {
    if (!contentRef.current) return
    
    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight
      setHeight(contentHeight)
      
      // Set to auto after transition to allow for content changes
      const timer = setTimeout(() => {
        setHeight('auto')
      }, 300)
      
      return () => clearTimeout(timer)
    } else {
      // Set to fixed height before closing for smooth animation
      setHeight(contentRef.current.scrollHeight)
      
      // Trigger reflow
      contentRef.current.offsetHeight
      
      // Set to 0 to animate closing
      setHeight(0)
    }
  }, [isOpen])
  
  // Toggle open state
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <div className={cn('overflow-hidden', className)} {...props}>
      {/* Trigger */}
      {trigger ? (
        <div onClick={toggle} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <div 
          onClick={toggle}
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface-hover rounded-md transition-colors"
        >
          <h3 className="text-heading3 text-text-primary">{title}</h3>
          {showIcon && (
            isOpen ? (
              <ChevronUp className="h-5 w-5 text-text-secondary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-text-secondary" />
            )
          )}
        </div>
      )}
      
      {/* Content */}
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ height }}
        aria-hidden={!isOpen}
      >
        <div className="py-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Collapsible

