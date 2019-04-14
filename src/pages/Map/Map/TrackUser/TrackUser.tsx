import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { color, shadow } from 'src/theme';

interface Props {
  handlePress: () => void;
  active: boolean;
}

const trackUserSize = 50;

const styles = StyleSheet.create({
  button: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginBottom: 16,
    marginRight: 16,
    width: trackUserSize,
    height: trackUserSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: trackUserSize / 2,
    backgroundColor: color.white,
    ...shadow.shallow,
  },
  icon: {
    width: trackUserSize * 0.42,
    height: trackUserSize * 0.42,
    resizeMode: 'contain',
  },
});

const TrackUser: React.FC<Props> = ({ handlePress, active }) => (
  <TouchableOpacity
    style={styles.button}
    activeOpacity={1}
    onPress={handlePress}>
    <Image
      style={styles.icon}
      source={
        active
          ? require('src/assets/icons/ic_location_on.png')
          : require('src/assets/icons/ic_location_off.png')
      }
    />
  </TouchableOpacity>
);

export default TrackUser;
