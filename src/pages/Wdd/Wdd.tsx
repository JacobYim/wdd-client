import { flatten } from 'lodash';
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import DefaultImage from 'src/components/module/DefaultImage';
import Feed from 'src/components/module/Feed';
import { pushLike } from 'src/services/api/dog';
import { Feed as FeedInterface, getFeeds } from 'src/services/api/feed';
import { searchUsers } from 'src/services/api/user';
import { Dog } from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views } from './Wdd.styles';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Modal,
  Text,
} from 'react-native';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
}

interface State {
  dogs: Dog[];
  feeds: FeedInterface[];
  selectDog?: Dog;
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

  selectDog = (selectDog: Dog) => {
    this.setState({ selectDog });
  };

  dismissModal = () => {
    this.setState({ selectDog: undefined });
  };

  renderModal = () => {
    const { selectDog: dog } = this.state;
    const signedIn = this.props.user.email.length > 0;

    return (
      <Modal
        animationType="none"
        visible={dog !== undefined}
        onRequestClose={this.dismissModal}
        transparent
        hardwareAccelerated>
        <TouchableOpacity
          style={views.modalBackground}
          activeOpacity={1}
          onPress={this.dismissModal}>
          {dog && (
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <SafeAreaView style={views.modal}>
                <TouchableOpacity
                  style={views.closeWrapper}
                  activeOpacity={0.7}
                  onPress={this.dismissModal}>
                  <Image
                    source={require('src/assets/icons/ic_close_round.png')}
                    style={icons.close}
                  />
                </TouchableOpacity>
                <DefaultImage uri={dog.thumbnail} size={110} showBorder />
                <Text style={texts.name}>{dog.name}</Text>
                <View style={views.topRowWrapper}>
                  {[dog.breed, dog.gender, dog.weight].map(
                    (data, index) =>
                      data && (
                        <View
                          key={index.toString()}
                          style={[
                            views.itemWrapper,
                            index > 0 ? views.vr : null,
                          ]}>
                          <Text style={texts.spec}>{data}</Text>
                        </View>
                      )
                  )}
                </View>
                {dog.info && <Text style={texts.info}>{dog.info}</Text>}
                <View style={views.bottomRowWrapper}>
                  {[
                    { label: '킁킁', value: dog.likes.length },
                    { label: '산책횟수', value: dog.feeds.length },
                  ].map((data, index) => (
                    <View key={index.toString()} style={views.bottomItem}>
                      <Text style={texts.bottomLabel}>{data.label}</Text>
                      <Text style={texts.bottomValue}>{data.value}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={[
                    views.likeButton,
                    !signedIn ? { opacity: 0.3 } : null,
                  ]}
                  activeOpacity={0.7}
                  disabled={!signedIn}
                  onPress={() => pushLike({ _id: dog._id })}>
                  <Text style={texts.like}>킁킁 보내기</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Modal>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={views.header}>
          <Image
            source={require('src/assets/icons/logo_text.png')}
            style={icons.logo}
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={views.dogsWrapper}>
            <FlatList
              data={this.state.dogs}
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
          </View>
          <FlatList
            data={this.state.feeds}
            keyExtractor={(i, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Feed feed={item} />}
          />
        </ScrollView>
        {this.renderModal()}
      </SafeAreaView>
    );
  }
}

export default connect((state: ReducerState) => ({ user: state.user }))(Wdd);
