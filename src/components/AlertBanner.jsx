import React from 'react'
import { AlertTriangle, Clock, Info, X, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '../utils/cn'
import Button from './Button'

const variants = {
  renewalWarning: {
    bg: 'bg-danger-muted',
    border: 'border-danger',
    text: 'text-danger',
    icon: AlertTriangle
  },
  info: {
    bg: 'bg-primary bg-opacity-10',
    border: 'border-primary border-opacity-30',
    text: 'text-primary',
    icon: Info
  },
  upcoming: {
    bg: 'bg-warning-muted',
    border: 'border-warning',
    text: 'text-warning',
    icon: Clock
  },
  success: {
    bg: 'bg-success-muted',
    border: 'border-success',
    text: 'text-success',
    icon: CheckCircle
  },
  error: {
    bg: 'bg-danger-muted',
    border: 'border-danger',
    text: 'text-danger',
    icon: AlertCircle
  }
}

/**
 * AlertBanner component for displaying important messages
 * 
 * @param {string} variant - Alert style variant (info, renewalWarning, upcoming, success, error)
 * @param {ReactNode} children - Alert content
 * @param {string} className - Additional CSS classes
 * @param {string} title - Optional alert title
 * @param {boolean} dismissible - Whether the alert can be dismissed
 * @param {function} onDismiss - Callback when alert is dismissed
 */
function AlertBanner({ 
  variant = 'info', 
  children, 
  className,
  title,
  dismissible = false,
  onDismiss,
}) {
  const config = variants[variant]
  const Icon = config.icon

  return (
    <div className={cn(
      'flex items-start space-x-3 p-4 rounded-md border animate-fade-in',
      config.bg,
      config.border,
      className
    )}>
      <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', config.text)} />
      <div className={cn('flex-1', config.text)}>
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        {children}
      </div>
      {dismissible && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 -mr-1 -mt-1 text-text-secondary hover:text-text-primary"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default AlertBanner
