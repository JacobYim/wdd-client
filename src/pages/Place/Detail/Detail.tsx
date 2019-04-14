import { find, findIndex } from 'lodash';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import call from 'src/assets/functions/phoneCall';
import withMessage, { MessageProps } from 'src/components/base/withMessage';
import Rating from 'src/components/module/Rating';
import TopNavbar from 'src/components/module/TopNavbar';
import Card from 'src/pages/Place/MapList/Card';
import { getReviews, Review } from 'src/services/api/review';
import * as actions from 'src/store/actions/place';
import { ReducerState } from 'src/store/reducers';
import { size } from 'src/theme';
import { icons, texts, views } from './Detail.styles';
import ReviewCard from './ReviewCard';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

interface Props extends NavigationScreenProps, MessageProps {
  user: ReducerState['user'];
  scrap: typeof actions.scrap;
  unScrap: typeof actions.unScrap;
}

interface State {
  isScrap: boolean;
  reviews: Review[];
}

// Helpers
function showOfficeHour(officeHour: {
  default: string;
  weekend?: string;
  dayoff?: string;
}) {
  if (!officeHour.weekend && !officeHour.dayoff) {
    return `매일 ${officeHour.default}`;
  }
  let message = `평일 ${officeHour.default}`;
  if (officeHour.weekend) message += `\n주말 ${officeHour.weekend}`;
  if (officeHour.dayoff) message += `\n휴일 ${officeHour.dayoff}`;
  return message;
}

const isPhoneNumber = (value: string) =>
  /(^0[0-9]{1,2}-)?[0-9]{3,4}-[0-9]{4}$/g.test(value);

class Detail extends PureComponent<Props, State> {
  place: actions.Place = this.props.navigation.getParam('place');

  state: State = {
    isScrap:
      find(this.props.user.places, place => place === this.place._id) !==
      undefined,
    reviews: [],
  };

  async componentDidMount() {
    const reviews = await getReviews({ place: this.place._id });
    this.setState({ reviews });
  }

  handleToggleScrap = async () => {
    const { scrap, unScrap, showMessage } = this.props;
    if (this.state.isScrap) {
      await unScrap({ id: this.place._id });
      this.setState({ isScrap: false });
      showMessage('내 상점에서 삭제했습니다.');
    } else {
      await scrap({ id: this.place._id });
      this.setState({ isScrap: true });
      showMessage('내 상점에 추가되었습니다.');
    }
  };

  handleCreateReview = (review: Review) => {
    this.setState({ reviews: [...this.state.reviews, review] });
  };

  handleUpdateReview = (review: Review) => {
    const index = findIndex(
      this.state.reviews,
      item => item._id === review._id
    );
    const reviews = [...this.state.reviews];
    reviews[index] = review;
    this.setState({ reviews });
  };

  handleDeleteReview = (id: string) => {
    const reviews = this.state.reviews.filter(review => review._id !== id);
    this.setState({ reviews });
  };

  handleRatingChange = (rating: number) => {
    const { navigation } = this.props;
    navigation.navigate('review', {
      rating,
      place: this.place._id,
      title: this.place.name,
      handleAddReview: this.handleCreateReview,
    });
  };

  render() {
    const { thumbnail, images } = this.place;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground
            style={views.headerWrapper}
            source={
              thumbnail
                ? { uri: thumbnail }
                : require('src/assets/images/img_thumbnail_default.png')
            }
            imageStyle={{ resizeMode: 'cover' }}>
            {thumbnail ? (
              <View style={views.headerFilter}>
                {Platform.OS === 'android' && (
                  <TouchableOpacity
                    style={views.headerCheat}
                    activeOpacity={1}
                    onPress={this.handleToggleScrap}
                  />
                )}
              </View>
            ) : (
              Platform.OS === 'android' && (
                <TouchableOpacity
                  style={views.headerCheat}
                  activeOpacity={1}
                  onPress={this.handleToggleScrap}
                />
              )
            )}
          </ImageBackground>
          <View style={views.infoWrapper}>
            <View style={views.infoHover}>
              <Card
                place={this.place}
                handlePress={this.handleToggleScrap}
                width="100%"
                icon={
                  <Image
                    source={
                      this.state.isScrap
                        ? require('src/assets/icons/ic_scrap_on.png')
                        : require('src/assets/icons/ic_scrap_off.png')
                    }
                    style={icons.scrap}
                  />
                }
                softShadow
              />
            </View>
            <FlatList
              data={[
                { label: '장소', value: this.place.address },
                {
                  label: '시간',
                  value: this.place.officeHour
                    ? showOfficeHour(this.place.officeHour)
                    : undefined,
                },
                { label: '문의', value: this.place.contact },
                { label: '상세설명', value: this.place.description },
              ]}
              keyExtractor={(i, index) => index.toString()}
              renderItem={({ item }) =>
                item.value ? (
                  <View style={views.rowWrapper}>
                    <Text style={texts.blackOpacity}>{item.label}</Text>
                    {isPhoneNumber(item.value) ? (
                      <Text
                        style={texts.blue}
                        onPress={async () =>
                          await call({ number: item.value as string })
                        }>
                        {item.value}
                      </Text>
                    ) : (
                      <Text numberOfLines={2} style={texts.black}>
                        {item.value}
                      </Text>
                    )}
                  </View>
                ) : null
              }
            />
          </View>
          <View style={views.hr} />
          {images && images.length > 0 && (
            <>
              <View style={[views.infoWrapper, { paddingHorizontal: 0 }]}>
                <Text
                  style={[texts.black, { paddingHorizontal: size.horizontal }]}>
                  사진
                </Text>
                <FlatList
                  contentContainerStyle={views.imageWrapper}
                  data={images}
                  keyExtractor={(d, index) => index.toString()}
                  renderItem={image => (
                    <Image source={{ uri: image.item }} style={views.image} />
                  )}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              </View>
              <View style={views.hr} />
            </>
          )}
          <View style={[views.infoWrapper, { alignItems: 'center' }]}>
            <Text style={texts.black}>이 장소에 대한 평점을 남겨주세요.</Text>
            <Rating
              onRatingChange={this.handleRatingChange}
              containerStyle={{ marginTop: 20 }}
            />
          </View>
          <View style={views.hr} />
          <FlatList
            data={this.state.reviews}
            contentContainerStyle={[
              views.infoWrapper,
              { paddingHorizontal: 0, paddingVertical: 0 },
            ]}
            keyExtractor={(i, index) => index.toString()}
            renderItem={({ item }) => (
              <ReviewCard
                review={item}
                onUpdate={this.handleUpdateReview}
                onDelete={this.handleDeleteReview}
                isWriter={this.props.user._id === item.user._id}
              />
            )}
          />
        </ScrollView>
        <SafeAreaView style={views.navbarWrapper}>
          <TopNavbar
            left={{
              handlePress: () => {
                this.props.navigation.goBack(null);
              },
              view: (
                <Image
                  source={require('src/assets/icons/ic_back_white.png')}
                  style={icons.back}
                />
              ),
            }}
            transparent
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    user: state.user,
  }),
  { scrap: actions.scrap, unScrap: actions.unScrap }
)(withMessage(Detail));
