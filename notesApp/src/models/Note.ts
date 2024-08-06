interface Note {
  title: string;
  content: string;
  createdAt: Date;
  userId?: string;
  priority: string;
  _id: string;
}

export default Note;
