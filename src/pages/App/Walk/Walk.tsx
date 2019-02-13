import React, { Component } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

import Trailor from './Trailor';
import { views, fonts } from './Walk.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  shouldMountDashboard: boolean;
  walkTime: number;
}

function formatTime(time: number) {
  const timeFormat = (time: number) => `${time < 10 ? '0' : ''}${time}`;
  const minute = Math.floor(time / 60);
  const second = time % 60;
  return `${timeFormat(minute)}:${timeFormat(second)}`;
}

class Walk extends Component<Props, State> {
  state: State = {
    shouldMountDashboard: false,
    walkTime: 0,
  };

  handleTrailorEnd = () => {
    this.setState({ shouldMountDashboard: true });
  };

  handleDashboardMount = () => {
    setInterval(() => {
      this.setState({ walkTime: this.state.walkTime + 1 });
    }, 1000);
  };

  render() {
    const { shouldMountDashboard, walkTime } = this.state;

    return (
      <SafeAreaView style={views.container}>
        {shouldMountDashboard ? (
          <View style={views.dashboard} onLayout={this.handleDashboardMount}>
            <Text style={fonts.walkTime}>{formatTime(walkTime)}</Text>
          </View>
        ) : (
          <Trailor onFinish={this.handleTrailorEnd} />
        )}
      </SafeAreaView>
    );
  }
}

export default withNavigation(Walk);
