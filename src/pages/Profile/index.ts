import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home';
import SettingScreen from './Setting';

export default createStackNavigator(
  {
    home: HomeScreen,
    setting: SettingScreen,
  },
  {
    initialRouteName: 'home',
    headerMode: 'none',
  }
);
