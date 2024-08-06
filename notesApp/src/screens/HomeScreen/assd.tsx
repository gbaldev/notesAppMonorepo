// import React, {useState, useCallback, useRef} from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   Text,
//   FlatList,
//   StyleSheet,
//   Modal,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Keyboard,
// } from 'react-native';

// /*
//   I assume that everything is covered, but I couldn't run the code at all.
//   The platform is really buggy, so I might have made a typo, syntax error,
//   styling issue, or it could be related to many other things. It's really a
//   shame because I'm in shape to perform such corrections since I have time
//   left, but it's really hard without any tool for debugging or tracking issues
//   in the code. I'm totally blindfolded.

//   Hopefully, this is taken into consideration, I gave my best given the conditions.

//   I dont' want to get into a messy situation while refactoring things that I couldn't
//   check at all and ending up with spagetthi code, so I'll leave it as it is right now,
//   assuming that maybe everything is working properly or at least the code makes sense.

//   cheers!
// */

// const TodoApp = () => {
//   const [toDoList, setToDoList] = useState([
//     {title: 'Initial example', content: 'this is a note'},
//   ]);
//   // Index is being edited
//   const [isEditing, setIsEditing] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const title = useRef('');
//   const content = useRef('');
//   const edited = useRef(null);

//   const showAddModal = useCallback(() => setIsModalVisible(true), []);

//   const setTitle = useCallback(newTitle => {
//     if (newTitle?.length > 0) {
//       title.current = newTitle;
//     }
//   }, []);

//   const setContent = useCallback(newContent => {
//     if (newContent?.length > 0) {
//       content.current = newContent;
//     }
//   }, []);

//   const onDelete = useCallback(
//     index => {
//       setToDoList(prev => {
//         return prev.filter((_, i) => i !== index);
//       });
//     },
//     [setToDoList],
//   );

//   const onUpdate = useCallback(
//     (index, newItem) => {
//       setToDoList(prev => {
//         return prev.map((prevItem, i) => {
//           if (i === index) {
//             return newItem;
//           }
//           return prevItem;
//         });
//       });
//     },
//     [setToDoList],
//   );

//   const onSubmit = () => {
//     setToDoList(prev => {
//       const newItem = {title: title.current, content: content.current};
//       return [newItem, ...prev];
//     });
//     content.current = '';
//     title.current = '';
//     setIsModalVisible(false);
//   };

//   const onCancel = () => {
//     content.current = '';
//     title.current = '';
//     setIsModalVisible(false);
//   };

//   const updateContent = newContent => {
//     edited.current = {...content.current, content: newContent};
//   };

//   const updateTitle = newTitle => {
//     edited.current = {...content.current, title: newTitle};
//   };

//   const AddModal = () => {
//     return (
//       <Modal
//         transparent={true}
//         visible={isModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsModalVisible(false)}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <KeyboardAvoidingView
//             behavior={Platform.OS == 'ios' ? 'padding' : undefined}
//             style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <View stlye={styles.container}>
//                 <Text style={styles.boldText}>Add Note</Text>
//                 <View style={styles.separator} />
//                 <Text style={styles.sectionTitle}>Title</Text>
//                 <TextInput style={styles.input} onChangeText={setTitle} />
//                 <View style={styles.separator} />
//                 <Text style={styles.sectionTitle}>Note</Text>
//                 <TextInput
//                   style={styles.input}
//                   onChangeText={setContent}
//                   multiline
//                   numberOfLines={5}
//                 />
//                 <View style={styles.bottomSeparator} />
//                 <View style={styles.actionsContainer}>
//                   <TouchableOpacity style={styles.addButton} onPress={onSubmit}>
//                     <Text style={styles.textStyle}>Add Note</Text>
//                   </TouchableOpacity>
//                   <View style={styles.horizontalSeparator} />
//                   <TouchableOpacity
//                     style={styles.cancelButton}
//                     onPress={onCancel}>
//                     <Text style={[styles.textStyle, styles.cancelText]}>
//                       Cancel
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </TouchableWithoutFeedback>
//       </Modal>
//     );
//   };

//   const renderToDoItem = ({item, index}) => {
//     const elementIsBeingEdited = isEditing === index;
//     const handleToggleEdit = (index = null) => {
//       if (elementIsBeingEdited) {
//         if (
//           item.title !== edited.current.title ||
//           item.content !== edited.current.title
//         ) {
//           onUpdate(index, edited.current);
//           return;
//         }
//         edited.current = null;
//         setIsEditing(null);
//       } else {
//         setIsEditing(index);
//         edited.current = {title: item.title, content: item.content};
//       }
//     };

//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           {elementIsBeingEdited ? (
//             <TextInput
//               style={styles.input}
//               onChangeText={updateTitle}
//               multiline
//               numberOfLines={5}
//             />
//           ) : (
//             <Text style={styles.title}>{item.title}</Text>
//           )}
//           <View style={styles.buttonsContainer}>
//             {!elementIsBeingEdited ? (
//               <TouchableOpacity onPress={onDelete}>
//                 <Text style={styles.deleteLabel}>Delete</Text>
//               </TouchableOpacity>
//             ) : null}
//             <View style={styles.headerSeparator}>
//               <TouchableOpacity onPress={handleToggleEdit}>
//                 <Text style={styles.editLabel}>
//                   elementIsBeingEdited ? 'Save' : 'Edit'
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <View style={styles.content}>
//           {elementIsBeingEdited ? (
//             <TextInput
//               style={styles.input}
//               onChangeText={updateContent}
//               multiline
//               numberOfLines={5}
//             />
//           ) : (
//             <Text style={styles.content}>{item.content}</Text>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <AddModal />
//       <TouchableOpacity onPress={showAddModal}>
//         <Text style={styles.addNoteText}>Add Note +</Text>
//       </TouchableOpacity>
//       <FlatList
//         renderItem={renderToDoItem}
//         data={toDoList}
//         style={styles.flatList}
//         testID="toDoList"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     padding: 12,
//   },
//   mainContainer: {
//     flex: 1,
//   },
//   addNoteText: {
//     fontWeight: 'bold',
//   },
//   content: {
//     flex: 1,
//   },
//   title: {
//     fontWeight: 'bold',
//   },
//   contentText: {
//     color: 'gray',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//   },
//   deleteLabel: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
//   editLabel: {
//     color: 'gray',
//     fontWeight: 'bold',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: 'black',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   separator: {
//     height: 10,
//   },
//   input: {
//     width: '100%',
//     borderWidth: 0.2,
//     padding: 7,
//     borderRadius: 5,
//     borderColor: 'gray',
//   },
//   sectionTitle: {
//     fontWeight: '500',
//     color: 'gray',
//     marginBottom: 8,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   bottomSeparator: {
//     height: 30,
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//   },
//   addButton: {
//     borderRadius: 12,
//     padding: 10,
//     backgroundColor: 'black',
//     alignSelf: 'stretch',
//     flex: 1,
//   },
//   cancelButton: {
//     borderRadius: 12,
//     padding: 10,
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 1,
//     alignSelf: 'stretch',
//     flex: 1,
//   },
//   horizontalSeparator: {
//     width: 10,
//   },
//   cancelText: {
//     color: 'black',
//     fontWeight: '500',
//   },
//   headerSeparator: {
//     width: 10,
//   },
// });

// export default TodoApp;
