import {Note} from '@models';
import {create} from 'zustand';

export interface NotesState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  unscyncedNotesAmount: number;
  setUnscyncedNotesAmount: (amount: number) => void;
}

export const useNotesStore = create<NotesState>(set => ({
  notes: [],
  unscyncedNotesAmount: 0,
  setNotes: notes => set({notes}),
  setUnscyncedNotesAmount: amount => set({unscyncedNotesAmount: amount}),
}));
