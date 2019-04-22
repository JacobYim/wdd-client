import React, { ReactNode } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { color } from 'src/theme';

interface Props {
  children?: ReactNode;
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    height,
    width: width * 0.968,
    left: width * 0.016,
    right: width * 0.016,
    top: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
});

const Splash: React.FC<Props> = ({ children }) => (
  <View style={styles.container}>
    <Image
      source={require('src/assets/images/img_background.jpg')}
      style={styles.background}
    />
    {children && children}
  </View>
);

export default Splash;
