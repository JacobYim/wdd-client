import React, { Component } from 'react';
import produce from 'immer';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/actions/user';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/module/PageContainer';
import RoundButton from 'src/components/module/RoundButton';
import { views } from './SignIn.styles';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any, any>;
  signIn: typeof userActions.signIn;
}

interface State {
  email: ParamInterface;
  password: ParamInterface;
}

class SignIn extends Component<Props, State> {
  state: State = {
    email: { value: '', valid: false },
    password: { value: '', valid: false },
  };

  mapEventToState = ({ name, value }: HandleChangeText) => {
    let valid: boolean;
    if (name === 'email') {
      valid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        String(value).toLowerCase()
      );
    } else {
      valid = value.length > 7;
    }

    return { value, valid } as ParamInterface;
  };

  handleChange = async (payload: HandleChangeText) => {
    await this.setState(state => ({
      ...state,
      [payload.name]: this.mapEventToState(payload),
    }));
  };

  handleSignIn = () => {
    const { signIn } = this.props;
    const { email, password } = this.state;

    if (email.valid && password.valid)
      signIn({ email: email.value, password: password.value });
    else
      this.setState(state =>
        produce(state, draft => {
          if (!draft.email.valid)
            draft.email.alert = '올바른 이메일을 입력해주세요.';
          if (!draft.password.valid)
            draft.password.alert = '비밀번호를 8자리 이상 입력해주세요.';
        })
      );
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
    const { email, password } = this.state;
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
          value={email.value}
          alert={email.alert}
          keyboardType="email-address"
          handleChange={this.handleChange}
        />
        <TextInput
          label="비밀번호"
          name="password"
          value={password.value}
          alert={password.alert}
          secureTextEntry={true}
          returnKeyType="send"
          handleChange={this.handleChange}
          onSubmitEditing={this.handleSignIn}
        />
        <RoundButton
          label="로그인"
          active={email.valid && password.valid}
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
