import React, { Component, createRef } from 'react';
import produce from 'immer';
import { SafeAreaView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView, {
  PROVIDER_GOOGLE,
  LatLng,
  EventUserLocation,
} from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';

import { views } from './Map.styles';
import ToggleMode, { MapMode } from './ToggleMode';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  mapMode: MapMode;
  userLocation: LatLng;
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

  state: State = {
    mapMode: 'map',
    userLocation: this.initLocation,
  };

  trackLocation = (center?: LatLng) => {
    const map = this.map.current;
    if (map)
      map.animateCamera(
        { center: center || this.state.userLocation },
        { duration: 160 }
      );
  };

  handleModeChange = async (mapMode: MapMode) => {
    if (mapMode === 'map') this.trackLocation();
    this.setState({ mapMode });
  };

  handleLocationChange = (event: EventUserLocation) => {
    const { latitude, longitude, speed } = event.nativeEvent.coordinate;
    const userLocation = { latitude, longitude };

    if (this.state.mapMode === 'map') this.trackLocation(userLocation);
    this.setState({ userLocation });
  };

  render() {
    const { mapMode } = this.state;
    const isShopMode = mapMode === 'shop';

    return (
      <SafeAreaView style={views.container}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={views.map}
          initialRegion={{
            ...this.initLocation,
            // Delta
            latitudeDelta: 0.01,
            longitudeDelta: 0.01 * ASPECT_RATIO,
          }}
          showsUserLocation={true}
          onUserLocationChange={this.handleLocationChange}
          scrollEnabled={isShopMode}
        />
        <ToggleMode mode={mapMode} handlePress={this.handleModeChange} />
      </SafeAreaView>
    );
  }
}

export default connect()(Map);
