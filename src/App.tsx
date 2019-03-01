import React from 'react';
import { Provider } from 'react-redux';
import Router from 'src/pages/Router';
import configStore from 'src/store';

const App: React.FC<{}> = () => {
  const store = configStore();

  return (
    <Provider store={store}>
      <Router uriPrefix="woodongdang://" />
    </Provider>
  );
};

export default App;
