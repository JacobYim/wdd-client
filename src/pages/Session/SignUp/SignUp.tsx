import React, { Component } from 'react';
import { TextInput as Input } from 'react-native';
import { connect } from 'react-redux';
import produce from 'immer';
import { NavigationScreenProp } from 'react-navigation';

import { ReducerState } from 'src/store/reducers';
import * as userActions from 'src/store/actions/user';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/container/PageContainer';
import RoundButton from 'src/components/module/RoundButton';
import { validateEmail, validatePassword } from 'src/assets/functions/validate';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any>;
  user: ReducerState['user'];
  signUp: typeof userActions.signUp;
}

interface State {
  name: ParamInterface;
  email: ParamInterface;
  password: ParamInterface;
  passwordCheck: ParamInterface;
}

class SignUp extends Component<Props, State> {
  private inputs = {
    name: React.createRef<Input>(),
    email: React.createRef<Input>(),
    password: React.createRef<Input>(),
    passwordCheck: React.createRef<Input>(),
  };

  state: State = {
    name: { value: '', valid: false },
    email: { value: '', valid: false },
    password: { value: '', valid: false },
    passwordCheck: { value: '', valid: false },
  };

  getSnapshotBeforeUpdate(prevProps: Props) {
    const { error } = this.props.user;
    const prevError = prevProps.user.error;
    if (error && (!prevError || error.status !== prevError.status))
      return error;
    return null;
  }

  componentDidUpdate(
    props: Props,
    state: State,
    snapshot: Props['user']['error'] | null
  ) {
    if (snapshot)
      this.setState(state =>
        produce(state, draft => {
          delete draft.email.alert;
          delete draft.password.alert;
          switch (snapshot.status) {
            case 403:
              draft.email.alert = snapshot.data.message;
              break;
          }
        })
      );
  }

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
    const { signUp, navigation } = this.props;
    const { name, email, password, passwordCheck } = this.state;

    if (name.valid && email.valid && password.valid && passwordCheck.valid)
      signUp(
        {
          name: name.value,
          email: email.value,
          password: password.value,
        },
        navigation
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

  render() {
    const { navigation } = this.props;
    const { name, email, password, passwordCheck } = this.state;
    return (
      <PageContainer
        title="회원가입"
        bottom={{
          text: '로그인 하기',
          handlePress: () => navigation.popToTop(),
        }}
        right={{
          view: '건너뛰기',
          handlePress: () => navigation.navigate('app'),
        }}>
        <TextInput
          label="이름"
          name="name"
          value={name.value}
          alert={name.alert}
          returnKeyType="next"
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <TextInput
          label="이메일"
          name="email"
          value={email.value}
          alert={email.alert}
          keyboardType="email-address"
          returnKeyType="next"
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <TextInput
          label="비밀번호"
          name="password"
          value={password.value}
          alert={password.alert}
          secureTextEntry={true}
          returnKeyType="next"
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <TextInput
          label="비밀번호 확인"
          name="passwordCheck"
          value={passwordCheck.value}
          alert={passwordCheck.alert}
          secureTextEntry={true}
          returnKeyType="send"
          inputs={this.inputs}
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
  (state: ReducerState) => ({
    user: state.user,
  }),
  { signUp: userActions.signUp }
)(SignUp);
