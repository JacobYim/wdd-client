import React from 'react';
import { Image, Text, View } from 'react-native';
import { AdditionalParallaxProps } from 'react-native-snap-carousel';
import { Place } from 'src/services/api/place';
import { icons, texts, views } from './Card.styles';

interface Item {
  item: Place;
  index: number;
}

const renderImage = (images: string[]) =>
  (images && images[0] && { uri: images[0] }) ||
  require('src/assets/icons/logo_img.png');

const Card = ({ item }: Item, parallaxProps?: AdditionalParallaxProps) => (
  <View style={views.wrapper}>
    <Image source={renderImage(item.images)} style={icons.thumbnail} />
    <View style={views.infoWrapper}>
      <Text style={texts.name}>{item.name}</Text>
      <Text style={texts.address}>{item.address}</Text>
    </View>
  </View>
);

export default Card;
