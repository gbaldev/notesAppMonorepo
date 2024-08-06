import React from 'react';
import {Text, TouchableOpacity, ImageBackground, View} from 'react-native';
import Icon from '../../../../components/Icon';
import styles from './styles';

interface HeaderProps {
  onAddItem: () => void;
}

const Header: React.ComponentType<HeaderProps> = ({onAddItem}) => (
  <ImageBackground
    source={require('../../../../assets/images/bg2.jpg')}
    imageStyle={styles.image}
    style={styles.container}>
    <View style={styles.innerContainer}>
      <Text style={styles.label}>My Notes</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={onAddItem}>
        <Icon name="add" size={30} />
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

export default Header;
