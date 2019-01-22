import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import CoreScreen from './Core';

import MapScreen from 'src/pages/Map';

import SignInScreen from 'src/pages/SignIn';
import SignUpScreen from 'src/pages/SignUp';

const AppNavigator = createBottomTabNavigator({
  map: MapScreen,
});

const SessionNavigator = createStackNavigator(
  {
    signIn: {
      screen: SignInScreen,
      path: 'signIn',
    },
    signUp: {
      screen: SignUpScreen,
      path: 'signUp',
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
