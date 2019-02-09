import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

interface Props {
  image: any;
  handleFinish: () => void;
}

interface State {
  opacity: Animated.Value;
}

class Trailor extends PureComponent<Props, State> {
  private duration = 800;

  state: State = {
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: this.duration,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      this.props.handleFinish();
    });
  }

  render() {
    const { opacity } = this.state;
    return (
      <Animated.Image
        style={{ flex: 1, resizeMode: 'contain', opacity }}
        source={this.props.image}
      />
    );
  }
}

export default Trailor;
