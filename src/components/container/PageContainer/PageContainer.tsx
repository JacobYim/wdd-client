import React, { ReactNode } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Image,
} from 'react-native';

import TopNavbar from 'src/components/module/TopNavbar';
import { views, texts } from './PageContainer.styles';

interface Props {
  // default
  children: ReactNode;
  // title
  title?: string;
  subtitle?: string;
  titleNarrow?: boolean;
  // top
  left?: {
    navigation: NavigationScreenProp<any>;
  };
  right?: {
    view: string | ReactNode;
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
  // options
  [x: string]: any;
}

const PageContainer: React.FC<Props> = ({
  children,
  title,
  subtitle,
  titleNarrow,
  left,
  right,
  center,
  bottom,
  ...scrollOptions
}) => {
  const navLeft = left
    ? {
        handlePress: () => {
          left.navigation.goBack(null);
        },
        view: (
          <Image
            style={views.backIcon}
            source={require('src/assets/icons/ic_back.png')}
          />
        ),
      }
    : undefined;
  const navRight = right
    ? {
        handlePress: right.handlePress,
        view:
          typeof right.view === 'string' ? (
            <Text style={texts.top}>{right.view}</Text>
          ) : (
            right.view
          ),
      }
    : undefined;

  return (
    <SafeAreaView style={views.container}>
      <TopNavbar left={navLeft} center={center || undefined} right={navRight} />
      <ScrollView style={views.contentWrapper} {...scrollOptions}>
        {title && (
          <View style={views[titleNarrow ? 'titleNarrow' : 'titleWrapper']}>
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
            {bottom.diffText && bottom.handleDiffPress && (
              <TouchableOpacity
                onPress={bottom.handleDiffPress}
                activeOpacity={0.7}>
                <Text style={texts.bottomDiff}>{bottom.diffText} </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={bottom.handlePress}
              disabled={bottom.disable}
              activeOpacity={0.7}>
              <Text style={texts.bottomText}>{bottom.text}</Text>
            </TouchableOpacity>
          </View>
        ))}
    </SafeAreaView>
  );
};

export default PageContainer;
