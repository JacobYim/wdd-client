import { createSwitchNavigator } from 'react-navigation';
import FinishScreen from './Finish';
import WalkScreen from './Walk';

export default createSwitchNavigator(
  {
    walk: WalkScreen,
    finish: FinishScreen,
  },
  {
    initialRouteName: 'walk',
    backBehavior: 'initialRoute',
  }
);
