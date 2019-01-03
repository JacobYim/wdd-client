import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { views } from './Map.styles';

class Map extends Component {
  render() {
    return (
      <View style={views.container}>
        <Text>Map Page</Text>
      </View>
    );
  }
}

export default Map;
