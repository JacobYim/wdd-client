import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import TouchableScale from 'src/components/module/TouchableScale';
import { color, shadow } from 'src/theme';

interface Props {
  icon: NodeRequire;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const btnSize = 60;

const styles = StyleSheet.create({
  wrapper: {
    width: btnSize,
    height: btnSize,
    marginTop: width * 0.088 - btnSize / 2,
    borderRadius: btnSize / 2,
    backgroundColor: color.blue,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.shallow,
  },
  icon: {
    width: '46%',
    height: '46%',
    resizeMode: 'contain',
  },
});

const MarkerButton: React.FC<Props> = ({ icon, onPress }) => (
  <TouchableScale style={styles.wrapper} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
  </TouchableScale>
);

export default MarkerButton;
