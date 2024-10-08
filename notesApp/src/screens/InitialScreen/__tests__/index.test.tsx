import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import InitialScreen from '@screens/InitialScreen';
import {User} from 'react-native-auth0';

const mockUser: User = {
  givenName: 'John',
  familyName: 'Doe',
  email: 'john.doe@example.com',
  picture: 'https://example.com/john.jpg',
};

describe('InitialScreen', () => {
  const onLoginMock = jest.fn();
  const onInitMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login button when user is not logged in', () => {
    const {getByText} = render(
      <InitialScreen
        onLogin={onLoginMock}
        onInit={onInitMock}
        user={null}
        isLoading={false}
      />,
    );

    expect(getByText('Log in')).toBeTruthy();
  });

  test('displays welcome message when user is logged in', () => {
    const {getByText} = render(
      <InitialScreen
        onLogin={onLoginMock}
        onInit={onInitMock}
        user={mockUser}
        isLoading={false}
      />,
    );

    expect(getByText('Nice to see you again, John!')).toBeTruthy();
  });

  test('calls onLogin when login button is pressed', () => {
    const {getByTestId} = render(
      <InitialScreen
        onLogin={onLoginMock}
        onInit={onInitMock}
        user={null}
        isLoading={false}
      />,
    );

    fireEvent.press(getByTestId('log-in-button'));
    expect(onLoginMock).toHaveBeenCalledTimes(1);
  });

  test('calls onInit after 3 seconds when user is logged in and not loading', async () => {
    jest.useFakeTimers();
    render(
      <InitialScreen
        onLogin={onLoginMock}
        onInit={onInitMock}
        user={mockUser}
        isLoading={false}
      />,
    );

    jest.advanceTimersByTime(3000);

    expect(onInitMock).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  test('does not call onInit when loading', async () => {
    jest.useFakeTimers();
    render(
      <InitialScreen
        onLogin={onLoginMock}
        onInit={onInitMock}
        user={mockUser}
        isLoading={true}
      />,
    );

    jest.advanceTimersByTime(3000);

    expect(onInitMock).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});
