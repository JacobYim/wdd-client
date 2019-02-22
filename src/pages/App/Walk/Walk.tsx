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
  GestureResponderEvent,
} from 'react-native';
import Pedometer, {
  PedometerInterface,
} from '@JWWon/react-native-universal-pedometer';
import { NavigationScreenProp } from 'react-navigation';

import TopNavbar from 'src/components/module/TopNavbar';
import Trailor from './Trailor';
import StatusButton from './StatusButton';
import MarkerButton from './MarkerButton';
import { ReducerState } from 'src/store/reducers';
import { views, fonts, icons } from './Walk.styles';
import * as actions from 'src/store/actions/walk';

interface GpsInfoInterface {
  unit: 'Km' | '걸음' | 'Kcal';
  value: number;
}

interface Props {
  navigation: NavigationScreenProp<any>;
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
  updateWalk: typeof actions.updateWalk;
}

interface State {
  status: ReducerState['walk']['status'];
  info: {
    time: number; // seconds
    steps: number;
    kcal: number;
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
  private statusTimeout: NodeJS.Timeout & any;

  state: State = {
    status: 'READY',
    info: {
      time: 0,
      steps: 0,
      kcal: 0,
    },
  };

  componentDidUpdate() {
    const { status } = this.props.walk;
    if (status !== this.state.status) {
      this.setState({ status });
      if (status === 'WALKING') {
        this.counter = this.startCounter();
        this.watchPedometer();
      } else {
        clearInterval(this.counter);
        Pedometer.stopPedometerUpdates();
      }
    }
  }

  componentWillUnmount() {
    this.props.updateStatus('READY');
    clearInterval(this.counter);
    Pedometer.stopPedometerUpdates();
  }

  trailorWillUnmount = () => {
    const { updateStatus } = this.props;
    if (!this.timestamp) this.timestamp = new Date();
    updateStatus('WALKING');
  };

  startCounter = () =>
    setInterval(() => {
      this.setState(state =>
        produce(state, draft => {
          draft.info.time = state.info.time + 1;
        })
      );
    }, 1000);

  watchPedometer = () =>
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

  navToMap = () => {
    const { navigation } = this.props;
    navigation.navigate('map');
  };

  handleStatusLongPress = () => {
    const { updateStatus, navigation } = this.props;
    updateStatus('FINISH');
    this.statusTimeout = setTimeout(() => {
      navigation.navigate('map');
    }, 1600);
  };

  handleStatusPressOut = () => {
    const { walk, updateStatus } = this.props;
    switch (walk.status) {
      case 'FINISH':
      case 'WALKING':
        updateStatus('PAUSE');
        break;
      case 'PAUSE':
        updateStatus('WALKING');
        break;
    }
    if (this.statusTimeout) clearTimeout(this.statusTimeout);
  };

  handleMarkerPress = (type: actions.UpdateWalkInterface['type']) => {
    const { updateWalk } = this.props;
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude, speed } = coords;
        updateWalk({ type, latitude, longitude, speed, addDistance: 0 });
      },
      () => {},
      { enableHighAccuracy: true }
    );
  };

  render() {
    const { distance, status } = this.props.walk;
    const { info } = this.state;
    const gpsInfoList: GpsInfoInterface[] = [
      { value: distance, unit: 'Km' },
      { value: info.steps, unit: '걸음' },
      { value: info.kcal, unit: 'Kcal' },
    ];

    return (
      <SafeAreaView style={views.container}>
        {status === 'READY' ? (
          <Trailor onFinish={this.trailorWillUnmount} />
        ) : (
          <>
            <View style={views.topWrapper}>
              <TopNavbar
                left={{
                  handlePress: this.navToMap,
                  view: (
                    <Image
                      style={icons.top}
                      source={require('src/assets/icons/ic_map.png')}
                    />
                  ),
                }}
                right={{
                  handlePress: () => {},
                  view: (
                    <Image
                      style={icons.top}
                      source={require('src/assets/icons/ic_camera.png')}
                    />
                  ),
                }}
              />
              <Text style={fonts.walkTime}>{convertSecToTime(info.time)}</Text>
            </View>
            <View style={views.bottomWrapper}>
              <View style={views.whiteBackground} />
              <View style={views.bottomButtonWrapper}>
                <MarkerButton
                  type="poo"
                  icon={require('src/assets/icons/ic_poo.png')}
                  onPress={this.handleMarkerPress}
                />
                <StatusButton
                  status={status}
                  onLongPress={this.handleStatusLongPress}
                  onPressOut={this.handleStatusPressOut}
                />
                <MarkerButton
                  type="pee"
                  icon={require('src/assets/icons/ic_pee.png')}
                  onPress={this.handleMarkerPress}
                />
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
        )}
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    walk: state.walk,
  }),
  {
    updateStatus: actions.updateStatus,
    updateWalk: actions.updateWalk,
  }
)(Walk);
