import Note from '../../models/Note';
import NotesApi from '../NotesApi';
import NotesProvider from './provider';

class NotesService {
  static getNotes = async (): Promise<Note[]> =>
    NotesProvider.get(NotesApi.getNotes());
  static createNote = async (note: Partial<Note>): Promise<Note> =>
    NotesProvider.post(NotesApi.postNote(), note);
  static updateNote = async (note: Note): Promise<Note> =>
    NotesProvider.put(NotesApi.updateNote(note._id), note);
  static deleteNote = async (id: string): Promise<Note> =>
    NotesProvider.delete(NotesApi.deleteNote(id));
}

export default NotesService;
