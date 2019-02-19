import React, { Component } from 'react';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import produce from 'immer';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Pedometer, {
  PedometerInterface,
} from '@JWWon/react-native-universal-pedometer';
import { LatLng } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';

import Trailor from './Trailor';
import { calcDistance } from 'src/assets/functions/calcutate';
import { views, fonts, icons } from './Walk.styles';
import * as actions from 'src/store/actions/walk';

interface GpsInfoInterface {
  unit: 'Km' | '걸음' | 'Kcal';
  value: number;
}

interface Props {
  navigation: NavigationScreenProp<any>;
  updateStatus: typeof actions.updateStatus;
  updatePin: typeof actions.updatePin;
}

interface State {
  shouldMountDashboard: boolean;
  info: {
    time: number; // seconds
    steps: number;
    kcal: number;
    distance: number;
  };
  current?: {
    location: LatLng;
    speed: number;
  };
}

const timeFormat = (time: number) => `${time < 10 ? '0' : ''}${time}`;
function convertSecToTime(time: number) {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  return `${timeFormat(minute)}:${timeFormat(second)}`;
}

class Walk extends Component<Props, State> {
  private timestamp: Date & any;
  private counter: NodeJS.Timeout & any;

  state: State = {
    shouldMountDashboard: false,
    info: {
      time: 0,
      steps: 0,
      kcal: 0,
      distance: 0,
    },
  };

  componentWillUnmount() {
    const { updateStatus } = this.props;
    updateStatus('FINISH');
    clearInterval(this.counter);
    Pedometer.stopPedometerUpdates();
  }

  startCounter = () => {
    this.counter = setInterval(() => {
      this.setState(state =>
        produce(state, draft => {
          draft.info.time = state.info.time + 1;
        })
      );
    }, 1000);
  };

  watchPedometer = () => {
    this.timestamp = new Date();
    Pedometer.startPedometerUpdatesFromDate(
      this.timestamp.getTime(),
      listener => {
        const { numberOfSteps } = listener as PedometerInterface;
        if (numberOfSteps)
          this.setState(state =>
            produce(state, draft => {
              draft.info.steps = numberOfSteps;
              draft.info.kcal = Math.floor(numberOfSteps / 28.5);
            })
          );
      }
    );
  };

  watchLocation = () => {
    const { updatePin } = this.props;
    Geolocation.watchPosition(({ coords }) => {
      const { latitude, longitude, speed } = coords;
      const { current } = this.state;
      const newLocation = { latitude, longitude };

      if (current) {
        const distance = calcDistance(current.location, newLocation);
        if (distance > 0.005) {
          // 5m 이상 떨어진 핀포인트만 업데이트
          updatePin({ type: 'check', ...newLocation });
          this.setState(state =>
            produce(state, draft => {
              draft.current = {
                speed: speed || 0,
                location: newLocation,
              };
              draft.info.distance += distance;
            })
          );
        }
      } else {
        // 첫 Callback
        updatePin({ type: 'check', ...newLocation });
        this.setState({
          current: {
            speed: speed || 0,
            location: newLocation,
          },
        });
      }
    });
  };

  navToMap = () => {
    const { navigation } = this.props;
    navigation.navigate('map');
  };

  trailorWillUnmount = () => {
    this.setState({ shouldMountDashboard: true });
  };

  dashboardDidMount = async () => {
    if (!this.timestamp) {
      const { updateStatus } = this.props;
      await updateStatus('WALKING');

      this.startCounter();
      this.watchPedometer();
      this.watchLocation();
    }
  };

  handleIconPress = (type: actions.PinInterface['type']) => {
    const { updatePin } = this.props;
    Geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      updatePin({ type, latitude, longitude });
    });
  };

  render() {
    const { shouldMountDashboard, info } = this.state;
    const gpsInfoList: GpsInfoInterface[] = [
      { value: info.distance, unit: 'Km' },
      { value: info.steps, unit: '걸음' },
      { value: info.kcal, unit: 'Kcal' },
    ];

    return (
      <SafeAreaView style={views.container}>
        {shouldMountDashboard ? (
          <>
            <View style={views.topWrapper} onLayout={this.dashboardDidMount}>
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
              <Text style={fonts.walkTime}>{convertSecToTime(info.time)}</Text>
            </View>
            <View style={views.bottomWrapper}>
              <View style={views.whiteBackground} />
              <View style={views.bottomButtonWrapper}>
                <TouchableOpacity
                  style={views.peePooButton}
                  activeOpacity={0.7}
                  onPress={() => this.handleIconPress('poo')}>
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
                  activeOpacity={0.7}
                  onPress={() => this.handleIconPress('pee')}>
                  <Image
                    source={require('src/assets/icons/ic_pee.png')}
                    style={icons.peePoo}
                  />
                </TouchableOpacity>
              </View>
              <View style={views.gpsInfoWrapper}>
                {gpsInfoList.map(item => (
                  <View style={views.gpsSingleInfo} key={item.unit}>
                    <Text style={fonts.gpsInfoValue}>
                      {item.unit === 'Km' ? item.value.toFixed(2) : item.value}
                    </Text>
                    <Text style={fonts.gpsInfoUnit}>{item.unit}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <Trailor onFinish={this.trailorWillUnmount} />
        )}
      </SafeAreaView>
    );
  }
}

export default connect(
  null,
  {
    updateStatus: actions.updateStatus,
    updatePin: actions.updatePin,
  }
)(Walk);
