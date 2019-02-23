import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

import * as actions from 'src/store/actions/walk';
import { statuBtn } from './Walk.styles';
import { color } from 'src/theme';

interface Props {
  navigation: NavigationScreenProp<any>;
  status: 'WALKING' | 'PAUSE' | 'FINISH';
  updateStatus: typeof actions.updateStatus;
}

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

class StatusButton extends PureComponent<Props> {
  private timeout: NodeJS.Timeout & any;
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

  handleLongPress = () => {
    const { updateStatus, navigation } = this.props;
    updateStatus('FINISH');
    this.timeout = setTimeout(() => {
      navigation.navigate('save');
    }, 1600);
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
    if (this.timeout) clearTimeout(this.timeout);
  };

  render() {
    const { backgroundColor, source } = this.style[this.props.status];
    return (
      <TouchableOpacity
        style={[styles.wrapper, { backgroundColor }]}
        onLongPress={this.handleLongPress}
        onPressOut={this.handlePressOut}
        activeOpacity={0.7}>
        <Image source={source} style={styles.icon} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(StatusButton);
