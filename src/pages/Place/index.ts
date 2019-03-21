import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import DetailScreen from './Detail';
import ResultScreen from './Result';
import SearchScreen from './Search';

const ResultNavigator = createStackNavigator(
  {
    default: ResultScreen,
    detail: DetailScreen,
  },
  {
    initialRouteName: 'default',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default createSwitchNavigator(
  {
    search: SearchScreen,
    result: ResultNavigator,
  },
  {
    initialRouteName: 'search',
  }
);
