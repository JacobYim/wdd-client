import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/actions/user';
import { views } from './Map.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
  signOut: typeof userActions.signOut;
}

class Map extends Component<Props> {
  handleSignOut = () => {
    const { signOut, navigation } = this.props;
    signOut(navigation);
  };

  render() {
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
