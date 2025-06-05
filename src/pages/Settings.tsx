
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Volume2, User, Bell, Palette, Download, Trash2 } from 'lucide-react';

const Settings = () => {
  const [voiceTone, setVoiceTone] = useState('female-friendly');
  const [reminderVolume, setReminderVolume] = useState([75]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoJournal, setAutoJournal] = useState(false);
  const [userName, setUserName] = useState('Buddy');

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const handleClearData = () => {
    console.log('Clearing data...');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Settings</h1>
          <p className="text-slate-600">Customize your MyMiniSecretary experience! ⚙️</p>
        </div>

        {/* User Profile */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-lavender-500" />
            <h3 className="text-lg font-medium text-slate-800">Profile</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Your Name</Label>
            <Input
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded-xl border-lavender-200 focus:border-lavender-400"
            />
          </div>
        </div>

        {/* Voice Settings */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="h-5 w-5 text-sky-500" />
            <h3 className="text-lg font-medium text-slate-800">Voice & Audio</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Voice Tone</Label>
              <Select value={voiceTone} onValueChange={setVoiceTone}>
                <SelectTrigger className="rounded-xl border-lavender-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female-friendly">Female - Friendly</SelectItem>
                  <SelectItem value="female-professional">Female - Professional</SelectItem>
                  <SelectItem value="male-friendly">Male - Friendly</SelectItem>
                  <SelectItem value="male-professional">Male - Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Reminder Volume: {reminderVolume[0]}%</Label>
              <Slider
                value={reminderVolume}
                onValueChange={setReminderVolume}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-peach-500" />
            <h3 className="text-lg font-medium text-slate-800">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Reminders</Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-journal">Auto-Start Journal at 8 PM</Label>
              <Switch
                id="auto-journal"
                checked={autoJournal}
                onCheckedChange={setAutoJournal}
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5 text-lavender-500" />
            <h3 className="text-lg font-medium text-slate-800">Custom Categories</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Add new category..."
                className="rounded-xl border-lavender-200 focus:border-lavender-400"
              />
              <Button variant="outline" className="rounded-xl">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Home', 'Business', 'Gym', 'Health'].map((category) => (
                <span key={category} className="px-3 py-1 bg-lavender-100 text-lavender-700 rounded-lg text-sm">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Data Management</h3>
          
          <div className="space-y-3">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="w-full rounded-xl border-lavender-200 text-lavender-700 hover:bg-lavender-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export My Data
            </Button>
            
            <Button
              onClick={handleClearData}
              variant="outline"
              className="w-full rounded-xl border-red-200 text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
