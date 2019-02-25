import React, { PureComponent, createRef } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { Text, SafeAreaView, View, Dimensions } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import TopNavbar from 'src/components/module/TopNavbar';
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

const mapColorToStrokes = (pins: ReducerState['walk']['pins']) => {
  const pivot = Math.floor((pins.length - 2) / 3);
  const emptyColor = () => '#00000000';
  const arr1 = Array.from({ length: pivot }, emptyColor);
  const arr2 = Array.from({ length: pins.length - 2 * pivot - 4 }, emptyColor);
  return ['#127EFF'].concat(arr1, ['#5975CF'], arr2, ['#A06CA0'], arr1, [
    '#FF6060',
  ]);
};

const anchor = { x: 0.5, y: 0.5 };

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

  googleMapDidMount = () => {
    const map = this.map.current;
    const { width, height } = Dimensions.get('window');
    if (map)
      map.fitToCoordinates(this.props.walk.pins, {
        animated: false,
        edgePadding: {
          top: height * 0.16,
          right: width * 0.1,
          bottom: height * 0.16,
          left: width * 0.1,
        },
      });
  };

  render() {
    const { walk } = this.props;
    // const strokeColors = mapColorToStrokes(walk.pins);
    return (
      <SafeAreaView style={views.container}>
        <MapView
          ref={this.map}
          onLayout={this.googleMapDidMount}
          provider={PROVIDER_GOOGLE}
          style={views.map}
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
          {/* Start Pinpoint */}
          <Marker
            coordinate={walk.pins[0]}
            anchor={anchor}
            image={require('src/assets/icons/ic_start_marker.png')}
          />
          {/* End Pinpoint */}
          <Marker coordinate={walk.pins[walk.pins.length - 1]} anchor={anchor}>
            <View style={[icons.pin, icons.end]} />
          </Marker>
          {/* Pee & Poo Pinpoint */}
          {this.state.peePooPins.map((pin, i) => (
            <Marker coordinate={pin} anchor={anchor} key={i}>
              <View style={[icons.pin, icons.mid]}>
                <View style={icons.pinInside} />
              </View>
            </Marker>
          ))}
        </MapView>
        <TopNavbar
          right={{ handlePress: this.handleDismiss, view: <Text>닫기</Text> }}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  ({ walk }: ReducerState) => ({ walk }),
  {
    updateStatus: actions.updateStatus,
  }
)(SaveWalk);
