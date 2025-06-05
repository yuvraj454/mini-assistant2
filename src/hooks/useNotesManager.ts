
import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export const useNotesManager = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('myminisecretary-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myminisecretary-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (content: string) => {
    const note: Note = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [note, ...prev]);
    return note;
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const clearAllNotes = () => {
    setNotes([]);
  };

  return {
    notes,
    addNote,
    deleteNote,
    clearAllNotes,
  };
};
