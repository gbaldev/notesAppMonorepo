import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {User} from 'react-native-auth0';
import {images} from '@assets';
import {Icon} from '@components';
import useStyles from './styles';

interface NavHeaderProps {
  user: User | null;
  onLogout: () => void;
}
const NavHeader: React.ComponentType<NavHeaderProps> = ({user, onLogout}) => {
  const styles = useStyles();

  return (
    <ImageBackground
      source={images.appbg}
      style={styles.imageBackground}
      imageStyle={styles.imageBackgroundImage}>
      <SafeAreaView />
      <View style={styles.container}>
        <Image source={images.nLogo} style={styles.image} />
        <Text style={[styles.label, !user?.givenName && styles.noUserName]}>
          {user?.givenName ?? 'Happy Note-Taking!'}
        </Text>
        <TouchableOpacity testID="logoutButton" onPress={onLogout}>
          <Icon name="logOut" size={35} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default NavHeader;
