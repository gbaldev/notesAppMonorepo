import {create} from 'zustand';
import Note from '../models/Note';

export interface NotesState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

export const useNotesStore = create<NotesState>(set => ({
  notes: [],
  setNotes: notes => set({notes}),
}));
