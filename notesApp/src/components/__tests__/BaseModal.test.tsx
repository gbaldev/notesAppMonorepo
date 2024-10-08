import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Text} from 'react-native';
import BaseModal from '@components/BaseModal';

describe('BaseModal Component', () => {
  it('should render modal when visible is true', () => {
    const {getByTestId} = render(
      <BaseModal visible={true}>
        <Text>Modal Content</Text>
      </BaseModal>,
    );

    expect(getByTestId('BaseModal')).toBeTruthy();
  });

  it('should not render modal when visible is false', () => {
    const {queryByTestId} = render(
      <BaseModal visible={false}>
        <Text>Modal Content</Text>
      </BaseModal>,
    );

    expect(queryByTestId('BaseModal')).toBeNull();
  });

  it('should call onRequestClose when the modal is closed', () => {
    const mockOnRequestClose = jest.fn();

    const {getByTestId} = render(
      <BaseModal visible={true} onRequestClose={mockOnRequestClose}>
        <Text>Modal Content</Text>
      </BaseModal>,
    );

    fireEvent(getByTestId('BaseModal'), 'requestClose');

    expect(mockOnRequestClose).toHaveBeenCalled();
  });
});
