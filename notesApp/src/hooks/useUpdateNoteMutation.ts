import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import {Database} from '@constants';
import {Note} from '@models';
import NotesService from '@services/NotesService';

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
    mutationFn: (data: UpdatePayload) => {
      return Array.isArray(data)
        ? NotesService.updateNotes(data)
        : NotesService.updateNote(data);
    },
    onSuccess: async data => {
      Array.isArray(data)
        ? await Database.updateNotes(data)
        : await Database.updateNote(data);
    },
  });
};

export default useUpdateNoteMutation;
