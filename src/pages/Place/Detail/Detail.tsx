import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import Rating from 'src/components/module/Rating';
import TopNavbar from 'src/components/module/TopNavbar';
import Card from 'src/pages/Place/Result/Card';
import { Place } from 'src/services/api/place';
import { icons, texts, views } from './Detail.styles';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

interface State {
  place: Place;
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
  state: State = {
    place: this.props.navigation.getParam('place'),
  };

  renderRow = (label: string, data: string) => (
    <View style={views.rowWrapper}>
      <Text style={texts.blackOpacity}>{label}</Text>
      <Text style={texts.black}>{data}</Text>
    </View>
  );

  handleRatingChange = (rating: number) => {};

  render() {
    const { place } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground
            style={views.headerWrapper}
            source={{ uri: place.images[0] }}
            imageStyle={{ resizeMode: 'cover' }}>
            <View style={views.headerFilter} />
          </ImageBackground>
          <View style={[views.infoWrapper, { borderTopWidth: 0 }]}>
            <View style={views.infoHover}>
              <Card
                place={place}
                handlePress={() => {}}
                icon={
                  <Image
                    source={require('src/assets/icons/ic_edit.png')}
                    style={icons.edit}
                  />
                }
              />
            </View>
            {this.renderRow('장소', place.address)}
            {place.officeHour &&
              this.renderRow('시간', showOfficeHour(place.officeHour))}
            {place.contact && this.renderRow('문의', place.contact)}
          </View>
          <View style={[views.infoWrapper, { paddingHorizontal: 0 }]}>
            <Text style={[texts.black, { paddingHorizontal: horizontalSize }]}>
              사진
            </Text>
            <View style={views.imageWrapper}>
              {place.images.map(uri => (
                <Image source={{ uri }} style={views.image} key={uri} />
              ))}
            </View>
          </View>
          <View style={[views.infoWrapper, { alignItems: 'center' }]}>
            <Text style={texts.black}>이 장소에 대한 평점을 남겨주세요.</Text>
            <Rating
              onRatingChange={this.handleRatingChange}
              containerStyle={{ marginTop: 20 }}
            />
          </View>
          <View style={views.infoWrapper} />
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
