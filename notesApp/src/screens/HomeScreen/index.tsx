import React, {useEffect, useState} from 'react';
import {View, FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {User} from 'react-native-auth0';
import Note from '../../models/Note';
import NoteCard from '../../components/NoteCard';
import Header from './components/Header';
import styles from './styles';
import NavHeader from './components/NavHeader';
import NewNoteModal from './components/NewNoteModal';
import {UseMutateFunction} from '@tanstack/react-query';
import NoConnectionDisclaimer from '../../components/NoConnectionDisclaimer';
import Filter from '../../models/Filter';
import NoteStatus from '../../models/NoteStatus';

interface HomeScreenProps {
  user: User | null;
  notes: Note[];
  onLogout: () => void;
  onCreateNote: UseMutateFunction<Note, unknown, Note, unknown>;
  onDeleteNote: UseMutateFunction<Note, unknown, string, unknown>;
  onUpdateNote: UseMutateFunction<Note, unknown, Note, unknown>;
  onRefresh: () => void;
  isError: boolean;
  isLoading: boolean;
  isDeleting: boolean;
  isCreating: boolean;
  isUpdating: boolean;
}

const HomeScreen: React.ComponentType<HomeScreenProps> = ({
  user,
  notes,
  onLogout,
  onCreateNote,
  onDeleteNote,
  onUpdateNote,
  // isError,
  isLoading,
  onRefresh,
  isDeleting,
  isCreating,
  isUpdating,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [filteredNotes, setFilteredNotes] = useState<Note[] | null>(null);
  const [filter, setFilter] = useState<Filter | null>(null);

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
      <NoteCard onDeleteItem={onDeleteNote} item={item} onEdit={handleEdit} />
    );
  };

  useEffect(() => {
    if (filter) {
      let filtered = notes;
      switch (filter) {
        case Filter.DELETED:
          filtered = notes.filter(note => note.status === NoteStatus.DELETED);
          setFilteredNotes(filtered);
          break;
        case Filter.UNSYNCED:
          filtered = notes.filter(note => !note.isSynced);
          setFilteredNotes(filtered);
          break;
        case Filter.ACTIVE:
          filtered = notes.filter(note => note.status === NoteStatus.ACTIVE);
          setFilteredNotes(filtered);
          break;
        case Filter.ALL:
        default:
          setFilteredNotes(null);
      }
    }
  }, [filter, notes]);

  return (
    <>
      <NewNoteModal
        visible={isModalVisible}
        onClose={onCloseModal}
        onCreate={onCreateNote}
        onUpdate={onUpdateNote}
        isLoading={isCreating || isUpdating}
        note={editingNote}
      />
      <NavHeader user={user} onLogout={onLogout} />
      <View style={styles.container}>
        <View>
          <NoConnectionDisclaimer />
          <Header
            onAddItem={() => setIsModalVisible(true)}
            setFilter={setFilter}
            filter={filter}
          />
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading && !isDeleting}
              onRefresh={onRefresh}
            />
          }
          data={filteredNotes ?? notes}
          renderItem={renderItem}
          style={styles.flatlist}
        />
      </View>
    </>
  );
};

export default HomeScreen;
