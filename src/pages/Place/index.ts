import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import DetailScreen from './Detail';
import MapScreen from './Map';
import ReviewScreen from './Review';
import SearchScreen from './Search';

const SearchNavigator = createStackNavigator(
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

const MapNavigator = createStackNavigator(
  {
    default: MapScreen,
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

export default createSwitchNavigator({
  search: SearchNavigator,
  map: MapNavigator,
});
