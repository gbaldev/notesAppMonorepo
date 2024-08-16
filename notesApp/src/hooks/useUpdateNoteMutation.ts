import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
import queryClient from '../constants/QueryClient';

type UpdatePayload = Note | Note[];

export const useUpdateNoteMutation = (
  options?: Omit<
    UseMutationOptions<Note | Note[], unknown, Note | Note[], unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    ...options,
    mutationKey: ['updateNote'],
    mutationFn: (data: UpdatePayload) =>
      Array.isArray(data)
        ? NotesService.updateNotes(data)
        : NotesService.updateNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries('notes' as any);
    },
  });
};

export default useUpdateNoteMutation;
