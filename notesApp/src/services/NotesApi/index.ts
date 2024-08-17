import {Platform} from 'react-native';

export interface URLConfig {
  apiVersion: string;
  base: string;
  login: string;
}
/*
   Android and iOS handle localhost differently, to access from Android
    it should be specified as http://10.0.2.2:3000, instead, iOS works
    and MUST use localhost.
*/
const localhost = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://localhost:3000',
});

class NotesApi {
  base = `${localhost}`;
  getNotes = () => `${this.base}/notes`;
  postNote = () => `${this.base}/notes`;
  getNote = (id: string) => `${this.base}/notes/${id}`;
  deleteNote = (id: string) => `${this.base}/notes/${id}`;
  updateNote = (id: string) => `${this.base}/notes/${id}`;
  updateNotes = () => `${this.base}/notes`;
}

const NotesApiInstance = new NotesApi();

export default NotesApiInstance;
