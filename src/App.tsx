import React from 'react';
import { Provider } from 'react-redux';

import store from 'src/store';
import BaseContainer from './components/base/BaseContainer';

const App: React.SFC<{}> = () => (
  <Provider store={store}>
    <BaseContainer />
  </Provider>
);

export default App;
