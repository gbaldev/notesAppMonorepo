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

interface HomeScreenProps {
  user: User | null;
  notes: Note[];
  onLogout: () => void;
  onCreateNote: UseMutateFunction<Note, unknown, Note, unknown>;
  onDeleteNote: UseMutateFunction<Note, unknown, string, unknown>;
  onRefresh: () => void;
  isError: boolean;
  isLoading: boolean;
  isDeleting: boolean;
  isCreating: boolean;
}

const HomeScreen: React.ComponentType<HomeScreenProps> = ({
  user,
  notes,
  onLogout,
  onCreateNote,
  onDeleteNote,
  isError,
  isLoading,
  onRefresh,
  isDeleting,
  isCreating,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  useEffect(() => {
    console.log(isError, isLoading);
  }, [isError, isLoading, notes, onDeleteNote]);

  const renderItem: ListRenderItem<Note> = ({item}) => {
    return <NoteCard onDeleteItem={onDeleteNote} item={item} />;
  };

  return (
    <>
      <NewNoteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCreate={onCreateNote}
        isLoading={isCreating}
      />
      <NavHeader user={user} onLogout={onLogout} />
      <View style={styles.container}>
        <Header onAddItem={() => setIsModalVisible(true)} />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading && !isDeleting}
              onRefresh={onRefresh}
            />
          }
          data={notes}
          renderItem={renderItem}
          style={styles.flatlist}
        />
      </View>
    </>
  );
};

export default HomeScreen;
