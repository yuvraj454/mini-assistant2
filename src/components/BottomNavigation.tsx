
import React from 'react';
import { Home, Plus, Book, Settings, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Plus, label: 'Add Task', path: '/add' },
  { icon: Star, label: 'Vision', path: '/vision' },
  { icon: Book, label: 'Journal', path: '/journal' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 px-4 py-2">
      <nav className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-xl hover:bg-lavender-100/50 transition-all duration-200 group ${
                isActive ? 'bg-lavender-100/50' : ''
              }`}
            >
              <item.icon className={`w-6 h-6 transition-colors ${
                isActive ? 'text-lavender-700' : 'text-lavender-600 group-hover:text-lavender-700'
              }`} />
              <span className={`text-xs mt-1 font-medium transition-colors ${
                isActive ? 'text-lavender-700' : 'text-lavender-600'
              }`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
