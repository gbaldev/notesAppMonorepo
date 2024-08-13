import React from 'react';
import {View, Text} from 'react-native';
import Icon from '../Icon';
import Separator from '../Separator/Separator';
import styles from './styles';
import {useNetInfo} from '@react-native-community/netinfo';

interface NoConnectionDisclaimerProps {}

const NoConnectionDisclaimer: React.ComponentType<
  NoConnectionDisclaimerProps
> = () => {
  const {isInternetReachable} = useNetInfo();

  return !isInternetReachable ? (
    <View style={styles.disclaimerContainer}>
      <Icon name="alert" size={35} />
      <Separator height={5} />
      <Text style={styles.disclaimerLabel}>
        You are running on the offline mode, data will be synced once you get
        normal conection again
      </Text>
    </View>
  ) : null;
};

export default NoConnectionDisclaimer;
