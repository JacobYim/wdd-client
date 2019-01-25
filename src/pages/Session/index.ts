import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import SignInScreen from './SignIn';
import AgreementScreen from './Agreement';
import SignUpScreen from './SignUp';
import CreateMetaScreen from './CreateMeta';
import CreateDogScreen from './CreateDog';

const SignUpNavigator = createMaterialTopTabNavigator(
  {
    agreement: {
      screen: AgreementScreen,
      path: 'sign-up/agreement',
    },
    signUpUser: {
      screen: SignUpScreen,
      path: 'sign-up/user',
    },
    createMeta: {
      screen: CreateMetaScreen,
      path: 'sign-up/meta',
    },
    createDog: {
      screen: CreateDogScreen,
      path: 'sign-up/dog',
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
