import React from 'react';
import { FlatList, Image, View } from 'react-native';
import { Place } from 'src/store/actions/place';
import { views } from './Scrap.styles';

interface Props {
  scraps: Place[];
}

const Scrap: React.FC<Props> = ({ scraps }) => (
  <FlatList
    data={scraps}
    keyExtractor={(i, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={views.wrapper}>
        <Image source={{ uri: item.thumbnail }} style={views.thumbnail} />
      </View>
    )}
    contentContainerStyle={views.container}
  />
);

export default Scrap;
