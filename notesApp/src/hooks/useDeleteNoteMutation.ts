import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
import queryClient from '../constants/QueryClient';

export const useDeleteNoteMutation = (
  options?: Omit<
    UseMutationOptions<Note, unknown, string, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    ...options,
    mutationKey: ['deleteNote'],
    mutationFn: NotesService.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries('notes' as any);
    },
  });
};

export default useDeleteNoteMutation;
