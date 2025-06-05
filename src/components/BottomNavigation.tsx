
import React from 'react';
import { Home, Plus, Book, Settings, Star } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Plus, label: 'Add Task', path: '/add' },
  { icon: Star, label: 'Vision', path: '/vision' },
  { icon: Book, label: 'Journal', path: '/journal' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 px-4 py-2">
      <nav className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center py-2 px-3 rounded-xl hover:bg-lavender-100/50 transition-all duration-200 group"
          >
            <item.icon className="w-6 h-6 text-lavender-600 group-hover:text-lavender-700 transition-colors" />
            <span className="text-xs text-lavender-600 mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
