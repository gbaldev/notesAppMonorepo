import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import Note from '../models/Note';
import NotesService from '../services/NotesService';
import {useNetInfo} from '@react-native-community/netinfo';

export const useGetNotes = (
  options?: Omit<
    UseQueryOptions<Note[], [], Note[], string[]>,
    'queryFn' | 'queryKey'
  >,
) => {
  const {isInternetReachable} = useNetInfo();
  return useQuery({
    ...options,
    queryKey: ['notes'],
    queryFn: NotesService.getNotes,
    enabled: !!isInternetReachable,
  });
};

export default useGetNotes;
