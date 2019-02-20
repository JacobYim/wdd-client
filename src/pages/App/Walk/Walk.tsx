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

import Trailor from './Trailor';
import { ReducerState } from 'src/store/reducers';
import { views, fonts, icons } from './Walk.styles';
import { color } from 'src/theme';
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
  shouldMountDashboard: boolean;
  status: {
    store: ReducerState['walk']['status'];
    icon: NodeRequire;
    color: string;
  };
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

const MarkerButton: React.FC<{
  type: actions.UpdateWalkInterface['type'];
  icon: NodeRequire;
  onPress: (type: actions.UpdateWalkInterface['type']) => void;
}> = ({ type, icon, onPress }) => (
  <TouchableOpacity
    style={views.peePooButton}
    activeOpacity={0.7}
    onPress={() => onPress(type)}>
    <Image source={icon} style={icons.peePoo} />
  </TouchableOpacity>
);

class Walk extends Component<Props, State> {
  private timestamp: Date & any;
  private counter: NodeJS.Timeout & any;
  private statusTimeout: NodeJS.Timeout & any;

  state: State = {
    shouldMountDashboard: false,
    status: {
      store: 'READY',
      icon: require('src/assets/icons/ic_pause.png'),
      color: color.redLight,
    },
    info: {
      time: 0,
      steps: 0,
      kcal: 0,
    },
  };

  componentDidUpdate() {
    const { status } = this.props.walk;
    if (status !== this.state.status.store) {
      switch (status) {
        case 'WALKING':
          this.counter = this.startCounter();
          this.watchPedometer();
          this.setState({
            status: {
              icon: require('src/assets/icons/ic_pause.png'),
              color: color.redLight,
              store: status,
            },
          });
          return;
        case 'PAUSE':
          this.setState({
            status: {
              icon: require('src/assets/icons/ic_resume.png'),
              color: color.blue,
              store: status,
            },
          });
          break;
        case 'FINISH':
          this.setState({
            status: {
              icon: require('src/assets/icons/ic_stop.png'),
              color: color.redLight,
              store: status,
            },
          });
          break;
        default:
          return;
      }
      clearInterval(this.counter);
      Pedometer.stopPedometerUpdates();
    }
  }

  trailorWillUnmount = () => {
    this.setState({ shouldMountDashboard: true });
  };

  dashboardDidMount = () => {
    const { walk, updateStatus } = this.props;
    if (!this.timestamp) this.timestamp = new Date();
    if (walk.status === 'READY') updateStatus('WALKING');
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

  handleStatusLongPress = (e: GestureResponderEvent) => {
    const { updateStatus, navigation } = this.props;
    updateStatus('FINISH');
    this.statusTimeout = setTimeout(() => {
      navigation.navigate('map');
    }, 1600);
  };

  handleStatusPressOut = () => {
    const { walk, updateStatus } = this.props;
    switch (walk.status) {
      case 'WALKING':
      case 'FINISH':
        updateStatus('PAUSE');
        break;
      case 'PAUSE':
        updateStatus('WALKING');
        break;
    }
    clearTimeout(this.statusTimeout);
  };

  handleMarkerPress = (type: actions.UpdateWalkInterface['type']) => {
    const { updateWalk } = this.props;
    Geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude, speed } = coords;
      updateWalk({
        type,
        latitude,
        longitude,
        speed: speed || 0,
        addDistance: 0,
      });
    });
  };

  render() {
    const { distance } = this.props.walk;
    const { shouldMountDashboard, info, status } = this.state;
    const gpsInfoList: GpsInfoInterface[] = [
      { value: distance, unit: 'Km' },
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
                <MarkerButton
                  type="poo"
                  icon={require('src/assets/icons/ic_poo.png')}
                  onPress={this.handleMarkerPress}
                />
                <TouchableOpacity
                  style={[
                    views.statusButton,
                    { backgroundColor: status.color },
                  ]}
                  onLongPress={this.handleStatusLongPress}
                  onPressOut={this.handleStatusPressOut}
                  activeOpacity={0.7}>
                  <Image source={status.icon} style={icons.status} />
                </TouchableOpacity>
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
        ) : (
          <Trailor onFinish={this.trailorWillUnmount} />
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
