import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import TopNavbar from 'src/components/module/TopNavbar';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views } from './Profile.styles';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
}

const Profile: React.FC<Props> = ({ user }) => (
  <SafeAreaView>
    <TopNavbar
      right={{
        view: (
          <Image
            source={require('src/assets/icons/ic_setting.png')}
            style={icons.setting}
          />
        ),
        handlePress: () => {},
      }}
    />
    <View style={views.header}>
      <Image
        source={
          user.repDog
            ? { uri: user.repDog.thumbnail }
            : require('src/assets/icons/ic_place_default.png')
        }
        style={views.thumbnail}
      />
      <View style={views.infoWrapper}>
        <TouchableOpacity style={views.selectDog} activeOpacity={0.7}>
          <Text style={texts.name}>
            {user.repDog ? user.repDog.name : '댕댕이를 선택해주세요'}
          </Text>
          <Image
            source={require('src/assets/icons/ic_dropdown_black.png')}
            style={icons.dropDown}
          />
        </TouchableOpacity>
        <TouchableOpacity style={views.updateProfile} activeOpacity={0.7}>
          <Text style={texts.updateProfile}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);

export default connect((state: ReducerState) => ({ user: state.user }))(
  Profile
);
