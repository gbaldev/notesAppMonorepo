import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  ListRenderItem,
} from 'react-native';
import {User} from 'react-native-auth0';
import {UseMutateFunction} from '@tanstack/react-query';
import {Filter, Note, NoteStatus} from '@models';
import {NoConnectionDisclaimer, NoteCard} from '@components';
import {Header, NavHeader, NewNoteModal} from './components';
import styles from './styles';

interface HomeScreenProps {
  user: User | null;
  notes: Note[];
  onLogout: () => void;
  onCreateNote: UseMutateFunction<Note, unknown, Note, unknown>;
  onDeleteNote: UseMutateFunction<Note, unknown, string, unknown>;
  onUpdateNote: UseMutateFunction<Note, unknown, Note, unknown>;
  reloadNotes: () => void;
  onRefresh: () => void;
  isError: boolean;
  isLoading: boolean;
  isDeleting: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isInternetReachable: boolean;
}

const HomeScreen: React.ComponentType<HomeScreenProps> = ({
  user,
  notes,
  onLogout,
  onCreateNote,
  onDeleteNote,
  onUpdateNote,
  reloadNotes,
  isLoading,
  onRefresh,
  isDeleting,
  isCreating,
  isUpdating,
  isInternetReachable,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [filteredNotes, setFilteredNotes] = useState<Note[] | null>(null);
  const [filter, setFilter] = useState<Filter | null>(Filter.ACTIVE);
  const noData =
    (!filteredNotes && notes.length < 1) ||
    (filteredNotes && filteredNotes.length < 1);

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsModalVisible(true);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
    setEditingNote(null);
  };

  const renderItem: ListRenderItem<Note> = ({item}) => {
    return (
      <NoteCard
        onDeleteItem={onDeleteNote}
        reloadNotes={reloadNotes}
        item={item}
        onEdit={handleEdit}
      />
    );
  };

  const emptyComponent = useCallback(() => {
    let type = ` ${filter?.toLowerCase()}`;
    if (filter === Filter.ALL) {
      type = '';
    }

    return (
      <View style={styles.emptyCardContainer}>
        <Text style={styles.label}>You don't have{type} notes to display</Text>
      </View>
    );
  }, [filter]);

  const refreshControlHandler = useMemo(
    () =>
      isInternetReachable ? (
        <RefreshControl
          refreshing={isLoading && !isDeleting}
          onRefresh={onRefresh}
        />
      ) : undefined,
    [isDeleting, isInternetReachable, isLoading, onRefresh],
  );

  useEffect(() => {
    if (filter) {
      let filtered = notes;
      switch (filter) {
        case Filter.DELETED:
          filtered = notes.filter(note => note.status === NoteStatus.DELETED);
          break;
        case Filter.UNSYNCED:
          filtered = notes.filter(note => !note.isSynced);
          break;
        case Filter.ALL:
          setFilteredNotes(null);
          return;
        case Filter.ACTIVE:
        default:
          filtered = notes.filter(note => note.status === NoteStatus.ACTIVE);
          break;
      }
      setFilteredNotes(
        filtered.sort(
          (a, b) =>
            new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime(),
        ),
      );
    }
  }, [filter, notes]);

  return (
    <>
      <NewNoteModal
        visible={isModalVisible}
        onClose={onCloseModal}
        onCreate={onCreateNote}
        onUpdate={onUpdateNote}
        reloadNotes={reloadNotes}
        isLoading={isCreating || isUpdating}
        note={editingNote}
      />
      <NavHeader user={user} onLogout={onLogout} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <NoConnectionDisclaimer />
          <Header
            onAddItem={() => setIsModalVisible(true)}
            setFilter={setFilter}
            filter={filter}
          />
        </View>
        <FlatList
          scrollEnabled={!noData}
          refreshControl={refreshControlHandler}
          data={filteredNotes ?? notes}
          renderItem={renderItem}
          style={styles.flatlist}
          contentContainerStyle={noData && styles.noData}
          ListEmptyComponent={emptyComponent}
        />
      </View>
    </>
  );
};

export default HomeScreen;
