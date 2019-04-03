import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';

const { height } = Dimensions.get('window');

const SendEmail: React.FC<NavigationScreenProps> = ({ navigation }) => (
  <PageContainer
    title="이메일을 전송했습니다!"
    subtitle="비밀번호 변경을 위해 이메일을 인증해주세요."
    right={{ view: '닫기', handlePress: () => navigation.popToTop() }}>
    <View style={{ marginTop: height * 0.15, alignItems: 'center' }}>
      <Image
        source={require('src/assets/images/img_mail.png')}
        style={{ width: 189, height: 187 }}
      />
    </View>
  </PageContainer>
);

export default SendEmail;
