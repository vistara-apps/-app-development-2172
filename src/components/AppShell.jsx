import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  CreditCard, 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  Crown,
  TrendingUp
} from 'lucide-react'
import Button from './Button'
import { useApp } from '../context/AppContext'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
  { name: 'Discovery', href: '/discovery', icon: Search },
  { name: 'Watchlist', href: '/watchlist', icon: Bookmark },
]

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, upgradeUser } = useApp()

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-surface shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-bg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-accent" />
              <span className="text-heading2 text-text-primary">StreamSavvy</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-bg hover:text-text-primary'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          {user.subscriptionTier === 'free' && (
            <div className="p-4 border-t border-bg">
              <Button
                variant="primary"
                className="w-full"
                onClick={upgradeUser}
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <div className="flex flex-col h-full bg-surface">
          <div className="flex items-center space-x-2 p-6 border-b border-bg">
            <TrendingUp className="h-8 w-8 text-accent" />
            <span className="text-heading1 text-text-primary">StreamSavvy</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-bg hover:text-text-primary'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          {user.subscriptionTier === 'free' && (
            <div className="p-4 border-t border-bg">
              <Button
                variant="primary"
                className="w-full"
                onClick={upgradeUser}
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-bg border-b border-surface">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="secondary"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-4">
              <span className="text-caption text-text-secondary">
                {user.email}
              </span>
              {user.subscriptionTier === 'premium' && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-accent bg-opacity-20 rounded-md">
                  <Crown className="h-4 w-4 text-accent" />
                  <span className="text-caption text-accent">Premium</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell