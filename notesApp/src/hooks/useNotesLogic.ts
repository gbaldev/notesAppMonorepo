import {useCallback, useMemo} from 'react';
import {useAuth0} from 'react-native-auth0';
import {useNotesStore} from '../store/notesStore';
import useGetNotes from './useGetNotes';
import useCreateNoteMutation from './useCreateNoteMutation';
import useDeleteNoteMutation from './useDeleteNoteMutation';
import {useNetInfo} from '@react-native-community/netinfo';
import Note from '../models/Note';
import {
  selectNoteById,
  selectNotesByPriority,
  selectUnsyncedNotes,
} from '../store/selectors';
import NoteStatus from '../models/NoteStatus';
import {UseMutateFunction} from '@tanstack/react-query';
import useUpdateNoteMutation from './useUpdateNoteMutation';
import {clearSession as clearLocalSession} from '../constants/LocalStorage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import StackRoutes from '../navigation/routes';

export const useNotesLogic = () => {
  const {user, clearSession} = useAuth0();
  const {notes, setNotes} = useNotesStore();
  const {isInternetReachable} = useNetInfo();
  const navigation = useNavigation();

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
    data: fetchedNotes,
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

  const fetchNotes = useCallback(() => {
    if (fetchedNotes) {
      setNotes(fetchedNotes.map(n => ({...n, isSynced: true})));
    }
  }, [fetchedNotes, setNotes]);

  const logout = useCallback(async () => {
    try {
      await clearSession();
      await clearLocalSession();
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
    (note: Note, {onSuccess}: {onSuccess: () => void}) => {
      setNotes([
        {
          ...note,
          createdAt: new Date(),
          editedAt: new Date(),
          isSynced: false,
          status: NoteStatus.ACTIVE,
          _id: `localId${Math.random() * 100}${Math.random() * 100}${
            Math.random() * 100
          }`,
        },
        ...notes,
      ]);
      onSuccess();
    },
    [notes, setNotes],
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

  const updateUnsyncedNote = useCallback(
    (note: Note, {onSuccess}: {onSuccess: () => void}) => {
      const newNotes = notes.map(_note =>
        _note._id === note._id ? {...note, isSynced: false} : _note,
      );
      setNotes(newNotes);
      onSuccess();
    },
    [notes, setNotes],
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
    (noteId: string, {onSuccess}: {onSuccess: () => void}) => {
      setNotes(
        notes.map(note => {
          if (noteId === note._id) {
            return {...note, isSynced: false, status: NoteStatus.DELETED};
          }
          return note;
        }),
      );
      onSuccess();
    },
    [notes, setNotes],
  ) as unknown as UseMutateFunction<Note, unknown, string, unknown>;

  const deleteNote = useMemo(() => {
    if (isInternetReachable) {
      return deleteNoteMutation;
    } else {
      return deleteUnsyncedNote;
    }
  }, [deleteNoteMutation, deleteUnsyncedNote, isInternetReachable]);

  const syncData = useCallback(async () => {
    console.log(user);
    const unsynedNotes = getUnsyncedNotes();
    const newNotes = unsynedNotes
      .filter(note => note._id.includes('localId'))
      .map(note => ({...note, _id: undefined})) as unknown as Note[];
    const modifiedNotes = unsynedNotes.filter(
      note => !note._id.includes('localId'),
    ) as unknown as Note[];

    if (newNotes.length === 0 && modifiedNotes.length === 0) {
      console.log('Nothing to sync, aborting');
      return;
    }

    if (newNotes.length > 0) {
      console.log('creating notes...');
      createNoteMutation(newNotes, {
        onSuccess: () => {
          console.log('Creation success');
        },
      });
    }

    if (modifiedNotes.length > 0) {
      console.log('updating notes...');
      updateNoteMutation(modifiedNotes, {
        onSuccess: () => {
          console.log('Updating success');
        },
      });
    }

    console.log('Sync done');
  }, [createNoteMutation, getUnsyncedNotes, updateNoteMutation, user]);

  return {
    notes,
    isLoading: isGetNotesLoading,
    isCreating: isCreateRunning,
    isDeleting: isDeleteRunning,
    isUpdating: isUpdateRunning,
    isError:
      isFetchingError || isCreateNoteError || isDeleteError || isUpdateError,
    user,
    fetchNotes,
    getNoteById,
    getNotesByPriority,
    getUnsyncedNotes,
    createNote,
    deleteNote,
    updateNote,
    syncData,
    refreshNotes: onRefresh,
    logout,
  };
};
