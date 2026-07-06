'use client';

import { Bell, Menu, User, LogOut, ChevronDown, Home, Trash2, ShoppingCart, Heart, Settings, Recycle } from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface TopBarProps {
  title: string;
  user?: {
    name: string;
    role: string;
    email?: string;
  };
}

const navItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Trash2, label: 'Waste', href: '/waste' },
  { icon: ShoppingCart, label: 'Market', href: '/marketplace' },
  { icon: Heart, label: 'Donate', href: '/donate' },
  { icon: Settings, label: 'Profile', href: '/profile' },
];

export default function TopBar({ title, user }: TopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    router.push('/auth/login');
    setIsDropdownOpen(false);
  };

  return (
    <div className="text-white p-4 shadow-lg sticky top-0 z-50" style={{
      background: 'linear-gradient(135deg, #059669, #10b981)'
    }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button className="p-1 rounded-lg hover:bg-white/20 transition-colors md:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-white" />
            <span className="text-xl font-bold tracking-wide">CiCaWa</span>
          </Link>
          <span className="hidden md:inline-block text-emerald-200">|</span>
          <h1 className="text-xl font-semibold truncate hidden md:inline-block">{title}</h1>
        </div>

        {/* Desktop Navigation */}
        {user && (
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map(({ icon: Icon, label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white font-medium shadow-sm'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-white/20 transition-colors relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white font-medium">
              3
            </div>
          </button>
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2 hover:bg-white/30 transition-colors"
              >
                <div className="bg-white/30 rounded-full p-1">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium">{user.name}</div>
                  {user.email && (
                    <div className="text-xs opacity-75">{user.email}</div>
                  )}
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    {user.email && (
                      <div className="text-sm text-gray-600">{user.email}</div>
                    )}
                    <div className="text-xs text-emerald-600 capitalize mt-1">{user.role}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
              
              {/* Backdrop */}
              {isDropdownOpen && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}
            </div>
          ) : (
            <button className="p-2 rounded-lg hover:bg-white/20 transition-colors">
              <User className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}