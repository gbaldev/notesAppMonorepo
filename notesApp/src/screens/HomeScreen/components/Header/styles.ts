import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 25,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#2f0000',
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
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 50,
    padding: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#2f0000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
