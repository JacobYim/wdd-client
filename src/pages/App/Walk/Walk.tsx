import React from 'react';
import { SafeAreaView, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any>;
}

const Walk: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        style={{ flex: 1, resizeMode: 'contain', backgroundColor: '#FFF' }}
        source={require('src/lib/images/img_count_3.jpg')}
      />
    </SafeAreaView>
  );
};

export default Walk;
