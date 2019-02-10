import { createBottomTabNavigator } from 'react-navigation';

import MapScreen from './Map';
import WddScreen from './Wdd';
import WalkScreen from './Walk';
import ProfileScreen from './Profile';
import BottomTabbar from 'src/components/base/BottomTabbar';

export default createBottomTabNavigator(
  {
    map: {
      screen: MapScreen,
      params: {
        icon: require('src/lib/icons/logo_img.png'),
      },
    },
    wdd: {
      screen: WddScreen,
      params: {
        icon: require('src/lib/icons/ic_wdd.png'),
        label: '우동댕',
      },
    },
    profile: {
      screen: ProfileScreen,
      params: {
        icon: require('src/lib/icons/ic_profile.png'),
        label: '내 프로필',
      },
    },
    walk: {
      screen: WalkScreen,
      params: {
        icon: require('src/lib/icons/ic_foot_print.png'),
      },
    },
  },
  {
    initialRouteName: 'map',
    tabBarComponent: BottomTabbar,
  }
);
