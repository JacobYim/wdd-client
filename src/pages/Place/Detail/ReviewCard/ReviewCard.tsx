import moment from 'moment';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import DefaultImage from 'src/components/module/DefaultImage';
import { Rating } from 'src/pages/Place/MapList/Card/Card';
import { deleteReview, reportReview, Review } from 'src/services/api/review';
import { color, font, size } from 'src/theme';

interface Props extends NavigationScreenProps {
  review: Review;
  onDelete: (id: string) => void;
  onUpdate: (review: Review) => void;
  isWriter: boolean;
}

interface State {
  options: string[];
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
    marginTop: 9,
    color: '#484848',
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
    flex: 1,
    marginLeft: 4,
    color: `${color.black}4D`,
    fontSize: font.size.small,
  },
  headerButton: {
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  smallDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2626267F',
    marginVertical: 1,
  },
});

class ReviewCard extends PureComponent<Props, State> {
  private actionSheet = React.createRef<ActionSheet>();
  constructor(props: Props) {
    super(props);
    const options: string[] = props.isWriter ? ['수정', '삭제'] : ['신고'];
    options.push('취소');
    this.state = { options };
  }

  handlePressDots = () => {
    const actionSheet = this.actionSheet.current;
    if (actionSheet) actionSheet.show();
  };

  handleActionSheet = async (index: number) => {
    const { review, isWriter, onDelete, onUpdate, navigation } = this.props;
    if (isWriter) {
      switch (index) {
        case 0:
          navigation.navigate('review', {
            _id: review._id,
            rating: review.rating,
            place: review.place,
            description: review.description,
            title: '리뷰 수정하기',
            handleUpdateReview: onUpdate,
          });
          break;
        case 1:
          await deleteReview(review._id);
          onDelete(review._id);
          break;
      }
    } else {
      if (index === 0) await reportReview(review._id);
    }
  };

  render() {
    const { review } = this.props;

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
            {moment(review.createdAt).fromNow()}
          </Text>
          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={this.handlePressDots}>
            <View style={styles.smallDot} />
            <View style={styles.smallDot} />
            <View style={styles.smallDot} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentWrapper}>
          <Rating rating={review.rating} />
          <Text style={styles.description}>{review.description}</Text>
        </View>
        <ActionSheet
          ref={this.actionSheet}
          options={this.state.options}
          destructiveButtonIndex={this.state.options.length - 2}
          cancelButtonIndex={this.state.options.length - 1}
          onPress={this.handleActionSheet}
        />
      </View>
    );
  }
}

export default withNavigation(ReviewCard);
