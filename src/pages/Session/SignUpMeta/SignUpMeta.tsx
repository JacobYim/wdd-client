import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import PageContainer from 'src/components/module/PageContainer';

interface Props {
  navigation: NavigationScreenProp<any>;
}

class SignUpMeta extends Component<Props> {
  handleBack = () => {};

  handleCancel = () => {};

  render() {
    return (
      <PageContainer
        title="환영합니다!"
        subtitle="고객님께 더 적절한 산책과 댕댕이를 위해 몇 가지 정보를 입력해주세요."
        left={{ text: '이전', handlePress: this.handleBack }}
        right={{ text: '취소', handlePress: this.handleCancel }}>
        <View />
      </PageContainer>
    );
  }
}

export default SignUpMeta;
