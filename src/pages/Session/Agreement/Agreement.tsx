import React, { Component } from 'react';
import produce, { isDraft } from 'immer';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import PageContainer from 'src/components/module/PageContainer';
import { views, texts } from './Agreement.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  agreeAll: boolean;
}

class Agreement extends Component<Props, State> {
  state: State = {
    agreeAll: false,
  };

  navToSession = () => {
    const { navigation } = this.props;
    navigation.popToTop();
  };

  navToSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('signUpUser');
  };

  handleShortcut = () => {
    this.setState(state =>
      produce(state, draft => {
        draft.agreeAll = !state.agreeAll;
      })
    );
  };

  render() {
    const { agreeAll } = this.state;
    return (
      <PageContainer
        title="약관동의"
        right={{ text: '취소', handlePress: this.navToSession }}
        bottom={{
          text: '확인',
          handlePress: this.navToSignUp,
          boxType: true,
          disable: !agreeAll,
        }}
        scrollEnabled={false}>
        <TouchableOpacity
          style={[
            views.agreeAll,
            views[agreeAll ? 'agreeAllActive' : 'agreeAllInactive'],
          ]}
          onPress={this.handleShortcut}>
          <Text
            style={[
              texts.agreeAll,
              texts[agreeAll ? 'agreeAllActive' : 'agreeAllInactive'],
            ]}>
            아래 약관에 모두 동의합니다.
          </Text>
        </TouchableOpacity>
      </PageContainer>
    );
  }
}

export default Agreement;
