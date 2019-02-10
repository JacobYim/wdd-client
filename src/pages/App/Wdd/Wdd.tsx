import React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any>;
}

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
