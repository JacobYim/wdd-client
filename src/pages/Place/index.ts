import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import DetailScreen from './Detail';
import MapListScreen from './MapList';
import ReviewScreen from './Review';
import SearchScreen from './Search';

export const SearchNavigator = createStackNavigator(
  {
    default: SearchScreen,
    detail: DetailScreen,
    review: ReviewScreen,
  },
  {
    initialRouteName: 'default',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export const MapListNavigator = createStackNavigator(
  {
    default: MapListScreen,
    detail: DetailScreen,
    review: ReviewScreen,
  },
  {
    initialRouteName: 'default',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);
