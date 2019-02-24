import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationActions,
} from 'react-navigation';
import { Animated, Easing } from 'react-native';

import MapScreen from './Map';
import WddScreen from './Wdd';
import ProfileScreen from './Profile';
import WalkNavigator from 'src/pages/Walk';
import BottomTabbar from 'src/components/base/BottomTabbar';

const MapNavigator = createStackNavigator(
  {
    map: MapScreen,
    walk: WalkNavigator,
  },
  {
    initialRouteName: 'map',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  }
);

MapNavigator.navigationOptions = ({ navigation }: any) => ({
  tabBarVisible: navigation.state.index === 0,
});

export default createBottomTabNavigator(
  {
    map: {
      screen: MapNavigator,
      params: {
        tab: {
          icon: require('src/assets/icons/logo_img.png'),
          navigate: NavigationActions.navigate({ routeName: 'map' }),
        },
        stack: {
          icon: require('src/assets/icons/ic_footprint.png'),
          navigate: NavigationActions.navigate({ routeName: 'walk' }),
        },
      },
    },
    wdd: {
      screen: WddScreen,
      params: {
        icon: require('src/assets/icons/ic_wdd.png'),
        label: '우동댕',
      },
    },
    profile: {
      screen: ProfileScreen,
      params: {
        icon: require('src/assets/icons/ic_profile.png'),
        label: '내 프로필',
      },
    },
  },
  {
    initialRouteName: 'map',
    tabBarComponent: BottomTabbar,
  }
);
