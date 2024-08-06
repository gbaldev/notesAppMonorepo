import React, {PropsWithChildren} from 'react';
import {
  Modal,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './styles';

interface BaseModalProps {
  visible: boolean;
  onRequestClose?: () => void;
}

const BaseModal: React.FC<PropsWithChildren<BaseModalProps>> = ({
  visible,
  children,
  onRequestClose,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BaseModal;
