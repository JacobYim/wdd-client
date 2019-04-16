import React, { Component } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import TopNavbar from 'src/components/module/TopNavbar';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import MarkerButton from './MarkerButton';
import Prepare from './Prepare';
import StatusButton from './StatusButton';
import { fonts, icons, views } from './Walk.styles';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  View,
  Animated,
} from 'react-native';
import Pedometer, {
  PedometerInterface,
} from '@JWWon/react-native-universal-pedometer';
import {
  checkPermission,
  PICTURE_PERMISSIONS,
} from 'src/assets/functions/validate';

interface WalkInfoInterface {
  unit: 'Km' | '걸음' | 'Kcal';
  value: number;
}

interface Props extends NavigationScreenProps {
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
  updateSeconds: typeof actions.updateSeconds;
  updateSteps: typeof actions.updateSteps;
  updateLatestPin: typeof actions.updateLatestPin;
}

interface State {
  status: ReducerState['walk']['status'];
  opacity: Animated.Value;
  showAnimation?: 'pee' | 'poo';
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
    opacity: new Animated.Value(0),
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

  launchCamera = async () => {
    const options = {
      cameraType: 'back' as 'back',
      mediaType: 'photo' as 'photo',
      storageOptions: {
        cameraRoll: Platform.OS === 'ios',
        skipBackup: true,
        waitUntilSaved: true,
      },
    };
    if (await checkPermission(PICTURE_PERMISSIONS)) {
      ImagePicker.launchCamera(options, res => {});
    }
  };

  handlePressPin = (type: 'poo' | 'pee') => {
    const { updateLatestPin, walk } = this.props;
    if (walk.status === 'WALKING') {
      updateLatestPin(type);
      this.setState({ showAnimation: type });
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }).start(show => {
        if (show.finished) {
          setTimeout(() => {
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 280,
              useNativeDriver: true,
            }).start(hide => {
              if (hide.finished) this.setState({ showAnimation: undefined });
            });
          }, 880);
        }
      });
    }
  };

  onPrepareWillUnmount = () => {
    const { updateStatus } = this.props;
    updateStatus('WALKING');
  };

  navToMap = () => {
    const { navigation } = this.props;
    navigation.navigate('map');
  };

  render() {
    const { distance, status, seconds, steps, speed } = this.props.walk;
    const { showAnimation } = this.state;
    const gpsInfoList: WalkInfoInterface[] = [
      { value: distance, unit: 'Km' },
      { value: steps, unit: '걸음' },
      { value: Math.floor(steps / 28.5), unit: 'Kcal' },
    ];

    return (
      <SafeAreaView style={views.container}>
        {status === 'READY' ? (
          <Prepare onFinish={this.onPrepareWillUnmount} />
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
                  handlePress: this.launchCamera,
                  view: (
                    <Image
                      style={icons.top}
                      source={require('src/assets/icons/ic_camera.png')}
                    />
                  ),
                }}
              />
              <View style={views.gifWrapper}>
                <Image
                  style={icons.gif}
                  source={
                    status === 'WALKING'
                      ? speed > 1.11
                        ? require('src/assets/images/img_running.gif')
                        : require('src/assets/images/img_walking.gif')
                      : require('src/assets/images/img_standing.jpg')
                  }
                />
                {showAnimation && (
                  <Animated.View
                    style={{
                      ...views.gifAbsolute,
                      opacity: this.state.opacity,
                    }}>
                    <Image
                      source={
                        showAnimation === 'pee'
                          ? require('src/assets/icons/ic_pee_motion.gif')
                          : require('src/assets/icons/ic_poo_motion.gif')
                      }
                      style={icons.absolute}
                    />
                  </Animated.View>
                )}
              </View>
              <Text style={fonts.walkTime}>{convertSecToTime(seconds)}</Text>
            </View>
            <View style={views.bottomWrapper}>
              <View style={views.whiteBackground} />
              <View style={views.bottomButtonWrapper}>
                <MarkerButton
                  icon={require('src/assets/icons/ic_poo.png')}
                  onPress={() => this.handlePressPin('poo')}
                />
                <StatusButton
                  walk={this.props.walk}
                  updateStatus={this.props.updateStatus}
                />
                <MarkerButton
                  icon={require('src/assets/icons/ic_pee.png')}
                  onPress={() => this.handlePressPin('pee')}
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
