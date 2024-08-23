import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import {Database} from '@constants';
import {Note} from '@models';
import NotesService from '@services/NotesService';

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
    onSuccess: async data => {
      await Database.updateNote(data);
    },
  });
};

export default useDeleteNoteMutation;
