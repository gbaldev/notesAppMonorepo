import {Platform, StyleProp, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 16,
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
    borderBottomColor: '#fc9502',
  },
  headerlow: {
    borderBottomColor: '#959595',
  },
  headermedium: {
    borderBottomColor: '#02a1fc',
  },
  content: {color: 'gray'},
  titleContainer: {
    flexShrink: 1,
    flexDirection: 'row',
  },
  lastModified: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 10,
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
}) as {[key: string]: StyleProp<any>};
