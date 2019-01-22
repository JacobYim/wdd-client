import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/module/PageContainer';
import RoundButton from 'src/components/module/RoundButton';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

class SignUp extends Component<Props, State> {
  state: State = {
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  };

  handleChange = ({ name, value }: HandleChangeText) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleSignIn = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  handleSignUp = () => {};

  handleSkip = () => {
    const { navigation } = this.props;
    navigation.navigate('app');
  };

  render() {
    return (
      <PageContainer
        bottom={{
          text: '로그인 하기',
          handlePress: this.handleSignIn,
        }}
        right={{
          text: '건너뛰기',
          handlePress: this.handleSkip,
        }}>
        <TextInput
          label="이름"
          name="name"
          value={this.state.name}
          handleChange={this.handleChange}
        />
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
        <TextInput
          label="비밀번호 확인"
          name="passwordCheck"
          value={this.state.passwordCheck}
          handleChange={this.handleChange}
        />
        <RoundButton
          label="회원가입"
          active={true}
          handlePress={this.handleSignUp}
        />
      </PageContainer>
    );
  }
}

export default SignUp;
