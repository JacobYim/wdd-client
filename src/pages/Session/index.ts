import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import SignInScreen from './SignIn';
import AgreementScreen from './Agreement';
import SignUpUserScreen from './SignUpUser';
import SignUpMetaScreen from './SignUpMeta';

const SignUpNavigator = createMaterialTopTabNavigator(
  {
    agreement: {
      screen: AgreementScreen,
      path: 'sign-up/agreement',
    },
    signUpUser: {
      screen: SignUpUserScreen,
      path: 'sign-up/user',
    },
    signUpMeta: {
      screen: SignUpMetaScreen,
      path: 'sign-up/meta',
    },
  },
  {
    initialRouteName: 'agreement',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: { display: 'none' },
    },
  }
);

export default createStackNavigator(
  {
    signIn: {
      screen: SignInScreen,
      path: 'sign-in',
    },
    signUp: SignUpNavigator,
  },
  {
    initialRouteName: 'signIn',
    headerMode: 'none',
  }
);
