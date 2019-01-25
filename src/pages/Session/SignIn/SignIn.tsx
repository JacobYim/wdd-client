import React, { Component } from 'react';
import produce from 'immer';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/actions/user';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/module/PageContainer';
import RoundButton from 'src/components/module/RoundButton';
import { validateEmail, validatePassword } from 'src/services/validate/string';
import { views } from './SignIn.styles';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any>;
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
    if (name === 'email') valid = validateEmail(value);
    else valid = validatePassword(value);

    return { value, valid } as ParamInterface;
  };

  navToApp = () => {
    const { navigation } = this.props;
    navigation.navigate('app');
  };

  navToSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('signUp');
  };

  handleChange = async (payload: HandleChangeText) => {
    await this.setState(state => ({
      ...state,
      [payload.name]: this.mapEventToState(payload),
    }));
  };

  handleSignIn = () => {
    const { signIn, navigation } = this.props;
    const { email, password } = this.state;

    if (email.valid && password.valid)
      signIn({ email: email.value, password: password.value }, navigation);
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

  render() {
    const { email, password } = this.state;
    return (
      <PageContainer
        bottom={{
          text: '우동댕이 처음이신가요?',
          bold: '회원가입',
          handlePress: this.navToSignUp,
        }}
        right={{
          text: '건너뛰기',
          handlePress: this.navToApp,
        }}
        scrollEnabled={false}>
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
