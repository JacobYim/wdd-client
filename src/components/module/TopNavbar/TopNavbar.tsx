import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import { color, font } from 'src/theme';

interface Props {
  left?: {
    view: ReactNode;
    handlePress: () => void;
  };
  right?: {
    view: ReactNode;
    handlePress: () => void;
  };
  center?: string;
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 21,
    marginTop: 15,
    paddingHorizontal: width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    marginLeft: 'auto',
  },
  text: {
    color: color.black,
    fontSize: font.size.large,
  },
});

const TopNavbar: React.FC<Props> = ({ left, right, center }) => (
  <View style={styles.wrapper}>
    {center && (
      <View style={styles.center}>
        <Text style={styles.text}>{center}</Text>
      </View>
    )}
    {left && (
      <TouchableOpacity onPress={left.handlePress} activeOpacity={0.7}>
        {left.view}
      </TouchableOpacity>
    )}
    {right && (
      <TouchableOpacity
        onPress={right.handlePress}
        activeOpacity={0.7}
        style={styles.right}>
        {right.view}
      </TouchableOpacity>
    )}
  </View>
);

export default TopNavbar;
