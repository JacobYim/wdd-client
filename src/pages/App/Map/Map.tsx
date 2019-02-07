import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';

import { views } from './Map.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
}

class Map extends Component<Props> {
  constructor(props: Props) {
    super(props);
    Geolocation.requestAuthorization();
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log({ latitude, longitude });
      },
      error => {
        throw error.message;
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={views.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={views.map}
          region={{
            // 서울시 서초구 양재동 255-7
            latitude: 37.4734372,
            longitude: 127.0405071,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    );
  }
}

export default connect()(Map);
