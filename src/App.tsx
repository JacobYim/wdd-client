import React from 'react';
import { Provider } from 'react-redux';

import configStore from 'src/store';
import Router from 'src/pages/Router';

const App: React.FC<{}> = () => {
  const store = configStore();

  return (
    <Provider store={store}>
      <Router uriPrefix="woodongdang://" />
    </Provider>
  );
};

export default App;
