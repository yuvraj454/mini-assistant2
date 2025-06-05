
import React, { useState } from 'react';
import { TaskCard } from './TaskCard';

// Mock data - in a real app, this would come from your state management
const mockTasks = [
  {
    id: '1',
    title: 'Morning workout at the gym',
    category: 'gym' as const,
    time: '7:00 AM',
    urgency: 3,
    completed: false,
  },
  {
    id: '2',
    title: 'Review quarterly reports',
    category: 'business' as const,
    time: '10:30 AM',
    urgency: 4,
    completed: false,
  },
  {
    id: '3',
    title: 'Grocery shopping',
    category: 'home' as const,
    time: '2:00 PM',
    urgency: 2,
    completed: true,
  },
  {
    id: '4',
    title: 'Call mom',
    category: 'home' as const,
    time: '6:00 PM',
    urgency: 5,
    completed: false,
  },
];

export const TodaySchedule = () => {
  const [tasks, setTasks] = useState(mockTasks);

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditTask = (id: string) => {
    console.log('Edit task:', id);
    // Here you would navigate to edit task or open a modal
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-slate-800 mb-4">Today's Schedule</h3>
      
      <div className="space-y-3">
        {pendingTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={handleCompleteTask}
            onEdit={handleEditTask}
          />
        ))}
        
        {completedTasks.length > 0 && (
          <>
            <div className="text-sm text-slate-500 mt-6 mb-2 font-medium">Completed</div>
            {completedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
