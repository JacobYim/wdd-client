import React, { ReactNode } from 'react';
import { color, font } from 'src/theme';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

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
  showBorder?: boolean;
  transparent?: boolean;
}

const { width } = Dimensions.get('window');
export const height = 55;
const styles = StyleSheet.create({
  wrapper: {
    height,
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#70707014',
  },
  button: {
    paddingHorizontal: width * 0.04,
    height: '100%',
    justifyContent: 'center',
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

const TopNavbar: React.FC<Props> = ({
  left,
  right,
  center,
  showBorder,
  transparent,
}) => (
  <View
    style={[
      styles.wrapper,
      showBorder ? { borderBottomWidth: 1 } : null,
      { backgroundColor: transparent ? 'transparent' : color.white },
    ]}>
    {center && (
      <View style={styles.center}>
        <Text style={styles.text}>{center}</Text>
      </View>
    )}
    {left && (
      <TouchableOpacity
        onPress={left.handlePress}
        activeOpacity={0.7}
        style={styles.button}>
        {left.view}
      </TouchableOpacity>
    )}
    {right && (
      <TouchableOpacity
        onPress={right.handlePress}
        activeOpacity={0.7}
        style={[styles.button, styles.right]}>
        {right.view}
      </TouchableOpacity>
    )}
  </View>
);

export default TopNavbar;
