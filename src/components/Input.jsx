import React, { forwardRef } from 'react'
import { cn } from '../utils/cn'

/**
 * Input component for text entry
 * 
 * @param {string} className - Additional CSS classes
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} hint - Hint text
 * @param {boolean} disabled - Whether the input is disabled
 * @param {ReactNode} leftIcon - Icon to display at the left side of the input
 * @param {ReactNode} rightIcon - Icon to display at the right side of the input
 */
const Input = forwardRef(({ 
  className, 
  type = 'text', 
  label,
  error,
  hint,
  disabled,
  leftIcon,
  rightIcon,
  id,
  ...props 
}, ref) => {
  // Generate a unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-caption text-text-secondary mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 bg-bg text-text-primary placeholder-text-secondary',
            'border border-border-light rounded-md transition-colors duration-base',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-danger focus:ring-danger',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p 
          id={`${inputId}-error`}
          className="mt-1 text-tiny text-danger"
        >
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p 
          id={`${inputId}-hint`}
          className="mt-1 text-tiny text-text-secondary"
        >
          {hint}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
