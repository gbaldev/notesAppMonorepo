import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import NoteCard from '../NoteCard';
import {Note, NoteStatus} from '@models';
import {UseMutateFunction} from '@tanstack/react-query';

const mockNote: Note = {
  _id: '1',
  title: 'Test Note',
  content: 'This is a test note.',
  editedAt: '2023-10-05T10:30:00.000Z',
  status: NoteStatus.ACTIVE,
  isSynced: false,
  priority: 'high',
  createdAt: '2023-10-05T10:30:00.000Z',
};

jest.mock('@constants/Toasts', () => ({
  deleteSuccessToast: jest.fn(),
  errorToast: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => {
  return {
    useNetInfo: jest.fn().mockReturnValue({
      isInternetReachable: true,
    }),
  };
});

const mockOnDeleteItem: UseMutateFunction<any, unknown, string, unknown> =
  jest.fn();
const mockReloadNotes = jest.fn();
const mockOnEdit = jest.fn();

describe('NoteCard', () => {
  it('should display the note details correctly', () => {
    const {getByTestId} = render(
      <NoteCard
        item={mockNote}
        onDeleteItem={mockOnDeleteItem}
        reloadNotes={mockReloadNotes}
        onEdit={mockOnEdit}
      />,
    );

    expect(getByTestId('NoteCardTitle').props.children).toBe(mockNote.title);
    expect(getByTestId('NoteCardContent').props.children).toBe(
      mockNote.content,
    );
    expect(getByTestId('NoteCardLastModified').props.children).toContain(
      '10/05/2023, 7:30:00 AM',
    );
  });

  it('should call onEdit when edit button is pressed', () => {
    const {getByTestId} = render(
      <NoteCard
        item={mockNote}
        onDeleteItem={mockOnDeleteItem}
        reloadNotes={mockReloadNotes}
        onEdit={mockOnEdit}
      />,
    );

    fireEvent.press(getByTestId('EditButton'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockNote);
  });

  it('should call onDeleteItem when delete button is pressed', async () => {
    const {getByTestId} = render(
      <NoteCard
        item={mockNote}
        onDeleteItem={mockOnDeleteItem}
        reloadNotes={mockReloadNotes}
        onEdit={mockOnEdit}
      />,
    );

    fireEvent.press(getByTestId('DeleteButton'));
    await waitFor(() =>
      expect(mockOnDeleteItem).toHaveBeenCalledWith(
        mockNote._id,
        expect.anything(),
      ),
    );
  });

  it('should display an ActivityIndicator while deleting', () => {
    const {getByTestId, rerender} = render(
      <NoteCard
        item={mockNote}
        onDeleteItem={mockOnDeleteItem}
        reloadNotes={mockReloadNotes}
        onEdit={mockOnEdit}
      />,
    );

    rerender(
      <NoteCard
        item={mockNote}
        onDeleteItem={mockOnDeleteItem}
        reloadNotes={mockReloadNotes}
        onEdit={mockOnEdit}
      />,
    );

    fireEvent.press(getByTestId('DeleteButton'));
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('should show a cloud upload icon if the note is not synced', () => {
    const {getByTestId} = render(
      <NoteCard
        item={mockNote}
        onDeleteItem={mockOnDeleteItem}
        reloadNotes={mockReloadNotes}
        onEdit={mockOnEdit}
      />,
    );

    expect(getByTestId('CloudUploadButton')).toBeTruthy();
  });
});
