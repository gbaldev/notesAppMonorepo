import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
import Database from '../../DatabaseModule';

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
