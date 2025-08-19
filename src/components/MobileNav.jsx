import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  CreditCard, 
  Search, 
  Bookmark, 
  Settings,
  Crown
} from 'lucide-react'
import { cn } from '../utils/cn'
import { useApp } from '../context/AppContext'

/**
 * Mobile navigation component that appears at the bottom of the screen on small devices
 */
function MobileNav() {
  const location = useLocation()
  const { user } = useApp()
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
    { name: 'Discovery', href: '/discovery', icon: Search },
    { name: 'Watchlist', href: '/watchlist', icon: Bookmark },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border-dark">
      <div className="flex items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex flex-col items-center py-3 px-2 transition-colors',
                isActive 
                  ? 'text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-tiny">{item.name}</span>
              
              {/* Premium indicator */}
              {item.name === 'Settings' && user.subscriptionTier === 'premium' && (
                <span className="absolute top-2 right-1">
                  <Crown className="h-3 w-3 text-accent" />
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MobileNav

