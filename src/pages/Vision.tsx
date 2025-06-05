
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Star, Target, Calendar, Edit } from 'lucide-react';

const Vision = () => {
  const goals = [
    { id: 1, title: 'Launch new project', category: 'business' },
    { id: 2, title: 'Run 5K consistently', category: 'gym' },
    { id: 3, title: 'Learn a new skill', category: 'home' }
  ];

  const majorTasks = [
    { id: 1, title: 'Complete quarterly review', urgency: 5 },
    { id: 2, title: 'Organize home office', urgency: 3 },
    { id: 3, title: 'Plan weekend trip', urgency: 2 }
  ];

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Vision Board</h1>
          <p className="text-slate-600">Your goals and dreams, visualized! 🌟</p>
        </div>

        {/* Background with overlay */}
        <div className="relative h-48 rounded-2xl overflow-hidden warm-gradient">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-200/50 to-lavender-200/50"></div>
          <div className="relative p-6 h-full flex items-center justify-center">
            <div className="text-center text-slate-800">
              <h2 className="text-xl font-semibold mb-2">Dream Big, Act Daily</h2>
              <p className="text-sm opacity-80">Every small step counts towards your vision</p>
            </div>
          </div>
        </div>

        {/* Top 3 Goals */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
              <Target className="h-5 w-5 text-sky-500" />
              Top 3 Goals This Week
            </h3>
            <Button variant="ghost" size="sm" className="rounded-lg">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-slate-700 font-medium">{goal.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Major Tasks */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-slate-800">Current Major Tasks</h3>
            <Button variant="ghost" size="sm" className="rounded-lg">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {majorTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-white/50">
                <span className="text-slate-700">{task.title}</span>
                <div className="flex">
                  {Array.from({ length: task.urgency }, (_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Preview */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-lavender-500" />
            <h3 className="text-lg font-medium text-slate-800">This Week's Focus</h3>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-xs font-medium text-slate-500 p-2">{day}</div>
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className={`p-2 rounded-lg text-sm ${
                i === 3 ? 'bg-sky-200 text-sky-800 font-medium' : 'text-slate-600'
              }`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Vision;
