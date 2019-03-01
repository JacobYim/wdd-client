import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { color } from 'src/theme';

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 6,
    backgroundColor: color.white,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

const Splash: React.FC<{}> = () => (
  <View style={styles.background}>
    <Image
      source={require('src/assets/images/img_background.jpg')}
      style={styles.image}
    />
  </View>
);

export default Splash;
