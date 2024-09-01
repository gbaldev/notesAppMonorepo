/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useMemo} from 'react';
import {useAuth0} from 'react-native-auth0';
import {useNetInfo} from '@react-native-community/netinfo';
import {UseMutateFunction} from '@tanstack/react-query';
import {clearSession as clearLocalSession} from '@constants/LocalStorage';
import {CommonActions} from '@react-navigation/native';
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetNotes,
  useNavigator,
  useUpdateNoteMutation,
} from '@hooks';
import {useNotesStore} from '@store/notesStore';
import {Note, NoteStatus} from '@models';
import {
  selectNoteById,
  selectNotesByPriority,
  selectUnsyncedNotes,
} from '@store/selectors';
import {
  Database,
  doesntExistsLocally,
  isModifiedNote,
  isNewNote,
  noteShouldBeUpdated,
  prepareNotesToCreation,
  removeNotes,
} from '@constants';
import StackRoutes from '@navigation/routes';
import {syncErrorToast, syncSuccessToast} from '@constants/Toasts';

const useNotesLogic = () => {
  const {user, clearSession} = useAuth0();
  const {notes, unscyncedNotesAmount, setNotes, setUnscyncedNotesAmount} =
    useNotesStore();
  const {isInternetReachable} = useNetInfo();
  const navigation = useNavigator();

  const getNoteById = useCallback((id: string): Note | undefined => {
    return selectNoteById(id)(useNotesStore.getState());
  }, []);

  const getNotesByPriority = useCallback((priority: string): Note[] => {
    return selectNotesByPriority(priority)(useNotesStore.getState());
  }, []);

  const getUnsyncedNotes = useCallback((): Note[] => {
    return selectUnsyncedNotes(useNotesStore.getState());
  }, []);

  const {
    data: fetchedNotes = [],
    isError: isFetchingError,
    isFetching: isGetNotesLoading,
    refetch: onRefresh,
  } = useGetNotes();

  const {
    mutate: createNoteMutation,
    isError: isCreateNoteError,
    isPending: isCreateRunning,
  } = useCreateNoteMutation();

  const {
    mutate: updateNoteMutation,
    isError: isUpdateError,
    isPending: isUpdateRunning,
  } = useUpdateNoteMutation();

  const {
    mutate: deleteNoteMutation,
    isError: isDeleteError,
    isPending: isDeleteRunning,
  } = useDeleteNoteMutation();

  const logout = useCallback(async () => {
    try {
      await clearSession();
      await clearLocalSession();
      await Database.drop();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: StackRoutes.INITIAL}],
        }),
      );
    } catch (e) {
      console.log('Log out cancelled', e);
    }
  }, [clearSession, navigation]);

  const createUnsyncedNote = useCallback(
    async (note: Note, {onSuccess}: {onSuccess: () => void}) => {
      const createdAt = new Date().toISOString();
      await Database.createNote({
        ...note,
        createdAt,
        editedAt: createdAt,
        isSynced: false,
        status: NoteStatus.ACTIVE,
      });
      onSuccess();
    },
    [],
  );

  const createNote = useMemo(() => {
    if (isInternetReachable) {
      return createNoteMutation;
    } else {
      return createUnsyncedNote;
    }
  }, [
    createNoteMutation,
    createUnsyncedNote,
    isInternetReachable,
  ]) as unknown as UseMutateFunction<Note, unknown, Note, unknown>;

  const reloadNotes = useCallback(() => {
    const loadNotes = async () => {
      const DBnotes = await Database.getNotes();
      const unscyncedNotes = await Database.getUnsyncedNotes();
      setNotes(DBnotes.reverse());
      setUnscyncedNotesAmount(unscyncedNotes?.length ?? 0);
    };
    loadNotes();
  }, []);

  const updateUnsyncedNote = useCallback(
    async (data: Note | Note[], {onSuccess}: {onSuccess: () => void}) => {
      Array.isArray(data)
        ? await Database.updateNotes(data.map(n => ({...n, isSynced: false})))
        : await Database.updateNote({...data, isSynced: false});
      onSuccess();
    },
    [],
  );

  const updateNote = useMemo(() => {
    if (isInternetReachable) {
      return updateNoteMutation;
    } else {
      return updateUnsyncedNote;
    }
  }, [
    isInternetReachable,
    updateNoteMutation,
    updateUnsyncedNote,
  ]) as unknown as UseMutateFunction<Note, unknown, Note, unknown>;

  const deleteUnsyncedNote = useCallback(
    async (noteId: string, {onSuccess}: {onSuccess: () => void}) => {
      const noteToDelete = notes.find(n => n._id === noteId);
      if (noteToDelete) {
        await Database.deleteNote({
          ...noteToDelete,
          isSynced: false,
        });
      }
      onSuccess();
    },
    [notes],
  ) as unknown as UseMutateFunction<Note, unknown, string, unknown>;

  const deleteNote = useMemo(() => {
    if (isInternetReachable) {
      return deleteNoteMutation;
    } else {
      return deleteUnsyncedNote;
    }
  }, [deleteNoteMutation, deleteUnsyncedNote, isInternetReachable]);

  const syncData = useCallback(async () => {
    const unsynedNotes = (await Database.getUnsyncedNotes()) ?? [];

    if (unsynedNotes.length < 1) {
      return;
    }

    const localNotes = unsynedNotes.filter(isNewNote);
    const pendingNotes = localNotes.map(
      prepareNotesToCreation,
    ) as unknown as Note[];
    const modifiedNotes = unsynedNotes.filter(
      isModifiedNote,
    ) as unknown as Note[];

    let createPromise = Promise.resolve(null);
    let updatePromise = Promise.resolve(null);

    if (pendingNotes.length > 0) {
      createPromise = new Promise((resolve, reject) => {
        createNoteMutation(pendingNotes, {
          onSuccess: async () => {
            await removeNotes(localNotes);
            resolve(null);
          },
          onError: (error: any) => {
            reject(error);
          },
        });
      });
    }
    if (modifiedNotes.length > 0) {
      updatePromise = new Promise((resolve, reject) => {
        updateNoteMutation(modifiedNotes, {
          onSuccess: () => {
            resolve(null);
          },
          onError: (error: any) => {
            reject(error);
          },
        });
      });
    }

    Promise.all([createPromise, updatePromise])
      .then(() => {
        reloadNotes();
        syncSuccessToast();
      })
      .catch((error: any) => {
        syncErrorToast();
        console.error('Error while sync:', error);
      });
  }, [createNoteMutation, updateNoteMutation, reloadNotes]);

  useEffect(() => {
    const updateContentIfnecessary = async () => {
      let updated = false;

      try {
        const DBnotes = await Database.getNotes();

        let notesToUpdate = DBnotes.filter(note =>
          noteShouldBeUpdated(note, fetchedNotes),
        );

        if (notesToUpdate.length > 0) {
          await Database.updateNotes(notesToUpdate);
          updated = true;
        }

        const storedNotesIDs = DBnotes.map(note => note._id);
        const unstoredNotes = fetchedNotes.filter(note =>
          doesntExistsLocally(note, storedNotesIDs),
        );

        if (unstoredNotes.length > 0) {
          await Database.createNotes(unstoredNotes);
          updated = true;
        }
      } catch (e: any) {
        console.log('Something went wrong updating data', {e});
      }
      try {
        if (updated) {
          await reloadNotes();
        }
      } catch (e: any) {
        console.log('something went wrong loading data from DB', e);
      }
    };

    let timeout = setTimeout(() => {
      updateContentIfnecessary();
    }, 1000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [fetchedNotes]);

  useEffect(() => reloadNotes(), []);

  return {
    notes,
    unscyncedNotesAmount,
    isLoading: isGetNotesLoading,
    isCreating: isCreateRunning,
    isDeleting: isDeleteRunning,
    isUpdating: isUpdateRunning,
    isError:
      isFetchingError || isCreateNoteError || isDeleteError || isUpdateError,
    user,
    getNoteById,
    getNotesByPriority,
    getUnsyncedNotes,
    createNote,
    deleteNote,
    updateNote,
    reloadNotes,
    syncData,
    refreshNotes: onRefresh,
    logout,
  };
};

export default useNotesLogic;
