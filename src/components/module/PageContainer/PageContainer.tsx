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
  center?: string;
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
  center,
  bottom,
  ...scrollOptions
}) => (
  <SafeAreaView style={views.container}>
    <View style={views.topWrapper}>
      {center && (
        <View style={views.center}>
          <Text style={texts.center}>{center}</Text>
        </View>
      )}
      {left && (
        <TouchableOpacity onPress={left.handlePress} activeOpacity={0.7}>
          <Text style={texts.top}>{left.text}</Text>
        </TouchableOpacity>
      )}
      {right && (
        <TouchableOpacity
          style={views.rightButton}
          onPress={right.handlePress}
          activeOpacity={0.7}>
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
    {bottom &&
      (bottom.boxType ? (
        <TouchableOpacity
          style={[
            views.bottomBox,
            views[bottom.disable ? 'boxDisable' : 'boxEnable'],
          ]}
          onPress={bottom.handlePress}
          activeOpacity={0.7}
          disabled={bottom.disable}>
          <Text
            style={[
              texts.bottomBox,
              texts[bottom.disable ? 'boxDisable' : 'boxEnable'],
            ]}>
            {bottom.text}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={views.bottomText}>
          <TouchableOpacity
            onPress={bottom.handlePress}
            disabled={bottom.disable}
            activeOpacity={0.7}>
            <Text style={texts.bottomText}>{bottom.text}</Text>
          </TouchableOpacity>
          {bottom.diffText && bottom.handleDiffPress && (
            <TouchableOpacity
              onPress={bottom.handleDiffPress}
              activeOpacity={0.7}>
              <Text style={texts.bottomDiff}> {bottom.diffText}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
  </SafeAreaView>
);

export default PageContainer;
