
import React, { useState } from 'react';
import { Mic, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTask } from '@/contexts/TaskContext';
import { toast } from '@/hooks/use-toast';

export const QuickTaskInput = () => {
  const [task, setTask] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { addTask } = useTask();

  const handleAddTask = () => {
    if (task.trim()) {
      addTask({
        title: task.trim(),
        category: 'home',
        urgency: 3,
        completed: false,
        isRegular: false,
      });
      
      setTask('');
      toast({
        title: "Task added! ✨",
        description: `"${task.trim()}" has been added to your schedule.`,
      });
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    console.log('Voice input toggled');
  };

  return (
    <div className="glass-card rounded-2xl p-4 cozy-shadow mb-6">
      <h3 className="text-lg font-medium text-amber-800 mb-3">What do you want to get done?</h3>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Type your task here..."
            className="rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50 transition-colors pr-12"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button
            onClick={handleVoiceInput}
            variant="ghost"
            size="sm"
            className={`absolute right-1 top-1 h-8 w-8 rounded-lg ${
              isListening ? 'bg-peach-200 text-peach-700' : 'text-amber-600 hover:bg-amber-100'
            } transition-colors`}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <Button
          onClick={handleAddTask}
          className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 px-4"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
