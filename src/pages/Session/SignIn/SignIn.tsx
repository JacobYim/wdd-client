import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationScreenProp } from 'react-navigation';

import * as userActions from 'src/store/modules/user';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import PageContainer from 'src/components/module/PageContainer';
import RoundButton from 'src/components/module/RoundButton';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  UserActions: typeof userActions;
}

interface State {
  email: string;
  password: string;
}

class SignIn extends Component<Props, State> {
  state: State = {
    email: '',
    password: '',
  };

  handleChange = ({ name, value }: HandleChangeText) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleSignIn = () => {
    const { UserActions } = this.props;
    const { email, password } = this.state;
    UserActions.signIn({ email, password });
  };

  handleSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('signUp');
  };

  handleSkip = () => {
    const { navigation } = this.props;
    navigation.navigate('app');
  };

  render() {
    return (
      <PageContainer
        bottom={{
          text: '비밀번호를 잊으셨나요?',
          bold: '회원가입',
          handlePress: this.handleSignUp,
        }}
        right={{
          text: '건너뛰기',
          handlePress: this.handleSkip,
        }}>
        <TextInput
          label="이메일"
          name="email"
          value={this.state.email}
          handleChange={this.handleChange}
        />
        <TextInput
          label="비밀번호"
          name="password"
          value={this.state.password}
          handleChange={this.handleChange}
        />
        <RoundButton
          label="로그인"
          active={true}
          handlePress={this.handleSignIn}
        />
      </PageContainer>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(SignIn);
