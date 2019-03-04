import React, { PureComponent, ReactNode } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  children: ReactNode;
  style?: object;
  defaultScale?: number;
  activeScale?: number;
  activeDuration?: number;
  restoreDuration?: number;
  onPress?: (e: GestureResponderEvent) => void;
}

class TouchableScale extends PureComponent<Props> {
  private defaultScale = this.props.defaultScale || 1;
  private activeScale = this.props.activeScale || 1.1;
  private activeDuration = this.props.activeDuration || 70;
  private restoreDuration = this.props.restoreDuration || 50;
  private scaleAnimation = new Animated.Value(this.props.defaultScale || 1);

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Animated.View
          style={[
            this.props.style,
            {
              transform: [{ scale: this.scaleAnimation }],
            },
          ]}>
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  onPress = (e: GestureResponderEvent) => {
    const { onPress } = this.props;
    if (onPress) onPress(e);

    Animated.timing(this.scaleAnimation, {
      toValue: this.activeScale,
      duration: this.activeDuration,
      useNativeDriver: true,
    }).start(c => {
      if (c.finished) {
        Animated.timing(this.scaleAnimation, {
          toValue: this.defaultScale,
          duration: this.restoreDuration,
          useNativeDriver: true,
        }).start();
      }
    });
  };
}

export default TouchableScale;
