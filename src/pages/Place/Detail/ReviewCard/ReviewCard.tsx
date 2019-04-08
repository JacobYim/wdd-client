import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DefaultImage from 'src/components/module/DefaultImage';
import { Rating } from 'src/pages/Place/MapList/Card/Card';
import { Review } from 'src/services/api/review';
import { color, font, size } from 'src/theme';

interface Props {
  review: Review;
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: color.grayF9,
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper: {
    paddingLeft: size.horizontal + 42,
    paddingRight: size.horizontal,
  },
  description: {
    marginTop: 6,
    color: color.black,
  },
  header: {
    paddingHorizontal: size.horizontal,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 10,
    color: color.black,
    fontSize: 16,
  },
  time: {
    marginLeft: 4,
    color: `${color.black}4D`,
    fontSize: font.size.small,
  },
});

const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        {review.user.repDog && (
          <>
            <DefaultImage size={32} uri={review.user.repDog.thumbnail} />
            <Text style={styles.userName}>{review.user.repDog.name}</Text>
          </>
        )}
        <Text numberOfLines={2} style={styles.time}>
          {moment(review.updatedAt).fromNow()}
        </Text>
      </View>
      <View style={styles.contentWrapper}>
        <Rating rating={review.rating} />
        <Text style={styles.description}>{review.description}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
