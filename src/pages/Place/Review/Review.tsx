import React, { PureComponent } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';
import Rating from 'src/components/module/Rating';
import { createReview } from 'src/services/api/review';
import { color } from 'src/theme';
import { texts, views } from './Review.styles';

interface State {
  rating: number;
  description: string;
}

class Review extends PureComponent<NavigationScreenProps, State> {
  state: State = {
    rating: this.props.navigation.getParam('rating'),
    description: '',
  };

  handleSubmit = async () => {
    const { navigation } = this.props;
    const place = navigation.getParam('place')._id;
    const review = await createReview({ place, ...this.state });
    if (review) {
      navigation.getParam('handleAddReview')(review);
      Alert.alert('리뷰가 작성되었습니다.');
    }
    navigation.goBack(null);
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
        center={navigation.getParam('place').name}
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
