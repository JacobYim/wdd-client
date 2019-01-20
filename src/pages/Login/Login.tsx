import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { views, texts } from './Login.styles';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/module/PageContainer';
import RoundButton from 'src/components/module/RoundButton';

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

  handlePress = () => {};

  handleSignUp = () => {};

  render() {
    return (
      <PageContainer
        bottom="비밀번호를 잊으셨나요?"
        bottomBold="회원가입"
        bottomPress={this.handleSignUp}>
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
        <RoundButton
          label="로그인"
          active={true}
          handlePress={this.handlePress}
        />
      </PageContainer>
    );
  }
}

export default Login;
