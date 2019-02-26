import React, { PureComponent, createRef } from 'react';
import MapView, {
  Callout,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { connect } from 'react-redux';
import { View, Dimensions, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import BottomButtons from './BottomButtons';
import PageContainer from 'src/components/container/PageContainer';
import { ReducerState } from 'src/store/reducers';
import * as actions from 'src/store/actions/walk';
import { views, icons } from './SaveWalk.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
}

interface State {
  peePooPins: ReducerState['walk']['pins'];
}

// const mapColorToStrokes = (pins: ReducerState['walk']['pins']) => {
//   const pivot = Math.floor((pins.length - 2) / 3);
//   const emptyColor = () => '#00000000';
//   const arr1 = Array.from({ length: pivot }, emptyColor);
//   const arr2 = Array.from({ length: pins.length - 2 * pivot - 4 }, emptyColor);
//   return ['#127EFF'].concat(arr1, ['#5975CF'], arr2, ['#A06CA0'], arr1, [
//     '#FF6060',
//   ]);
// };

const center = { x: 0.5, y: 0.5 };

class SaveWalk extends PureComponent<Props, State> {
  private map = createRef<MapView>();

  state: State = { peePooPins: [] };

  componentDidMount() {
    this.setState({
      peePooPins: this.props.walk.pins.filter(pin => pin.type !== undefined),
    });
  }

  handleDismiss = () => {
    const { navigation, updateStatus } = this.props;
    updateStatus('READY');
    navigation.popToTop();
  };

  handlePressDownload = () => {};

  handlePressFeed = () => {};

  googleMapDidMount = () => {
    const map = this.map.current;
    const { width, height } = Dimensions.get('window');
    if (map)
      map.fitToCoordinates(this.props.walk.pins, {
        animated: false,
        edgePadding: {
          top: height * 0.3,
          right: width * 0.12,
          bottom: height * 0.2,
          left: width * 0.12,
        },
      });
  };

  render() {
    const { walk } = this.props;
    // const strokeColors = mapColorToStrokes(walk.pins);
    return (
      <>
        <MapView
          ref={this.map}
          onLayout={this.googleMapDidMount}
          provider={PROVIDER_GOOGLE}
          style={views.absolute}
          zoomEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          toolbarEnabled={false}>
          <Polyline
            coordinates={walk.pins}
            lineCap="round"
            lineJoin="round"
            strokeWidth={4}
            strokeColor="#FF6060"
            // strokeColors={strokeColors}
          />
          {/* Start & END Pinpoint */}
          <Marker
            coordinate={walk.pins[0]}
            anchor={center}
            image={require('src/assets/icons/ic_start_marker.png')}
          />
          <Marker coordinate={walk.pins[walk.pins.length - 1]} anchor={center}>
            <View style={[icons.marker, icons.end]} />
          </Marker>
          {/* Pee & Poo Pinpoint */}
          {this.state.peePooPins.map((pin, i) => (
            <Marker coordinate={pin} anchor={{ x: 0.5, y: 0.838 }} key={i}>
              <View style={views.pin}>
                <View style={views.absolute}>
                  <Image
                    source={require('src/assets/icons/ic_pin.png')}
                    style={icons.pin}
                  />
                </View>
                <Image
                  source={
                    pin.type === 'pee'
                      ? require('src/assets/icons/ic_pee.png')
                      : require('src/assets/icons/ic_poo.png')
                  }
                  style={icons.pinType}
                />
              </View>
            </Marker>
          ))}
        </MapView>
        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF00', '#FFFFFF00', '#FFFFFF']}
          locations={[0.16, 0.4, 0.68, 0.84]}
          style={views.container}>
          <PageContainer
            right={{
              handlePress: this.handleDismiss,
              view: (
                <Image
                  style={icons.close}
                  source={require('src/assets/icons/ic_close.png')}
                />
              ),
            }}
            bottom={{
              view: (
                <BottomButtons
                  handlePressDownload={this.handlePressDownload}
                  handlePressFeed={this.handlePressFeed}
                />
              ),
              styles: views.bottomWrapper,
            }}
            title={`오늘의 행복한 순간을\n기록해보세요!`}
            scrollEnabled={false}
            titleNarrow>
            <View />
          </PageContainer>
        </LinearGradient>
      </>
    );
  }
}

export default connect(
  ({ walk }: ReducerState) => ({ walk }),
  {
    updateStatus: actions.updateStatus,
  }
)(SaveWalk);
