import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
// import queryClient from '../constants/QueryClient';
import {NativeModules} from 'react-native';

export const useCreateNoteMutation = (
  options?: Omit<
    UseMutationOptions<Note | Note[], unknown, Note | Note[], unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const {Database} = NativeModules;

  return useMutation({
    ...options,
    mutationKey: ['createNote'],
    mutationFn: (data: Note | Note[]) =>
      Array.isArray(data)
        ? NotesService.createNotes(data)
        : NotesService.createNote(data),
    onSuccess: async data => {
      console.log('created:', {data});
      Array.isArray(data)
        ? await Database.createNotes(data)
        : await Database.createNote(data);
      // queryClient.invalidateQueries('notes' as any);
    },
  });
};

export default useCreateNoteMutation;
