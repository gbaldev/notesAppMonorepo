import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexShrink: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  flatlist: {width: '100%', flexGrow: 1, height: '100%'},
  emptyCardContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  label: {
    color: 'gray',
    fontWeight: '400',
  },
  noData: {flexGrow: 1, justifyContent: 'center'},
  headerContainer: {marginHorizontal: 12},
});
