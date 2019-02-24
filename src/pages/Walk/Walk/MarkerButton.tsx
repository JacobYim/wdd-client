import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import { UpdateWalkInterface } from 'src/store/actions/walk';
import { color } from 'src/theme';

interface Props {
  type: UpdateWalkInterface['type'];
  icon: NodeRequire;
  onPress: (type: UpdateWalkInterface['type']) => void;
}

const { width } = Dimensions.get('window');
const btnSize = 50;

const styles = StyleSheet.create({
  wrapper: {
    width: btnSize,
    height: btnSize,
    marginTop: width * 0.088 - btnSize / 2,
    borderRadius: btnSize / 2,
    backgroundColor: color.blue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.black,
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  icon: {
    width: '52%',
    height: '52%',
    resizeMode: 'contain',
  },
});

const MarkerButton: React.FC<Props> = ({ type, icon, onPress }) => (
  <TouchableOpacity
    style={styles.wrapper}
    activeOpacity={0.7}
    onPress={() => onPress(type)}>
    <Image source={icon} style={styles.icon} />
  </TouchableOpacity>
);

export default MarkerButton;
