import { createSwitchNavigator } from 'react-navigation';
import SearchScreen from './Search';

export default createSwitchNavigator(
  {
    search: SearchScreen,
  },
  {
    initialRouteName: 'search',
    backBehavior: 'initialRoute',
  }
);
