
import React, { useState } from 'react';
import { Mic, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNotes } from '@/contexts/NotesContext';
import { toast } from '@/hooks/use-toast';

export const NotePad = () => {
  const [note, setNote] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { notes, addNote, deleteNote } = useNotes();

  const handleAddNote = () => {
    if (note.trim()) {
      addNote(note.trim());
      setNote('');
      toast({
        title: "Note added! 📝",
        description: "Your note has been saved.",
      });
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    console.log('Voice input for notes toggled');
  };

  return (
    <div className="glass-card rounded-2xl p-4 cozy-shadow mb-6">
      <h3 className="text-lg font-medium text-amber-800 mb-3">Daily Notes 📝</h3>
      
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Jot down anything..."
            className="rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
            onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
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
          onClick={handleAddNote}
          className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 px-4"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {notes.length > 0 && (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {notes.slice(0, 3).map(note => (
            <div key={note.id} className="flex items-center justify-between bg-cream-100 rounded-lg p-2">
              <span className="text-sm text-amber-800 flex-1 truncate">{note.content}</span>
              <Button
                onClick={() => deleteNote(note.id)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 text-amber-600 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {notes.length > 3 && (
            <p className="text-xs text-amber-600 text-center">+{notes.length - 3} more notes</p>
          )}
        </div>
      )}
    </div>
  );
};
