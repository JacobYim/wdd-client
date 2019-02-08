import React, { Component, createRef } from 'react';
import { SafeAreaView, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';

import { views } from './Map.styles';
import ToggleMode, { MapMode } from './ToggleMode';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  region: Region;
  trackCoords: {
    latitude: number;
    longitude: number;
  };
  getCoords: boolean;
  mapMode: MapMode;
}

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class Map extends Component<Props, State> {
  private map = createRef<MapView>();
  private watchID: number = 0;
  private latDelta: number = 0.01;
  private initRegion: Region = {
    // 우리동네댕댕이 HQ
    latitude: 37.4734372,
    longitude: 127.0405071,
    // Delta
    latitudeDelta: this.latDelta,
    longitudeDelta: this.latDelta * ASPECT_RATIO,
  };

  state: State = {
    region: this.initRegion,
    trackCoords: {
      latitude: this.initRegion.latitude,
      longitude: this.initRegion.longitude,
    },
    getCoords: false,
    mapMode: 'map',
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const map = this.map.current;
    if (prevState.getCoords !== this.state.getCoords && map) {
      map.animateToRegion({ ...this.initRegion, ...this.state.trackCoords });
    }
  }

  componentDidMount() {
    Geolocation.requestAuthorization();
    this.watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          ...this.state,
          getCoords: true,
          trackCoords: { latitude, longitude },
        });
      },
      error => {
        throw error.message;
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  handleRegionChange = (region: Region) => {
    this.setState({ region });
  };

  handleModeChange = (mapMode: MapMode) => {
    this.setState({ mapMode });
  };

  render() {
    const { trackCoords } = this.state;

    return (
      <SafeAreaView style={views.container}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={views.map}
          initialRegion={this.initRegion}
          onRegionChange={this.handleRegionChange}>
          {/* Tracking Marker */}
          <Marker
            coordinate={trackCoords}
            anchor={{ x: 0.5, y: 0.5 }}
            calloutAnchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={require('src/lib/icons/ic_marker.png')}
              style={views.curMarker}
            />
          </Marker>
        </MapView>
        <ToggleMode
          mode={this.state.mapMode}
          handlePress={this.handleModeChange}
        />
      </SafeAreaView>
    );
  }
}

export default connect()(Map);
