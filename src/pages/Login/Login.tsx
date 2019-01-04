import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { views, texts } from './Login.styles';

class Login extends Component {
  render() {
    return (
      <View style={views.container}>
        <Text style={texts.title}>Login Page</Text>
      </View>
    );
  }
}

export default Login;
