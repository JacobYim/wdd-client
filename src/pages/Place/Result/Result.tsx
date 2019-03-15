import produce from 'immer';
import { pick } from 'lodash';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import TrackUser from 'src/pages/App/Map/TrackUser';
import { searchPlace } from 'src/services/api/place';
import MapView, {
  LatLng,
  PROVIDER_GOOGLE,
  EventUserLocation,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LOCATION: LatLng = { latitude: 37.4734372, longitude: 127.0405071 };
const DELTA = { latitudeDelta: 0.005, longitudeDelta: 0.005 * ASPECT_RATIO };

interface State {
  trackUser: boolean;
  current: {
    latitude: number;
    longitude: number;
  };
}

class Result extends Component<NavigationScreenProps, State> {
  private map = React.createRef<MapView>();

  state: State = {
    trackUser: true,
    current: LOCATION,
  };

  moveCameraToUser = (center: LatLng, activate: boolean) => {
    const map = this.map.current;
    if (map && activate) {
      map.animateToRegion({ ...center, ...DELTA }, 120);
    }
  };

  handleDragMapStart = () => {
    if (this.state.trackUser) this.setState({ trackUser: false });
  };

  handlePressTrackButton = () => {
    this.setState(state =>
      produce(state, draft => {
        draft.trackUser = !state.trackUser;
        this.moveCameraToUser(state.current, draft.trackUser);
      })
    );
  };

  handleLocationChange = (e: EventUserLocation) => {
    this.setState({
      current: pick(e.nativeEvent.coordinate, ['latitude', 'longitude']),
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{ ...LOCATION, ...DELTA }}
          showsCompass={false}
          showsMyLocationButton={false}
          showsUserLocation={true}
          onTouchStart={this.handleDragMapStart}
          onUserLocationChange={this.handleLocationChange}
        />
        <TrackUser
          handlePress={this.handlePressTrackButton}
          active={this.state.trackUser}
        />
      </SafeAreaView>
    );
  }
}

export default Result;
