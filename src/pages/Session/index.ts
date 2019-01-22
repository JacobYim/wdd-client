import { createStackNavigator } from 'react-navigation';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';

export default createStackNavigator(
  {
    signIn: {
      screen: SignInScreen,
      path: 'sign-in',
    },
    signUp: {
      screen: SignUpScreen,
      path: 'sign-up',
    },
  },
  {
    initialRouteName: 'signIn',
    headerMode: 'none',
  }
);
