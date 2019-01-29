import React, { Component } from 'react';
import { Alert } from 'react-native';
import produce from 'immer';
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

  handleSendEmail = () => {
    // TODO: REPLACE TO EMAIL VALIDATION
    const { navigation } = this.props;
    const { email } = this.state;

    if (email.valid)
      Alert.alert(
        '추후에 이메일 인증을 추가할 계획입니다.',
        '확인을 눌러 진행하세요.',
        [
          { text: '예', onPress: () => navigation.navigate('changePassword') },
          {
            text: '아니오',
            onPress: () => {},
            style: 'cancel',
          },
        ]
      );
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
        left={{ text: '이전', handlePress: () => navigation.goBack(null) }}
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
        <RoundButton
          label="인증코드 보내기"
          active={email.valid}
          handlePress={this.handleSendEmail}
        />
      </PageContainer>
    );
  }
}

export default ForgotPassword;
