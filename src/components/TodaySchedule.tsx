
import React from 'react';
import { TaskCard } from './TaskCard';
import { useTask } from '@/contexts/TaskContext';

export const TodaySchedule = () => {
  const { tasks, updateTask, deleteTask } = useTask();

  const handleCompleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
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
