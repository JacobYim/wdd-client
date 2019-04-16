import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { color } from 'src/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: color.blue,
    alignItems: 'center',
  },
  image: {
    marginTop: height * 0.285,
    width: width * 0.52,
    height: height * 0.05,
    resizeMode: 'contain',
  },
});

const Splash: React.FC<{}> = () => (
  <View style={styles.background}>
    <Image
      source={require('src/assets/icons/logo_text_white.png')}
      style={styles.image}
    />
  </View>
);

export default Splash;
