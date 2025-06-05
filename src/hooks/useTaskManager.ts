
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
  isRegular?: boolean;
  completedAt?: string;
}

const mockInitialTasks: Task[] = [];

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(mockInitialTasks);

  useEffect(() => {
    const savedTasks = localStorage.getItem('myminisecretary-tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      // Remove completed tasks older than 1 day
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const filteredTasks = parsedTasks.filter((task: Task) => {
        if (task.completed && task.completedAt) {
          return new Date(task.completedAt) > oneDayAgo;
        }
        return true;
      });
      setTasks(filteredTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myminisecretary-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    
    setTasks(prev => [...prev, task]);
    
    if (task.time && task.reminderTime) {
      scheduleReminder(task);
    }
    
    return task;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, ...updates };
        if (updates.completed && !task.completed) {
          updatedTask.completedAt = new Date().toISOString();
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]);
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
      console.log(`🔔 Reminder: ${task.title}`);
      alert(`🔔 Hey! Don't forget: ${task.title}`);
    }
  };

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Get today's tasks sorted by urgency (highest first)
  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks
      .filter(task => !task.isRegular && (!task.time || task.time.includes(today)))
      .sort((a, b) => b.urgency - a.urgency);
  };

  // Get regular tasks sorted by urgency
  const getRegularTasks = () => {
    return tasks
      .filter(task => task.isRegular)
      .sort((a, b) => b.urgency - a.urgency);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    clearAllTasks,
    scheduleReminder,
    getTodaysTasks,
    getRegularTasks,
  };
};
