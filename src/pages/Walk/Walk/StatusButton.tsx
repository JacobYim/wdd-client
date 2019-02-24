import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

import * as actions from 'src/store/actions/walk';
import { statusBtn } from './Walk.styles';
import { color } from 'src/theme';

interface Props {
  navigation: NavigationScreenProp<any>;
  status: 'WALKING' | 'PAUSE' | 'FINISH';
  updateStatus: typeof actions.updateStatus;
}

interface State {
  progress: Animated.Value;
  passHalf: boolean;
}

const TIMEOUT = 1600;
const progressSize = statusBtn + 12;

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    width: statusBtn,
    height: statusBtn,
    borderRadius: statusBtn / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '43%',
    height: '43%',
    resizeMode: 'contain',
  },
  progressBase: {
    zIndex: -1,
    position: 'absolute',
    top: -6,
    left: -6,
    width: progressSize,
    height: progressSize,
    borderRadius: progressSize / 2,
    backgroundColor: '#FFBFBE',
    overflow: 'hidden',
  },
  progressHalf: {
    zIndex: 0,
    width: progressSize / 2,
    height: progressSize,
    backgroundColor: '#FF6A67',
  },
  progressFilter: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    width: progressSize / 2,
    height: progressSize,
  },
  beforeHalf: {
    left: 0,
    backgroundColor: '#FFBFBE',
  },
  afterHalf: {
    right: 0,
    backgroundColor: '#FF6A67',
  },
});

class StatusButton extends PureComponent<Props, State> {
  private style = {
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

  state = {
    progress: new Animated.Value(0),
    passHalf: false,
  };

  animateProgress = () => {
    const { progress } = this.state;
    progress.addListener(({ value }) => {
      if (value > 0.5) this.setState({ passHalf: true });
    });
    return Animated.timing(progress, {
      toValue: 1,
      duration: TIMEOUT,
      useNativeDriver: true,
    });
  };

  stopProgress = () => {
    const { progress } = this.state;
    this.animateProgress().stop();
    progress.removeAllListeners();
    progress.setValue(0);
    this.setState({ passHalf: false });
  };

  handleLongPress = () => {
    const { updateStatus, navigation } = this.props;
    updateStatus('FINISH');
    this.animateProgress().start(c => {
      if (c.finished) navigation.navigate('save');
    });
  };

  handlePressOut = () => {
    const { status, updateStatus } = this.props;
    switch (status) {
      case 'FINISH':
      case 'WALKING':
        updateStatus('PAUSE');
        break;
      case 'PAUSE':
        updateStatus('WALKING');
        break;
    }

    this.stopProgress();
  };

  render() {
    const { status } = this.props;
    const { backgroundColor, source } = this.style[status];
    const progress = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View>
        {status === 'FINISH' && (
          <View style={styles.progressBase}>
            <Animated.View
              style={[
                styles.progressHalf,
                {
                  transform: [
                    { translateX: progressSize / 4 },
                    { rotate: progress },
                    { translateX: -progressSize / 4 },
                  ],
                },
              ]}
            />
            <View
              style={[
                styles.progressFilter,
                styles[this.state.passHalf ? 'afterHalf' : 'beforeHalf'],
              ]}
            />
          </View>
        )}
        <TouchableOpacity
          style={[styles.wrapper, { backgroundColor }]}
          onLongPress={this.handleLongPress}
          onPressOut={this.handlePressOut}
          activeOpacity={1}>
          <Image source={source} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(StatusButton);
