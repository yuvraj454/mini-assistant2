
import React from 'react';
import { useTask } from '@/contexts/TaskContext';

export const ProgressTracker = () => {
  const { getTodaysTasks } = useTask();
  const todaysTasks = getTodaysTasks();
  
  const completed = todaysTasks.filter(task => task.completed).length;
  const total = todaysTasks.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="glass-card rounded-2xl p-4 cozy-shadow mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-amber-800">Today's Progress</h3>
        <span className="text-sm text-amber-600">{completed}/{total} done</span>
      </div>
      
      <div className="relative w-full h-3 bg-cream-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="text-center mt-2">
        <span className="text-sm font-medium text-amber-700">{percentage}% Complete</span>
        {percentage === 100 && total > 0 && (
          <p className="text-xs text-green-600 mt-1">🎉 Amazing! You've completed all today's tasks!</p>
        )}
      </div>
    </div>
  );
};
