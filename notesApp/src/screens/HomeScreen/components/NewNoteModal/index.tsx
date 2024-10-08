import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {UseMutateFunction} from '@tanstack/react-query';
import {Priorities, priorities, prioritiesColors} from '@constants';
import {Note} from '@models';
import {BaseModal} from '@components';
import {
  createSuccessToast,
  errorToast,
  updateSuccessToast,
} from '@constants/Toasts';
import colors from '@constants/colors';
import styles from './styles';

interface NewNoteModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: UseMutateFunction<Note, unknown, Note, unknown>;
  onUpdate: UseMutateFunction<Note, unknown, Note, unknown>;
  reloadNotes: () => void;
  note: Note | null;
  isLoading: boolean;
}

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
  const canSave = useMemo(
    () => title.length > 0 && content.length > 0,
    [title, content],
  );

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
            updateSuccessToast();
          },
          onError: () => {
            handleOnClose();
            errorToast({action: 'update'});
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
          createSuccessToast();
        },
        onError: () => {
          handleOnClose();
          errorToast({action: 'create'});
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
          <Text testID="action-describer" style={styles.boldText}>
            {note ? 'Edit Note' : 'Add Note'}
          </Text>
        </Text>
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Title</Text>
        <TextInput
          testID="title-input"
          style={styles.input}
          onChangeText={setTitle}
          editable={!isLoading}
          defaultValue={note?.title}
        />
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Content</Text>
        <TextInput
          testID="content-input"
          style={styles.input}
          numberOfLines={2}
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
                  <View style={[styles.priority, _style]} />
                </TouchableOpacity>
                <Text>{p}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.bottomSeparator} />
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            testID="action-button"
            style={[
              styles.addButton,
              !canSave && {backgroundColor: colors.gray},
            ]}
            onPress={onSubmit}
            disabled={isLoading || !canSave}>
            {isLoading ? (
              <ActivityIndicator testID="activity-indicator" size={12} />
            ) : (
              <Text style={styles.textStyle}>{note ? 'Save' : 'Add Note'}</Text>
            )}
          </TouchableOpacity>
          <View style={styles.horizontalSeparator} />
          <TouchableOpacity
            testID="cancel-button"
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
