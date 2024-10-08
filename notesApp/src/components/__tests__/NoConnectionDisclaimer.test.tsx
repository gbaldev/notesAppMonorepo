import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import NoConnectionDisclaimer from '../NoConnectionDisclaimer';
import {useNetInfo} from '@react-native-community/netinfo';

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: jest.fn(),
}));

jest.mock('@components', () => ({
  Icon: ({name}: {name: string}) => <>{name}</>,
  Separator: ({height, width}: {height?: number; width?: number}) => (
    <>{`Separator ${height || width}`}</>
  ),
}));

describe('NoConnectionDisclaimer', () => {
  it('Should display the complete disclaimer when there is no internet connection', () => {
    (useNetInfo as jest.Mock).mockReturnValue({isInternetReachable: false});

    const {getByTestId} = render(<NoConnectionDisclaimer />);

    const disclaimer = getByTestId('Disclaimer');
    expect(disclaimer).toBeTruthy();
  });

  it('Should display a reduced disclaimer when the user closes it', () => {
    (useNetInfo as jest.Mock).mockReturnValue({isInternetReachable: false});

    const {getByTestId, queryByTestId} = render(<NoConnectionDisclaimer />);

    const closeButton = getByTestId('closeButton');
    fireEvent.press(closeButton);

    expect(queryByTestId('Disclaimer')).toBeNull();
    const collapsedDisclaimer = getByTestId('DisclaimerCollapsed');
    expect(collapsedDisclaimer).toBeTruthy();
  });

  it("The disclaimer shouldn't be shown if there is no internet connection", () => {
    (useNetInfo as jest.Mock).mockReturnValue({isInternetReachable: true});

    const {queryByTestId} = render(<NoConnectionDisclaimer />);

    expect(queryByTestId('Disclaimer')).toBeNull();
    expect(queryByTestId('DisclaimerCollapsed')).toBeNull();
  });
});
