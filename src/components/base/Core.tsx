import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Image } from 'react-native';

import * as userActions from 'src/store/actions/user';
import initAxios from 'src/lib/api/axios';
import { loadToken } from 'src/lib/storage/token';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  loadUser: typeof userActions.loadUser;
}

class Core extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    initAxios();
    this.checkUser();
  }

  checkUser = async () => {
    const { loadUser, navigation } = this.props;
    const token = await loadToken();

    if (token) {
      axios.defaults.headers.common['authorization'] = token;
      loadUser();
      navigation.navigate('app');
    } else {
      delete axios.defaults.headers.common['authorization'];
      navigation.navigate('session');
    }
  };

  render() {
    return (
      <Image
        style={{ flex: 1, resizeMode: 'center' }}
        source={require('src/lib/image/img_splash.jpg')}
      />
    );
  }
}

export default connect(
  null,
  { loadUser: userActions.loadUser }
)(Core);
