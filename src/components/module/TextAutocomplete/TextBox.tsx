import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { views, texts } from './TextBox.styles';

interface Props {
  value: string;
  handlePress: (value: string) => {};
}

const TextBox: React.FC<Props> = ({ value, handlePress }) => {
  const mapValueToPress = () => {
    handlePress(value);
  };

  return (
    <TouchableOpacity
      onPress={mapValueToPress}
      style={views.button}
      activeOpacity={0.7}>
      <Text style={texts.value}>{value}</Text>
    </TouchableOpacity>
  );
};

export default TextBox;
