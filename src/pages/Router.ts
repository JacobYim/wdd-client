import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import CoreScreen from 'src/components/base/Core';
import AppNavigator from './App';
import SessionNavigator from './Session';

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
