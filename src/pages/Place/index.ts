import { createStackNavigator } from 'react-navigation';
import SearchScreen from './Search';

export default createStackNavigator(
  {
    search: SearchScreen,
  },
  {
    headerMode: 'none',
  }
);
