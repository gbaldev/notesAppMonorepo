import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {width: Dimensions.get('window').width * 0.7},
  addButton: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    backgroundColor: 'black',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  cancelButton: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'stretch',
    flex: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prioritySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  checkbox: {
    marginRight: 5,
    borderRadius: 3,
    height: 15,
    width: 15,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  sectionTitle: {fontWeight: '500', color: 'gray', marginBottom: 8},
  input: {
    width: '100%',
    borderWidth: 0.2,
    padding: 7,
    borderRadius: 5,
    borderColor: 'gray',
  },
  separator: {height: 15},
  titleSeparator: {height: 5},
  cancelText: {
    color: 'black',
    fontWeight: '500',
  },
  horizontalSeparator: {width: 10},
  actionsContainer: {flexDirection: 'row'},
  bottomSeparator: {
    height: 30,
  },
});
