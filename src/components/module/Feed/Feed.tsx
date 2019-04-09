import produce from 'immer';
import { find } from 'lodash';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { rangeWithUnit } from 'src/assets/functions/print';
import DefaultImage from 'src/components/module/DefaultImage';
import DoubleTab from 'src/components/module/DoubleTab';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views, width } from './Feed.styles';
import {
  pushLike,
  undoLike,
  Feed as FeedInterface,
} from 'src/services/api/feed';

interface Props {
  feed: FeedInterface;
  user: ReducerState['user'];
}

interface State {
  index: number;
  pushedLike: boolean;
  likeCount: number;
}

class Feed extends PureComponent<Props, State> {
  state: State = {
    index: 1,
    pushedLike: false,
    likeCount: 0,
  };

  componentDidMount() {
    const { feed, user } = this.props;
    this.setState({
      pushedLike:
        find(feed.likes, like => user._id === like.user) !== undefined,
      likeCount: feed.likes.length,
    });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ index: index + 1 });
  };

  toggleLike = () => {
    const { _id } = this.props.feed;
    this.setState(state =>
      produce(state, draft => {
        draft.pushedLike = !state.pushedLike;
        draft.likeCount = draft.pushedLike
          ? state.likeCount + 1
          : state.likeCount - 1;
        if (draft.pushedLike) pushLike({ _id });
        else undoLike({ _id });
      })
    );
  };

  render() {
    const { feed } = this.props;
    return (
      <View>
        <View style={views.header}>
          <DefaultImage size={32} uri={feed.dog.thumbnail} />
          <Text style={texts.name}>{feed.dog.name}</Text>
          <View style={views.message}>
            <Text style={texts.message}>
              {moment(feed.createdAt).fromNow()}
            </Text>
          </View>
          <TouchableOpacity style={views.headerButton}>
            <View style={views.smallDot} />
            <View style={views.smallDot} />
            <View style={views.smallDot} />
          </TouchableOpacity>
        </View>
        <DoubleTab onDoubleTab={this.toggleLike}>
          <Swiper
            showsPagination={false}
            onIndexChanged={this.handleChangeIndex}
            height={width}
            loadMinimal={true}>
            {feed.images.map((image, index) => (
              <Image
                source={{ uri: image }}
                key={index.toString()}
                style={views.image}
              />
            ))}
          </Swiper>
          <View style={views.paginateStatus}>
            <Text style={texts.paginate}>{`${this.state.index} / ${
              feed.images.length
            }`}</Text>
          </View>
        </DoubleTab>

        <View style={views.infoWrapper}>
          {[
            {
              icon: require('src/assets/icons/ic_time_black.png'),
              value: `${Math.floor(feed.seconds / 60)}분`,
            },
            {
              icon: require('src/assets/icons/ic_distance.png'),
              value: rangeWithUnit(feed.distance),
            },
            {
              icon: require('src/assets/icons/ic_poo_gray.png'),
              value: `${feed.poos}회`,
            },
            {
              icon: require('src/assets/icons/ic_pee_gray.png'),
              value: `${feed.pees}회`,
            },
          ].map((data, index) => (
            <View style={views.infoItem} key={index.toString()}>
              <Image source={data.icon} style={views.infoIcon} />
              <Text style={texts.info}>{data.value}</Text>
            </View>
          ))}
        </View>
        <View style={views.textWrapper}>
          <View style={views.likeInfo}>
            <TouchableOpacity activeOpacity={0.7} onPress={this.toggleLike}>
              <Image
                source={
                  this.state.pushedLike
                    ? require('src/assets/icons/ic_heart_on.png')
                    : require('src/assets/icons/ic_heart_off.png')
                }
                style={icons.heart}
              />
            </TouchableOpacity>
            <Text style={texts.likes}>{this.state.likeCount}</Text>
          </View>
          {feed.memo && <Text style={texts.memo}>{feed.memo}</Text>}
        </View>
      </View>
    );
  }
}

export default connect((state: ReducerState) => ({ user: state.user }))(Feed);
