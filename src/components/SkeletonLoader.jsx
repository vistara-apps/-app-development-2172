import React from 'react'
import { cn } from '../utils/cn'

/**
 * SkeletonLoader component for displaying loading states
 * 
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Skeleton variant (text, card, avatar, etc.)
 * @param {number} width - Width of the skeleton (for text variant)
 * @param {number} height - Height of the skeleton (for custom variants)
 * @param {boolean} animate - Whether to animate the skeleton
 */
function SkeletonLoader({ 
  className, 
  variant = 'text',
  width,
  height,
  animate = true,
  ...props 
}) {
  // Base skeleton styles
  const baseStyles = cn(
    'bg-surface-hover rounded overflow-hidden relative',
    animate && 'after:absolute after:inset-0 after:animate-pulse after:bg-gradient-to-r after:from-transparent after:via-bg/10 after:to-transparent',
    className
  )
  
  // Variant-specific styles
  const variantStyles = {
    text: 'h-4 w-full',
    heading: 'h-7 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 rounded-md',
    card: 'h-32 w-full rounded-md',
    image: 'aspect-video w-full rounded-md',
    circle: 'rounded-full',
    rect: 'rounded-md',
  }
  
  // Custom dimensions
  const customStyles = {}
  if (width) customStyles.width = typeof width === 'number' ? `${width}px` : width
  if (height) customStyles.height = typeof height === 'number' ? `${height}px` : height
  
  return (
    <div 
      className={cn(baseStyles, variantStyles[variant])}
      style={customStyles}
      {...props}
    />
  )
}

/**
 * SkeletonGroup component for displaying multiple skeleton loaders
 * 
 * @param {number} count - Number of skeleton loaders to display
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Skeleton variant (text, card, avatar, etc.)
 * @param {string} gap - Gap between skeleton loaders
 */
function SkeletonGroup({ count = 3, className, variant = 'text', gap = 'gap-4', ...props }) {
  return (
    <div className={cn('flex flex-col', gap, className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonLoader key={index} variant={variant} {...props} />
      ))}
    </div>
  )
}

SkeletonLoader.Group = SkeletonGroup

export default SkeletonLoader

