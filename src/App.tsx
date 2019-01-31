import React from 'react';
import { Provider } from 'react-redux';
// import { withAuthenticator } from 'aws-amplify-react-native';

import configStore from 'src/store';
import Router from 'src/pages/Router';

const App: React.FC<{}> = () => {
  const store = configStore();

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
