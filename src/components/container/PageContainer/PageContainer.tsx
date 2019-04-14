import produce from 'immer';
import React, { PureComponent, ReactNode } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import TopNavbar from 'src/components/module/TopNavbar';
import { ContextInterface } from './index';
import { texts, views } from './PageContainer.styles';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';

interface Props {
  // default
  children: ReactNode;
  // title
  title?: string;
  subtitle?: string;
  titleNarrow?: boolean;
  titleOnScroll?: string;
  alignTitleCenter?: boolean;
  // top
  left?: {
    navigation: NavigationScreenProp<any>;
    routeName?: string;
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
  // option
  showBorder?: boolean;
  extraScrollHeight?: number;
  extraBottom?: number;
  enableScroll?: boolean;
}

interface State {
  center?: string;
  showBorder?: boolean;
}

const ContentWrapper: React.FC<{ style: object; children: ReactNode }> = ({
  style,
  children,
}) =>
  Platform.OS === 'ios' ? (
    <KeyboardAvoidingView style={style} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );

export const PageContext = React.createContext<ContextInterface | null>(null);

class PageContainer extends PureComponent<Props, State> {
  private scroll = React.createRef<ScrollView>();

  state: State = {
    center: this.props.center,
    showBorder: this.props.showBorder,
  };

  scrollTo = (height: number) => {
    const scroll = this.scroll.current;
    const { extraScrollHeight } = this.props;
    if (scroll) {
      scroll.scrollTo({
        x: 0,
        y: extraScrollHeight ? height + extraScrollHeight : height,
        animated: true,
      });
    }
  };

  handleScroll = (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { center, title, titleOnScroll } = this.props;
    const { contentOffset } = evt.nativeEvent;
    this.setState(state =>
      produce(state, draft => {
        if (contentOffset.y > 84) {
          if (!state.showBorder) draft.showBorder = true;
          if (!center && !state.center) {
            if (title) draft.center = title;
            if (titleOnScroll) draft.center = titleOnScroll;
          }
        } else {
          if (state.showBorder) draft.showBorder = false;
          if ((title || titleOnScroll) && state.center) {
            draft.center = undefined;
          }
        }
      })
    );
  };

  render() {
    const {
      children,
      title,
      subtitle,
      titleNarrow,
      alignTitleCenter,
      left,
      right,
      bottom,
      bottomBox,
      enableScroll,
      extraBottom: extraScrollHeight = 85,
    } = this.props;
    const navLeft = left && {
      handlePress: () => {
        Keyboard.dismiss();
        if (left.routeName) left.navigation.navigate(left.routeName);
        else left.navigation.goBack(null);
      },
      view: (
        <Image
          style={views.backIcon}
          source={require('src/assets/icons/ic_back.png')}
        />
      ),
    };
    const navRight = right && {
      handlePress: () => {
        Keyboard.dismiss();
        right.handlePress();
      },
      view:
        typeof right.view === 'string' ? (
          <Text style={texts.top}>{right.view}</Text>
        ) : (
          right.view
        ),
    };

    return (
      <PageContext.Provider value={{ scrollTo: this.scrollTo }}>
        <SafeAreaView style={views.container}>
          <TopNavbar
            left={navLeft}
            center={this.state.center}
            right={navRight}
            showBorder={this.state.showBorder}
          />
          <ContentWrapper style={views.container}>
            <ScrollView
              ref={this.scroll}
              style={views.contentWrapper}
              onScroll={this.handleScroll}
              scrollEventThrottle={160}
              scrollEnabled={enableScroll || bottomBox !== undefined}
              showsVerticalScrollIndicator={false}>
              {title && (
                <View
                  style={views[titleNarrow ? 'titleNarrow' : 'titleWrapper']}>
                  <Text
                    style={[
                      texts.title,
                      alignTitleCenter ? { textAlign: 'center' } : null,
                    ]}>
                    {title}
                  </Text>
                  {subtitle && (
                    <Text
                      style={[
                        texts.subtitle,
                        alignTitleCenter ? { textAlign: 'center' } : null,
                      ]}>
                      {subtitle}
                    </Text>
                  )}
                </View>
              )}
              {children}
              {(enableScroll || bottomBox) && (
                <View style={{ height: extraScrollHeight }} />
              )}
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
                <Text style={texts.bottomBox}>{bottomBox.text}</Text>
              </TouchableOpacity>
            )}
          </ContentWrapper>
        </SafeAreaView>
      </PageContext.Provider>
    );
  }
}

export default PageContainer;
