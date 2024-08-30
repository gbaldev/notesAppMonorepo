import NoteStatus from './NoteStatus';

interface Note {
  title: string;
  content: string;
  createdAt: string;
  editedAt: string;
  userId?: string;
  priority: string;
  isSynced?: boolean;
  _id: string;
  status: NoteStatus;
}

export default Note;
