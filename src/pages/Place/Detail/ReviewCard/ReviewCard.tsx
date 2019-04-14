import moment from 'moment';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DefaultImage from 'src/components/module/DefaultImage';
import { Rating } from 'src/pages/Place/MapList/Card/Card';
import { Review } from 'src/services/api/review';
import { color, font, size } from 'src/theme';

interface Props {
  review: Review;
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
    backgroundColor: color.blackOpacity,
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

  handleActionSheet = (index: number) => {
    const { isWriter } = this.props;
    if (isWriter) {
    } else {
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
            {moment(review.updatedAt).fromNow()}
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

export default ReviewCard;
