import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  disclaimerLabel: {
    fontWeight: '400',
    color: 'gray',
    flexShrink: 1,
    textAlign: 'center',
    padding: 5,
  },
  disclaimerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    margin: 10,
    flexShrink: 1,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 1)',
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
});
