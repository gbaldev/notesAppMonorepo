import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from '../../../../components/Icon';
import {User} from 'react-native-auth0';
import useStyles from './styles';

interface NavHeaderProps {
  user: User | null;
  onLogout: () => void;
}
const NavHeader: React.ComponentType<NavHeaderProps> = ({user, onLogout}) => {
  const styles = useStyles();

  return (
    <ImageBackground
      source={require('../../../../assets/images/bg2.jpg')}
      style={styles.imageBackground}
      imageStyle={styles.imageBackgroundImage}>
      <SafeAreaView />
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/images/n.png')}
          style={styles.image}
        />
        <Text style={styles.label}>{user?.givenName}</Text>
        <TouchableOpacity onPress={onLogout}>
          <Icon name="logOut" size={35} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default NavHeader;
