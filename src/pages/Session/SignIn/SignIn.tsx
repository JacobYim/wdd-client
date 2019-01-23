import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/actions/user';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/module/PageContainer';
import RoundButton from 'src/components/module/RoundButton';
import { views } from './SignIn.styles';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  signIn: typeof userActions.signIn;
}

interface State {
  email: string;
  password: string;
}

class SignIn extends Component<Props, State> {
  state: State = {
    email: '',
    password: '',
  };

  handleChange = ({ name, value }: HandleChangeText) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleSignIn = () => {
    const { signIn } = this.props;
    const { email, password } = this.state;
    signIn({ email, password });
  };

  handleSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('signUp');
  };

  handleSkip = () => {
    const { navigation } = this.props;
    navigation.navigate('app');
  };

  render() {
    return (
      <PageContainer
        bottom={{
          text: '비밀번호를 잊으셨나요?',
          bold: '회원가입',
          handlePress: this.handleSignUp,
        }}
        right={{
          text: '건너뛰기',
          handlePress: this.handleSkip,
        }}>
        <Image
          style={views.logo}
          source={require('src/lib/icons/ic_logo.png')}
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
        <RoundButton
          label="로그인"
          active={true}
          handlePress={this.handleSignIn}
        />
      </PageContainer>
    );
  }
}

export default connect(
  null,
  { signIn: userActions.signIn }
)(SignIn);
