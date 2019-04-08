import moment from 'moment';
import React, { PureComponent } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { rangeWithUnit } from 'src/assets/functions/print';
import DefaultImage from 'src/components/module/DefaultImage';
import { Feed as FeedInterface } from 'src/services/api/feed';
import { icons, texts, views, width } from './Feed.styles';

interface Props {
  feed: FeedInterface;
}

interface State {
  index: number;
}

class Feed extends PureComponent<Props, State> {
  state: State = {
    index: 1,
  };

  handleChangeIndex = (index: number) => {
    this.setState({ index: index + 1 });
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
        <View>
          <Swiper
            showsPagination={false}
            onIndexChanged={this.handleChangeIndex}
            height={width}>
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
        </View>
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
            <Image
              source={require('src/assets/icons/ic_heart_off.png')}
              style={icons.heart}
            />
            <Text style={texts.likes}>{feed.dog.likes.length}</Text>
          </View>
          {feed.memo && <Text style={texts.memo}>{feed.memo}</Text>}
        </View>
      </View>
    );
  }
}

export default Feed;
