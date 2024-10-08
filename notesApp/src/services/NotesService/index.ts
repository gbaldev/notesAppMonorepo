import NotesApi from '@services/NotesApi';
import {Note} from '@models';
import NotesProvider from './provider';

class NotesService {
  static getNotes = async (): Promise<Note[]> =>
    NotesProvider.get(NotesApi.getNotes());
  static createNote = async (note: Partial<Note>): Promise<Note> =>
    NotesProvider.post(NotesApi.postNote(), note);
  static updateNote = async (note: Note): Promise<Note> =>
    NotesProvider.put(NotesApi.updateNote(note._id), note);
  static createNotes = async (notes: Partial<Note>[]): Promise<Note[]> =>
    NotesProvider.post(NotesApi.postNote(), notes);
  static updateNotes = async (updates: Partial<Note>[]): Promise<Note[]> =>
    NotesProvider.put(NotesApi.updateNotes(), updates);
  static deleteNote = async (id: string): Promise<Note> =>
    NotesProvider.delete(NotesApi.deleteNote(id));
}

export default NotesService;
