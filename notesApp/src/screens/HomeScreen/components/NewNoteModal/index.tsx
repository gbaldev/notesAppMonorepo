import React, {useRef, useState} from 'react';
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
  isLoading: boolean;
}

type Priorities = 'High' | 'Medium' | 'Low';
const priorities: Priorities[] = ['High', 'Medium', 'Low'];
const prioritiesColors = ['#ECCDD2', '#AADCCD', '#E5E6E1'];

const NewNoteModal: React.FC<NewNoteModalProps> = ({
  visible,
  onClose,
  onCreate,
  isLoading,
}) => {
  const [priority, setPriority] = useState<Priorities>(priorities[2]);
  const title = useRef<string>('');
  const content = useRef<string>('');

  const setTitle = (newTitle: string) => {
    if (newTitle?.length > 0) {
      title.current = newTitle;
    }
  };

  const setContent = (newContent: string) => {
    if (newContent.length > 0) {
      content.current = newContent;
    }
  };

  const onSubmit = async () => {
    onCreate(
      {
        title: title.current,
        content: content.current,
        priority: priority.toLowerCase(),
      } as Note,
      {
        onSuccess: () => {
          setPriority(priorities[2]);
          setTitle('');
          setContent('');
          onClose();
        },
      },
    );
  };

  return (
    <BaseModal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.modalText}>
          <Text style={styles.boldText}>Add Note</Text>
        </Text>
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          editable={!isLoading}
        />
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Content</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline
          onChangeText={setContent}
          editable={!isLoading}
        />
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Priority</Text>
        <View style={styles.prioritySection}>
          {priorities.map((p, i) => {
            const _style = {
              backgroundColor:
                p === priority ? prioritiesColors[i] : 'transparent',
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
              <Text style={styles.textStyle}>Add Note</Text>
            )}
          </TouchableOpacity>
          <View style={styles.horizontalSeparator} />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            disabled={isLoading}>
            <Text style={[styles.textStyle, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

export default NewNoteModal;
