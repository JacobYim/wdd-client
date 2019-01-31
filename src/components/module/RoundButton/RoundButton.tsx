import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { texts, views } from './RoundButton.styles';

interface Props {
  label: string;
  active: boolean;
  handlePress: () => void;
}

const RoundButton: React.FC<Props> = ({ label, active, handlePress }) => (
  <TouchableOpacity
    style={[views.button, views[active ? 'active' : 'inactive']]}
    onPress={handlePress}
    activeOpacity={0.7}
    disabled={!active}>
    <Text style={[texts.label, texts[active ? 'active' : 'inactive']]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default RoundButton;
