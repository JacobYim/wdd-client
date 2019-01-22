import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import CoreScreen from 'src/components/base/Core';

import { Map as MapScreen } from 'src/pages/App';
import { SignIn, SignUp } from 'src/pages/Session';

const AppNavigator = createBottomTabNavigator({
  map: {
    screen: MapScreen,
    path: 'app',
  },
});

const SessionNavigator = createStackNavigator(
  {
    signIn: {
      screen: SignIn,
      path: 'sign-in',
    },
    signUp: {
      screen: SignUp,
      path: 'sign-up',
    },
  },
  {
    initialRouteName: 'signIn',
    headerMode: 'none',
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      core: CoreScreen,
      app: AppNavigator,
      session: SessionNavigator,
    },
    {
      initialRouteName: 'core',
    }
  )
);
