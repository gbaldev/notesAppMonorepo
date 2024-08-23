import {UseQueryOptions, useQuery} from '@tanstack/react-query';
import {useNetInfo} from '@react-native-community/netinfo';
import {Note} from '@models';
import NotesService from '@services/NotesService';

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
