import React from 'react';
import { StyleSheet, View } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import FeedHeader from 'src/components/module/FeedHeader';
import { Review } from 'src/services/api/review';
import { color } from 'src/theme';

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
});

const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <View style={styles.wrapper}>
      <FeedHeader user={review.user} updatedAt={review.updatedAt} />
    </View>
  );
};

export default ReviewCard;
