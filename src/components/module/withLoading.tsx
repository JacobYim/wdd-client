import React, { Component, ComponentType } from 'react';
import { Modal, View, Animated, Easing } from 'react-native';

import { color } from 'src/theme';

export interface LoadingProps {
  toggleLoading: () => {};
}

interface State {
  showLoading: boolean;
  spin: Animated.Value;
}

export default function withLoading<P extends LoadingProps>(
  WrappedComponent: ComponentType<P>
) {
  return class WithLoading extends Component<P, State> {
    state: State = {
      showLoading: false,
      spin: new Animated.Value(0),
    };

    toggleLoading = async () => {
      await this.setState({ showLoading: !this.state.showLoading });
      if (this.state.showLoading) this.spinning();
    };

    spinning = () => {
      Animated.loop(
        Animated.timing(this.state.spin, {
          toValue: 1,
          duration: 1600,
          easing: Easing.bezier(0.58, 0.07, 0.46, 0.96),
          useNativeDriver: true,
        })
      ).start();
    };

    render() {
      const spin = this.state.spin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });

      return (
        <>
          <Modal visible={this.state.showLoading} transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: color.black33Opacity,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.Image
                source={require('src/lib/icons/ic_thumbnail.png')}
                style={{
                  width: 100,
                  height: 100,
                  transform: [{ rotate: spin }],
                }}
              />
            </View>
          </Modal>
          <WrappedComponent
            {...this.props}
            toggleLoading={this.toggleLoading}
          />
        </>
      );
    }
  };
}
