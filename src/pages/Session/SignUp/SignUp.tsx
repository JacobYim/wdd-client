import produce from 'immer';
import React, { Component } from 'react';
import { Keyboard, TextInput as Input } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { validateEmail, validatePassword } from 'src/assets/functions/validate';
import PageContainer from 'src/components/container/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import * as userActions from 'src/store/actions/user';
import { ReducerState } from 'src/store/reducers';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props extends NavigationScreenProps {
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
    if (error && (!prevError || error.status !== prevError.status)) {
      return error;
    }
    return null;
  }

  componentDidUpdate(
    p: Props,
    s: State,
    snapshot: Props['user']['error'] | null
  ) {
    if (snapshot) {
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

    if (name.valid && email.valid && password.valid && passwordCheck.valid) {
      Keyboard.dismiss();
      // signUp(
      //   {
      //     name: name.value,
      //     email: email.value,
      //     password: password.value,
      //   },
      //   navigation
      // );
      navigation.navigate('createMeta');
    } else {
      this.setState(state =>
        produce(state, draft => {
          if (!draft.name.valid) {
            draft.name.alert = '이름을 입력해주세요';
          }
          if (!draft.email.valid) {
            draft.email.alert = '올바른 이메일을 입력해주세요.';
          }
          if (!draft.password.valid) {
            draft.password.alert = '비밀번호를 8자리 이상 입력해주세요.';
          }
          if (!draft.passwordCheck.valid) {
            draft.passwordCheck.alert = '비밀번호와 동일하지 않습니다.';
          }
        })
      );
    }
  };

  render() {
    const { navigation } = this.props;
    const { name, email, password, passwordCheck } = this.state;
    const isValidated =
      name.valid &&
      email.valid &&
      password.valid &&
      validatePassword(passwordCheck.value);
    return (
      <PageContainer
        title="회원가입"
        left={{ navigation }}
        bottomBox={{
          text: '회원가입',
          handlePress: this.handleSignUp,
          disable: !isValidated,
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
          inputs={this.inputs}
          handleChange={this.handleChange}
          onSubmitEditing={this.handleSignUp}
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
