import React, { ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationScreenProp } from 'react-navigation';
import TopNavbar from 'src/components/module/TopNavbar';
import { texts, views } from './PageContainer.styles';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

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
  alwaysShowBottom?: boolean;
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
  alwaysShowBottom,
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
  const RenderTitle = () =>
    title && (
      <View style={views[titleNarrow ? 'titleNarrow' : 'titleWrapper']}>
        <Text style={texts.title}>{title}</Text>
        {subtitle && <Text style={texts.subtitle}>{subtitle}</Text>}
      </View>
    );
  const RenderBottom = () => (
    <>
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
          <Text style={texts.bottomBox}>{bottomBox.text}</Text>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <SafeAreaView style={views.container}>
      <TopNavbar left={navLeft} center={center} right={navRight} />
      {alwaysShowBottom ? (
        <KeyboardAvoidingView style={views.container} behavior="padding">
          <ScrollView style={views.contentWrapper} scrollEnabled={false}>
            {RenderTitle()}
            {children}
          </ScrollView>
          {RenderBottom()}
        </KeyboardAvoidingView>
      ) : (
        <>
          <KeyboardAwareScrollView
            style={views.contentWrapper}
            {...scrollOptions}>
            {RenderTitle()}
            {children}
          </KeyboardAwareScrollView>
          {RenderBottom()}
        </>
      )}
    </SafeAreaView>
  );
};

export default PageContainer;
