import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View, Text, Image } from 'react-native';
import Pedometer, {
  PedometerInterface,
} from '@JWWon/react-native-universal-pedometer';
import BackgroundTimer from 'react-native-background-timer';
import { NavigationScreenProp } from 'react-navigation';

import TopNavbar from 'src/components/module/TopNavbar';
import Trailor from './Trailor';
import StatusButton from './StatusButton';
import MarkerButton from './MarkerButton';
import { ReducerState } from 'src/store/reducers';
import { views, fonts, icons } from './Walk.styles';
import * as actions from 'src/store/actions/walk';

interface WalkInfoInterface {
  unit: 'Km' | '걸음' | 'Kcal';
  value: number;
}

interface Props {
  navigation: NavigationScreenProp<any>;
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
  updateSeconds: typeof actions.updateSeconds;
  updateSteps: typeof actions.updateSteps;
  updateLatestPin: typeof actions.updateLatestPin;
}

interface State {
  status: ReducerState['walk']['status'];
}

const timeFormat = (time: number) => `${time < 10 ? '0' : ''}${time}`;

function convertSecToTime(time: number) {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  return `${timeFormat(minute)}:${timeFormat(second)}`;
}

class Walk extends Component<Props, State> {
  state: State = {
    status: this.props.walk.status,
  };

  componentDidUpdate() {
    const { updateSteps, updateSeconds } = this.props;
    const { status, createdAt } = this.props.walk;
    if (status !== this.state.status) {
      this.setState({ status });
      if (status === 'WALKING') {
        BackgroundTimer.runBackgroundTimer(updateSeconds, 1000);
        Pedometer.startPedometerUpdatesFromDate(
          createdAt.getTime(),
          listener => {
            const { numberOfSteps } = listener as PedometerInterface;
            if (numberOfSteps) updateSteps(numberOfSteps);
          }
        );
      } else {
        BackgroundTimer.stopBackgroundTimer();
        Pedometer.stopPedometerUpdates();
      }
    }
  }

  trailorWillUnmount = () => {
    const { updateStatus } = this.props;
    updateStatus('WALKING');
  };

  navToMap = () => {
    const { navigation } = this.props;
    navigation.navigate('map');
  };

  render() {
    const { updateLatestPin } = this.props;
    const { distance, status, seconds, steps } = this.props.walk;
    const gpsInfoList: WalkInfoInterface[] = [
      { value: distance, unit: 'Km' },
      { value: steps, unit: '걸음' },
      { value: Math.floor(steps / 28.5), unit: 'Kcal' },
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
              <Text style={fonts.walkTime}>{convertSecToTime(seconds)}</Text>
            </View>
            <View style={views.bottomWrapper}>
              <View style={views.whiteBackground} />
              <View style={views.bottomButtonWrapper}>
                <MarkerButton
                  icon={require('src/assets/icons/ic_poo.png')}
                  onPress={() => updateLatestPin('poo')}
                />
                <StatusButton
                  status={status}
                  updateStatus={this.props.updateStatus}
                />
                <MarkerButton
                  icon={require('src/assets/icons/ic_pee.png')}
                  onPress={() => updateLatestPin('pee')}
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
  ({ walk }: ReducerState) => ({ walk }),
  {
    updateStatus: actions.updateStatus,
    updateSeconds: actions.updateSeconds,
    updateSteps: actions.updateSteps,
    updateLatestPin: actions.updateLatestPin,
  }
)(Walk);
