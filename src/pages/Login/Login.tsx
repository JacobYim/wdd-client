import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { View, Text } from 'react-native';

import { texts } from './Login.styles';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/module/PageContainer';

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

  handleChange = ({ name, value }: HandleChangeText) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  render() {
    return (
      <PageContainer>
        <TextInput
          label="이메일"
          name="email"
          value={this.state.email}
          handleChange={this.handleChange}
        />
        <TextInput
          label="비밀번호"
          name="password"
          value={this.state.password}
          handleChange={this.handleChange}
        />
      </PageContainer>
    );
  }
}

export default Login;
