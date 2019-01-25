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

  handleShortcut = () => {
    this.setState(state =>
      produce(state, draft => {
        draft.agreeAll = !state.agreeAll;
      })
    );
  };

  render() {
    const { navigation } = this.props;
    const { agreeAll } = this.state;

    return (
      <PageContainer
        title="약관동의"
        right={{ text: '취소', handlePress: () => navigation.popToTop() }}
        bottom={{
          text: '확인',
          handlePress: () => navigation.navigate('signUpUser'),
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
