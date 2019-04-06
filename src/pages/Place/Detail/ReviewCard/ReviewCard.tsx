import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FeedHeader from 'src/components/module/FeedHeader';
import { Rating } from 'src/pages/Place/MapList/Card/Card';
import { Review } from 'src/services/api/review';
import { color, size } from 'src/theme';

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
});

const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <View style={styles.wrapper}>
      <FeedHeader user={review.user} updatedAt={review.updatedAt} />
      <View style={styles.contentWrapper}>
        <Rating rating={review.rating} />
        <Text style={styles.description}>{review.description}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
