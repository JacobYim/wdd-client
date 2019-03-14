import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';
import Splash from 'src/components/module/Splash';
import { texts, views } from './Select.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
}

const BottomButtons: React.FC<Props> = ({ navigation }) => (
  <View style={views.buttons}>
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('app')}>
      <Text style={texts.bottom}>비회원으로 시작하기</Text>
    </TouchableOpacity>
    <View style={views.vr} />
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('signUp')}>
      <Text style={texts.bottom}>회원가입</Text>
    </TouchableOpacity>
  </View>
);

const Select: React.FC<Props> = ({ navigation }) => (
  <>
    <Splash />
    <PageContainer
      bottom={{
        view: <BottomButtons navigation={navigation} />,
        styles: views.bottom,
      }}>
      <View style={views.wrapper}>
        <Image
          style={views.logo}
          source={require('src/assets/icons/logo_text.png')}
        />
        <TouchableOpacity
          style={views.signIn}
          onPress={() => navigation.navigate('signIn')}
          activeOpacity={0.7}>
          <Text style={texts.signIn}>이메일로 로그인하기</Text>
        </TouchableOpacity>
      </View>
    </PageContainer>
  </>
);

export default Select;
