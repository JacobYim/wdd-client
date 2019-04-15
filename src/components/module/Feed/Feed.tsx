import produce from 'immer';
import { find } from 'lodash';
import moment from 'moment';
import React, { PureComponent } from 'react';
import ActionSheet from 'react-native-actionsheet';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { rangeWithUnit, timeWithUnit } from 'src/assets/functions/print';
import DefaultImage from 'src/components/module/DefaultImage';
import DoubleTab from 'src/components/module/DoubleTab';
import { History } from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views } from './Feed.styles';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import {
  deleteFeed,
  pushLike,
  undoLike,
  Feed as FeedInterface,
} from 'src/services/api/feed';

interface Props {
  feed: FeedInterface;
  prevFeed?: FeedInterface | null;
  user: ReducerState['user'];
  deleteFromList: (id: string) => void;
}

interface State {
  index: number;
  pushedLike: boolean;
  showAnimation: boolean;
  likeCount: number;
  heartSize: Animated.Value;
}

enum Actions {
  Delete,
  Cancel,
}

class Feed extends PureComponent<Props, State> {
  private actionSheet = React.createRef<ActionSheet>();

  state: State = {
    index: 1,
    pushedLike: false,
    showAnimation: false,
    likeCount: 0,
    heartSize: new Animated.Value(0),
  };

  componentDidMount() {
    const { feed, user } = this.props;
    this.setState({
      pushedLike:
        find(feed.likes, like => user._id === like.user) !== undefined,
      likeCount: feed.likes.length,
    });
  }

  toggleLike = () => {
    const { _id } = this.props.feed;
    const pushedLike = !this.state.pushedLike;
    this.setState({
      pushedLike,
      likeCount: pushedLike
        ? this.state.likeCount + 1
        : this.state.likeCount - 1,
      showAnimation: pushedLike,
    });

    if (pushedLike) {
      pushLike({ _id });
      Animated.timing(this.state.heartSize, {
        toValue: 1,
        duration: 60,
        useNativeDriver: true,
      }).start(bigger => {
        if (bigger.finished) {
          setTimeout(() => {
            Animated.timing(this.state.heartSize, {
              toValue: 0,
              duration: 120,
              useNativeDriver: true,
            }).start(smaller => {
              if (smaller.finished) {
                this.setState({ showAnimation: false });
              }
            });
          }, 1600);
        }
      });
    } else {
      undoLike({ _id });
    }
  };

  handleIndexChanged = (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    const index = (info.viewableItems[0].index || 0) + 1;
    this.setState({ index });
  };

  handlePressDots = () => {
    const actionSheet = this.actionSheet.current;
    if (actionSheet) actionSheet.show();
  };

  handleActionSheet = async (index: number) => {
    if (Actions.Delete === index) {
      const { _id } = this.props.feed;
      await deleteFeed({ _id });
      this.props.deleteFromList(_id);
    }
  };

  renderSummery = () => {
    const { feed, user, prevFeed } = this.props;
    const yearMonth = moment(feed.createdAt).format('YYYY년 MM월');
    if (
      prevFeed === null ||
      (prevFeed && yearMonth < moment(prevFeed.createdAt).format('YYYY년 MM월'))
    ) {
      if (!user.repDog) return;
      const summery = find(
        user.repDog.histories,
        history => history.yearMonth === yearMonth
      );
      if (summery) {
        return (
          <View style={views.summeryWrapper}>
            <Text style={texts.summeryDate}>{summery.yearMonth} 산책</Text>
            <Text style={texts.summeryRight}>{`${
              summery.count
            }회 / ${rangeWithUnit(summery.distance)} / ${timeWithUnit(
              summery.seconds
            )} / ${summery.steps}걸음 / ${Math.floor(
              summery.steps / 28.5
            )}kcal`}</Text>
          </View>
        );
      }
    }
    return null;
  };

  render() {
    const { feed, user } = this.props;

    return (
      <View>
        {this.renderSummery()}
        <View style={views.header}>
          <DefaultImage size={32} uri={feed.dog.thumbnail} />
          <Text style={texts.name}>{feed.dog.name}</Text>
          <View style={views.message}>
            <Text style={texts.message}>
              {moment(feed.createdAt).fromNow()}
            </Text>
          </View>
          {user._id === feed.user && (
            <TouchableOpacity
              style={views.headerButton}
              onPress={this.handlePressDots}>
              <View style={views.smallDot} />
              <View style={views.smallDot} />
              <View style={views.smallDot} />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <FlatList
            data={feed.images}
            keyExtractor={(i, index) => index.toString()}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            renderItem={({ item }) => (
              <DoubleTab onDoubleTab={this.toggleLike}>
                <Image source={{ uri: item }} style={views.image} />
              </DoubleTab>
            )}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={this.handleIndexChanged}
            pagingEnabled
            horizontal
          />
          {this.state.showAnimation && (
            <View style={views.likeAnimation}>
              <Animated.Image
                source={require('src/assets/icons/ic_heart_press.png')}
                style={{
                  width: 80,
                  height: 72,
                  resizeMode: 'contain',
                  transform: [
                    {
                      scaleX: this.state.heartSize,
                      scaleY: this.state.heartSize,
                    },
                  ],
                }}
              />
            </View>
          )}
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
          {feed.memo !== undefined && (
            <Text style={texts.memo}>{feed.memo}</Text>
          )}
        </View>
        <ActionSheet
          ref={this.actionSheet}
          options={['삭제', '취소']}
          destructiveButtonIndex={Actions.Delete}
          cancelButtonIndex={Actions.Cancel}
          onPress={this.handleActionSheet}
        />
      </View>
    );
  }
}

export default connect((state: ReducerState) => ({ user: state.user }))(Feed);
