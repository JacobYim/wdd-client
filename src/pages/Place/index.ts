import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import DetailScreen from './Detail';
import ResultScreen from './Result';
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

const ResultNavigator = createStackNavigator(
  {
    default: ResultScreen,
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
  result: ResultNavigator,
});
