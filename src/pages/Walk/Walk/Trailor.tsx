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
    require('src/assets/images/img_count_3.jpg'),
    require('src/assets/images/img_count_2.jpg'),
    require('src/assets/images/img_count_1.jpg'),
    require('src/assets/images/img_count_0.jpg'),
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
    }).start(c => {
      if (c.finished) {
        opacity.setValue(1);
        if (index === this.images.length - 1) this.props.onFinish();
        else this.setState({ index: index + 1 });
      }
    });
  };

  render() {
    const { opacity, index } = this.state;
    return (
      <Animated.Image
        style={{ opacity, flex: 1, resizeMode: 'contain' }}
        key={index}
        source={this.images[index]}
        onLayout={this.animateImage}
      />
    );
  }
}

export default Trailor;
