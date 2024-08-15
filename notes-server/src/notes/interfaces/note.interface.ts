export interface INote {
  title: string;
  content: string;
  createdAt: Date;
  editedAt: Date;
  status: 'ACTIVE' | 'DELETED';
}
