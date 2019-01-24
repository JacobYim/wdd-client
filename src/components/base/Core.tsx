import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Image } from 'react-native';

import * as userActions from 'src/store/actions/user';
import configAxios, { setToken, removeToken } from 'src/services/api/axios';
import { loadToken } from 'src/services/storage/token';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  loadUser: typeof userActions.loadUser;
}

class Core extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    configAxios();
    this.AutoSignin();
  }

  moveToApp = () => {
    const { navigation } = this.props;
    navigation.navigate('app');
  };

  AutoSignin = async () => {
    const { loadUser, navigation } = this.props;
    try {
      const token = await loadToken();
      if (!token) throw 'NO_TOKEN';
      setToken(token);
      await loadUser(this.moveToApp);
    } catch (e) {
      removeToken();
      navigation.navigate('session');
    }
  };

  render() {
    return (
      <Image
        style={{ flex: 1, resizeMode: 'center' }}
        source={require('src/lib/images/img_splash.jpg')}
      />
    );
  }
}

export default connect(
  null,
  { loadUser: userActions.loadUser }
)(Core);
