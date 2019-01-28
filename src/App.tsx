import React from 'react';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';

import configStore from 'src/store';
import awsconfig from 'src/aws-exports';
import Router from 'src/pages/Router';

Amplify.configure(awsconfig);

const App: React.SFC<{}> = () => {
  const store = configStore();
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
