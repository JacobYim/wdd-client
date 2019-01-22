import React from 'react';
import { Provider } from 'react-redux';

import store from 'src/store';
import Router from 'src/pages/Router';

const App: React.SFC<{}> = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
