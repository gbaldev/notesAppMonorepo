import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import NavHeader from '../NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const mockUser = {
  givenName: 'John',
};

const mockLogout = jest.fn();

describe('<NavHeader />', () => {
  it('renders default text when user prop is null', () => {
    const {getByText, getByTestId} = render(
      <SafeAreaProvider>
        <NavHeader user={null} onLogout={mockLogout} />
      </SafeAreaProvider>,
    );
    const defaultTextElement = getByText('Happy Note-Taking!');
    expect(defaultTextElement).toBeTruthy();

    const logoutButton = getByTestId('logoutButton');
    fireEvent.press(logoutButton);
  });

  it('renders user name when user prop is provided', () => {
    const {getByText} = render(
      <SafeAreaProvider>
        <NavHeader user={mockUser} onLogout={mockLogout} />,
      </SafeAreaProvider>,
    );

    const userNameElement = getByText('John');
    expect(userNameElement).toBeTruthy();
  });

  it('executes onLogout callback when logout button is pressed', () => {
    const {getByTestId} = render(
      <SafeAreaProvider>
        <NavHeader user={mockUser} onLogout={mockLogout} />
      </SafeAreaProvider>,
    );
    const logoutButton = getByTestId('logoutButton');
    fireEvent.press(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
