import { Animated, Easing } from 'react-native';
import BottomTabbar from 'src/components/base/BottomTabbar';
import WalkNavigator from 'src/pages/Walk';
import MapScreen from './Map';
import ProfileScreen from './Profile';
import WddScreen from './Wdd';
import {
  MapNavigator as PlaceMapNavigator,
  SearchNavigator as PlaceSearchNavigator,
} from 'src/pages/Place';
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationActions,
} from 'react-navigation';

const MapNavigator = createStackNavigator(
  {
    map: MapScreen,
    walk: WalkNavigator,
    placeMap: PlaceMapNavigator,
    placeSearch: PlaceSearchNavigator,
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
