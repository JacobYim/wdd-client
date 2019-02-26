import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { color, font } from 'src/theme';

interface Props {
  label: string;
  active: boolean;
  handlePress: () => void;
}

const btnHeight = 50;
const views = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    height: btnHeight,
    borderRadius: 5,
  },
  active: {
    backgroundColor: color.blue,
    elevation: 4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    shadowColor: color.black,
    shadowOpacity: 0.1,
  },
  inactive: {
    backgroundColor: color.grayEF,
  },
});

const texts = StyleSheet.create({
  label: {
    fontSize: font.size.large,
  },
  active: {
    color: color.white,
  },
  inactive: {
    color: color.grayB1,
  },
});

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
