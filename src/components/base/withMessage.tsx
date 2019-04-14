import React, { Component, ComponentType } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
    state: State = { message: undefined };

    showMessage = (message: string) => {
      this.setState({ message });
      setTimeout(() => {
        this.setState({ message: undefined });
      }, 1600);
    };

    render() {
      const { message } = this.state;
      return (
        <View style={{ flex: 1 }}>
          <WrappedComponent {...this.props} showMessage={this.showMessage} />
          {message && (
            <SafeAreaView style={styles.container}>
              <View style={styles.wrapper}>
                <Text style={styles.message}>{message}</Text>
              </View>
            </SafeAreaView>
          )}
        </View>
      );
    }
  };
}
