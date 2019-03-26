import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import Rating from 'src/components/module/Rating';
import TopNavbar from 'src/components/module/TopNavbar';
import Card from 'src/pages/Place/Map/Card';
import { Place } from 'src/services/api/place';
import { getReivews, Review } from 'src/services/api/review';
import { icons, texts, views } from './Detail.styles';
import ReviewCard from './ReviewCard';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

interface State {
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

class Detail extends PureComponent<NavigationScreenProps, State> {
  place: Place = this.props.navigation.getParam('place');

  state: State = { reviews: [] };

  async componentDidMount() {
    this.setState({ reviews: await getReivews({ place: this.place._id }) });
  }

  renderRow = (label: string, data: string) => (
    <View style={views.rowWrapper}>
      <Text style={texts.blackOpacity}>{label}</Text>
      <Text style={texts.black}>{data}</Text>
    </View>
  );

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
                handlePress={() => {}}
                icon={
                  <Image
                    source={require('src/assets/icons/ic_edit.png')}
                    style={icons.edit}
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
            <Text style={[texts.black, { paddingHorizontal: horizontalSize }]}>
              사진
            </Text>
            {images && (
              <View style={views.imageWrapper}>
                {images.map(uri => (
                  <Image source={{ uri }} style={views.image} key={uri} />
                ))}
              </View>
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

export default Detail;
