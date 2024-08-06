import React, {useCallback} from 'react';
import {useAuth0} from 'react-native-auth0';
import HomeScreen from '../../screens/HomeScreen';
import useGetNotes from '../../hooks/useGetNotes';
import useCreateNoteMutation from '../../hooks/useCreateNoteMutation';
import useDeleteNoteMutation from '../../hooks/useDeleteNoteMutation';

interface HomeScreenContainerProps {}

const HomeScreenContainer: React.ComponentType<
  HomeScreenContainerProps
> = () => {
  const {user, clearSession} = useAuth0();
  const {
    data: notes = [],
    isError: isFetchingError,
    isFetching: isGetNotesLoading,
    refetch: onRefresh,
  } = useGetNotes();
  const {
    mutate: onCreateNote,
    isError: isCreateNoteError,
    isPending: isCreateRunning,
  } = useCreateNoteMutation();
  const {
    mutate: onDeleteNote,
    isError: isDeleteError,
    isPending: isDeleteRunning,
  } = useDeleteNoteMutation();

  const isLoading = isGetNotesLoading;
  const isError = isCreateNoteError || isDeleteError || isFetchingError;

  const onLogout = useCallback(async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled', e);
    }
  }, [clearSession]);

  return (
    <HomeScreen
      isLoading={isLoading}
      isCreating={isCreateRunning}
      isDeleting={isDeleteRunning}
      isError={isError}
      user={user}
      notes={notes}
      onLogout={onLogout}
      onCreateNote={onCreateNote}
      onDeleteNote={onDeleteNote}
      onRefresh={onRefresh}
    />
  );
};

export default HomeScreenContainer;
