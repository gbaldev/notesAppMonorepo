import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
import queryClient from '../constants/QueryClient';

export const useCreateNoteMutation = (
  options?: Omit<
    UseMutationOptions<Note | Note[], unknown, Note | Note[], unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    ...options,
    mutationKey: ['createNote'],
    mutationFn: (data: Note | Note[]) =>
      Array.isArray(data)
        ? NotesService.createNotes(data)
        : NotesService.createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries('notes' as any);
    },
  });
};

export default useCreateNoteMutation;
