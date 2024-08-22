import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
import {NativeModules} from 'react-native';

export const useDeleteNoteMutation = (
  options?: Omit<
    UseMutationOptions<Note, unknown, string, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const {Database} = NativeModules;

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
