import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import Trailor from './Trailor';
import { views, fonts, icons } from './Walk.styles';

interface GpsInfoInterface {
  unit: string;
  value: number;
}

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  shouldMountDashboard: boolean;
  walkTime: number;
  distance: number;
  step: number;
  kcal: number;
}

function formatTime(time: number) {
  const timeFormat = (time: number) => `${time < 10 ? '0' : ''}${time}`;
  const minute = Math.floor(time / 60);
  const second = time % 60;
  return `${timeFormat(minute)}:${timeFormat(second)}`;
}

class Walk extends Component<Props, State> {
  private counter: NodeJS.Timeout & any;

  state: State = {
    shouldMountDashboard: false,
    walkTime: 0,
    distance: 0,
    step: 0,
    kcal: 0,
  };

  startCountTime = () =>
    setInterval(() => {
      this.setState({ walkTime: this.state.walkTime + 1 });
    }, 1000);

  navToMap = () => {
    const { navigation } = this.props;
    navigation.navigate('map');
  };

  handleTrailorEnd = () => {
    this.setState({ shouldMountDashboard: true });
  };

  handleDashboardMount = () => {
    if (!this.counter) this.counter = this.startCountTime();
  };

  render() {
    const { shouldMountDashboard, walkTime, distance, step, kcal } = this.state;
    const gpsInfoList: GpsInfoInterface[] = [
      { value: distance, unit: 'Km' },
      { value: step, unit: '걸음' },
      { value: kcal, unit: 'Kcal' },
    ];

    return (
      <SafeAreaView style={views.container}>
        {shouldMountDashboard ? (
          <>
            <View style={views.topWrapper} onLayout={this.handleDashboardMount}>
              <View style={views.topButtonWrapper}>
                <TouchableOpacity activeOpacity={0.7} onPress={this.navToMap}>
                  <Image
                    style={[icons.top, icons.topLeft]}
                    source={require('src/assets/icons/ic_map.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <Image
                    style={[icons.top, icons.topRight]}
                    source={require('src/assets/icons/ic_camera.png')}
                  />
                </TouchableOpacity>
              </View>
              <Text style={fonts.walkTime}>{formatTime(walkTime)}</Text>
            </View>
            <View style={views.bottomWrapper}>
              <View style={views.whiteBackground} />
              <View style={views.bottomButtonWrapper}>
                <TouchableOpacity
                  style={views.peePooButton}
                  activeOpacity={0.7}>
                  <Image
                    source={require('src/assets/icons/ic_poo.png')}
                    style={icons.peePoo}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={views.walkButton} activeOpacity={0.7}>
                  <Image
                    source={require('src/assets/icons/ic_pause.png')}
                    style={icons.walkStatus}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={views.peePooButton}
                  activeOpacity={0.7}>
                  <Image
                    source={require('src/assets/icons/ic_pee.png')}
                    style={icons.peePoo}
                  />
                </TouchableOpacity>
              </View>
              <View style={views.gpsInfoWrapper}>
                {gpsInfoList.map(item => (
                  <View style={views.gpsSingleInfo} key={item.unit}>
                    <Text style={fonts.gpsInfoValue}>{item.value}</Text>
                    <Text style={fonts.gpsInfoUnit}>{item.unit}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <Trailor onFinish={this.handleTrailorEnd} />
        )}
      </SafeAreaView>
    );
  }
}

export default Walk;
