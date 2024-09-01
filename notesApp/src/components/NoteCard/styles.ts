import {Platform, StyleProp, StyleSheet} from 'react-native';
import colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
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
  },
  header: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    flexShrink: 1,
  },
  headerhigh: {
    borderBottomColor: colors.orange,
  },
  headerlow: {
    borderBottomColor: colors.softGray,
  },
  headermedium: {
    borderBottomColor: colors.softBlue,
  },
  content: {color: colors.gray},
  titleContainer: {
    flexShrink: 1,
    flexDirection: 'row',
  },
  lastModified: {
    color: colors.gray,
    fontStyle: 'italic',
    fontSize: 10,
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
  deleted: {
    color: colors.wine05,
    fontWeight: '600',
    fontSize: 10,
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
  deletedBorder: {
    borderLeftColor: colors.red05,
    borderLeftWidth: 3,
  },
  activeBorder: {
    borderLeftColor: colors.green05,
    borderLeftWidth: 3,
  },
}) as {[key: string]: StyleProp<any>};
