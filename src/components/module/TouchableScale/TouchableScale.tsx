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
  tension?: number;
  friction?: number;
  pressInTension?: number;
  pressInFriction?: number;
  pressOutTension?: number;
  pressOutFriction?: number;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
}

class TouchableScale extends PureComponent<Props> {
  private tension = this.props.tension || 150;
  private friction = this.props.friction || 5;
  private defaultScale = this.props.defaultScale || 1;
  private activeScale = this.props.activeScale || 1.1;
  private scaleAnimation = new Animated.Value(this.props.defaultScale || 1);

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
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

  onPressIn = (e: GestureResponderEvent) => {
    const { pressInTension, pressInFriction, onPressIn } = this.props;

    Animated.spring(this.scaleAnimation, {
      tension: pressInTension || this.tension,
      friction: pressInFriction || this.friction,
      toValue: this.activeScale,
      useNativeDriver: true,
    }).start();

    if (onPressIn) onPressIn(e);
  };

  onPressOut = (e: GestureResponderEvent) => {
    const { pressOutTension, pressOutFriction, onPressOut } = this.props;

    Animated.spring(this.scaleAnimation, {
      tension: pressOutTension || this.tension,
      friction: pressOutFriction || this.friction,
      toValue: this.defaultScale,
      useNativeDriver: true,
    }).start();

    if (onPressOut) onPressOut(e);
  };
}

export default TouchableScale;
