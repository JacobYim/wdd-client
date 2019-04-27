import produce from 'immer';
import { findIndex, flatten } from 'lodash';
import React, { PureComponent } from 'react';
import { FlatList, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import DefaultImage from 'src/components/module/DefaultImage';
import EmptyList from 'src/components/module/EmptyList';
import Feed from 'src/components/module/Feed';
import { Feed as FeedInterface, getFeeds } from 'src/services/api/feed';
import { searchUsers } from 'src/services/api/user';
import * as dogActions from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import DogProfile from './DogProfile';
import { icons, views } from './Wdd.styles';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
  pushLike: typeof dogActions.pushLike;
}

interface State {
  dogIds: string[]; // All nearby dogs' id list
  dogs: dogActions.Dog[];
  feeds: FeedInterface[];
  selectDog?: dogActions.Dog;
  refresh: boolean;
}

class Wdd extends PureComponent<Props, State> {
  private holdFeedUpdate = false;
  state: State = { dogIds: [], dogs: [], feeds: [], refresh: false };

  componentDidMount() {
    this.getDataFromServer();
  }

  handleRefresh = async () => {
    await this.setState({ refresh: true });
    await this.getDataFromServer();
    this.setState({ refresh: false });
  };

  handleDelete = (id: string) => {
    const feeds = this.state.feeds.filter(feed => feed._id !== id);
    this.setState({ feeds });
  };

  handlePressLike = (_id: string) => {
    const { user, pushLike } = this.props;
    pushLike({ _id }, () =>
      this.setState(state =>
        produce(state, draft => {
          if (user.repDog && draft.selectDog) {
            const pushData = {
              dog: user.repDog._id,
              createdAt: new Date(),
            };

            const index = findIndex(this.state.dogs, dog => dog._id === _id);
            draft.dogs[index].likes.push(pushData);
            draft.selectDog.likes.push(pushData);
          }
        })
      )
    );
  };

  getDataFromServer = async () => {
    const { coordinates } = this.props.user.location;
    const users = await searchUsers({ coordinates });
    const dogIds = flatten(users.map(user => Object.keys(user.dogs)));
    const feeds = await getFeeds({ dogs: dogIds, length: 0 });
    const dogs = users
      .filter(user => user.repDog !== undefined)
      .map(user => user.repDog) as dogActions.Dog[];
    this.setState({ dogIds, dogs, feeds });
  };

  getMoreFeeds = async () => {
    if (!this.holdFeedUpdate) {
      this.holdFeedUpdate = true;
      const length = this.state.feeds.length;
      const moreFeeds = await getFeeds({ length, dogs: this.state.dogIds });
      this.setState({ feeds: [...this.state.feeds, ...moreFeeds] });
    }
  };

  selectDog = (selectDog: dogActions.Dog) => {
    this.setState({ selectDog });
  };

  dismissModal = () => {
    this.setState({ selectDog: undefined });
  };

  render() {
    const { dogs, feeds, refresh } = this.state;
    const { repDog } = this.props.user;
    const dogsFilter = repDog
      ? dogs.filter(dog => dog._id !== repDog._id)
      : dogs;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={views.header}>
          <Image
            source={require('src/assets/icons/logo_text.png')}
            style={icons.logo}
          />
        </View>
        {dogsFilter.length === 0 ? (
          <EmptyList
            source={require('src/assets/images/img_no_dog.png')}
            message="내 주변 댕댕이가 없어요 ㅠㅠ"
            style={views.emptyListMargin}
          />
        ) : (
          <FlatList
            data={feeds}
            keyExtractor={(i, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onEndReached={this.getMoreFeeds}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              this.holdFeedUpdate = false;
            }}
            renderItem={({ item }) => (
              <Feed feed={item} deleteFromList={this.handleDelete} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={this.handleRefresh}
              />
            }
            ListHeaderComponent={
              <FlatList
                style={views.dogsWrapper}
                data={dogs}
                keyExtractor={(i, index) => index.toString()}
                contentContainerStyle={views.dogsListWrapper}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={views.dogItem}
                    activeOpacity={0.7}
                    onPress={() => this.selectDog(item)}>
                    <DefaultImage uri={item.thumbnail} size={56} />
                  </TouchableOpacity>
                )}
                horizontal
              />
            }
            ListEmptyComponent={
              <EmptyList
                source={require('src/assets/images/img_no_dog.png')}
                message="피드가 아직 없어요 ㅠ"
                style={views.emptyListMargin}
              />
            }
          />
        )}
        <DogProfile
          dog={this.state.selectDog}
          user={this.props.user}
          dismissModal={this.dismissModal}
          onPressLike={this.handlePressLike}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: ReducerState) => ({ user: state.user }),
  { pushLike: dogActions.pushLike }
)(Wdd);
