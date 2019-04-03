import AgreementScreen from './Agreement';
import ChangePasswordScreen from './ChangePassword';
import CreateDogScreen from './CreateDog';
import CreateMetaScreen from './CreateMeta';
import ForgotPasswordScreen from './ForgotPassword';
import SelectScreen from './Select';
import SendEmailScreen from './SendEmail';
import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

const SignUpNavigator = createMaterialTopTabNavigator(
  {
    agreement: AgreementScreen,
    signUpUser: SignUpScreen,
    createMeta: CreateMetaScreen,
    createDog: CreateDogScreen,
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
    select: SelectScreen,
    signIn: SignInScreen,
    signUp: SignUpNavigator,
    forgotPassword: {
      screen: ForgotPasswordNavigator,
      path: 'forgot-password',
    },
  },
  {
    initialRouteName: 'select',
    headerMode: 'none',
  }
);
