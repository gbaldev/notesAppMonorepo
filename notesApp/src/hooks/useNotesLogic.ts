import {useCallback, useEffect, useMemo} from 'react';
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
import Database from '../../DatabaseModule';

export const useNotesLogic = () => {
  const {user, clearSession} = useAuth0();
  const {notes, setNotes} = useNotesStore();
  const {isInternetReachable} = useNetInfo();
  const navigation = useNavigation();
  // const [localNotes, setLocalNotes] = useState<Note[]>([]);

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
      await Database.createNote({
        ...note,
        createdAt: new Date(),
        editedAt: new Date(),
        isSynced: false,
        status: NoteStatus.ACTIVE,
        _id: `localId${Math.random() * 100}${Math.random() * 100}${
          Math.random() * 100
        }`,
      });
      // setNotes([
      //   {
      //     ...note,
      //     createdAt: new Date(),
      //     editedAt: new Date(),
      //     isSynced: false,
      //     status: NoteStatus.ACTIVE,
      //     _id: `localId${Math.random() * 100}${Math.random() * 100}${
      //       Math.random() * 100
      //     }`,
      //   },
      //   ...notes,
      // ]);
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

  const reloadNotes = useCallback(async () => {
    console.log('Loading notes');
    const DBnotes = await Database.getNotes();
    setNotes(DBnotes.reverse());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        await Database.deleteNote({...noteToDelete, isSynced: false});
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
    /*
      #1 getUnsynced notes from DB

      #2 separate them from new ones (with inernal) and edited ones (with external id)
      ## updatedNotesLocal, createdNotesLocal

      #3 Update edited ones => store RESPONSE (updated in the backend) in updatedNotes
      #4 Post crated locally ones => store RESPONSE (created notes with real ID from BE) in createdNotes

      #5 Update edited ones in the database WITH Database.update(updatedNotes)
      ## Update process succes lml

      #6 Create new notes with the createdNotes from BE(with their real ID, now synced)

      #7 Delete from DB the notes in createdNotesLocal (now stored with real ID in the DB)
      ## Create Process succes lml

      #8 set the local notes to provide the app with getting notes from Database.getNotes();
      ## Sync process done
    */
    console.log('Sync process started');
    const unsynedNotes = (await Database.getUnsyncedNotes()) ?? [];

    if (unsynedNotes.length < 1) {
      console.log('Nothing to update');
      return;
    }

    const newNotes = unsynedNotes.filter(note => note._id.includes('localId'));
    const newNotesWithoutID = newNotes.map(note => ({
      ...note,
      _id: undefined,
    })) as unknown as Note[];

    const modifiedNotes = unsynedNotes.filter(
      note => !note._id.includes('localId'),
    ) as unknown as Note[];

    let createPromise = Promise.resolve(null);
    let updatePromise = Promise.resolve(null);

    if (newNotesWithoutID.length > 0) {
      console.log('Notes to create: ', newNotesWithoutID.length);
      createPromise = new Promise((resolve, reject) => {
        createNoteMutation(newNotesWithoutID, {
          onSuccess: async () => {
            for (const note of newNotes) {
              await Database.removeNote(note);
            }
            console.log('Creation success');
            resolve(null);
          },
          onError: (error: any) => {
            reject(error);
          },
        });
      });
    }

    if (modifiedNotes.length > 0) {
      console.log('Notes to update: ', modifiedNotes.length);
      updatePromise = new Promise((resolve, reject) => {
        updateNoteMutation(modifiedNotes, {
          onSuccess: () => {
            console.log('Updating success');
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
        console.log('Sync done');
        reloadNotes();
      })
      .catch((error: any) => {
        console.error('Error while sync:', error);
      });
  }, [createNoteMutation, updateNoteMutation, reloadNotes]);

  useEffect(() => {
    console.log('Initial loading');
    reloadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateContent = async () => {
      let updated = false;
      try {
        //  get notes from DB and compare with ServerSide data
        const DBnotes = await Database.getNotes();

        let notesToUpdate = [] as Note[];

        // for each stored note, find the serverSide updated note and compare
        // them to see if the local one has been modified and not yet reflected
        // in the BE.
        DBnotes.forEach(note => {
          const serverSidNote = fetchedNotes.find(
            _note => _note._id === note._id,
          );

          if (
            serverSidNote &&
            new Date(serverSidNote.editedAt) > new Date(note.editedAt)
          ) {
            notesToUpdate.push(serverSidNote);
          }
        });

        if (notesToUpdate.length > 0) {
          await Database.updateNotes(notesToUpdate);
          updated = true;
        }

        const localNotesIds = DBnotes.map(note => note._id);
        const newNotes = fetchedNotes.filter(
          note => !localNotesIds.includes(note._id),
        );

        if (newNotes.length > 0) {
          await Database.createNotes(newNotes);
          updated = true;
        }
      } catch (e: any) {
        console.log('Something went wrong updating data', {e});
      }
      try {
        if (updated) {
          console.log('Updated data');
          await reloadNotes();
        }
      } catch (e: any) {
        console.log('something went wrong loading data from DB', e);
      }
    };

    updateContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedNotes]);

  return {
    notes,
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
