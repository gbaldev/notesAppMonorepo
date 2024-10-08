import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {priorities} from '@constants';
import {Note, NoteStatus} from '@models';
import {errorToast} from '@constants/Toasts';
import {DateTime} from 'luxon';
import NewNoteModal from '../NewNoteModal';

jest.mock('@constants/Toasts', () => ({
  createSuccessToast: jest.fn(),
  updateSuccessToast: jest.fn(),
  errorToast: jest.fn(),
}));

describe('NewNoteModal', () => {
  const mockOnClose = jest.fn();
  const mockOnCreate = jest.fn();
  const mockOnUpdate = jest.fn();
  const mockReloadNotes = jest.fn();

  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    onCreate: mockOnCreate,
    onUpdate: mockOnUpdate,
    reloadNotes: mockReloadNotes,
    note: null,
    isLoading: false,
  };

  const noteMock: Note = {
    _id: '1',
    title: 'Sample Note',
    content: 'Sample Content',
    priority: priorities[1],
    createdAt: DateTime.now().toISO(),
    editedAt: DateTime.now().toISO(),
    status: NoteStatus.DELETED,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {getByTestId} = render(<NewNoteModal {...defaultProps} />);

    const label = getByTestId('action-describer');
    expect(label.props.children).toBe('Add Note');
    expect(getByTestId('title-input')).toBeTruthy();
  });

  it('displays loading indicator when isLoading is true', () => {
    const {getByTestId} = render(
      <NewNoteModal {...defaultProps} isLoading={true} />,
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('calls onCreate when submitting a new note', async () => {
    const {getByTestId} = render(<NewNoteModal {...defaultProps} />);

    fireEvent.changeText(getByTestId('title-input'), 'New Note Title');
    fireEvent.changeText(getByTestId('content-input'), 'New Note Content');

    fireEvent.press(getByTestId('action-button'));

    await waitFor(() =>
      expect(mockOnCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Note Title',
          content: 'New Note Content',
        }),
        expect.anything(),
      ),
    );
  });

  it('calls onUpdate when updating an existing note', async () => {
    const {getByTestId} = render(
      <NewNoteModal {...defaultProps} note={noteMock} />,
    );

    fireEvent.changeText(getByTestId('title-input'), 'Updated Note Title');
    fireEvent.press(getByTestId('action-button'));

    await waitFor(() =>
      expect(mockOnUpdate).toHaveBeenCalledWith(
        expect.objectContaining({title: 'Updated Note Title'}),
        expect.anything(),
      ),
    );
  });

  it('resets state and calls onClose when cancel button is pressed', () => {
    const {getByTestId} = render(<NewNoteModal {...defaultProps} />);

    fireEvent.press(getByTestId('cancel-button'));

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnCreate).not.toHaveBeenCalled();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it('disables the submit button when title or content are empty', () => {
    const {getByTestId} = render(<NewNoteModal {...defaultProps} />);

    const addButton = getByTestId('action-button');
    expect(addButton.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(getByTestId('title-input'), 'New Note Title');
    expect(addButton.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(getByTestId('content-input'), 'New Note Content');
    expect(addButton.props.accessibilityState.disabled).toBe(false);
  });

  it('handles error onCreate', async () => {
    mockOnCreate.mockImplementationOnce((_note, {onError}) => onError());

    const {getByTestId} = render(<NewNoteModal {...defaultProps} />);

    fireEvent.changeText(getByTestId('title-input'), 'New Note Title');
    fireEvent.changeText(getByTestId('content-input'), 'New Note Content');

    fireEvent.press(getByTestId('action-button'));

    await waitFor(() =>
      expect(errorToast).toHaveBeenCalledWith({action: 'create'}),
    );
  });
});
