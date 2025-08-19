import React from 'react'
import { clsx } from 'clsx'

function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={clsx(
        'w-full px-3 py-2 bg-bg text-text-primary placeholder-text-secondary',
        'border border-gray-600 rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
}

export default Input