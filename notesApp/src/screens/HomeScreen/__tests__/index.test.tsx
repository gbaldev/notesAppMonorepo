import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Note, NoteStatus} from '@models';
import HomeScreen from '@screens/HomeScreen';
import {DateTime} from 'luxon';

jest.mock('@screens/HomeScreen/components', () => {
  const {View, Text, TextInput, TouchableOpacity} = require('react-native');
  return {
    NavHeader: ({user, onLogout}: any) => (
      <View testID="nav-header">
        <Text>{user ? user.name : 'Guest'}</Text>
        <TouchableOpacity onPress={onLogout}>Logout</TouchableOpacity>
      </View>
    ),
    Header: ({onAddItem}: any) => (
      <View testID="header">
        <TouchableOpacity testID="add-note" onPress={onAddItem}>
          Add Note
        </TouchableOpacity>
      </View>
    ),
    NewNoteModal: ({visible, onClose, onCreate}: any) =>
      visible ? (
        <View testID="new-note-modal">
          <TextInput testID="title-input" placeholder="Title" />
          <TextInput testID="content-input" placeholder="Content" />
          <TouchableOpacity
            testID="create-note-button"
            onPress={() => {
              onCreate({title: 'New Note', content: 'This is a new note.'});
              onClose();
            }}>
            Create
          </TouchableOpacity>
          <TouchableOpacity testID="cancel-button" onPress={onClose}>
            Cancel
          </TouchableOpacity>
        </View>
      ) : null,
  };
});

jest.mock('@components', () => {
  const {View, Text, TouchableOpacity} = require('react-native');
  return {
    NoConnectionDisclaimer: () => <View testID="no-connection" />,
    NoteCard: ({item, onEdit, onDeleteItem}: any) => (
      <View testID={`note-card-${item.id}`}>
        <Text>{item.title}</Text>
        <TouchableOpacity onPress={() => onEdit(item)}>Edit</TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteItem(item)}>
          Delete
        </TouchableOpacity>
      </View>
    ),
  };
});

describe('HomeScreen', () => {
  const mockOnLogout = jest.fn();
  const mockOnCreateNote = jest.fn();
  const mockOnDeleteNote = jest.fn();
  const mockOnUpdateNote = jest.fn();
  const mockReloadNotes = jest.fn();
  const mockOnRefresh = jest.fn();
  const dateMock = DateTime.now().toISO();
  const notes: Note[] = [
    {
      _id: '1',
      title: 'Note 1',
      content: 'Content 1',
      status: NoteStatus.ACTIVE,
      editedAt: dateMock,
      isSynced: true,
      createdAt: dateMock,
      priority: 'high',
    },
    {
      _id: '2',
      title: 'Note 2',
      content: 'Content 2',
      status: NoteStatus.ACTIVE,
      editedAt: dateMock,
      isSynced: true,
      createdAt: dateMock,
      priority: 'high',
    },
  ];

  it('renders the header and notes', () => {
    const {getByTestId, getByText} = render(
      <HomeScreen
        user={null}
        notes={notes}
        unsyncedNotes={0}
        onLogout={mockOnLogout}
        onCreateNote={mockOnCreateNote}
        onDeleteNote={mockOnDeleteNote}
        onUpdateNote={mockOnUpdateNote}
        reloadNotes={mockReloadNotes}
        isLoading={false}
        onRefresh={mockOnRefresh}
        isDeleting={false}
        isCreating={false}
        isUpdating={false}
        isError={false}
        isInternetReachable={true}
      />,
    );

    expect(getByTestId('nav-header')).toBeTruthy();
    expect(getByTestId('header')).toBeTruthy();

    expect(getByText('Note 1')).toBeTruthy();
    expect(getByText('Note 2')).toBeTruthy();
  });

  it('opens the NewNoteModal when the Add Note button is pressed', async () => {
    const {getByTestId} = render(
      <HomeScreen
        user={null}
        notes={notes}
        unsyncedNotes={0}
        onLogout={mockOnLogout}
        onCreateNote={mockOnCreateNote}
        onDeleteNote={mockOnDeleteNote}
        onUpdateNote={mockOnUpdateNote}
        reloadNotes={mockReloadNotes}
        isLoading={false}
        onRefresh={mockOnRefresh}
        isDeleting={false}
        isCreating={false}
        isUpdating={false}
        isError={false}
        isInternetReachable={true}
      />,
    );

    fireEvent.press(getByTestId('add-note'));

    const modal = getByTestId('new-note-modal');
    expect(modal).toBeTruthy();

    fireEvent.changeText(getByTestId('title-input'), 'New Note');
    fireEvent.changeText(getByTestId('content-input'), 'This is a new note.');

    fireEvent.press(getByTestId('create-note-button'));

    await waitFor(() => expect(mockOnCreateNote).toHaveBeenCalled());
  });

  it('displays a message when there are no notes', () => {
    const {getByText} = render(
      <HomeScreen
        user={null}
        notes={[]}
        unsyncedNotes={0}
        onLogout={mockOnLogout}
        onCreateNote={mockOnCreateNote}
        onDeleteNote={mockOnDeleteNote}
        onUpdateNote={mockOnUpdateNote}
        reloadNotes={mockReloadNotes}
        isLoading={false}
        onRefresh={mockOnRefresh}
        isDeleting={false}
        isCreating={false}
        isUpdating={false}
        isError={false}
        isInternetReachable={true}
      />,
    );

    expect(getByText("You don't have active notes to display")).toBeTruthy();
  });
});
