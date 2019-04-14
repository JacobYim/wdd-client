import React, { PureComponent } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';
import Rating from 'src/components/module/Rating';
import { createReview, updateReview } from 'src/services/api/review';
import { color } from 'src/theme';
import { texts, views } from './Review.styles';

interface State {
  rating: number;
  description: string;
}

/**
 * params
 * {
 *   place: string;
 *   rating: number;
 *   name: string;
 *   id: string;
 *   description?: string;
 *   handleAddReview?: (review: Review) => void;
 *   handleUpdateReview?: (review: Review) => void;
 * }
 */
class Review extends PureComponent<NavigationScreenProps, State> {
  state: State = {
    rating: this.props.navigation.getParam('rating'),
    description: this.props.navigation.getParam('description') || '',
  };

  handleSubmit = async () => {
    const { navigation } = this.props;
    const place = navigation.getParam('place');
    const _id = navigation.getParam('_id');
    try {
      if (_id) {
        const review = await updateReview({ _id, place, ...this.state });
        if (review) {
          navigation.getParam('handleUpdateReview')(review);
          Alert.alert('리뷰가 수정되었습니다.');
          navigation.goBack(null);
        }
      } else {
        const review = await createReview({ place, ...this.state });
        if (review) {
          navigation.getParam('handleAddReview')(review);
          Alert.alert('리뷰가 작성되었습니다.');
          navigation.goBack(null);
        }
      }
    } catch (e) {
      if (e.response.data.statusCode === 409) {
        Alert.alert(e.response.data.message);
      }
    }
  };

  handleChange = (description: string) => {
    this.setState({ description });
  };

  handleRatingChange = (rating: number) => {
    this.setState({ rating });
  };

  render() {
    const { rating } = this.state;
    const { navigation } = this.props;
    return (
      <PageContainer
        left={{ navigation }}
        center={navigation.getParam('title')}
        right={{ handlePress: this.handleSubmit, view: '저장' }}
        showBorder>
        <View style={views.header}>
          <Text style={texts.rating}>{rating.toFixed(1)}</Text>
          <Rating
            defaultRating={rating}
            onRatingChange={this.handleRatingChange}
          />
        </View>
        <View style={views.inputWrapper}>
          <TextInput
            value={this.state.description}
            multiline={true}
            onChangeText={this.handleChange}
            onSubmitEditing={this.handleSubmit}
            autoFocus={true}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            style={texts.input}
            placeholder="반려견과 함께 방문했을 때, 어떠셨나요?"
            placeholderTextColor={`${color.black}32`}
          />
        </View>
      </PageContainer>
    );
  }
}

export default Review;
