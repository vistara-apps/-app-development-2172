import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Play, TrendingUp, List, Settings } from "lucide-react";
import { Button } from "../ui/Button";

const navigation = [
  { name: 'Dashboard', href: '/', icon: TrendingUp },
  { name: 'Discover', href: '/discover', icon: Play },
  { name: 'Watchlist', href: '/watchlist', icon: List },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-full max-w-xs flex-col bg-surface">
          <div className="flex h-16 items-center justify-between px-6">
            <h1 className="text-heading2 text-accent">StreamSavvy</h1>
            <Button variant="secondary" onClick={() => setSidebarOpen(false)} className="p-2">
              <X size={20} />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-surface border-r border-text-secondary/20">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-heading2 text-accent">StreamSavvy</h1>
          </div>
          <nav className="flex-1 px-4 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="flex h-16 items-center justify-between bg-surface border-b border-text-secondary/20 px-4 lg:px-6">
          <Button 
            variant="secondary" 
            onClick={() => setSidebarOpen(true)} 
            className="lg:hidden p-2"
          >
            <Menu size={20} />
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">Free Plan</span>
            <Button variant="primary" className="text-sm">
              Upgrade to Pro
            </Button>
          </div>
        </div>
        
        <main className="p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}