import React, { Component } from 'react';
import produce from 'immer';
import {
  Image,
  TextInput as Input,
  TouchableOpacity,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/actions/user';
import { ReducerState } from 'src/store/reducers';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/container/PageContainer';
import RoundButton from 'src/components/module/RoundButton';
import { validateEmail, validatePassword } from 'src/assets/functions/validate';
import { views, texts } from './SignIn.styles';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any>;
  user: ReducerState['user'];
  signIn: typeof userActions.signIn;
}

interface State {
  email: ParamInterface;
  password: ParamInterface;
}

class SignIn extends Component<Props, State> {
  private inputs = {
    email: React.createRef<Input>(),
    password: React.createRef<Input>(),
  };

  state: State = {
    email: { value: '', valid: false },
    password: { value: '', valid: false },
  };

  getSnapshotBeforeUpdate(prevProps: Props) {
    const { error } = this.props.user;
    const prevError = prevProps.user.error;
    if (error && (!prevError || error.status !== prevError.status))
      return error;
    return null;
  }

  componentDidUpdate(
    p: Props,
    s: State,
    snapshot: Props['user']['error'] | null
  ) {
    if (snapshot)
      this.setState(state =>
        produce(state, draft => {
          delete draft.email.alert;
          delete draft.password.alert;
          switch (snapshot.status) {
            case 400:
              draft.password.alert = snapshot.data.message;
              break;
            case 404:
              draft.email.alert = snapshot.data.message;
              break;
          }
        })
      );
  }

  mapEventToState = ({ name, value }: HandleChangeText) => {
    let valid: boolean;
    if (name === 'email') valid = validateEmail(value);
    else valid = validatePassword(value);

    return { value, valid } as ParamInterface;
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
    const { navigation } = this.props;
    const { email, password } = this.state;

    return (
      <PageContainer
        left={{ navigation }}
        title="이메일로 로그인"
        scrollEnabled={false}>
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
          returnKeyType="send"
          inputs={this.inputs}
          handleChange={this.handleChange}
          onSubmitEditing={this.handleSignIn}
        />
        <RoundButton
          label="로그인"
          active={email.valid && password.valid}
          handlePress={this.handleSignIn}
        />
        <TouchableOpacity
          style={views.forgotPassword}
          onPress={() => navigation.navigate('forgotPassword')}>
          <Text style={texts.forgotPassword}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
      </PageContainer>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    user: state.user,
  }),
  { signIn: userActions.signIn }
)(SignIn);
