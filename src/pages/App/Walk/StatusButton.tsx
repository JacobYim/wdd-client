import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

import { statuBtn } from './Walk.styles';
import { color } from 'src/theme';

interface Props {
  status: 'WALKING' | 'PAUSE' | 'FINISH';
  onLongPress: (e: GestureResponderEvent) => void;
  onPressOut: (e: GestureResponderEvent) => void;
}

const statusStyle = {
  WALKING: {
    backgroundColor: color.redLight,
    source: require('src/assets/icons/ic_pause.png'),
  },
  PAUSE: {
    backgroundColor: color.blue,
    source: require('src/assets/icons/ic_resume.png'),
  },
  FINISH: {
    backgroundColor: color.redLight,
    source: require('src/assets/icons/ic_stop.png'),
  },
};

const styles = StyleSheet.create({
  wrapper: {
    width: statuBtn,
    height: statuBtn,
    borderRadius: statuBtn / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '43%',
    height: '43%',
    resizeMode: 'contain',
  },
});

const StatusButton: React.FC<Props> = ({ status, onLongPress, onPressOut }) => {
  const { backgroundColor, source } = statusStyle[status];
  return (
    <TouchableOpacity
      style={[styles.wrapper, { backgroundColor }]}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      activeOpacity={0.7}>
      <Image source={source} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default StatusButton;
