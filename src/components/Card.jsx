import React from 'react'
import { clsx } from 'clsx'

function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'bg-surface rounded-lg shadow-card border border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-b border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardContent({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'px-6 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-t border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter

export default Card