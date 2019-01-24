import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProp, NavigationActions } from 'react-navigation';
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
  }

  componentDidMount() {
    const { autoSignIn } = this.props;
    autoSignIn({
      success: this.navToApp,
      failure: this.navToSession,
      pending: this.navToSave,
    });
  }

  navToApp = () => {
    const { navigation } = this.props;
    navigation.navigate('app');
  };

  navToSession = () => {
    const { navigation } = this.props;
    navigation.navigate('session');
  };

  navToSave = (routeName: string) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: 'session',
      action: NavigationActions.navigate({
        routeName: 'signUp',
        action: NavigationActions.navigate({ routeName }),
      }),
    });
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
  { autoSignIn: userActions.autoSignIn }
)(Core);
