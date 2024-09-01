import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNetInfo} from '@react-native-community/netinfo';
import {Icon, Separator} from '@components';

interface NoConnectionDisclaimerProps {}

const NoConnectionDisclaimer: React.ComponentType<
  NoConnectionDisclaimerProps
> = () => {
  const {isInternetReachable} = useNetInfo();
  const [showDisclimer, setShowDisclaimer] = useState<boolean>(true);
  const TextIcon = useCallback(
    () => (
      <View style={styles.iconContainer}>
        <Icon name="cloudUpload" size={20} color={'gray'} />
      </View>
    ),
    [],
  );

  const Disclaimer = useCallback(() => {
    if (showDisclimer) {
      return (
        <View style={styles.disclaimerContainer}>
          <TouchableOpacity
            onPress={() => setShowDisclaimer(false)}
            style={styles.closeButton}>
            <Icon name="close" color="gray" size={26} />
          </TouchableOpacity>
          <Icon name="alert" size={35} />
          <Separator height={5} />
          <Text style={styles.disclaimerLabel}>
            You are running on the offline mode, unsynced data {<TextIcon />}{' '}
            will be synced once you have a stable connection again.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.disclaimerContainer}>
          <View style={styles.shortDisclaimerContainer}>
            <Icon name="alert" size={26} />
            <Separator width={10} />
            <Text style={styles.disclaimerLabel}>Running on Offline mode</Text>
          </View>
        </View>
      );
    }
  }, [TextIcon, showDisclimer]);

  return !isInternetReachable ? <Disclaimer /> : null;
};

export default NoConnectionDisclaimer;
