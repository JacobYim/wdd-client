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
  bottom?: {
    text: string;
    handlePress: () => void;
    bold?: string;
  };
  // right
  right?: {
    text: string;
    handlePress: () => void;
  };
}

const PageContainer: React.SFC<Props> = ({ children, bottom, right }) => (
  <SafeAreaView style={views.container}>
    <View style={views.topWrapper}>
      {right && (
        <TouchableOpacity style={views.rightButton} onPress={right.handlePress}>
          <Text style={texts.top}>{right.text}</Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={views.contentWrapper}>{children}</View>
    {bottom && (
      <TouchableOpacity style={views.bottomButton} onPress={bottom.handlePress}>
        <Text style={texts.bottom}>{bottom.text}</Text>
        {bottom.bold && <Text style={texts.bottomBold}> {bottom.bold}</Text>}
      </TouchableOpacity>
    )}
  </SafeAreaView>
);

export default PageContainer;
