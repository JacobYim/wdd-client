import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { views, texts } from './ToggleBox.styles';

interface Props {
  label: string;
  name: string;
  handlePress: (name: string) => void;
  active: boolean;
}

const ToggleBox: React.SFC<Props> = ({ active, name, handlePress, label }) => {
  function handlePressWithValue() {
    handlePress(name);
  }

  return (
    <TouchableOpacity
      style={[views.box, views[active ? 'boxActive' : 'boxInactive']]}
      onPress={handlePressWithValue}>
      <Text style={[texts.box, texts[active ? 'boxActive' : 'boxInactive']]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleBox;
