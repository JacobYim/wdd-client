import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TabBarBottomProps, NavigationRoute } from 'react-navigation';
import { connect } from 'react-redux';

import { ReducerState } from 'src/store/reducers';
import { views, texts } from './BottomTabbar.styles';

interface Props extends TabBarBottomProps {
  walk: ReducerState['walk'];
}

const BottomNavbar: React.FC<Props> = ({ navigation, walk }) => {
  function navigate(route: NavigationRoute) {
    navigation.navigate(route.routeName);
  }

  function renderTabs(route: NavigationRoute, index: number) {
    if (!route.params) return null;
    const navIndex = navigation.state.index;
    const isActive = walk.status === 'WALKING';

    if (index === 1 || index === 2)
      return (
        <View style={views.tabWrapper} key={route.routeName}>
          <TouchableOpacity
            style={views.tabButton}
            activeOpacity={0.7}
            onPress={() => navigate(route)}
            disabled={index === navIndex}>
            <Image style={views.tabIcon} source={route.params.icon} />
            <Text style={texts.tabLabel}>{route.params.label}</Text>
          </TouchableOpacity>
        </View>
      );
    if ((index === 0 && navIndex !== 0) || (index === 3 && navIndex === 0))
      return (
        <TouchableOpacity
          style={[views.centerTab, isActive ? views.active : views.inActive]}
          key={route.routeName}
          onPress={() => navigate(route)}
          activeOpacity={0.94}>
          <Image style={views.centerIcon} source={route.params.icon} />
        </TouchableOpacity>
      );
  }

  return navigation.state.index !== 3 ? (
    <View style={views.container}>
      {navigation.state.routes.map(renderTabs)}
    </View>
  ) : null;
};

export default connect((state: ReducerState) => ({
  walk: state.walk,
}))(BottomNavbar);
