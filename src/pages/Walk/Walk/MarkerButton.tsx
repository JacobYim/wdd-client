import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import TouchableScale from 'src/components/module/TouchableScale';
import { color } from 'src/theme';

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
    backgroundColor: color.bluePastel,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.black,
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  icon: {
    width: '46%',
    height: '46%',
    resizeMode: 'contain',
  },
});

const MarkerButton: React.FC<Props> = ({ icon, onPress }) => (
  <TouchableScale
    style={styles.wrapper}
    pressInTension={70}
    pressOutTension={50}
    friction={5}
    onPressIn={onPress}>
    <Image source={icon} style={styles.icon} />
  </TouchableScale>
);

export default MarkerButton;
