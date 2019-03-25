import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Place } from 'src/services/api/place';
import { color, font, shadow } from 'src/theme';

interface Props {
  place: Place;
  handlePress: () => void;
  icon: React.ReactNode;
}

const renderImage = (images: string[]) =>
  (images && images[0] && { uri: images[0] }) ||
  require('src/assets/icons/logo_img.png');

const renderRating = (rating: number) => {
  const nodes: React.ReactNode[] = [];
  const ratingRound = Math.round(rating);
  for (let i = 1; i < 6; i += 1) {
    nodes.push(
      <Image
        source={require('src/assets/icons/ic_rating.png')}
        style={[styles.ratingIcon, { opacity: ratingRound < i ? 0.1 : 1 }]}
        key={i}
      />
    );
  }
  return nodes;
};

export const cardWidth = 327;
export const cardHeight = 104;
const thumbnailSize = 50;

const styles = StyleSheet.create({
  wrapper: {
    width: cardWidth,
    padding: 16,
    height: cardHeight,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: color.white,
    ...shadow.deep,
  },
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    borderWidth: 1,
    borderColor: `${color.black}14`,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 12,
    marginTop: 4,
  },
  name: {
    fontSize: 16,
    color: color.black,
    fontWeight: '500',
  },
  describe: {
    fontSize: font.size.medium,
    marginTop: 2,
    color: color.blackOpacity,
    lineHeight: 16,
  },
  rating: {
    fontSize: 16,
    fontFamily: font.family.NanumSquareRoundB,
    color: color.blackOpacity,
    marginRight: 4,
  },
  ratingIcon: {
    marginLeft: 4,
    width: 13,
    height: 13,
  },
  ratingWrapper: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingLeft: 16,
  },
});

const Info: React.FC<Props> = ({ place, handlePress, icon }) => (
  <View style={styles.wrapper}>
    <Image source={renderImage(place.images)} style={styles.thumbnail} />
    <View style={styles.infoWrapper}>
      <Text style={styles.name}>{place.name}</Text>
      <Text style={styles.describe}>{place.label}</Text>
      <View style={styles.ratingWrapper}>
        <Text style={styles.rating}>{place.rating.toFixed(1)}</Text>
        {renderRating(place.rating)}
      </View>
    </View>
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={handlePress}>
      {icon}
    </TouchableOpacity>
  </View>
);

export default Info;
