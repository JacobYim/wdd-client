import { isEqual } from 'lodash';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProps, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import DefaultImage from 'src/components/module/DefaultImage';
import FeedComponent from 'src/components/module/Feed';
import TopNavbar from 'src/components/module/TopNavbar';
import { LinkedLike, searchDogs } from 'src/services/api/dog';
import { Feed, getFeeds } from 'src/services/api/feed';
import { getScraps } from 'src/services/api/place';
import * as dogActions from 'src/store/actions/dog';
import { Place as Scrap } from 'src/store/actions/place';
import { ReducerState } from 'src/store/reducers';
import Badges from './Badges';
import { icons, texts, views } from './Home.styles';
import ListItem from './ListItem';
import TabBar from './Tabbar';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
  selectDog: typeof dogActions.selectDog;
}

interface State {
  showSelectDog: boolean;
  currentTab: string;
  feeds: Feed[];
  scraps: Scrap[];
  likes: LinkedLike[];
}

class Home extends PureComponent<Props, State> {
  signedIn = this.props.user.email.length > 0;

  state: State = {
    showSelectDog: false,
    currentTab: this.signedIn ? 'feeds' : '',
    feeds: [],
    scraps: [],
    likes: [],
  };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.loadingDataByTab(this.state.currentTab);
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      prevState.currentTab === 'feeds' &&
      !isEqual(prevProps.user.repDog, this.props.user.repDog)
    ) {
      this.loadingDataByTab(prevState.currentTab);
    }
  }

  toggleModal = () => {
    this.setState({ showSelectDog: !this.state.showSelectDog });
  };

  loadingDataByTab = async (tab: string) => {
    const { repDog, places } = this.props.user;
    const { feeds, scraps, likes } = this.state;
    switch (tab) {
      case 'feeds': {
        if (
          repDog &&
          !isEqual(repDog.feeds.sort(), feeds.map(like => like._id).sort())
        ) {
          this.setState({ feeds: await getFeeds({ feeds: repDog.feeds }) });
        }
        return;
      }
      case 'scrap': {
        if (!isEqual(places.sort(), scraps.map(scrap => scrap._id).sort())) {
          this.setState({ scraps: await getScraps({ places }) });
        }
        return;
      }
      case 'likes': {
        if (
          repDog &&
          !isEqual(
            repDog.likes.map(like => like.dog),
            likes.map(like => like._id)
          )
        ) {
          this.setState({ likes: await searchDogs({ likes: repDog.likes }) });
        }
        return;
      }
    }
  };

  handleSelectDog = async (_id: string) => {
    const { selectDog } = this.props;
    await selectDog({ _id });
    this.toggleModal();
  };

  handleSwitchTab = (currentTab: string) => {
    if (this.signedIn) {
      this.setState({ currentTab });
      this.loadingDataByTab(currentTab);
    }
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
        onRequestClose={this.toggleModal}
        transparent
        hardwareAccelerated>
        <TouchableOpacity
          style={views.modalBackground}
          activeOpacity={1}
          onPress={this.toggleModal}>
          <SafeAreaView style={views.modal}>
            <FlatList
              data={dogsList}
              contentContainerStyle={views.dogListWrapper}
              keyExtractor={(i, index) => index.toString()}
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
            handlePress: () => navigation.navigate('setting'),
          }}
        />
        <View style={views.header}>
          <DefaultImage size={75} uri={user.repDog && user.repDog.thumbnail} />
          <View style={views.infoWrapper}>
            {currentTab ? (
              <>
                <TouchableOpacity
                  style={views.selectDog}
                  activeOpacity={0.7}
                  onPress={this.toggleModal}>
                  <Text style={texts.name} numberOfLines={1}>
                    {user.repDog ? user.repDog.name : '댕댕이 선택'}
                  </Text>
                  <Image
                    source={require('src/assets/icons/ic_dropdown_black.png')}
                    style={icons.dropDown}
                  />
                </TouchableOpacity>
                <Text style={texts.likeInfo}>
                  킁킁{' '}
                  <Text style={{ fontWeight: '500' }}>
                    {user.repDog ? user.repDog.likes.length : 0}
                  </Text>
                </Text>
              </>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('session')}>
                <Text style={[texts.signIn, texts.underline]}>로그인 하기</Text>
              </TouchableOpacity>
            )}
          </View>
          {this.signedIn && user.repDog && (
            <TouchableOpacity
              style={views.updateProfile}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('edit')}>
              <Text style={texts.updateProfile}>프로필 수정</Text>
            </TouchableOpacity>
          )}
        </View>
        <TabBar
          onSwitch={this.handleSwitchTab}
          currentTab={this.state.currentTab}
        />
        {currentTab === 'feeds' && (
          <FlatList
            data={this.state.feeds}
            keyExtractor={(i, index) => index.toString()}
            contentContainerStyle={views.listSpace}
            renderItem={({ item }) => <FeedComponent feed={item} />}
          />
        )}
        {currentTab === 'scrap' && (
          <FlatList
            data={this.state.scraps}
            keyExtractor={(i, index) => index.toString()}
            contentContainerStyle={[views.listContainer, views.listSpace]}
            renderItem={({ item, index }) => (
              <ListItem
                onPress={() => navigation.navigate('place', { place: item })}
                thumbnail={item.thumbnail}
                index={index}
                name={item.name}
                message={item.description}
              />
            )}
          />
        )}
        {currentTab === 'badge' && <Badges user={user} />}
        {currentTab === 'likes' && (
          <FlatList
            data={this.state.likes}
            keyExtractor={(i, index) => index.toString()}
            contentContainerStyle={[views.listContainer, views.listSpace]}
            renderItem={({ item, index }) => (
              <ListItem
                thumbnail={item.thumbnail}
                index={index}
                name={`${item.name}님이 킁킁을 보냈습니다.`}
                message={moment(item.createdAt).fromNow()}
              />
            )}
          />
        )}
        {!this.signedIn && (
          <View style={views.signInMessage}>
            <Text style={[texts.signIn, { textAlign: 'center' }]}>
              로그인을 통해 댕댕이와의 추억을{'\n'}쌓아보세요! 😆
            </Text>
          </View>
        )}
        {this.renderModal()}
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: ReducerState) => ({ user: state.user }),
  { selectDog: dogActions.selectDog }
)(Home);
