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
  ScrollView,
  View,
  Modal,
  Text,
  RefreshControl,
} from 'react-native';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
  pushLike: typeof dogActions.pushLike;
}

interface State {
  dogs: dogActions.Dog[];
  feeds: FeedInterface[];
  selectDog?: dogActions.Dog;
  refresh: boolean;
}

class Wdd extends PureComponent<Props, State> {
  state: State = { dogs: [], feeds: [], refresh: false };

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
    const feeds = await getFeeds({
      dogs: flatten(users.map(user => Object.keys(user.dogs))),
    });
    const dogs = users
      .filter(user => user.repDog !== undefined)
      .map(user => user.repDog) as dogActions.Dog[];
    await this.setState({ feeds, dogs });
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
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this.handleRefresh}
            />
          }>
          {dogsFilter.length === 0 ? (
            <EmptyList
              source={require('src/assets/images/img_no_dog.png')}
              message="내 주변 댕댕이가 없어요 ㅠㅠ"
              style={views.emptyListMargin}
            />
          ) : (
            <>
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
              <FlatList
                data={feeds}
                keyExtractor={(i, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Feed feed={item} deleteFromList={this.handleDelete} />
                )}
              />
            </>
          )}
        </ScrollView>
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
