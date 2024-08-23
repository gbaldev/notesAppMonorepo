import React, {useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNotesLogic} from '@hooks';
import {HomeScreen} from '@screens';

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
    createNote,
    updateNote,
    deleteNote,
    refreshNotes,
    reloadNotes,
    logout,
  } = useNotesLogic();

  const {syncData} = useNotesLogic();
  const {isInternetReachable} = useNetInfo();

  useEffect(() => {
    if (isInternetReachable) {
      syncData();
    } else if (isInternetReachable !== null) {
      // No internet connection
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
      reloadNotes={reloadNotes}
      isUpdating={isUpdating}
      isInternetReachable={!!isInternetReachable}
    />
  );
};

export default HomeScreenContainer;
