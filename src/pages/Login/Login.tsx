import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { views } from './Login.styles';

class Login extends Component {
  render() {
    return (
      <View style={views.container}>
        <Text>Login Page</Text>
      </View>
    );
  }
}

export default Login;
