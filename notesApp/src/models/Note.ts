import NoteStatus from './NoteStatus';

interface Note {
  title: string;
  content: string;
  createdAt: Date;
  userId?: string;
  priority: string;
  isSynced?: boolean;
  _id: string;
  noteStatus: NoteStatus;
}

export default Note;
