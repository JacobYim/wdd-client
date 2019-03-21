import React, { PureComponent } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  onRatingChange: (rating: number) => void;
  defaultRating?: number;
  containerStyle?: object;
}

interface State {
  rating: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  wrapper: {
    paddingHorizontal: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

class Rating extends PureComponent<Props, State> {
  state: State = {
    rating: this.props.defaultRating || 0,
  };

  handlePress = (rating: number) => {
    const { onRatingChange } = this.props;
    this.setState({ rating });
    onRatingChange(rating);
  };

  renderButtons = () => {
    const { rating } = this.state;
    let nodes = [];
    for (let i = 1; i < 6; i += 1) {
      nodes.push(
        <TouchableOpacity
          key={i}
          style={styles.wrapper}
          onPress={() => this.handlePress(i)}
          activeOpacity={0.7}>
          <Image
            source={require('src/assets/icons/ic_rating.png')}
            style={[styles.icon, { opacity: rating < i ? 0.1 : 1 }]}
          />
        </TouchableOpacity>
      );
    }
    return nodes;
  };

  render() {
    const { containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderButtons()}
      </View>
    );
  }
}

export default Rating;
