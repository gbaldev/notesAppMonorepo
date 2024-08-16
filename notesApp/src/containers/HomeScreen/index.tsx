import React, {useEffect} from 'react';
import {useNotesLogic} from '../../hooks/useNotesLogic';
import HomeScreen from '../../screens/HomeScreen';
import {useNetInfo} from '@react-native-community/netinfo';

interface HomeScreenContainerProps {}

const HomeScreenContainer: React.ComponentType<
  HomeScreenContainerProps
> = () => {
  const {
    notes,
    isLoading,
    isCreating,
    isDeleting,
    isUpdating,
    isError,
    user,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    refreshNotes,
    logout,
  } = useNotesLogic();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const {syncData} = useNotesLogic();
  const {isInternetReachable} = useNetInfo();

  useEffect(() => {
    console.log('Net state changed');
    if (isInternetReachable) {
      console.log('Starting to sync');
      syncData();
    } else if (isInternetReachable !== null) {
      console.log('fron listener, is recheable?: ', isInternetReachable);
    }
  }, [isInternetReachable, syncData]);

  return (
    <HomeScreen
      isLoading={isLoading}
      isCreating={isCreating}
      isDeleting={isDeleting}
      isError={isError}
      user={user}
      notes={notes}
      onLogout={logout}
      onCreateNote={createNote}
      onDeleteNote={deleteNote}
      onRefresh={refreshNotes}
      onUpdateNote={updateNote}
      isUpdating={isUpdating}
      isInternetReachable={isInternetReachable}
    />
  );
};

export default HomeScreenContainer;
