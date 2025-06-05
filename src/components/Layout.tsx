
import React from 'react';
import { BottomNavigation } from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-lavender-50 to-peach-50">
      <main className="pb-20 px-4 pt-6">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
