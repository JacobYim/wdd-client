import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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

const renderRating = (rating: number) => rating.toFixed(1);

const ratingIcons = (rating: number) => {
  const nodes: React.ReactNode[] = [];
  const ratingRound = Math.round(rating);
  for (let i = 1; i < 6; i += 1) {
    nodes.push(
      <Image
        source={require('src/assets/icons/ic_rating.png')}
        style={[icons.rating, { opacity: ratingRound < i ? 0.5 : 1 }]}
        key={i}
      />
    );
  }
  return nodes;
};

const Card = ({ item }: Item, parallaxProps?: AdditionalParallaxProps) => (
  <View style={views.wrapper}>
    <Image source={renderImage(item.images)} style={icons.thumbnail} />
    <View style={views.infoWrapper}>
      <Text style={texts.name}>{item.name}</Text>
      <Text style={texts.address}>{item.address}</Text>
      <View style={views.ratingWrapper}>
        <Text style={texts.rating}>{renderRating(item.rating)}</Text>
        {ratingIcons(item.rating)}
      </View>
    </View>
    <TouchableOpacity style={views.show} activeOpacity={0.7}>
      <Image
        source={require('src/assets/icons/ic_show.png')}
        style={icons.show}
      />
    </TouchableOpacity>
  </View>
);

export default Card;
