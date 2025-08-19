import React from 'react'
import { cn } from '../utils/cn'

/**
 * Card component for displaying content in a contained box
 * 
 * @param {ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover - Whether to apply hover effects
 * @param {boolean} interactive - Whether the card is interactive (clickable)
 */
function Card({ 
  children, 
  className, 
  hover = false,
  interactive = false,
  ...props 
}) {
  return (
    <div
      className={cn(
        'bg-surface rounded-lg shadow-card border border-border-dark overflow-hidden',
        hover && 'transition-all duration-base hover:shadow-hover hover:border-border-light',
        interactive && 'cursor-pointer transition-all duration-base hover:shadow-hover hover:border-border-light hover:translate-y-[-2px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card header component
 */
function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-b border-border-dark',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card content component
 */
function CardContent({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'px-6 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card footer component
 */
function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-border-dark',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card title component
 */
function CardTitle({ children, className, ...props }) {
  return (
    <h3
      className={cn(
        'text-heading2 text-text-primary font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

/**
 * Card description component
 */
function CardDescription({ children, className, ...props }) {
  return (
    <p
      className={cn(
        'text-body text-text-secondary mt-1',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Description = CardDescription

export default Card
