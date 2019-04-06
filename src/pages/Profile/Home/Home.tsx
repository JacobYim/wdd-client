import React, { PureComponent } from 'react';
import { Alert, Image, Modal, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProps, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import TopNavbar from 'src/components/module/TopNavbar';
import { serachByIds } from 'src/services/api/place';
import * as dogActions from 'src/store/actions/dog';
import { Place } from 'src/store/actions/place';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views } from './Home.styles';
import Scrap from './Scrap';
import Tabbar from './Tabbar';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
  selectDog: typeof dogActions.selectDog;
}

interface State {
  showSelectDog: boolean;
  currentTab: string;
  scraps: Place[];
}

class Home extends PureComponent<Props, State> {
  state: State = {
    showSelectDog: false,
    currentTab: 'myFeed',
    scraps: [],
  };

  async componentDidMount() {
    const { places } = this.props.user;
    if (this.state.scraps.length === 0 && places.length > 0) {
      const scraps = await serachByIds({ places });
      this.setState({ scraps });
    }
  }

  toggleModal = () => {
    this.setState({ showSelectDog: !this.state.showSelectDog });
  };

  moveToSetting = () => {
    const { user, navigation } = this.props;
    if (!user.email) Alert.alert('로그인을 해주세요.');
    else if (!user.repDog) Alert.alert('메인 반려견을 선택해주세요');
    else navigation.navigate('setting');
  };

  handleSelectDog = async (_id: string) => {
    const { selectDog } = this.props;
    await selectDog({ _id });
    this.toggleModal();
  };

  handleSwitchTab = (tab: string) => {
    this.setState({ currentTab: tab });
  };

  renderSelectDog = (item: { _id: string; name: string }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={views.dogSelectWrapper}
      onPress={() => this.handleSelectDog(item._id)}>
      <Text style={texts.selectDogName}>{item.name}</Text>
      <Image
        style={icons.check}
        source={
          this.props.user.repDog && this.props.user.repDog._id === item._id
            ? require('src/assets/icons/ic_check_on.png')
            : require('src/assets/icons/ic_check_off.png')
        }
      />
    </TouchableOpacity>
  );

  renderModal = () => {
    const dogsList = Object.keys(this.props.user.dogs).map(_id => ({
      _id,
      name: this.props.user.dogs[_id],
    }));
    return (
      <Modal
        animationType="none"
        visible={this.state.showSelectDog}
        transparent>
        <TouchableOpacity
          style={views.modalBackground}
          activeOpacity={1}
          onPress={this.toggleModal}>
          <SafeAreaView style={views.modal}>
            <FlatList
              data={dogsList}
              contentContainerStyle={views.dogListWrapper}
              keyExtractor={(d, index) => index.toString()}
              renderItem={({ item }) => this.renderSelectDog(item)}
            />
            <TouchableOpacity
              style={views.addDogButton}
              activeOpacity={0.7}
              onPress={() => {
                this.toggleModal();
                this.props.navigation.navigate('create');
              }}>
              <Image
                source={require('src/assets/icons/ic_add.png')}
                style={icons.add}
              />
              <Text style={texts.addDog}>반려견 추가</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    );
  };

  render() {
    const { user, navigation } = this.props;
    const { currentTab } = this.state;
    const thumbnail =
      user.repDog && user.repDog.thumbnail
        ? { uri: user.repDog.thumbnail }
        : require('src/assets/icons/ic_place_default.png');

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavbar
          right={{
            view: (
              <Image
                source={require('src/assets/icons/ic_setting.png')}
                style={icons.setting}
              />
            ),
            handlePress: this.moveToSetting,
          }}
        />
        <View style={views.header}>
          <Image source={thumbnail} style={views.thumbnail} />
          <View style={views.infoWrapper}>
            <TouchableOpacity
              style={views.selectDog}
              activeOpacity={0.7}
              onPress={this.toggleModal}>
              <Text style={texts.name} numberOfLines={1}>
                {user.repDog ? user.repDog.name : '댕댕이 선택하기'}
              </Text>
              <Image
                source={require('src/assets/icons/ic_dropdown_black.png')}
                style={icons.dropDown}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={views.updateProfile}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('edit')}>
              <Text style={texts.updateProfile}>프로필 수정</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Tabbar
          onSwitch={this.handleSwitchTab}
          currentTab={this.state.currentTab}
        />
        {currentTab === 'scrap' && <Scrap scraps={this.state.scraps} />}
        {this.renderModal()}
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: ReducerState) => ({ user: state.user }),
  { selectDog: dogActions.selectDog }
)(Home);
