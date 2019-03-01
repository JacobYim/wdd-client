import { createSwitchNavigator } from 'react-navigation';
import WalkSaveScreen from './SaveWalk';
import WalkScreen from './Walk';

export default createSwitchNavigator(
  {
    dashboard: WalkScreen,
    save: WalkSaveScreen,
  },
  {
    initialRouteName: 'dashboard',
    backBehavior: 'initialRoute',
  }
);
