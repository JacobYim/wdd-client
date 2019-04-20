import React, { Component, ComponentType } from 'react';
import { Animated, Easing, Modal, Text, View } from 'react-native';
import { color, font } from 'src/theme';

export interface LoadingProps {
  toggleLoading: () => {};
  hideLoading: () => {};
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

    hideLoading = () => {
      this.setState({ showLoading: false });
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
          <WrappedComponent
            {...this.props}
            toggleLoading={this.toggleLoading}
            hideLoading={this.hideLoading}
          />
          <Modal
            visible={this.state.showLoading}
            transparent={false}
            hardwareAccelerated>
            <View
              style={{
                flex: 1,
                backgroundColor: color.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.Image
                source={require('src/assets/icons/ic_loading.png')}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: 'contain',
                  transform: [{ rotate: spin }],
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  color: color.blackOpacity,
                  fontSize: font.size.medium,
                }}>
                저장중입니다.
              </Text>
            </View>
          </Modal>
        </>
      );
    }
  };
}
