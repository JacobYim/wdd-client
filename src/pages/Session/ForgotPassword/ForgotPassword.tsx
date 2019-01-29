import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import PageContainer from 'src/components/module/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import RoundButton from 'src/components/module/RoundButton';
import { validateEmail } from 'src/services/validate/string';

interface ParamInterface {
  value: string;
  valid: boolean;
  alert?: string;
}

interface Props {
  navigation: NavigationScreenProp<any>;
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

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const { navigation } = this.props;
    return (
      <PageContainer
        title="비밀번호를 잊으셨나요?"
        subtitle="가입 때 사용하신 이메일 주소를 입력해주세요."
        left={{ text: '이전', handlePress: () => navigation.goBack(null) }}
        scrollEnabled={false}>
        <TextInput
          label="이메일 주소 입력"
          name="email"
          value={this.state.email.value}
          handleChange={this.handleChange}
        />
        <RoundButton
          label="인증코드 보내기"
          active={this.state.email.valid}
          handlePress={this.handleSubmit}
        />
      </PageContainer>
    );
  }
}

export default ForgotPassword;
