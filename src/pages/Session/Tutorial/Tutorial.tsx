import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

const Tutorial: React.FC<NavigationScreenProps> = ({ navigation }) => (
  <SafeAreaView
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>튜토리얼 페이지입니다.</Text>
    <Button
      title="메인 페이지로 가기"
      onPress={() => navigation.navigate('app')}
    />
  </SafeAreaView>
);

export default Tutorial;
