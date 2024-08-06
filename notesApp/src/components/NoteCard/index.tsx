import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from '../Icon';
import Note from '../../models/Note';
import styles from './styles';
import Separator from '../Separator/Separator';
import {UseMutateFunction} from '@tanstack/react-query';

interface NoteCardProps {
  item: Note;
  onDeleteItem: UseMutateFunction<Note, unknown, string, unknown>;
}
const NoteCard: React.ComponentType<NoteCardProps> = ({item, onDeleteItem}) => {
  const lastModifiedDate = new Date(item.createdAt).toLocaleDateString();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const onDelete = () => {
    setIsDeleting(true);
    onDeleteItem(item._id, {onSuccess: () => setIsDeleting(false)});
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles[`header${item.priority ?? ''}`]]}>
        <View style={styles.titleContainer}>
          <Icon name="fire" {...item} size={20} />
          <Text style={styles.lastModified}>
            Last modified: {lastModifiedDate}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          {!isDeleting && (
            <>
              <TouchableOpacity onPress={() => {}}>
                <Icon name="edit" size={20} />
              </TouchableOpacity>
              <Separator width={10} />
            </>
          )}
          <TouchableOpacity onPress={onDelete}>
            {isDeleting ? (
              <ActivityIndicator size={20} />
            ) : (
              <Icon name="bin" size={20} color={'#7B0323'} />
            )}
          </TouchableOpacity>
          <Separator width={10} />
          <TouchableOpacity onPress={() => {}}>
            <Icon name="cloudUpload" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Separator height={15} />
      <Text style={[styles.title]}>{item.title}</Text>
      <Separator height={8} />
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );
};

export default NoteCard;
