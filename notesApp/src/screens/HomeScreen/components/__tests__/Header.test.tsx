import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../Header';
import {Filter} from '@models';

describe('Header Component', () => {
  const mockSetFilter = jest.fn();
  const mockOnAddItem = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with active filter', () => {
    const {getByTestId} = render(
      <Header
        onAddItem={mockOnAddItem}
        filter={Filter.ACTIVE}
        setFilter={mockSetFilter}
        unscyncedNotes={0}
      />,
    );

    expect(getByTestId('HeaderTitle').props.children).toBe('My Notes');
    expect(
      getByTestId('ActiveFilterButton').props.style.borderBottomWidth,
    ).toBe(1);
  });

  it('calls setFilter when Active filter is pressed', () => {
    const {getByTestId} = render(
      <Header
        onAddItem={mockOnAddItem}
        filter={null}
        setFilter={mockSetFilter}
        unscyncedNotes={0}
      />,
    );

    fireEvent.press(getByTestId('ActiveFilterButton'));
    expect(mockSetFilter).toHaveBeenCalledWith(Filter.ACTIVE);
  });

  it('calls setFilter when Deleted filter is pressed', () => {
    const {getByTestId} = render(
      <Header
        onAddItem={mockOnAddItem}
        filter={null}
        setFilter={mockSetFilter}
        unscyncedNotes={0}
      />,
    );

    fireEvent.press(getByTestId('DeletedFilterButton'));
    expect(mockSetFilter).toHaveBeenCalledWith(Filter.DELETED);
  });

  it('calls setFilter when All filter is pressed', () => {
    const {getByTestId} = render(
      <Header
        onAddItem={mockOnAddItem}
        filter={null}
        setFilter={mockSetFilter}
        unscyncedNotes={0}
      />,
    );

    fireEvent.press(getByTestId('AllFilterButton'));
    expect(mockSetFilter).toHaveBeenCalledWith(Filter.ALL);
  });

  it('calls setFilter when Unsynced filter is pressed', () => {
    const {getByTestId} = render(
      <Header
        onAddItem={mockOnAddItem}
        filter={null}
        setFilter={mockSetFilter}
        unscyncedNotes={0}
      />,
    );

    fireEvent.press(getByTestId('UnsyncedFilterButton'));
    expect(mockSetFilter).toHaveBeenCalledWith(Filter.UNSYNCED);
  });

  it('renders unsynced badge when unscyncedNotes is greater than 0', () => {
    const {getByTestId} = render(
      <Header
        onAddItem={mockOnAddItem}
        filter={null}
        setFilter={mockSetFilter}
        unscyncedNotes={5}
      />,
    );

    expect(getByTestId('UnsyncedBadgeContainer')).toBeTruthy();
    expect(getByTestId('UnsyncedBadgeText').props.children).toBe(5);
  });

  it('calls onAddItem when add button is pressed', () => {
    const {getByTestId} = render(
      <Header
        onAddItem={mockOnAddItem}
        filter={null}
        setFilter={mockSetFilter}
        unscyncedNotes={0}
      />,
    );

    fireEvent.press(getByTestId('AddItemButton'));
    expect(mockOnAddItem).toHaveBeenCalled();
  });
});
