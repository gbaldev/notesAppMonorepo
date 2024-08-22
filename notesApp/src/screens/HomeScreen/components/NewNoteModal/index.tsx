import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import BaseModal from '../../../../components/BaseModal';
import Note from '../../../../models/Note';
import {UseMutateFunction} from '@tanstack/react-query';

interface NewNoteModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: UseMutateFunction<Note, unknown, Note, unknown>;
  onUpdate: UseMutateFunction<Note, unknown, Note, unknown>;
  reloadNotes: () => void;
  note: Note | null;
  isLoading: boolean;
}

type Priorities = 'High' | 'Medium' | 'Low';
const priorities: Priorities[] = ['High', 'Medium', 'Low'];
const prioritiesColors = ['#ECCDD2', '#AADCCD', '#E5E6E1'];

const NewNoteModal: React.FC<NewNoteModalProps> = ({
  visible,
  onClose,
  onCreate,
  onUpdate,
  reloadNotes,
  isLoading,
  note,
}) => {
  const [priority, setPriority] = useState<Priorities>(priorities[2]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleOnClose = useCallback(() => {
    setPriority(priorities[2]);
    setTitle('');
    setContent('');
    onClose();
  }, [onClose]);

  const onSubmit = useCallback(async () => {
    if (note) {
      onUpdate(
        {
          ...note,
          title: title,
          priority: priority.toLowerCase(),
          content: content,
        },
        {
          onSuccess: () => {
            reloadNotes();
            handleOnClose();
          },
        },
      );
      return;
    }
    onCreate(
      {
        title: title,
        content: content,
        priority: priority.toLowerCase(),
      } as Note,
      {
        onSuccess: () => {
          reloadNotes();
          handleOnClose();
        },
      },
    );
  }, [
    content,
    handleOnClose,
    note,
    onCreate,
    onUpdate,
    priority,
    reloadNotes,
    title,
  ]);

  useEffect(() => {
    if (note) {
      setTitle(note?.title);
      setContent(note?.content);
      setPriority(note?.priority as Priorities);
    }
  }, [note]);

  return (
    <BaseModal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.modalText}>
          <Text style={styles.boldText}>{note ? 'Edit Note' : 'Add Note'}</Text>
        </Text>
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          editable={!isLoading}
          defaultValue={note?.title}
        />
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Content</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline
          onChangeText={setContent}
          editable={!isLoading}
          defaultValue={note?.content}
        />
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Priority</Text>
        <View style={styles.prioritySection}>
          {priorities.map((p, i) => {
            const _style = {
              backgroundColor:
                p.toLowerCase() === priority.toLowerCase()
                  ? prioritiesColors[i]
                  : 'transparent',
            };
            return (
              <View key={i} style={styles.priorityContainer}>
                <TouchableOpacity
                  disabled={isLoading}
                  style={[styles.checkbox]}
                  onPress={() => setPriority(p)}>
                  <View
                    style={[{flex: 1, margin: 2, borderRadius: 2}, _style]}
                  />
                </TouchableOpacity>
                <Text>{p}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.bottomSeparator} />
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size={12} />
            ) : (
              <Text style={styles.textStyle}>{note ? 'Save' : 'Add Note'}</Text>
            )}
          </TouchableOpacity>
          <View style={styles.horizontalSeparator} />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleOnClose}
            disabled={isLoading}>
            <Text style={[styles.textStyle, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

export default NewNoteModal;
