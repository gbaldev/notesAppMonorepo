import {NotesState} from './notesStore';

export const selectAllNotes = (state: NotesState) => state.notes;

export const selectNoteById = (id: string) => (state: NotesState) =>
  state.notes.find(note => note._id === id);

export const selectNotesByPriority =
  (priority: string) => (state: NotesState) =>
    state.notes.filter(note => note.priority === priority);

export const selectUnsyncedNotes = (state: NotesState) =>
  state.notes.filter(note => !note.isSynced);
