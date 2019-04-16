import { isEqual } from 'lodash';
import moment from 'moment';
import React, { PureComponent } from 'react';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { NavigationScreenProps, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import DefaultImage from 'src/components/module/DefaultImage';
import EmptyList from 'src/components/module/EmptyList';
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
import Like from './Like';
import Place from './Place';
import TabBar from './Tabbar';
import {
  Image,
  Modal,
  Text,
  View,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
  selectDog: typeof dogActions.selectDog;
}

interface State {
  showSelectDog: boolean;
  showCenter: boolean;
  currentTab: string;
  feeds: Feed[];
  scraps: Scrap[];
  likes: LinkedLike[];
}

class Home extends PureComponent<Props, State> {
  signedIn = this.props.user.email.length > 0;

  state: State = {
    showSelectDog: false,
    showCenter: false,
    currentTab: 'feeds',
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

  navToSignIn = () => {
    const { navigate } = this.props.navigation;
    navigate('session');
    navigate('signIn');
  };

  handleSelectDog = async (_id: string) => {
    const { selectDog } = this.props;
    await selectDog({ _id });
    this.toggleModal();
  };

  handleSwitchTab = (currentTab: string) => {
    this.setState({ currentTab });
    if (this.signedIn) this.loadingDataByTab(currentTab);
  };

  handleRemoveFeed = async (id: string) => {
    const feeds = this.state.feeds.filter(feed => feed._id !== id);
    this.setState({ feeds });
  };

  handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = e.nativeEvent;
    const { showCenter } = this.state;
    if (contentOffset.y > 152) {
      if (!showCenter) this.setState({ showCenter: true });
    } else {
      if (showCenter) this.setState({ showCenter: false });
    }
  };

  renderSelectDog = (item: { _id: string; name: string }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={views.dogSelectWrapper}
      onPress={() => this.handleSelectDog(item._id)}>
      <DefaultImage size={40} />
      <Text style={texts.selectDogName}>{item.name}</Text>
      <Image
        style={icons.check}
        source={
          this.props.user.repDog && this.props.user.repDog._id === item._id
            ? require('src/assets/icons/ic_check_on.png')
            : require('src/assets/icons/ic_check_filled_off.png')
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
        transparent
        hardwareAccelerated
        onRequestClose={this.toggleModal}>
        <TouchableOpacity
          style={views.modalBackground}
          onPress={this.toggleModal}
          activeOpacity={1}>
          <View style={views.modal}>
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
            {Platform.OS === 'ios' ? (
              <SafeAreaView />
            ) : (
              <View
                style={{ height: ExtraDimensions.getSoftMenuBarHeight() }}
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  render() {
    const { user, navigation } = this.props;
    const { currentTab } = this.state;
    const name = user.repDog ? user.repDog.name : '댕댕이 선택';

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
          center={
            this.state.showCenter ? (
              <View style={views.topWrapper}>
                <TouchableOpacity
                  style={views.centerButton}
                  activeOpacity={0.7}
                  onPress={this.toggleModal}>
                  <Text style={texts.center}>{name}</Text>
                  <Image
                    source={require('src/assets/icons/ic_dropdown_black.png')}
                    style={icons.dropDown}
                  />
                </TouchableOpacity>
              </View>
            ) : null
          }
          showBorder={this.state.showCenter}
        />
        <ScrollView
          style={{ flex: 1 }}
          onScroll={this.handleScroll}
          scrollEventThrottle={160}>
          <View style={views.header}>
            <DefaultImage
              size={75}
              uri={user.repDog && user.repDog.thumbnail}
            />
            <View style={views.infoWrapper}>
              {this.signedIn ? (
                <>
                  <TouchableOpacity
                    style={views.selectDog}
                    activeOpacity={0.7}
                    onPress={this.toggleModal}>
                    <Text style={texts.name} numberOfLines={1}>
                      {name}
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
                <TouchableOpacity onPress={this.navToSignIn}>
                  <Text style={[texts.signIn, texts.underline]}>
                    로그인 하기
                  </Text>
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
          {currentTab === 'feeds' &&
            (this.state.feeds.length !== 0 ? (
              <FlatList
                data={this.state.feeds}
                keyExtractor={(i, index) => index.toString()}
                contentContainerStyle={views.listSpace}
                renderItem={({ item, index }) => (
                  <FeedComponent
                    feed={item}
                    prevFeed={index > 0 ? this.state.feeds[index - 1] : null}
                    deleteFromList={this.handleRemoveFeed}
                  />
                )}
              />
            ) : (
              <EmptyList
                source={require('src/assets/images/img_no_feed.png')}
                message={'산책을 하고 첫 게시물을\n등록해 보세요!'}
                style={views.emptyListTop}
              />
            ))}
          {currentTab === 'scrap' &&
            (this.state.scraps.length !== 0 ? (
              <FlatList
                data={this.state.scraps}
                keyExtractor={(i, index) => index.toString()}
                contentContainerStyle={[views.listContainer, views.listSpace]}
                renderItem={({ item }) => (
                  <Place
                    onPress={() =>
                      navigation.navigate('place', { place: item })
                    }
                    name={item.name}
                    label={item.label}
                    icon={item.icon}
                    description={item.description}
                  />
                )}
              />
            ) : (
              <EmptyList
                source={require('src/assets/images/img_no_scrap.png')}
                message={'내가 좋아하는 상점을\n등록해 보세요!'}
                style={views.emptyListTop}
              />
            ))}
          {currentTab === 'badge' && <Badges user={user} />}
          {currentTab === 'likes' &&
            (this.state.likes.length !== 0 ? (
              <FlatList
                data={this.state.likes}
                keyExtractor={(i, index) => index.toString()}
                contentContainerStyle={[views.listContainer, views.listSpace]}
                renderItem={({ item, index }) => (
                  <Like
                    thumbnail={item.thumbnail}
                    index={index}
                    name={`${item.name}님이 킁킁을 보냈습니다.`}
                    message={moment(item.createdAt).fromNow()}
                  />
                )}
              />
            ) : (
              <EmptyList
                source={require('src/assets/images/img_no_like.png')}
                message={'내 주변 댕댕이에게\n킁킁을 받아보세요!'}
                style={views.emptyListTop}
              />
            ))}
        </ScrollView>
        {this.renderModal()}
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: ReducerState) => ({ user: state.user }),
  { selectDog: dogActions.selectDog }
)(Home);
