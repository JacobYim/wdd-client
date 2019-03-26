import { createSwitchNavigator } from 'react-navigation';
import SaveScreen from './Save';
import WalkScreen from './Walk';

export default createSwitchNavigator(
  {
    dashboard: WalkScreen,
    save: SaveScreen,
  },
  {
    initialRouteName: 'dashboard',
    backBehavior: 'initialRoute',
  }
);
