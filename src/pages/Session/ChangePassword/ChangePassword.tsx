import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import PageContainer from 'src/components/module/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import RoundButton from 'src/components/module/RoundButton';
import { validatePassword } from 'src/services/validate/string';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any>;
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
    // TODO: HANDLE CHANGE PASSWORD ON API
    const { navigation } = this.props;
    Alert.alert(
      '추후에 비밀번호 변경을 추가할 계획입니다.',
      '확인을 눌러 진행하세요.',
      [
        { text: '예', onPress: () => navigation.navigate('signIn') },
        {
          text: '아니오',
          onPress: () => {},
          style: 'cancel',
        },
      ]
    );
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

export default ChangePassword;
