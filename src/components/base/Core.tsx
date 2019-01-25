import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Image } from 'react-native';

import * as userActions from 'src/store/actions/user';
import configAxios from 'src/services/api/axios';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  autoSignIn: typeof userActions.autoSignIn;
}

class Core extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    configAxios();
    props.autoSignIn(this.props.navigation);
  }

  render() {
    return (
      <Image
        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        source={require('src/lib/images/img_splash.jpg')}
      />
    );
  }
}

export default connect(
  null,
  { autoSignIn: userActions.autoSignIn }
)(Core);
