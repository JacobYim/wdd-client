import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {}

const Wdd: React.FC<Props> = ({ navigation }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    }}>
    <Text>우동댕 페이지 준비중입니다 ٩(๑❛ᴗ❛๑)۶</Text>
  </View>
);

export default Wdd;
