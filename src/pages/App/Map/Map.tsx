import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';

import { views } from './Map.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  coords: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    Geolocation.requestAuthorization();
    this.state = {
      coords: {
        // 우리동네댕댕이 HQ
        latitude: 37.4734372,
        longitude: 127.0405071,
        // Delta
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          ...this.state,
          coords: { ...this.state.coords, latitude, longitude },
        });
      },
      error => {
        throw error.message;
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    const { coords } = this.state;
    const curCoords = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    return (
      <View style={views.container}>
        <MapView provider={PROVIDER_GOOGLE} style={views.map} region={coords}>
          <Marker
            coordinate={curCoords}
            anchor={{ x: 0.5, y: 0.5 }}
            calloutAnchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={require('src/lib/icons/ic_marker.png')}
              style={views.curMarker}
            />
          </Marker>
        </MapView>
      </View>
    );
  }
}

export default connect()(Map);
