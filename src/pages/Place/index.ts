import { createSwitchNavigator } from 'react-navigation';
import ResultScreen from './Result';
import SearchScreen from './Search';

export default createSwitchNavigator(
  {
    search: SearchScreen,
    result: ResultScreen,
  },
  {
    initialRouteName: 'search',
    backBehavior: 'initialRoute',
  }
);
