import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { texts, views } from './ToggleBox.styles';

interface Props {
  label: string;
  name: string;
  handlePress: (name: string) => void;
  active: boolean;
}

const ToggleBox: React.FC<Props> = ({ active, name, handlePress, label }) => {
  function handlePressWithValue() {
    handlePress(name);
  }

  return (
    <TouchableOpacity
      style={[views.box, views[active ? 'boxActive' : 'boxInactive']]}
      activeOpacity={0.7}
      onPress={handlePressWithValue}>
      <Text style={[texts.box, texts[active ? 'boxActive' : 'boxInactive']]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleBox;
