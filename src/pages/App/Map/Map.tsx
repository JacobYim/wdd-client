import React, { Component, createRef } from 'react';
import produce from 'immer';
import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  GestureResponderEvent,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  LatLng,
  EventUserLocation,
} from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';

import { views, icons } from './Map.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  userLocation: LatLng;
  trackUser: boolean;
}

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class Map extends Component<Props, State> {
  private map = createRef<MapView>();
  private initLocation: LatLng = {
    // 우리동네댕댕이 HQ
    latitude: 37.4734372,
    longitude: 127.0405071,
  };
  private initDelta = {
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * ASPECT_RATIO,
  };

  state: State = {
    userLocation: this.initLocation,
    trackUser: true,
  };

  moveCameraToUser = (center: LatLng, activate: boolean) => {
    const map = this.map.current;
    if (map && activate)
      map.animateToRegion({ ...center, ...this.initDelta }, 240);
  };

  handleDragMapStart = (e: GestureResponderEvent) => {
    if (e.target === 13) {
      // e.stopPropagation();
      if (this.state.trackUser) this.setState({ trackUser: false });
    }
  };

  handlePressTrackButton = () => {
    this.setState(state =>
      produce(state, draft => {
        draft.trackUser = !state.trackUser;
        this.moveCameraToUser(state.userLocation, draft.trackUser);
      })
    );
  };

  handleLocationChange = (e: EventUserLocation) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    this.setState(state =>
      produce(state, draft => {
        draft.userLocation = { latitude, longitude };
        this.moveCameraToUser(draft.userLocation, state.trackUser);
      })
    );
  };

  render() {
    const { trackUser } = this.state;

    return (
      <ScrollView
        contentContainerStyle={views.container}
        onTouchStart={this.handleDragMapStart}
        scrollEnabled={false}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={views.map}
          initialRegion={{
            ...this.initLocation,
            ...this.initDelta,
          }}
          showsUserLocation={true}
          onUserLocationChange={this.handleLocationChange}
        />
        <TouchableOpacity
          style={views.trackUserButton}
          activeOpacity={1}
          onPress={this.handlePressTrackButton}>
          <Image
            style={[{ opacity: trackUser ? 1 : 0.4 }, icons.trackUser]}
            source={require('src/assets/icons/ic_location.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Map;
