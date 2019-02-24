import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import * as actions from 'src/store/actions/walk';

interface Props {
  navigation: NavigationScreenProp<any>;
  updateStatus: typeof actions.updateStatus;
}

class SaveWalk extends Component<Props> {
  render() {
    const { navigation, updateStatus } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            updateStatus('READY');
            navigation.popToTop();
          }}>
          <Text>Go Back To Map</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  {
    updateStatus: actions.updateStatus,
  }
)(SaveWalk);
