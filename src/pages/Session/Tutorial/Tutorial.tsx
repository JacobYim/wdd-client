import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { SafeAreaView, Text, Button } from 'react-native';

interface Props {
  navigation: NavigationScreenProp<Props>;
}

const Tutorial: React.SFC<Props> = ({ navigation }: Props) => (
  <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text>튜토리얼 페이지입니다.</Text>
    <Button
      title="메인 페이지로 가기"
      onPress={() => navigation.navigate('app')}
    />
  </SafeAreaView>
);

export default Tutorial;
