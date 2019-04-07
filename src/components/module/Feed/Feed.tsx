import React, { PureComponent } from 'react';
import { View } from 'react-native';
import DefaultImage from 'src/components/module/DefaultImage';
import { Dog } from 'src/store/actions/dog';
import { views } from './Feed.styles';

interface Feed {
  user: string;
  dog: Dog;
  pins: string;
  seconds: number;
  distance: number; // km
  steps: number;
  pees: number;
  poos: number;
  createdAt: Date;
  memo?: string;
  images: string[];
}

interface Props {
  feed: Feed;
}

class Feed extends PureComponent<Props> {
  render() {
    const { feed } = this.props;
    return (
      <View>
        <View style={views.header}>
          <DefaultImage size={32} uri={feed.dog.thumbnail} />
        </View>
      </View>
    );
  }
}

export default Feed;
