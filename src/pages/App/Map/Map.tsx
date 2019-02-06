import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/actions/user';
import { views } from './Map.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
  signOut: typeof userActions.signOut;
}

class Map extends Component<Props> {
  constructor(props: Props) {
    super(props);
    Geolocation.requestAuthorization();
  }

  // componentDidMount() {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //     },
  //     error => {
  //       throw error.message;
  //     },
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // }

  handleSignOut = () => {
    const { signOut, navigation } = this.props;
    signOut(navigation);
  };

  render() {
    // // 서울시 서초구 양재동 255-7
    // latitude: 37.4734372,
    // longitude: 127.0405071,
    // zoomLevel: 2,
    return (
      <View style={views.container}>
        <Button title="로그아웃" onPress={this.handleSignOut} />
      </View>
    );
  }
}

export default connect(
  null,
  {
    signOut: userActions.signOut,
  }
)(Map);
