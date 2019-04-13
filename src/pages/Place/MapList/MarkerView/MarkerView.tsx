import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Place } from 'src/store/actions/place';

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
    width: 24,
    height: 32,
  },
  place: {
    width: 33,
    height: 44,
  },
});

const MarkerView: React.FC<Props> = ({ place, selected }) => (
  <View style={styles.wrapper}>
    <Image
      source={
        selected
          ? require('src/assets/icons/ic_place_on.png')
          : require('src/assets/icons/ic_place_off.png')
      }
      style={selected ? styles.place : styles.pin}
    />
  </View>
);

export default MarkerView;
