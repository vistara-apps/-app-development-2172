import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  CreditCard, 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  Crown,
  TrendingUp,
  Settings,
  Bell,
  User
} from 'lucide-react'
import { cn } from '../utils/cn'
import Button from './Button'
import MobileNav from './MobileNav'
import { useApp } from '../context/AppContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
  { name: 'Discovery', href: '/discovery', icon: Search },
  { name: 'Watchlist', href: '/watchlist', icon: Bookmark },
  { name: 'Settings', href: '/settings', icon: Settings },
]

/**
 * AppShell component that provides the layout structure for the application
 * 
 * @param {ReactNode} children - The content to display in the main area
 */
function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, upgradeUser, getUpcomingRenewals } = useApp()
  
  const upcomingRenewals = getUpcomingRenewals()
  const hasNotifications = upcomingRenewals.length > 0
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close sidebar when location changes (mobile navigation)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location])

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity lg:hidden" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile sidebar */}
      <div 
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-surface shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border-dark">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-accent" />
            <span className="text-heading2 text-text-primary">StreamSavvy</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex flex-col h-[calc(100%-64px)] overflow-y-auto">
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-3 rounded-md transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                  
                  {/* Notification indicator */}
                  {item.name === 'Dashboard' && hasNotifications && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs text-white">
                      {upcomingRenewals.length}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
          
          {user.subscriptionTier === 'free' && (
            <div className="p-4 mt-auto border-t border-border-dark">
              <div className="bg-surface-hover rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Crown className="h-5 w-5 text-accent mr-2" />
                  <h3 className="text-heading3 text-text-primary">Go Premium</h3>
                </div>
                <p className="text-body-small text-text-secondary mb-3">
                  Unlock advanced features and remove ads with our premium plan.
                </p>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={upgradeUser}
                >
                  Upgrade Now
                </Button>
              </div>
              
              <div className="text-center text-tiny text-text-secondary">
                <p>StreamSavvy v1.0.0</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block lg:z-40">
        <div className="flex flex-col h-full bg-surface border-r border-border-dark">
          <div className="flex items-center space-x-2 p-5 border-b border-border-dark">
            <TrendingUp className="h-7 w-7 text-accent" />
            <span className="text-heading2 text-text-primary font-bold">StreamSavvy</span>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 p-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors',
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                    
                    {/* Notification indicator */}
                    {item.name === 'Dashboard' && hasNotifications && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs text-white">
                        {upcomingRenewals.length}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
            
            {user.subscriptionTier === 'free' && (
              <div className="p-4 mt-auto border-t border-border-dark">
                <div className="bg-surface-hover rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <Crown className="h-5 w-5 text-accent mr-2" />
                    <h3 className="text-heading3 text-text-primary">Go Premium</h3>
                  </div>
                  <p className="text-body-small text-text-secondary mb-3">
                    Unlock advanced features and remove ads with our premium plan.
                  </p>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={upgradeUser}
                  >
                    Upgrade Now
                  </Button>
                </div>
                
                <div className="text-center text-tiny text-text-secondary">
                  <p>StreamSavvy v1.0.0</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header 
          className={cn(
            "sticky top-0 z-30 bg-bg border-b border-border-dark transition-shadow duration-200",
            scrolled && "shadow-md bg-opacity-95 backdrop-blur-sm"
          )}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="lg:hidden flex items-center">
                <TrendingUp className="h-5 w-5 text-accent mr-1.5" />
                <span className="text-heading3 text-text-primary font-bold">StreamSavvy</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              {hasNotifications && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label={`${upcomingRenewals.length} notifications`}
                  onClick={() => {}}
                >
                  <Bell className="h-5 w-5 text-text-secondary" />
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-xs text-white">
                    {upcomingRenewals.length}
                  </span>
                </Button>
              )}
              
              {/* User menu */}
              <div className="flex items-center space-x-3">
                {user.subscriptionTier === 'premium' && (
                  <div className="hidden sm:flex items-center space-x-1 px-2 py-1 bg-accent bg-opacity-20 rounded-md">
                    <Crown className="h-4 w-4 text-accent" />
                    <span className="text-caption text-accent">Premium</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex"
                    aria-label="User profile"
                  >
                    <User className="h-5 w-5 text-text-secondary" />
                  </Button>
                  <span className="hidden sm:block text-caption text-text-secondary">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        
        {/* Mobile navigation */}
        <MobileNav />
      </div>
    </div>
  )
}

export default AppShell
