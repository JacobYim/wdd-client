import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import { views } from './PageContainer.styles';

interface Props {
  children: ReactNode;
}

const PageContainer: React.SFC<Props> = ({ children }) => (
  <SafeAreaView style={views.container}>{children}</SafeAreaView>
);

export default PageContainer;
