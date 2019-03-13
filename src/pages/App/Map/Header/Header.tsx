import React from 'react';
import { View } from 'react-native';
import { views } from './Header.styles';

const Header: React.FC<{}> = () => (
  <View style={views.container}>
    <View style={views.inputWrapper} />
  </View>
);

export default Header;
