import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { PlaceInterface } from '../Result';

interface Props {
  place: PlaceInterface;
}

const styles = StyleSheet.create({
  wrapper: {
    width: 36,
    height: 48,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pin: {
    width: 20,
    height: 20,
  },
  place: {
    width: 33.5,
    height: 43.7,
  },
});

const MarkerView: React.FC<Props> = ({ place }) => (
  <View style={styles.wrapper}>
    <Image
      source={
        place.selected
          ? require('src/assets/icons/ic_place.png')
          : require('src/assets/icons/ic_pin.png')
      }
      style={place.selected ? styles.place : styles.pin}
    />
  </View>
);

export default MarkerView;
