
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Mic, Calendar, MapPin, Save, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState([3]);
  const [addToVision, setAddToVision] = useState(false);

  const handleSaveTask = () => {
    console.log('Saving task:', { task, location, time, notes, category, urgency: urgency[0], addToVision });
    // Here you would integrate with your task management system
    navigate('/');
  };

  const handleSaveAndAddAnother = () => {
    console.log('Saving task and adding another:', { task, location, time, notes, category, urgency: urgency[0], addToVision });
    // Reset form
    setTask('');
    setLocation('');
    setTime('');
    setNotes('');
    setCategory('');
    setUrgency([3]);
    setAddToVision(false);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Add New Task</h1>
          <p className="text-slate-600">Let's add something awesome to your day! ✨</p>
        </div>

        <div className="glass-card rounded-2xl p-6 cozy-shadow space-y-6">
          <div className="space-y-2">
            <Label htmlFor="task">What do you want to do?</Label>
            <div className="flex gap-2">
              <Input
                id="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Type your task here..."
                className="rounded-xl border-lavender-200 focus:border-lavender-400"
              />
              <Button variant="outline" size="icon" className="rounded-xl border-lavender-200">
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
                className="rounded-xl border-lavender-200 focus:border-lavender-400"
              />
              <Button variant="outline" size="icon" className="rounded-xl border-lavender-200">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">When?</Label>
            <div className="flex gap-2">
              <Input
                id="time"
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-xl border-lavender-200 focus:border-lavender-400"
              />
              <Button variant="outline" size="icon" className="rounded-xl border-lavender-200">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">How? (Optional notes)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes or details..."
              className="rounded-xl border-lavender-200 focus:border-lavender-400"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-xl border-lavender-200">
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
            className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-lavender-400 hover:from-sky-500 hover:to-lavender-500 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save & Return to Home
          </Button>
          
          <Button
            onClick={handleSaveAndAddAnother}
            variant="outline"
            className="w-full rounded-xl border-lavender-200 text-lavender-700 hover:bg-lavender-50"
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
