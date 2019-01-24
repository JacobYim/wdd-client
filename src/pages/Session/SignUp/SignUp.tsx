import React, { Component } from 'react';
import { connect } from 'react-redux';
import produce from 'immer';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/actions/user';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/module/PageContainer';
import RoundButton from 'src/components/module/RoundButton';
import { validateEmail, validatePassword } from 'src/services/validate/string';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any, any>;
  signUp: typeof userActions.signUp;
}

interface State {
  name: ParamInterface;
  email: ParamInterface;
  password: ParamInterface;
  passwordCheck: ParamInterface;
}

class SignUp extends Component<Props, State> {
  state: State = {
    name: { value: '', valid: false },
    email: { value: '', valid: false },
    password: { value: '', valid: false },
    passwordCheck: { value: '', valid: false },
  };

  navToSession = () => {
    const { navigation } = this.props;
    navigation.popToTop();
  };

  navToMeta = () => {
    const { navigation } = this.props;
    navigation.navigate('updateMeta');
  };

  mapEventToState = ({ name, value }: HandleChangeText) => {
    let valid: boolean;
    if (name === 'name') valid = value.length > 0;
    else if (name === 'email') valid = validateEmail(value);
    else if (name === 'password') valid = validatePassword(value);
    else valid = value === this.state.password.value;

    return { value, valid } as ParamInterface;
  };

  handleChange = (payload: HandleChangeText) => {
    this.setState(state => ({
      ...state,
      [payload.name]: this.mapEventToState(payload),
    }));
  };

  handleSignUp = () => {
    const { signUp } = this.props;
    const { name, email, password, passwordCheck } = this.state;

    if (name.valid && email.valid && password.valid && passwordCheck.valid)
      signUp(
        {
          name: name.value,
          email: email.value,
          password: password.value,
        },
        this.navToMeta
      );
    else
      this.setState(state =>
        produce(state, draft => {
          if (!draft.name.valid) draft.name.alert = '이름을 입력해주세요';
          if (!draft.email.valid)
            draft.email.alert = '올바른 이메일을 입력해주세요.';
          if (!draft.password.valid)
            draft.password.alert = '비밀번호를 8자리 이상 입력해주세요.';
          if (!draft.passwordCheck.valid)
            draft.passwordCheck.alert = '비밀번호와 동일하지 않습니다.';
        })
      );
  };

  handleSkip = () => {
    const { navigation } = this.props;
    navigation.navigate('app');
  };

  render() {
    const { name, email, password, passwordCheck } = this.state;
    return (
      <PageContainer
        title="회원가입"
        bottom={{
          text: '로그인 하기',
          handlePress: this.navToSession,
        }}
        right={{
          text: '건너뛰기',
          handlePress: this.handleSkip,
        }}
        scrollEnabled={false}>
        <TextInput
          label="이름"
          name="name"
          value={name.value}
          alert={name.alert}
          handleChange={this.handleChange}
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
          handleChange={this.handleChange}
        />
        <TextInput
          label="비밀번호 확인"
          name="passwordCheck"
          value={passwordCheck.value}
          alert={passwordCheck.alert}
          secureTextEntry={true}
          returnKeyType="send"
          handleChange={this.handleChange}
          onSubmitEditing={this.handleSignUp}
        />
        <RoundButton
          label="회원가입"
          active={
            name.valid && email.valid && password.valid && passwordCheck.valid
          }
          handlePress={this.handleSignUp}
        />
      </PageContainer>
    );
  }
}

export default connect(
  null,
  { signUp: userActions.signUp }
)(SignUp);
