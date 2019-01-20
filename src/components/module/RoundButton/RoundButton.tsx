import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { texts, views } from './RoundButton.styles';

interface Props {
  label: string;
  active: boolean;
  handlePress: () => void;
}

const RoundButton: React.SFC<Props> = ({ label, active, handlePress }) => (
  <TouchableOpacity
    style={[views.button, views[active ? 'active' : 'inactive']]}
    onPress={handlePress}
    disabled={!active}>
    <Text style={[texts.label, texts[active ? 'active' : 'inactive']]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default RoundButton;
