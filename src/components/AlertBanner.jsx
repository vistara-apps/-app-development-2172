import React from 'react'
import { AlertTriangle, Clock, Info } from 'lucide-react'
import { clsx } from 'clsx'

const variants = {
  renewalWarning: {
    bg: 'bg-red-900 bg-opacity-20',
    border: 'border-red-600',
    text: 'text-red-300',
    icon: AlertTriangle
  },
  info: {
    bg: 'bg-blue-900 bg-opacity-20',
    border: 'border-blue-600',
    text: 'text-blue-300',
    icon: Info
  },
  upcoming: {
    bg: 'bg-yellow-900 bg-opacity-20',
    border: 'border-yellow-600',
    text: 'text-yellow-300',
    icon: Clock
  }
}

function AlertBanner({ variant = 'info', children, className }) {
  const config = variants[variant]
  const Icon = config.icon

  return (
    <div className={clsx(
      'flex items-start space-x-3 p-4 rounded-md border',
      config.bg,
      config.border,
      className
    )}>
      <Icon className={clsx('h-5 w-5 mt-0.5', config.text)} />
      <div className={clsx('flex-1', config.text)}>
        {children}
      </div>
    </div>
  )
}

export default AlertBanner