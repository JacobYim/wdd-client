import React, { ReactNode } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { views, texts } from './PageContainer.styles';

interface Props {
  // default
  children: ReactNode;
  // title
  title?: string;
  subtitle?: string;
  // top
  left?: {
    text: string;
    handlePress: () => void;
  };
  right?: {
    text: string;
    handlePress: () => void;
  };
  // bottom
  bottom?: {
    text: string;
    handlePress: () => void;
    bold?: string;
  };
}

const PageContainer: React.SFC<Props> = ({
  children,
  title,
  subtitle,
  left,
  right,
  bottom,
}) => (
  <SafeAreaView style={views.container}>
    <View style={views.topWrapper}>
      {left && (
        <TouchableOpacity onPress={left.handlePress}>
          <Text style={texts.top}>{left.text}</Text>
        </TouchableOpacity>
      )}
      {right && (
        <TouchableOpacity style={views.rightButton} onPress={right.handlePress}>
          <Text style={texts.top}>{right.text}</Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={views.contentWrapper}>
      {title && (
        <View style={views.titleWrapper}>
          <Text style={texts.title}>{title}</Text>
          {subtitle && <Text style={texts.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </View>
    {bottom && (
      <TouchableOpacity style={views.bottomButton} onPress={bottom.handlePress}>
        <Text style={texts.bottom}>{bottom.text}</Text>
        {bottom.bold && <Text style={texts.bottomBold}> {bottom.bold}</Text>}
      </TouchableOpacity>
    )}
  </SafeAreaView>
);

export default PageContainer;
