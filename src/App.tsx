import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

import store from 'store';
import Core from 'components/base/Core';
import AppContainer from 'pages/AppContainer';

const App: React.SFC<{}> = () => (
  <Provider store={store}>
    <SafeAreaView>
      <Core />
      <AppContainer />
    </SafeAreaView>
  </Provider>
);

export default App;
