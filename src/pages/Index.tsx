
import React from 'react';
import { Layout } from '@/components/Layout';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { QuickTaskInput } from '@/components/QuickTaskInput';
import { TodaySchedule } from '@/components/TodaySchedule';
import { ProgressTracker } from '@/components/ProgressTracker';
import { QuoteOfTheDay } from '@/components/QuoteOfTheDay';

const Index = () => {
  // Mock data - in a real app, this would come from your state management
  const mockStats = {
    completed: 1,
    total: 4
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <WelcomeHeader />
        <QuoteOfTheDay />
        <QuickTaskInput />
        <ProgressTracker completed={mockStats.completed} total={mockStats.total} />
        <TodaySchedule />
      </div>
    </Layout>
  );
};

export default Index;
