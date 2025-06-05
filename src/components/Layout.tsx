
import React from 'react';
import { BottomNavigation } from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-amber-50 to-orange-50">
      <main className="pb-20 px-4 pt-6">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
