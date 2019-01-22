import React from 'react';
import { Provider } from 'react-redux';

import configStore from 'src/store';
import Router from 'src/pages/Router';

const App: React.SFC<{}> = () => {
  const store = configStore();
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
