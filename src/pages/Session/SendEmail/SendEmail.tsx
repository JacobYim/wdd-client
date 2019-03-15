import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';

const SendEmail: React.FC<NavigationScreenProps> = ({ navigation }) => (
  <PageContainer
    title="이메일을 전송했습니다!"
    subtitle="비밀번호 변경을 위해 이메일을 인증해주세요."
    right={{ view: '닫기', handlePress: () => navigation.popToTop() }}>
    {}
  </PageContainer>
);

export default SendEmail;
