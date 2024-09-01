import {Note} from 'models';
import {Database} from './';

export const LOCAL_ID = 'LocalId';

export const isNewNote = (note: Note) => note._id.includes(LOCAL_ID);

export const isModifiedNote = (note: Note) => !note._id.includes(LOCAL_ID);

export const prepareNotesToCreation = (note: Note) => ({
  ...note,
  _id: undefined,
});

export const removeNotes = async (notes: Note[]) => {
  for (const note of notes) {
    await Database.removeNote(note);
  }
};

export const noteShouldBeUpdated = (note: Note, fetchedNotes: Note[]) => {
  const serverSidNote = fetchedNotes.find(_note => _note._id === note._id);

  return (
    serverSidNote && new Date(serverSidNote.editedAt) > new Date(note.editedAt)
  );
};

export const doesntExistsLocally = (note: Note, storedNotesIDs: String[]) =>
  !storedNotesIDs.includes(note._id);

export type Priorities = 'High' | 'Medium' | 'Low';
export const priorities: Priorities[] = ['High', 'Medium', 'Low'];
export const prioritiesColors = ['#ECCDD2', '#8BEAF4', '#E5E6E1'];
