import React, {useEffect} from 'react';
import {useNotesLogic} from '../../hooks/useNotesLogic';
import HomeScreen from '../../screens/HomeScreen';

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
    />
  );
};

export default HomeScreenContainer;
