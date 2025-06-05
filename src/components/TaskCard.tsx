
import React from 'react';
import { Clock, Star } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: 'home' | 'business' | 'gym' | 'custom';
  time?: string;
  urgency: number; // 1-5 scale
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TaskCard = ({ task, onComplete, onEdit }: TaskCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'home': return 'bg-peach-100 text-peach-700';
      case 'business': return 'bg-sky-100 text-sky-700';
      case 'gym': return 'bg-lavender-100 text-lavender-700';
      default: return 'bg-cream-100 text-cream-700';
    }
  };

  const getUrgencyStars = (urgency: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < urgency ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      className={`glass-card rounded-xl p-4 cozy-shadow transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
        task.completed ? 'opacity-60' : ''
      }`}
      onClick={() => onEdit(task.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-1">
          {getUrgencyStars(task.urgency)}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(task.category)}`}>
            {task.category}
          </span>
          {task.time && (
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{task.time}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete(task.id);
          }}
          className={`w-6 h-6 rounded-full border-2 transition-colors ${
            task.completed
              ? 'bg-green-400 border-green-400'
              : 'border-lavender-300 hover:border-lavender-400'
          }`}
        >
          {task.completed && <span className="text-white text-xs">✓</span>}
        </button>
      </div>
    </div>
  );
};
