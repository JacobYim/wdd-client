import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { color } from 'src/theme';

interface Props {
  source: NodeRequire;
}

const wrapperSize = 28;
const styles = StyleSheet.create({
  wrapper: {
    width: wrapperSize,
    height: wrapperSize,
    borderRadius: wrapperSize / 2,
    backgroundColor: '#3396ff',
    borderColor: '#0000001a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 13.5,
    height: 13.5,
    resizeMode: 'contain',
  },
});

const ImageMarker: React.FC<Props> = ({ source }) => (
  <View style={styles.wrapper}>
    <Image source={source} style={styles.icon} />
  </View>
);

export default ImageMarker;
