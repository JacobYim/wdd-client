import { find } from 'lodash';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import Rating from 'src/components/module/Rating';
import TopNavbar from 'src/components/module/TopNavbar';
import Card from 'src/pages/Place/Map/Card';
import { getReivews, Review } from 'src/services/api/review';
import * as actions from 'src/store/actions/place';
import { ReducerState } from 'src/store/reducers';
import { size } from 'src/theme';
import { icons, texts, views } from './Detail.styles';
import ReviewCard from './ReviewCard';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
  scrap: typeof actions.scrap;
  unScrap: typeof actions.unScrap;
}

interface State {
  isScrap: boolean;
  reviews: Review[];
}

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

class Detail extends PureComponent<Props, State> {
  place: actions.Place = this.props.navigation.getParam('place');

  state: State = {
    isScrap:
      find(this.props.user.places, place => place === this.place._id) !==
      undefined,
    reviews: [],
  };

  async componentDidMount() {
    this.setState({ reviews: await getReivews({ place: this.place._id }) });
  }

  handleToggleScrap = async () => {
    const { scrap, unScrap } = this.props;
    if (this.state.isScrap) {
      await unScrap({ id: this.place._id });
      Alert.alert('스크랩이 취소되었습니다.');
    } else {
      await scrap({ id: this.place._id });
      Alert.alert('스크랩되었습니다.');
    }
    this.setState({ isScrap: !this.state.isScrap });
  };

  handleCreateReview = (review: Review) => {
    this.setState({ reviews: [...this.state.reviews, review] });
  };

  handleRatingChange = (rating: number) => {
    const { navigation } = this.props;
    navigation.navigate('review', {
      rating,
      place: this.place,
      handleAddReview: this.handleCreateReview,
    });
  };

  renderRow = (label: string, data: string) => (
    <View style={views.rowWrapper}>
      <Text style={texts.blackOpacity}>{label}</Text>
      <Text style={texts.black}>{data}</Text>
    </View>
  );

  render() {
    const { thumbnail, images } = this.place;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground
            style={views.headerWrapper}
            source={{ uri: thumbnail }}
            imageStyle={{ resizeMode: 'cover' }}>
            <View style={views.headerFilter} />
          </ImageBackground>
          <View style={[views.infoWrapper, { borderTopWidth: 0 }]}>
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
              />
            </View>
            {this.renderRow('장소', this.place.address)}
            {this.place.officeHour &&
              this.renderRow('시간', showOfficeHour(this.place.officeHour))}
            {this.place.contact && this.renderRow('문의', this.place.contact)}
          </View>
          <View style={[views.infoWrapper, { paddingHorizontal: 0 }]}>
            <Text style={[texts.black, { paddingHorizontal: size.horizontal }]}>
              사진
            </Text>
            {images && (
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
            )}
          </View>
          <View style={[views.infoWrapper, { alignItems: 'center' }]}>
            <Text style={texts.black}>이 장소에 대한 평점을 남겨주세요.</Text>
            <Rating
              onRatingChange={this.handleRatingChange}
              containerStyle={{ marginTop: 20 }}
            />
          </View>
          <View style={[views.infoWrapper, { paddingHorizontal: 0 }]}>
            {this.state.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </View>
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
)(Detail);
