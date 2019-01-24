import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import PageContainer from 'src/components/module/PageContainer';

interface Props {
  navigation: NavigationScreenProp<any>;
}

class UpdateDog extends Component<Props> {
  navToBack = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  navToSession = () => {
    const { navigation } = this.props;
    navigation.popToTop();
  };

  navToNext = () => {
    const { navigation } = this.props;
  };

  render() {
    return (
      <PageContainer
        left={{ text: '이전', handlePress: this.navToBack }}
        right={{ text: '취소', handlePress: this.navToSession }}
        bottom={{
          text: '다음',
          boxType: true,
          handlePress: this.navToNext,
        }}>
        <View />
      </PageContainer>
    );
  }
}

export default UpdateDog;
