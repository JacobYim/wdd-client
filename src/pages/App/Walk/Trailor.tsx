import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

interface Props {
  onFinish: () => void;
}

interface State {
  opacity: Animated.Value;
  index: number;
}

class Trailor extends PureComponent<Props, State> {
  private images = [
    require('src/lib/images/img_count_3.jpg'), // TODO: Fix bug
    require('src/lib/images/img_count_3.jpg'),
    require('src/lib/images/img_count_2.jpg'),
    require('src/lib/images/img_count_1.jpg'),
    require('src/lib/images/img_count_0.jpg'),
  ];

  state: State = {
    opacity: new Animated.Value(1),
    index: 0,
  };

  animateImage = () => {
    const { index, opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 0,
      duration: 800,
      easing: Easing.bezier(0.48, 0, 1, 1),
    }).start(() => {
      if (index === this.images.length - 1) {
        this.props.onFinish();
      } else {
        opacity.setValue(1);
        this.setState({ index: index + 1 });
      }
    });
  };

  renderImage = (image: any, index: number) => {
    const { opacity } = this.state;
    const shouldRender = this.state.index === index;

    return (
      shouldRender && (
        <Animated.Image
          style={{ flex: 1, resizeMode: 'contain', opacity }}
          key={index}
          source={image}
          onLayout={this.animateImage}
        />
      )
    );
  };

  render() {
    return this.images.map(this.renderImage);
  }
}

export default Trailor;
