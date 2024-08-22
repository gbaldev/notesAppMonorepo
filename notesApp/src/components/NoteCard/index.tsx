import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from '../Icon';
import Note from '../../models/Note';
import styles from './styles';
import Separator from '../Separator/Separator';
import {UseMutateFunction} from '@tanstack/react-query';
import NoteStatus from '../../models/NoteStatus';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

interface NoteCardProps {
  item: Note;
  onDeleteItem: UseMutateFunction<Note, unknown, string, unknown>;
  reloadNotes: () => void;
  onEdit: (note: Note) => void;
}
const NoteCard: React.ComponentType<NoteCardProps> = ({
  item,
  onDeleteItem,
  reloadNotes,
  onEdit,
}) => {
  const lastModifiedDate = new Date(item.editedAt).toLocaleDateString();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const onDelete = useCallback(() => {
    setIsDeleting(true);
    onDeleteItem(item._id, {
      onSuccess: () => {
        setIsDeleting(false);
        reloadNotes();
      },
    });
  }, [item._id, onDeleteItem, reloadNotes]);
  const opacity = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

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
        <AnimatedTouchable style={style} onPress={() => {}}>
          <Icon name="cloudUpload" size={20} color={'rgba(0,100,000,1)'} />
        </AnimatedTouchable>
      </>
    );
  }, [AnimatedTouchable, item.isSynced, style]);

  useEffect(() => {
    if (!item.isSynced) {
      opacity.value = withRepeat(withSpring(0.3, {duration: 900}), -1, true);
    }
  }, [item.isSynced, opacity]);

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
