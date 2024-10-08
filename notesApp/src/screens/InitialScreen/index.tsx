import React, {useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  View,
} from 'react-native';
import {User} from 'react-native-auth0';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {images} from '@assets';
import styles from './styles';

interface InitialScreenProps {
  onLogin: () => void;
  onInit: () => void;
  user: User | null;
  isLoading: boolean;
}

const InitialScreen: React.ComponentType<InitialScreenProps> = ({
  onLogin,
  onInit,
  user,
  isLoading,
}) => {
  const position = useSharedValue(0);
  const opacity = useSharedValue(0);
  const isLoggedIn = !!user;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      bottom: position.value,
    };
  });
  const animatedSyle2 = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    let y = Dimensions.get('screen').height / 2;
    position.value = withSpring(y);
    opacity.value = withDelay(700, withTiming(1, {duration: 1000}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (!isLoading) {
      if (isLoggedIn) {
        timeout = setTimeout(onInit, 3000);
      }
    }
    return () => clearTimeout(timeout);
  }, [isLoading, isLoggedIn, onInit]);

  const userName = useMemo(
    () =>
      user && user.givenName && user.givenName.length > 0
        ? `, ${user?.givenName}`
        : '',
    [user],
  );

  return (
    <ImageBackground source={images.appbg} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={animatedStyle}>
          <Image
            source={images.nLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View style={[styles.button, animatedSyle2]}>
          <View>
            {!user ? (
              <>
                <View style={styles.labelView}>
                  <Text style={styles.buttonLabel}>Log in</Text>
                </View>
                <TouchableOpacity
                  testID="log-in-button"
                  onPress={onLogin}
                  style={styles.loginButton}
                />
              </>
            ) : (
              <Text style={[styles.welcomeLabel]}>
                {`Nice to see you again${userName}!`}
              </Text>
            )}
          </View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default InitialScreen;
