
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Mic, Calendar, MapPin, Save, Plus, Bell, Clock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTask } from '@/contexts/TaskContext';
import { toast } from '@/hooks/use-toast';

const AddTask = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskType = searchParams.get('type');
  const { addTask } = useTask();
  
  const [task, setTask] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState([3]);
  const [addToVision, setAddToVision] = useState(false);
  const [reminderTime, setReminderTime] = useState('');
  const [isRegular, setIsRegular] = useState(taskType === 'regular');

  useEffect(() => {
    setIsRegular(taskType === 'regular');
  }, [taskType]);

  const handleSaveTask = () => {
    if (!task.trim()) {
      toast({
        title: "Oops! 📝",
        description: "Please enter a task title first.",
        variant: "destructive",
      });
      return;
    }

    const newTask = addTask({
      title: task.trim(),
      location: location || undefined,
      time: time || undefined,
      notes: notes || undefined,
      category: (category as 'home' | 'business' | 'gym' | 'custom') || 'home',
      urgency: urgency[0],
      completed: false,
      reminderTime: reminderTime || undefined,
      isRegular,
    });

    toast({
      title: isRegular ? "Regular task created! 🔄" : "Task created! 🎉",
      description: `"${task.trim()}" has been added to your ${isRegular ? 'regular tasks' : 'schedule'}.`,
    });

    console.log('Saving task:', newTask);
    navigate('/');
  };

  const handleSaveAndAddAnother = () => {
    if (!task.trim()) {
      toast({
        title: "Oops! 📝",
        description: "Please enter a task title first.",
        variant: "destructive",
      });
      return;
    }

    const newTask = addTask({
      title: task.trim(),
      location: location || undefined,
      time: time || undefined,
      notes: notes || undefined,
      category: (category as 'home' | 'business' | 'gym' | 'custom') || 'home',
      urgency: urgency[0],
      completed: false,
      reminderTime: reminderTime || undefined,
      isRegular,
    });

    toast({
      title: "Task saved! ✨",
      description: "Ready for another one?",
    });

    console.log('Saving task and adding another:', newTask);
    
    // Reset form
    setTask('');
    setLocation('');
    setTime('');
    setNotes('');
    setCategory('');
    setUrgency([3]);
    setAddToVision(false);
    setReminderTime('');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-amber-800 mb-2">
            {isRegular ? 'Add Regular Task' : 'Add New Task'}
          </h1>
          <p className="text-amber-600">
            {isRegular 
              ? "Create a task you do regularly - habits and routines! 🔄" 
              : "Let's add something awesome to your day! ✨"
            }
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 cozy-shadow space-y-6">
          <div className="flex items-center justify-between">
            <Label>Task Type</Label>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <Switch
                checked={isRegular}
                onCheckedChange={setIsRegular}
              />
              <span className="text-sm text-amber-600">Regular Task</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task">What do you want to do?</Label>
            <div className="flex gap-2">
              <Input
                id="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder={isRegular ? "Type your regular task..." : "Type your task here..."}
                className="rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
              />
              <Button variant="outline" size="icon" className="rounded-xl border-amber-200">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Where? (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location..."
                className="rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
              />
              <Button variant="outline" size="icon" className="rounded-xl border-amber-200">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isRegular && (
            <div className="space-y-2">
              <Label htmlFor="time">When?</Label>
              <div className="flex gap-2">
                <Input
                  id="time"
                  type="datetime-local"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
                />
                <Button variant="outline" size="icon" className="rounded-xl border-amber-200">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {!isRegular && (
            <div className="space-y-2">
              <Label htmlFor="reminder">Remind me when? (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="reminder"
                  type="datetime-local"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
                />
                <Button variant="outline" size="icon" className="rounded-xl border-amber-200">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">How? (Optional notes)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes or details..."
              className="rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-xl border-amber-200 bg-cream-50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="gym">Gym</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Urgency: {urgency[0] === 1 ? 'Can wait' : urgency[0] === 5 ? 'Urgent' : 'Normal'}</Label>
            <Slider
              value={urgency}
              onValueChange={setUrgency}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="vision">Add to Vision Board?</Label>
            <Switch
              id="vision"
              checked={addToVision}
              onCheckedChange={setAddToVision}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleSaveTask}
            className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save & Return to Home
          </Button>
          
          <Button
            onClick={handleSaveAndAddAnother}
            variant="outline"
            className="w-full rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Save & Add Another
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AddTask;
