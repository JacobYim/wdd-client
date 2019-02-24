import { createSwitchNavigator } from 'react-navigation';

import WalkScreen from './Walk';
import WalkSaveScreen from './SaveWalk';

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
