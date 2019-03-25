import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';
import Rating from 'src/components/module/Rating';

interface State {
  rating: number;
}

class Review extends PureComponent<NavigationScreenProps, State> {
  state: State = {
    rating: this.props.navigation.getParam('rating'),
  };

  handleRatingChange = (rating: number) => {
    this.setState({ rating });
  };

  render() {
    const { navigation } = this.props;
    return (
      <PageContainer left={{ navigation }} center={navigation.getParam('name')}>
        <Rating
          defaultRating={this.state.rating}
          onRatingChange={this.handleRatingChange}
        />
      </PageContainer>
    );
  }
}

export default Review;
