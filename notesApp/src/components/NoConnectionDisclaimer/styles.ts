import {Platform, StyleSheet} from 'react-native';
import colors from '@constants/colors';

export default StyleSheet.create({
  disclaimerLabel: {
    fontWeight: '400',
    color: colors.gray,
    flexShrink: 1,
    textAlign: 'center',
    padding: 5,
    lineHeight: 20,
  },
  iconContainer: {
    marginBottom: -5,
    paddingHorizontal: 5,
    marginRight: -5,
  },
  disclaimerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    margin: 10,
    flexShrink: 1,
    borderRadius: 25,
    backgroundColor: colors.white,
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
  },
  closeButton: {position: 'absolute', top: 15, right: 20},
  shortDisclaimerContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
