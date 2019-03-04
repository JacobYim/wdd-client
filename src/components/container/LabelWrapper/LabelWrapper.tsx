import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { texts, views } from './LabelWrapper.styles';

interface Props {
  label: string;
  children: ReactNode;
}

const LabelWrapper: React.FC<Props> = ({ label, children }) => (
  <View style={views.container}>
    <Text style={texts.label}>{label}</Text>
    {children}
  </View>
);

export default LabelWrapper;
