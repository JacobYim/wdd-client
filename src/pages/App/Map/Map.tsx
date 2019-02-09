import React, { Component, createRef } from 'react';
import produce from 'immer';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import MapView, {
  PROVIDER_GOOGLE,
  Region,
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
  loadUser: boolean;
  showMoveToUser: boolean;
  movedByUser: boolean;
  mapMode: MapMode;
  mapRegion: Region;
  userCoords: LatLng;
}

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class Map extends Component<Props, State> {
  private map = createRef<MapView>();
  private initCoords: LatLng = {
    // 우리동네댕댕이 HQ
    latitude: 37.4734372,
    longitude: 127.0405071,
  };
  private initRegion: Region = {
    ...this.initCoords,
    // Delta
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * ASPECT_RATIO,
  };

  state: State = {
    loadUser: false,
    showMoveToUser: false,
    movedByUser: false,
    mapMode: 'map',
    mapRegion: this.initRegion,
    userCoords: this.initCoords,
  };

  handleModeChange = (mapMode: MapMode) => {
    this.setState({ mapMode });
  };

  handleMoveToUser = async () => {
    await this.setState({ showMoveToUser: false, movedByUser: false });
    if (this.map.current)
      this.map.current.animateCamera(
        { center: this.state.userCoords },
        { duration: 200 }
      );
  };

  handleRegionChange = (region: Region) => {
    this.setState(state =>
      produce(state, draft => {
        draft.mapRegion = region;
        if (state.movedByUser) draft.showMoveToUser = true;
      })
    );
  };

  handleRegionChangeComplete = (region: Region) => {
    if (!this.state.movedByUser) this.setState({ movedByUser: true });
  };

  handleUserCoords = (event: EventUserLocation) => {
    const { latitude, longitude, speed } = event.nativeEvent.coordinate;
    const map = this.map.current;
    const latLng = { latitude, longitude };

    this.setState(state =>
      produce(state, draft => {
        if (!draft.loadUser && map) {
          draft.loadUser = true;
          map.setCamera({ center: latLng });
        }
        draft.userCoords = latLng;
      })
    );
  };

  render() {
    const { mapMode, showMoveToUser } = this.state;
    return (
      <SafeAreaView style={views.container}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={views.map}
          initialRegion={this.initRegion}
          showsUserLocation={true}
          onRegionChange={this.handleRegionChange}
          onRegionChangeComplete={this.handleRegionChangeComplete}
          onUserLocationChange={this.handleUserCoords}
        />
        <ToggleMode mode={mapMode} handlePress={this.handleModeChange} />
        {showMoveToUser && (
          <TouchableOpacity
            style={views.trackUserButton}
            onPress={this.handleMoveToUser}
            activeOpacity={0.95}>
            <Image
              style={views.trackUserIcon}
              source={require('src/lib/icons/ic_navigation.png')}
            />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}

export default connect()(Map);
