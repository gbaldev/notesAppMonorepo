import {Note} from '@models';
import {create} from 'zustand';

export interface NotesState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

export const useNotesStore = create<NotesState>(set => ({
  notes: [],
  setNotes: notes => set({notes}),
}));
