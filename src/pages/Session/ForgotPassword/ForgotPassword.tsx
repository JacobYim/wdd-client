import React, { Component } from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/actions/user';
import { ReducerState } from 'src/store/reducers';
import PageContainer from 'src/components/container/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import { validateEmail } from 'src/assets/functions/validate';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any>;
  forgotPassword: typeof userActions.forgotPassword;
  user: ReducerState['user'];
}

interface State {
  email: ParamInterface;
}

class ForgotPassword extends Component<Props, State> {
  state: State = {
    email: {
      value: '',
      valid: false,
    },
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
          if (snapshot.status === 404)
            draft.email.alert = snapshot.data.message;
        })
      );
  }

  mapEventToState = ({ value }: HandleChangeText) => {
    const valid = validateEmail(value);
    return { value, valid } as ParamInterface;
  };

  handleChange = (payload: HandleChangeText) => {
    this.setState(state => ({
      ...state,
      [payload.name]: this.mapEventToState(payload),
    }));
  };

  handleSendEmail = () => {
    const { forgotPassword, navigation } = this.props;
    const { email } = this.state;

    if (email.valid) forgotPassword({ email: email.value }, navigation);
    else
      this.setState(state =>
        produce(state, draft => {
          draft.email.alert = '올바른 이메일을 입력해주세요.';
        })
      );
  };

  render() {
    const { navigation } = this.props;
    const { email } = this.state;

    return (
      <PageContainer
        title="비밀번호를 잊으셨나요?"
        subtitle="가입 때 사용하신 이메일 주소를 입력해주세요."
        left={{ navigation }}
        bottomBox={{
          text: '인증코드 받기',
          disable: !email.valid,
          handlePress: this.handleSendEmail,
        }}
        scrollEnabled={false}>
        <TextInput
          label="이메일 주소 입력"
          name="email"
          value={email.value}
          alert={email.alert}
          handleChange={this.handleChange}
          returnKeyType="send"
          onSubmitEditing={this.handleSendEmail}
        />
      </PageContainer>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    user: state.user,
  }),
  { forgotPassword: userActions.forgotPassword }
)(ForgotPassword);
