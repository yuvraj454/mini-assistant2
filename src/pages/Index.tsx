
import React from 'react';
import { Layout } from '@/components/Layout';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { QuickTaskInput } from '@/components/QuickTaskInput';
import { TodaySchedule } from '@/components/TodaySchedule';
import { ProgressTracker } from '@/components/ProgressTracker';
import { QuoteOfTheDay } from '@/components/QuoteOfTheDay';

const Index = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <WelcomeHeader />
        <QuoteOfTheDay />
        <QuickTaskInput />
        <ProgressTracker />
        <TodaySchedule />
      </div>
    </Layout>
  );
};

export default Index;
