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
  View,
  ScrollView,
  Platform,
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
  extraScrollHeight?: number;
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

class PageContainer extends PureComponent<Props> {
  private scroll = React.createRef<ScrollView>();

  scrollTo = (height: number) => {
    const scroll = this.scroll.current;
    if (scroll) {
      scroll.scrollTo({ x: 0, y: height, animated: true });
    }
  };

  render() {
    const {
      children,
      title,
      subtitle,
      titleNarrow,
      left,
      right,
      center,
      bottom,
      bottomBox,
      extraScrollHeight = 85,
    } = this.props;
    const navLeft = left && {
      handlePress: () => {
        if (left.routeName) {
          left.navigation.navigate(left.routeName);
        } else {
          left.navigation.goBack(null);
        }
      },
      view: (
        <Image
          style={views.backIcon}
          source={require('src/assets/icons/ic_back.png')}
        />
      ),
    };
    const navRight = right && {
      handlePress: right.handlePress,
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
          <TopNavbar left={navLeft} center={center} right={navRight} />
          <ContentWrapper style={views.container}>
            <ScrollView
              ref={this.scroll}
              style={views.contentWrapper}
              scrollEnabled={bottomBox !== undefined}
              showsVerticalScrollIndicator={false}>
              {title && (
                <View
                  style={views[titleNarrow ? 'titleNarrow' : 'titleWrapper']}>
                  <Text style={texts.title}>{title}</Text>
                  {subtitle && <Text style={texts.subtitle}>{subtitle}</Text>}
                </View>
              )}
              {children}
              {bottomBox && <View style={{ height: extraScrollHeight }} />}
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
