import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './Login';
import MapScreen from './Map';

const AppNavigator = createBottomTabNavigator({
  Login: { screen: LoginScreen },
  Map: { screen: MapScreen },
});

export default createAppContainer(AppNavigator);
