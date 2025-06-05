
import React from 'react';
import { TaskCard } from './TaskCard';
import { useTask } from '@/contexts/TaskContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const TodaySchedule = () => {
  const { getTodaysTasks, updateTask, deleteTask } = useTask();
  const todaysTasks = getTodaysTasks();

  const handleCompleteTask = (id: string) => {
    const task = todaysTasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const handleEditTask = (id: string) => {
    console.log('Edit task:', id);
  };

  const pendingTasks = todaysTasks.filter(task => !task.completed);
  const completedTasks = todaysTasks.filter(task => task.completed);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-amber-800">Today's Tasks</h3>
        <Link to="/add">
          <Button size="sm" className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white">
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </Link>
      </div>
      
      <div className="space-y-3">
        {pendingTasks.length === 0 && completedTasks.length === 0 ? (
          <div className="glass-card rounded-2xl p-6 cozy-shadow text-center">
            <p className="text-amber-600 mb-2">No tasks for today! 🌞</p>
            <p className="text-sm text-amber-500">Add some tasks to get started.</p>
          </div>
        ) : (
          <>
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
                <div className="text-sm text-amber-500 mt-6 mb-2 font-medium">Completed Today</div>
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
          </>
        )}
      </div>
    </div>
  );
};
