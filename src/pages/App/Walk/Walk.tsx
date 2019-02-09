import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import Trailor from './Trailor';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  trailorIndex: number;
}

class Walk extends Component<Props, State> {
  private trailors = [
    require('src/lib/images/img_count_3.jpg'),
    require('src/lib/images/img_count_2.jpg'),
    require('src/lib/images/img_count_1.jpg'),
    require('src/lib/images/img_count_0.jpg'),
  ];

  state: State = {
    trailorIndex: 0,
  };

  handleAnimationFinish = () => {
    this.setState({ trailorIndex: this.state.trailorIndex + 1 });
  };

  renderTrailors = (image: any, index: number) =>
    this.state.trailorIndex === index && (
      <Trailor
        image={image}
        key={index}
        handleFinish={this.handleAnimationFinish}
      />
    );

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        {this.trailors.map(this.renderTrailors)}
      </SafeAreaView>
    );
  }
}

export default Walk;
