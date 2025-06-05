
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Play, Square, FileText, Calendar } from 'lucide-react';

const Journal = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState([
    { id: 1, date: '2024-01-15', summary: 'Great day at work, completed project milestone' },
    { id: 2, date: '2024-01-14', summary: 'Relaxing weekend, went for a nice walk' }
  ]);

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    console.log('Recording toggled:', !isRecording);
  };

  const handleSummarize = () => {
    if (journalText.trim()) {
      const newEntry = {
        id: entries.length + 1,
        date: new Date().toISOString().split('T')[0],
        summary: journalText.slice(0, 50) + '...'
      };
      setEntries([newEntry, ...entries]);
      setJournalText('');
      console.log('Journal entry saved');
    }
  };

  const handlePlayback = (entry: any) => {
    console.log('Playing back entry:', entry.id);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Daily Journal</h1>
          <p className="text-slate-600">Tell me about your day... what went great? 📖</p>
        </div>

        {/* Recording Section */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Today's Entry</h3>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                onClick={handleStartRecording}
                size="lg"
                className={`rounded-full w-20 h-20 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gradient-to-r from-sky-400 to-lavender-400 hover:from-sky-500 hover:to-lavender-500'
                }`}
              >
                {isRecording ? <Square className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
            </div>
            
            {isRecording && (
              <div className="text-center">
                <p className="text-red-500 font-medium animate-pulse">Recording...</p>
                <p className="text-sm text-slate-500">Tell me about your day</p>
              </div>
            )}

            <Textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Or type your thoughts here..."
              className="rounded-xl border-lavender-200 focus:border-lavender-400 min-h-24"
            />

            <div className="flex gap-2">
              <Button
                onClick={handleSummarize}
                className="flex-1 rounded-xl bg-gradient-to-r from-sky-400 to-lavender-400 hover:from-sky-500 hover:to-lavender-500 text-white"
                disabled={!journalText.trim()}
              >
                <FileText className="h-4 w-4 mr-2" />
                Summarize & Save
              </Button>
            </div>
          </div>
        </div>

        {/* Previous Entries */}
        <div className="glass-card rounded-2xl p-6 cozy-shadow">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Previous Entries</h3>
          
          <div className="space-y-3">
            {entries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 rounded-xl bg-white/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500">{entry.date}</span>
                  </div>
                  <p className="text-slate-700">{entry.summary}</p>
                </div>
                <Button
                  onClick={() => handlePlayback(entry)}
                  variant="ghost"
                  size="sm"
                  className="rounded-lg"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Journal;
