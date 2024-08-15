import NoteStatus from './NoteStatus';

interface Note {
  title: string;
  content: string;
  createdAt: Date;
  editedAt: Date;
  userId?: string;
  priority: string;
  isSynced?: boolean;
  _id: string;
  status: NoteStatus;
}

export default Note;
