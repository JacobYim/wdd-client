import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps, NavigationRoute } from 'react-navigation';
import { connect } from 'react-redux';
import { NavigationTabs } from 'src/pages/Router';
import { ReducerState } from 'src/store/reducers';
import { texts, views } from './BottomTabbar.styles';

interface Props extends BottomTabBarProps {
  walk: ReducerState['walk'];
}

const BottomNavbar: React.FC<Props> = ({ navigation, walk }) => {
  function navToRoute(route: NavigationRoute) {
    navigation.navigate(route.routeName);
  }

  function renderTabs(route: NavigationRoute, index: number) {
    if (!route.params) return null;
    const isCurrentIndex = index === navigation.state.index;
    const isActive = walk.status === 'WALKING';

    if (index !== NavigationTabs.MAP) {
      const { iconOn, iconOff, label } = route.params;
      return (
        <View style={views.tabWrapper} key={route.routeName}>
          <TouchableOpacity
            style={views.tabButton}
            activeOpacity={0.7}
            onPress={() => navToRoute(route)}
            disabled={isCurrentIndex}>
            <Image
              style={views.tabIcon}
              source={isCurrentIndex ? iconOn : iconOff}
            />
            <Text
              style={[
                texts.tabLabel,
                isCurrentIndex ? texts.tabLabelOn : texts.tabLabelOff,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    const { navigate, icon } = route.params[isCurrentIndex ? 'stack' : 'tab'];

    return (
      <TouchableOpacity
        style={[views.centerTab, isActive ? views.active : views.inActive]}
        key={route.routeName}
        onPress={() => navigation.dispatch(navigate)}
        activeOpacity={0.94}>
        <Image style={views.centerIcon} source={icon} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={views.container}>
      {navigation.state.routes.map(renderTabs)}
    </View>
  );
};

export default connect((state: ReducerState) => ({
  walk: state.walk,
}))(BottomNavbar);
