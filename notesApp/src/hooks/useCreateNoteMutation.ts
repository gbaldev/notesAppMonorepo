import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
import queryClient from '../constants/QueryClient';

export const useCreateNoteMutation = (
  options?: Omit<
    UseMutationOptions<Note, unknown, Note, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    ...options,
    mutationKey: ['createNote'],
    mutationFn: NotesService.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries('notes' as any);
    },
  });
};

export default useCreateNoteMutation;
