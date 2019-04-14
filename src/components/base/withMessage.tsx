import React, { Component, ComponentType } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { color } from 'src/theme';

export interface MessageProps {
  showMessage: (message: string) => void;
}

interface State {
  message?: string;
}

const messageHeight = 40;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 38,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: 16,
    height: messageHeight,
    borderRadius: messageHeight / 2,
    backgroundColor: color.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 15,
    color: color.white,
  },
});

export default function withMessage<P extends MessageProps>(
  WrappedComponent: ComponentType<P>
) {
  return class WithMessage extends Component<P, State> {
    private opacity = new Animated.Value(0);

    state: State = { message: undefined };

    showMessage = (message: string) => {
      this.setState({ message });
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(this.opacity, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }).start(e => {
          if (e.finished) this.setState({ message: undefined });
        });
      }, 1600);
    };

    render() {
      const { message } = this.state;
      return (
        <View style={{ flex: 1 }}>
          <WrappedComponent {...this.props} showMessage={this.showMessage} />
          {message && (
            <SafeAreaView style={styles.container}>
              <Animated.View
                style={[styles.wrapper, { opacity: this.opacity }]}>
                <Text style={styles.message}>{message}</Text>
              </Animated.View>
            </SafeAreaView>
          )}
        </View>
      );
    }
  };
}
