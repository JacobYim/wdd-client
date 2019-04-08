import React, { PureComponent } from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import TopNavbar from 'src/components/module/TopNavbar';
import WebModal from 'src/components/module/WebModal';
import * as userActions from 'src/store/actions/user';
import RowItem from './RowItem';
import { icons, views } from './Setting.styles';

interface Props extends NavigationScreenProps {
  signOut: typeof userActions.signOut;
  terminate: typeof userActions.terminate;
}

interface State {
  pushNotif: boolean;
  showMyFeed: boolean;
  web?: {
    title: string;
    link: string;
  };
}

class Setting extends PureComponent<Props, State> {
  state: State = {
    pushNotif: true,
    showMyFeed: true,
  };

  hideModal = () => {
    this.setState({ web: undefined });
  };

  render() {
    const { navigation, signOut, terminate } = this.props;
    const { pushNotif, showMyFeed } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavbar
          center="설정"
          left={{
            view: (
              <Image
                style={icons.back}
                source={require('src/assets/icons/ic_back.png')}
              />
            ),
            handlePress: () => navigation.goBack(null),
          }}
          showBorder
        />
        <ScrollView style={views.container}>
          <View style={[views.boxWrapper, { marginTop: 0, borderTopWidth: 0 }]}>
            {[
              {
                label: '푸시 알림',
                value: pushNotif,
                handleValueChange: (pushNotif: boolean) => {
                  this.setState({ pushNotif });
                },
              },
              {
                label: '내 산책여부 표시',
                value: showMyFeed,
                handleValueChange: (showMyFeed: boolean) => {
                  this.setState({ showMyFeed });
                },
              },
            ].map((item, index) => (
              <RowItem item={item} index={index} key={item.label} />
            ))}
          </View>
          <View style={views.boxWrapper}>
            {[
              { label: '공지사항', handlePress: () => {} },
              {
                label: '서비스 약관',
                handlePress: () => {
                  this.setState({
                    web: {
                      title: '서비스 약관',
                      link: 'http://policy.woodongdang.com/',
                    },
                  });
                },
              },
              { label: '개인정보 이용 약관', handlePress: () => {} },
              { label: '고객센터', handlePress: () => {} },
              { label: '로그아웃', handlePress: () => signOut(navigation) },
              { label: '탈퇴하기', handlePress: () => terminate(navigation) },
              { label: '장소등록 및 수정 요청', handlePress: () => {} },
            ].map((item, index) => (
              <RowItem item={item} index={index} key={item.label} />
            ))}
          </View>
        </ScrollView>
        <WebModal hideModal={this.hideModal} data={this.state.web} />
      </SafeAreaView>
    );
  }
}

export default connect(
  null,
  { signOut: userActions.signOut, terminate: userActions.terminate }
)(Setting);
