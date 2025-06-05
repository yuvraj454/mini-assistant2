
import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  category: 'home' | 'business' | 'gym' | 'custom';
  time?: string;
  urgency: number;
  completed: boolean;
  location?: string;
  notes?: string;
  reminderTime?: string;
}

const mockInitialTasks: Task[] = [
  {
    id: '1',
    title: 'Morning workout at the gym',
    category: 'gym',
    time: '7:00 AM',
    urgency: 3,
    completed: false,
  },
  {
    id: '2',
    title: 'Review quarterly reports',
    category: 'business',
    time: '10:30 AM',
    urgency: 4,
    completed: false,
  },
  {
    id: '3',
    title: 'Grocery shopping',
    category: 'home',
    time: '2:00 PM',
    urgency: 2,
    completed: true,
  },
  {
    id: '4',
    title: 'Call mom',
    category: 'home',
    time: '6:00 PM',
    urgency: 5,
    completed: false,
  },
];

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(mockInitialTasks);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    
    setTasks(prev => [...prev, task]);
    
    // Schedule reminder if time is set
    if (task.time && task.reminderTime) {
      scheduleReminder(task);
    }
    
    return task;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const scheduleReminder = (task: Task) => {
    if (!task.reminderTime) return;

    const reminderDate = new Date(task.reminderTime);
    const now = new Date();
    const timeUntilReminder = reminderDate.getTime() - now.getTime();

    if (timeUntilReminder > 0) {
      setTimeout(() => {
        showNotification(task);
      }, timeUntilReminder);
    }
  };

  const showNotification = (task: Task) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`📋 Task Reminder`, {
        body: `Hey! Don't forget: ${task.title}`,
        icon: '/favicon.ico',
      });
    } else {
      // Fallback to console and alert for demo
      console.log(`🔔 Reminder: ${task.title}`);
      alert(`🔔 Hey! Don't forget: ${task.title}`);
    }
  };

  // Request notification permission on first load
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    scheduleReminder,
  };
};
