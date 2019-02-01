import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
// Redux
import { connect } from 'react-redux';
import * as actions from 'src/store/actions/user';
// Components
import PageContainer from 'src/components/module/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import RoundButton from 'src/components/module/RoundButton';
// Other
import { validatePassword } from 'src/lib/validates/string';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any>;
  changePassword: typeof actions.changePassword;
}

interface State {
  password: ParamInterface;
  passwordCheck: ParamInterface;
}

class ChangePassword extends Component<Props, State> {
  state: State = {
    password: {
      value: '',
      valid: false,
    },
    passwordCheck: {
      value: '',
      valid: false,
    },
  };

  mapEventToState = ({ value, name }: HandleChangeText) => {
    let valid: boolean;
    if (name === 'password') valid = validatePassword(value);
    else valid = value === this.state.password.value;
    return { value, valid } as ParamInterface;
  };

  handleChange = (payload: HandleChangeText) => {
    this.setState(state => ({
      ...state,
      [payload.name]: this.mapEventToState(payload),
    }));
  };

  handleSubmit = () => {
    const { changePassword, navigation } = this.props;
    const token = navigation.getParam('token', null);
    if (token) {
      const { password } = this.state;
      changePassword({ password: password.value, token }, navigation);
    }
  };

  render() {
    const { navigation } = this.props;
    const { password, passwordCheck } = this.state;

    return (
      <PageContainer
        title="비밀번호 변경"
        subtitle="새롭고 안전한 비밀번호를 재설정하세요."
        left={{
          text: '이전',
          handlePress: () => navigation.navigate('signIn'),
        }}
        scrollEnabled={false}>
        <TextInput
          label="새 비밀번호"
          name="password"
          value={password.value}
          secureTextEntry={true}
          handleChange={this.handleChange}
        />
        <TextInput
          label="비밀번호 확인"
          name="passwordCheck"
          value={passwordCheck.value}
          secureTextEntry={true}
          handleChange={this.handleChange}
        />
        <RoundButton
          label="비밀번호 변경"
          active={password.valid && passwordCheck.valid}
          handlePress={this.handleSubmit}
        />
      </PageContainer>
    );
  }
}

export default connect(
  null,
  { changePassword: actions.changePassword }
)(ChangePassword);