import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { texts, views } from './TextBox.styles';

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
