import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TabBarBottomProps, NavigationRoute } from 'react-navigation';

import { views, texts } from './BottomTabbar.styles';

interface Props extends TabBarBottomProps {}

const BottomNavbar: React.FC<Props> = ({ navigation }) => {
  function navigate(route: NavigationRoute) {
    navigation.navigate(route.routeName);
  }

  function renderTab(route: NavigationRoute, index: number) {
    const isCurPage = index === navigation.state.index;
    if (route.params) {
      switch (index) {
        case 0:
          return isCurPage ? null : (
            <TouchableOpacity
              style={[views.centerTab, views.notWalking]}
              key={route.routeName}
              onPress={() => navigate(route)}
              activeOpacity={0.94}>
              <Image style={views.centerIcon} source={route.params.icon} />
            </TouchableOpacity>
          );
        case 3:
          return (
            navigation.state.index === 0 && (
              <TouchableOpacity
                style={[views.centerTab, views.notWalking]}
                key={route.routeName}
                onPress={() => navigate(route)}
                activeOpacity={0.94}>
                <Image style={views.centerIcon} source={route.params.icon} />
              </TouchableOpacity>
            )
          );
        case 1:
        case 2:
          return (
            <View style={views.tabWrapper} key={route.routeName}>
              <TouchableOpacity
                style={views.tabButton}
                activeOpacity={0.7}
                onPress={() => navigate(route)}
                disabled={isCurPage}>
                <Image style={views.tabIcon} source={route.params.icon} />
                <Text style={texts.tabLabel}>{route.params.label}</Text>
              </TouchableOpacity>
            </View>
          );
      }
    }
  }

  return (
    <View style={views.container}>
      {navigation.state.routes.map(renderTab)}
    </View>
  );
};

export default BottomNavbar;
