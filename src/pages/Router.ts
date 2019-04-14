import BottomTabbar from 'src/components/base/BottomTabbar';
import CoreScreen from 'src/components/base/Core';
import MapNavigator from 'src/pages/Map';
import ProfileNavigator from 'src/pages/Profile';
import WddScreen from 'src/pages/Wdd';
import SessionNavigator from './Session';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from 'react-navigation';

export enum NavigationTabs {
  MAP,
  WDD,
  PROFILE,
}

const AppNavigator = createBottomTabNavigator(
  {
    map: {
      screen: MapNavigator,
      params: {
        tab: {
          icon: require('src/assets/icons/ic_map_page.png'),
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
        iconOn: require('src/assets/icons/ic_wdd_on.png'),
        iconOff: require('src/assets/icons/ic_wdd_off.png'),
        label: '우동댕',
      },
    },
    profile: {
      screen: ProfileNavigator,
      params: {
        iconOn: require('src/assets/icons/ic_profile_on.png'),
        iconOff: require('src/assets/icons/ic_profile_off.png'),
        label: '내 댕댕이',
      },
    },
  },
  {
    initialRouteName: 'map',
    tabBarComponent: BottomTabbar,
    swipeEnabled: false,
    animationEnabled: false,
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      core: CoreScreen,
      app: AppNavigator,
      session: {
        screen: SessionNavigator,
        path: 'session',
      },
    },
    {
      initialRouteName: 'core',
    }
  )
);
