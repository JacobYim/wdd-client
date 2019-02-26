import React, { Component } from 'react';
import produce from 'immer';
import { TouchableOpacity, Text, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import PageContainer from 'src/components/container/PageContainer';
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
        bottomBox={{
          text: '확인',
          handlePress: () => navigation.navigate('signUpUser'),
          disable: !agreeAll,
        }}
        scrollEnabled={false}>
        <TouchableOpacity
          style={[
            views.agreeAll,
            views[agreeAll ? 'agreeAllActive' : 'agreeAllInactive'],
          ]}
          activeOpacity={0.7}
          onPress={this.handleShortcut}>
          <Text
            style={[
              texts.agreeAll,
              texts[agreeAll ? 'agreeAllActive' : 'agreeAllInactive'],
            ]}>
            아래 약관에 모두 동의합니다.
          </Text>
          <Image
            style={views.agreeIcon}
            source={require('src/assets/icons/ic_agree.png')}
          />
        </TouchableOpacity>
      </PageContainer>
    );
  }
}

export default Agreement;
