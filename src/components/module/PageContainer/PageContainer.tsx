import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from 'react-native';
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
    diffText?: string;
    handleDiffPress?: () => void;
    boxType?: boolean;
    disable?: boolean;
  };
  [x: string]: any;
}

const PageContainer: React.FC<Props> = ({
  children,
  title,
  subtitle,
  left,
  right,
  bottom,
  ...scrollOptions
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
    <ScrollView style={views.contentWrapper} {...scrollOptions}>
      {title && (
        <View style={views.titleWrapper}>
          <Text style={texts.title}>{title}</Text>
          {subtitle && <Text style={texts.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </ScrollView>
    {bottom && (
      <View
        style={
          bottom.boxType
            ? [
                views.bottomBox,
                views[bottom.disable ? 'boxDisable' : 'boxEnable'],
              ]
            : views.bottomText
        }>
        <TouchableOpacity
          onPress={bottom.handlePress}
          disabled={bottom.disable}>
          <Text
            style={
              bottom.boxType
                ? [
                    texts.bottomBox,
                    texts[bottom.disable ? 'boxDisable' : 'boxEnable'],
                  ]
                : texts.bottomText
            }>
            {bottom.text}
          </Text>
        </TouchableOpacity>
        {bottom.diffText && bottom.handleDiffPress && (
          <TouchableOpacity onPress={bottom.handleDiffPress}>
            <Text style={texts.bottomDiff}> {bottom.diffText}</Text>
          </TouchableOpacity>
        )}
      </View>
    )}
  </SafeAreaView>
);

export default PageContainer;
