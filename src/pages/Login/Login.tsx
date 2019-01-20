import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { View, Text } from 'react-native';

import { views, texts } from './Login.styles';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  email: string;
  password: string;
}

class Login extends Component<Props, State> {
  state: State = {
    email: '',
    password: '',
  };

  render() {
    return (
      <View style={views.container}>
        <Text style={texts.title}>Login Page</Text>
      </View>
    );
  }
}

export default Login;
