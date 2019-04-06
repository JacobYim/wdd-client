import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { Place } from 'src/store/actions/place';
import { texts, views } from './Scrap.styles';

interface Props {
  scraps: Place[];
}

const Scrap: React.FC<Props> = ({ scraps }) => (
  <FlatList
    data={scraps}
    keyExtractor={(i, index) => index.toString()}
    renderItem={({ item, index }) => (
      <View style={views.wrapper}>
        <Image source={{ uri: item.thumbnail }} style={views.thumbnail} />
        <View
          style={[
            views.textWrapper,
            index === 0 ? { borderTopWidth: 0 } : null,
          ]}>
          <Text style={texts.name}>{item.name}</Text>
          <Text style={texts.description}>{item.label}</Text>
        </View>
      </View>
    )}
    contentContainerStyle={views.container}
  />
);

export default Scrap;
