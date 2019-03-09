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
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 45,
    paddingHorizontal: width * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#70707014',
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

const TopNavbar: React.FC<Props> = ({ left, right, center, showBorder }) => (
  <View style={[styles.wrapper, showBorder ? { borderBottomWidth: 1 } : {}]}>
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
