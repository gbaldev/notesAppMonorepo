import {NativeModules} from 'react-native';
import Note from './src/models/Note';

type DatabaseType = {
  createNote(noteData: Note): Promise<void>;
  updateNote(noteData: Note): Promise<void>;
  deleteNote(note: Note): Promise<void>;
  removeNote(note: Note): Promise<void>;
  getNotes(): Promise<Note[]>;
  getUnsyncedNotes(): Promise<Note[]>;
  createNotes(notesData: Note[]): Promise<void>;
  updateNotes(notesData: Note[]): Promise<void>;
};

// check here for platform
export default NativeModules.Database as DatabaseType;
