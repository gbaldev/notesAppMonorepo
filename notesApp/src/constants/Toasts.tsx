import {Dimensions, Platform, ViewStyle} from 'react-native';
import Toast from 'react-native-root-toast';
import colors from './colors';

const containerStyle: ViewStyle = {
  width: Dimensions.get('screen').width - 30,
  opacity: 1,
  flexGrow: 1,
  padding: 16,
  margin: 10,
  borderRadius: 20,
  ...Platform.select({
    ios: {
      shadowColor: colors.shadowColor,
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
};

export const createSuccessToast = () => {
  Toast.show('Note created successfully!', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.toastGreen,
    containerStyle,
  });
};

export const updateSuccessToast = () => {
  Toast.show('Note updated successfully!', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.toastOrange,
    containerStyle,
  });
};

export const deleteSuccessToast = () => {
  Toast.show('Note deleted successfully!', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.toastRed,
    containerStyle,
  });
};

export const errorToast = ({action}: {action: string}) => {
  Toast.show(`Failed to ${action} the note. Please try again.`, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.toastRed,
    containerStyle,
  });
};

export const syncErrorToast = () => {
  Toast.show('Sync incomplete. Will retry later.', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.toastRed,
    containerStyle,
  });
};

export const syncSuccessToast = () => {
  Toast.show('Sync completed successfully!', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.toastGreen,
    containerStyle,
  });
};
