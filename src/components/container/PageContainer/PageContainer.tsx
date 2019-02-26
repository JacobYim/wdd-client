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
    view: ReactNode;
    styles?: any;
  };
  bottomBox?: {
    text: string;
    handlePress: () => void;
    disable: boolean;
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
  bottomBox,
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
      <TopNavbar left={navLeft} center={center} right={navRight} />
      <ScrollView style={views.contentWrapper} {...scrollOptions}>
        {title && (
          <View style={views[titleNarrow ? 'titleNarrow' : 'titleWrapper']}>
            <Text style={texts.title}>{title}</Text>
            {subtitle && <Text style={texts.subtitle}>{subtitle}</Text>}
          </View>
        )}
        {children}
      </ScrollView>
      {bottom && (
        <View style={[views.bottom, bottom.styles]}>{bottom.view}</View>
      )}
      {bottomBox && (
        <TouchableOpacity
          style={[
            views.bottomBox,
            views[bottomBox.disable ? 'boxDisable' : 'boxEnable'],
          ]}
          onPress={bottomBox.handlePress}
          activeOpacity={0.7}
          disabled={bottomBox.disable}>
          <Text
            style={[
              texts.bottomBox,
              texts[bottomBox.disable ? 'boxDisable' : 'boxEnable'],
            ]}>
            {bottomBox.text}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default PageContainer;
