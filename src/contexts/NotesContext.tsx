
import React, { createContext, useContext, ReactNode } from 'react';
import { useNotesManager, Note } from '@/hooks/useNotesManager';

interface NotesContextType {
  notes: Note[];
  addNote: (content: string) => Note;
  deleteNote: (id: string) => void;
  clearAllNotes: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const notesManager = useNotesManager();

  return (
    <NotesContext.Provider value={notesManager}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
