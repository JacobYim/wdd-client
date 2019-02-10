import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import PageContainer from 'src/components/container/PageContainer';

interface Props {
  navigation: NavigationScreenProp<any>;
}

const SendEmail: React.FC<Props> = ({ navigation }) => (
  <PageContainer
    title="이메일을 전송했습니다!"
    subtitle="비밀번호 변경을 위해 이메일을 인증해주세요."
    right={{ text: '닫기', handlePress: () => navigation.popToTop() }}>
    <View />
  </PageContainer>
);

export default SendEmail;
