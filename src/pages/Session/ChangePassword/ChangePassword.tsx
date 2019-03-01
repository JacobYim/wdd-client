import React, { Component } from 'react';
import { TextInput as Input } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { validatePassword } from 'src/assets/functions/validate';
import PageContainer from 'src/components/container/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import * as actions from 'src/store/actions/user';
// Redux
// Components
// Other

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
  private inputs = {
    password: React.createRef<Input>(),
    passwordCheck: React.createRef<Input>(),
  };

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
      changePassword({ token, password: password.value }, navigation);
    }
  };

  render() {
    const { navigation } = this.props;
    const { password, passwordCheck } = this.state;

    return (
      <PageContainer
        title="비밀번호 변경"
        subtitle="새롭고 안전한 비밀번호를 재설정하세요."
        left={{ navigation }}
        bottomBox={{
          text: '비밀번호 변경',
          handlePress: this.handleSubmit,
          disable: !password.valid || !passwordCheck.valid,
        }}
        alwaysShowBottom>
        <TextInput
          label="새 비밀번호"
          name="password"
          value={password.value}
          secureTextEntry={true}
          returnKeyType="next"
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <TextInput
          label="비밀번호 확인"
          name="passwordCheck"
          value={passwordCheck.value}
          secureTextEntry={true}
          returnKeyType="send"
          inputs={this.inputs}
          handleChange={this.handleChange}
          onSubmitEditing={this.handleSubmit}
        />
      </PageContainer>
    );
  }
}

export default connect(
  null,
  { changePassword: actions.changePassword }
)(ChangePassword);
