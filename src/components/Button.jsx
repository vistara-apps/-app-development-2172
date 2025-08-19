import React from 'react'
import { clsx } from 'clsx'
import { cn } from '../utils/cn'

const variants = {
  primary: 'bg-primary text-white hover:bg-blue-600 active:bg-blue-700 border border-transparent',
  secondary: 'bg-surface text-text-primary hover:bg-surface-hover active:bg-opacity-100 border border-border-light',
  outline: 'bg-transparent text-text-primary hover:bg-surface-hover border border-border-light',
  ghost: 'bg-transparent text-text-primary hover:bg-surface-hover border border-transparent',
  destructive: 'bg-danger text-white hover:bg-red-700 active:bg-red-800 border border-transparent',
  success: 'bg-success text-white hover:bg-green-600 active:bg-green-700 border border-transparent',
  link: 'bg-transparent text-primary hover:text-accent underline-offset-4 hover:underline p-0 h-auto border-none',
}

const sizes = {
  xs: 'px-2 py-1 text-xs rounded',
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-md',
  icon: 'p-2 rounded-full',
}

/**
 * Button component with various styles and sizes
 * 
 * @param {ReactNode} children - Button content
 * @param {string} variant - Button style variant (primary, secondary, outline, ghost, destructive, success, link)
 * @param {string} size - Button size (xs, sm, md, lg, icon)
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether the button is disabled
 * @param {boolean} isLoading - Whether the button is in loading state
 * @param {ReactNode} leftIcon - Icon to display before the button text
 * @param {ReactNode} rightIcon - Icon to display after the button text
 * @param {function} onClick - Click handler
 */
function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled,
  isLoading,
  leftIcon,
  rightIcon,
  ...props 
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-base',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        isLoading && 'opacity-80 cursor-wait',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {leftIcon && !isLoading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      {children}
      
      {rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  )
}

export default Button
