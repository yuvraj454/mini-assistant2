
import React from 'react';
import { Home, Plus, Book, Settings, Star, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Plus, label: 'Add Task', path: '/add' },
  { icon: Calendar, label: 'Regular', path: '/regular' },
  { icon: Star, label: 'Vision', path: '/vision' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-cream-50/90 backdrop-blur-lg border-t border-amber-200/50 px-4 py-2">
      <nav className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-xl hover:bg-amber-100/50 transition-all duration-200 group ${
                isActive ? 'bg-amber-100/50' : ''
              }`}
            >
              <item.icon className={`w-6 h-6 transition-colors ${
                isActive ? 'text-amber-700' : 'text-amber-600 group-hover:text-amber-700'
              }`} />
              <span className={`text-xs mt-1 font-medium transition-colors ${
                isActive ? 'text-amber-700' : 'text-amber-600'
              }`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
