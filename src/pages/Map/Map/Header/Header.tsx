import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import { icons, texts, views } from './Header.styles';

const Header: React.FC<NavigationScreenProps> = ({ navigation }) => {
  const navToPlaceSearch = () => navigation.navigate('placeSearch');
  const navToPlaceMap = () => navigation.navigate('placeMap');

  return (
    <View style={views.container}>
      <TouchableOpacity
        style={views.inputWrapper}
        activeOpacity={0.75}
        onPress={navToPlaceSearch}>
        <Image
          source={require('src/assets/icons/ic_search.png')}
          style={icons.search}
        />
        <Text style={texts.search}>댕댕이와 함께 갈 곳을 찾아보세요.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={views.neighbor}
        activeOpacity={0.75}
        onPress={navToPlaceMap}>
        <Text style={texts.neighbor}>주변 상점 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(Header);
