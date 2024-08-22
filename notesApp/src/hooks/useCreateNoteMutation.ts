import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
import Database from '../../DatabaseModule';

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
    onSuccess: async data => {
      Array.isArray(data)
        ? await Database.createNotes(data)
        : await Database.createNote(data);
    },
  });
};

export default useCreateNoteMutation;
