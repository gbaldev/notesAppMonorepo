import {NativeModules, Platform} from 'react-native';
import Note from '../models/Note';
const {DatabaseBridge, DatabaseModule} = NativeModules;

const NativeDB = Platform.OS === 'ios' ? DatabaseBridge : DatabaseModule;

export default class NoteDatabase {
  static createNote(note: Note) {
    return NativeDB.createNote(note);
  }

  static updateNote(note: Note) {
    return NativeDB.updateNote(note);
  }

  static deleteNote(id: string) {
    return NativeDB.deleteNote(id);
  }

  static getNotes() {
    return NativeDB.getNotes();
  }

  static getUnsyncedNotes() {
    return NativeDB.getUnsyncedNotes();
  }

  static createNotes(notes: Note[]) {
    return NativeDB.createNotes(notes);
  }
}
