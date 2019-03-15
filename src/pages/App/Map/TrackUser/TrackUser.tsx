import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { color, shadow } from 'src/theme';

interface Props {
  handlePress: () => void;
  active: boolean;
}

const trackUserSize = 56;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
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
      style={[{ opacity: active ? 1 : 0.4 }, styles.icon]}
      source={require('src/assets/icons/ic_location.png')}
    />
  </TouchableOpacity>
);

export default TrackUser;
