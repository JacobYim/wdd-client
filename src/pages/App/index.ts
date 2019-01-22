import { createBottomTabNavigator } from 'react-navigation';

import MapScreen from './Map';

export default createBottomTabNavigator({
  map: {
    screen: MapScreen,
    path: 'app',
  },
});
