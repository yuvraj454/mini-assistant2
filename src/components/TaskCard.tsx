
import React from 'react';
import { Clock, Star } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: 'home' | 'business' | 'gym' | 'custom';
  time?: string;
  urgency: number;
  completed: boolean;
  isRegular?: boolean;
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TaskCard = ({ task, onComplete, onEdit }: TaskCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'home': return 'bg-cream-100 text-amber-700';
      case 'business': return 'bg-amber-100 text-amber-800';
      case 'gym': return 'bg-orange-100 text-orange-700';
      default: return 'bg-cream-100 text-amber-700';
    }
  };

  const getUrgencyStars = (urgency: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < urgency ? 'text-amber-400 fill-current' : 'text-amber-300'
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
        <h4 className={`font-medium ${task.completed ? 'line-through text-amber-500' : 'text-amber-800'}`}>
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
          {task.isRegular && (
            <span className="px-2 py-1 bg-amber-200 text-amber-800 rounded-lg text-xs font-medium">
              Regular
            </span>
          )}
          {task.time && !task.isRegular && (
            <div className="flex items-center gap-1 text-amber-500">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{new Date(task.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
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
              : 'border-amber-300 hover:border-amber-400'
          }`}
        >
          {task.completed && <span className="text-white text-xs">✓</span>}
        </button>
      </div>
    </div>
  );
};
