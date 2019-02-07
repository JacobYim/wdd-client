import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { texts, views } from './ModuleContainer.styles';

interface Props {
  label: string;
  children: ReactNode;
}

const ModuleContainer: React.FC<Props> = ({ label, children }) => (
  <View style={views.container}>
    <Text style={texts.label}>{label}</Text>
    {children}
  </View>
);

export default ModuleContainer;
