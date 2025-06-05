
import React from 'react';

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

export const ProgressTracker = ({ completed, total }: ProgressTrackerProps) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-card rounded-2xl p-6 cozy-shadow text-center">
      <h3 className="text-lg font-medium text-slate-800 mb-4">Today's Progress</h3>
      
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-lavender-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-sky-400 transition-all duration-500 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{completed}</div>
            <div className="text-xs text-slate-500">of {total}</div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-600 mt-4">
        {completed === total && total > 0 
          ? "Amazing! You've completed everything! 🎉" 
          : `${total - completed} tasks remaining. You've got this! 💪`
        }
      </p>
    </div>
  );
};
