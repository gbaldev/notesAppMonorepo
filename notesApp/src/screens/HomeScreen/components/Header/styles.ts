import {Platform, StyleSheet} from 'react-native';
import colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 25,
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: colors.wine,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {borderRadius: 25},
  innerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {fontSize: 20, height: 30, fontWeight: '200'},
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  underlined: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  iconContainer: {
    backgroundColor: colors.white08,
    borderRadius: 50,
    padding: 5,
    ...Platform.select({
      ios: {
        shadowColor: colors.wine,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  flexGrow: {flexGrow: 1},
  unsyncedText: {
    color: colors.white,
    fontSize: 10,
    padding: 2,
  },
  unsyncedBadge: {
    minWidth: 18,
    minHeight: 18,
    marginTop: -5,
    marginLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.toastRed,
  },
  row: {flexDirection: 'row'},
});
