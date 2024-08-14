import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from '../Icon';
import Note from '../../models/Note';
import styles from './styles';
import Separator from '../Separator/Separator';
import {UseMutateFunction} from '@tanstack/react-query';
import NoteStatus from '../../models/NoteStatus';

interface NoteCardProps {
  item: Note;
  onDeleteItem: UseMutateFunction<Note, unknown, string, unknown>;
  onEdit: (note: Note) => void;
}
const NoteCard: React.ComponentType<NoteCardProps> = ({
  item,
  onDeleteItem,
  onEdit,
}) => {
  const lastModifiedDate = new Date(item.editedAt).toLocaleDateString();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const onDelete = useCallback(() => {
    setIsDeleting(true);
    onDeleteItem(item._id, {onSuccess: () => setIsDeleting(false)});
  }, [item._id, onDeleteItem]);

  const EditButton = useCallback(() => {
    return (
      !isDeleting && (
        <TouchableOpacity onPress={() => onEdit(item)}>
          <Icon name="edit" size={20} />
        </TouchableOpacity>
      )
    );
  }, [isDeleting, item, onEdit]);

  const DeleteButton = useCallback(() => {
    if (item.status === NoteStatus.DELETED) {
      return null;
    }

    return (
      <>
        <Separator width={10} />
        <TouchableOpacity onPress={onDelete}>
          {isDeleting ? (
            <ActivityIndicator size={20} />
          ) : (
            <Icon name="bin" size={20} color={'#7B0323'} />
          )}
        </TouchableOpacity>
      </>
    );
  }, [isDeleting, item.status, onDelete]);

  const CloudButton = useCallback(() => {
    if (item.isSynced) {
      return null;
    }

    return (
      <>
        <Separator width={10} />
        <TouchableOpacity onPress={() => {}}>
          <Icon name="cloudUpload" size={20} />
        </TouchableOpacity>
      </>
    );
  }, [item.isSynced]);

  return (
    <View
      style={[
        styles.container,
        item.status === NoteStatus.DELETED
          ? styles.deletedBorder
          : styles.activeBorder,
      ]}>
      <View style={[styles.header, styles[`header${item.priority ?? ''}`]]}>
        <View style={styles.titleContainer}>
          <Icon name="fire" {...item} size={20} />
          <Text style={styles.lastModified}>
            Last modified: {lastModifiedDate}
          </Text>
        </View>
        {item.status === NoteStatus.DELETED && (
          <Text style={styles.deleted}>DELETED</Text>
        )}
        <View style={styles.titleContainer}>
          <EditButton />
          <DeleteButton />
          <CloudButton />
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
