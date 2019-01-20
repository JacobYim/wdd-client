import React, { ReactNode } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { views, texts } from './PageContainer.styles';

interface Props {
  // default
  children: ReactNode;
  // title
  title?: string;
  subtitle?: string;
  // bottom
  bottom?: string;
  bottomBold?: string;
  bottomPress?: () => void;
}

const PageContainer: React.SFC<Props> = ({
  children,
  bottom,
  bottomBold,
  bottomPress,
}) => (
  <SafeAreaView style={views.container}>
    <View style={views.topWrapper} />
    <View style={views.contentWrapper}>{children}</View>
    {bottom && bottomPress && (
      <TouchableOpacity style={views.bottomButton} onPress={bottomPress}>
        <Text style={texts.bottom}>{bottom}</Text>
        {bottomBold && <Text style={texts.bottomBold}> {bottomBold}</Text>}
      </TouchableOpacity>
    )}
  </SafeAreaView>
);

export default PageContainer;
