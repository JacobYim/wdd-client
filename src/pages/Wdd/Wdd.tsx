import { flatten } from 'lodash';
import React, { PureComponent } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { FlatList, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import DefaultImage from 'src/components/module/DefaultImage';
import Feed from 'src/components/module/Feed';
import { Feed as FeedInterface, getFeeds } from 'src/services/api/feed';
import { searchUsers } from 'src/services/api/user';
import { Dog } from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { icons, views } from './Wdd.styles';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
}

interface State {
  dogs: Dog[];
  feeds: FeedInterface[];
}

class Wdd extends PureComponent<Props, State> {
  state: State = { dogs: [], feeds: [] };

  async componentDidMount() {
    const { coordinates } = this.props.user.location;
    const users = await searchUsers({ coordinates });
    const feeds = await getFeeds({
      dogs: flatten(users.map(user => Object.keys(user.dogs))),
    });
    const dogs = users
      .filter(user => user.repDog !== undefined)
      .map(user => user.repDog) as Dog[];
    await this.setState({ feeds, dogs });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={views.header}>
          <Image
            source={require('src/assets/icons/logo_text.png')}
            style={icons.logo}
          />
        </View>
        <View style={views.dogsWrapper}>
          <FlatList
            data={this.state.dogs}
            keyExtractor={(i, index) => index.toString()}
            contentContainerStyle={views.dogsListWrapper}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={views.dogItem}>
                <DefaultImage uri={item.thumbnail} size={56} />
              </TouchableOpacity>
            )}
            horizontal
          />
        </View>
        <FlatList
          data={this.state.feeds}
          keyExtractor={(i, index) => index.toString()}
          renderItem={({ item }) => <Feed feed={item} />}
        />
      </SafeAreaView>
    );
  }
}

export default connect((state: ReducerState) => ({ user: state.user }))(Wdd);
