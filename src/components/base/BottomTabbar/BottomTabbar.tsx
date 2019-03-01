import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationRoute, TabBarBottomProps } from 'react-navigation';
import { connect } from 'react-redux';
import { ReducerState } from 'src/store/reducers';
import { texts, views } from './BottomTabbar.styles';

interface Props extends TabBarBottomProps {
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

    if (index > 0) {
      return (
        <View style={views.tabWrapper} key={route.routeName}>
          <TouchableOpacity
            style={views.tabButton}
            activeOpacity={0.7}
            onPress={() => navToRoute(route)}
            disabled={isCurrentIndex}>
            <Image style={views.tabIcon} source={route.params.icon} />
            <Text style={texts.tabLabel}>{route.params.label}</Text>
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
