import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import SignInScreen from './SignIn';

import AgreementScreen from './Agreement';
import SignUpScreen from './SignUp';
import CreateMetaScreen from './CreateMeta';
import CreateDogScreen from './CreateDog';
import TutorialScreen from './Tutorial';

import ForgotPasswordScreen from './ForgotPassword';
import SendEmailScreen from './SendEmail';
import ChangePasswordScreen from './ChangePassword';

const SignUpNavigator = createMaterialTopTabNavigator(
  {
    agreement: AgreementScreen,
    signUpUser: SignUpScreen,
    createMeta: CreateMetaScreen,
    createDog: CreateDogScreen,
    tutorial: TutorialScreen,
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

const ForgotPasswordNavigator = createMaterialTopTabNavigator(
  {
    init: {
      screen: ForgotPasswordScreen,
      path: 'check-email',
    },
    sendEmail: {
      screen: SendEmailScreen,
      path: 'send-email',
    },
    changePassword: {
      screen: ChangePasswordScreen,
      path: 'change-password/:token',
    },
  },
  {
    initialRouteName: 'init',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: { display: 'none' },
    },
  }
);

export default createStackNavigator(
  {
    signIn: SignInScreen,
    signUp: SignUpNavigator,
    forgotPassword: {
      screen: ForgotPasswordNavigator,
      path: 'forgot-password',
    },
  },
  {
    initialRouteName: 'signIn',
    headerMode: 'none',
  }
);
