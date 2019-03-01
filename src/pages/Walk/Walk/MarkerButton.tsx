import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { UpdateWalkInterface } from 'src/store/actions/walk';
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
  <TouchableOpacity
    style={styles.wrapper}
    activeOpacity={0.7}
    onPress={onPress}>
    <Image source={icon} style={styles.icon} />
  </TouchableOpacity>
);

export default MarkerButton;
