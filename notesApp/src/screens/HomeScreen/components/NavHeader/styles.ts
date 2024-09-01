import {Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    imageBackground: {
      paddingTop: Platform.select({android: 72, ios: insets.top * 2}),
    },
    imageBackgroundImage: {
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    container: {
      position: 'absolute',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 16,
      alignItems: 'center',
      flexDirection: 'row',
      top: Platform.select({android: 20, ios: insets.top}),
      borderBottomRightRadius: 25,
      borderBottomLeftRadius: 25,
    },
    image: {height: 35, width: 35},
    label: {
      flexGrow: 1,
      paddingHorizontal: 20,
      fontWeight: '200',
      fontSize: 26,
    },
    noUserName: {fontSize: 22},
  });
};

export default useStyles;
