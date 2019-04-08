import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultImage from 'src/components/module/DefaultImage';
import { Place } from 'src/store/actions/place';
import { color, font, shadow } from 'src/theme';

interface Props {
  place: Place;
  handlePress: () => void;
  icon: React.ReactNode;
  width?: number | string;
}

export const cardWidth = 327;
export const cardHeight = 104;

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

export const Rating: React.FC<{ rating: number }> = ({ rating }) => {
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
  return (
    <View style={styles.ratingWrapper}>
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      {nodes}
    </View>
  );
};

const Info: React.FC<Props> = ({ place, handlePress, icon, width }) => {
  return (
    <View style={[styles.wrapper, width ? { width } : null]}>
      <DefaultImage size={50} uri={place.icon} />
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.describe}>{place.label}</Text>
        <Rating rating={place.rating} />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handlePress}>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export default Info;
