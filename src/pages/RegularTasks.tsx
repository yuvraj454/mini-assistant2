
import React from 'react';
import { Layout } from '@/components/Layout';
import { TaskCard } from '@/components/TaskCard';
import { useTask } from '@/contexts/TaskContext';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RegularTasks = () => {
  const { getRegularTasks, updateTask } = useTask();
  const regularTasks = getRegularTasks();

  const handleCompleteTask = (id: string) => {
    const task = regularTasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const handleEditTask = (id: string) => {
    console.log('Edit regular task:', id);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-amber-800 mb-2">Regular Tasks</h1>
          <p className="text-amber-600">Tasks you do regularly - habits and routines 🔄</p>
        </div>

        <Link to="/add?type=regular">
          <Button className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Regular Task
          </Button>
        </Link>

        <div className="space-y-3">
          {regularTasks.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 cozy-shadow text-center">
              <p className="text-amber-600 mb-4">No regular tasks yet! 🌱</p>
              <p className="text-sm text-amber-500">Add habits and routines that you do regularly.</p>
            </div>
          ) : (
            regularTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RegularTasks;
