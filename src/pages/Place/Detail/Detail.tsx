import React, { PureComponent } from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import Card from 'src/pages/Place/Result/Card';
import { Place } from 'src/services/api/place';
import { horizontalSize, icons, texts, views } from './Detail.styles';
import Header from './Header';

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

  render() {
    const { place } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          thumbnail={place.images[0]}
          navigation={this.props.navigation}
        />
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
        <View style={[views.infoWrapper, { alignItems: 'center' }]} />
      </View>
    );
  }
}

export default Detail;
