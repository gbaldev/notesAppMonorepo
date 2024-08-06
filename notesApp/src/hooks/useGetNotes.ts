import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';

export const useGetNotes = (
  options?: Omit<
    UseQueryOptions<Note[], [], Note[], string[]>,
    'queryFn' | 'queryKey'
  >,
) => {
  return useQuery({
    ...options,
    queryKey: ['notes'],
    queryFn: NotesService.getNotes,
  });
};

export default useGetNotes;
