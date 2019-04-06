import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import { Place } from 'src/store/actions/place';
import { texts, views } from './Scrap.styles';

interface Props extends NavigationScreenProps {
  scraps: Place[];
}

const Scrap: React.FC<Props> = ({ scraps, navigation }) => (
  <FlatList
    data={scraps}
    keyExtractor={(i, index) => index.toString()}
    renderItem={({ item, index }) => (
      <TouchableOpacity
        style={views.wrapper}
        onPress={() => navigation.navigate('place', { place: item })}>
        <Image source={{ uri: item.thumbnail }} style={views.thumbnail} />
        <View
          style={[
            views.textWrapper,
            index === 0 ? { borderTopWidth: 0 } : null,
          ]}>
          <Text style={texts.name}>{item.name}</Text>
          <Text style={texts.description}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    )}
    contentContainerStyle={views.container}
  />
);

export default withNavigation(Scrap);
