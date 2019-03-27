import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import FinishScreen from './Finish';
import UploadScreen from './Upload';
import WalkScreen from './Walk';

const FinishNavigator = createStackNavigator(
  {
    finish: FinishScreen,
    upload: UploadScreen,
  },
  {
    initialRouteName: 'finish',
    headerMode: 'none',
  }
);

export default createSwitchNavigator(
  {
    walk: WalkScreen,
    finish: FinishNavigator,
  },
  {
    initialRouteName: 'walk',
    backBehavior: 'initialRoute',
  }
);
