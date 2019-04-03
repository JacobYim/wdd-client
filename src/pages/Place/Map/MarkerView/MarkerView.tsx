import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Place } from 'src/services/api/place';

interface Props {
  place: Place;
  selected: boolean;
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

const MarkerView: React.FC<Props> = ({ place, selected }) => (
  <View style={styles.wrapper}>
    <Image
      source={
        selected
          ? require('src/assets/icons/ic_place.png')
          : require('src/assets/icons/ic_pin.png')
      }
      style={selected ? styles.place : styles.pin}
    />
  </View>
);

export default MarkerView;
