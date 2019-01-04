import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { SafeAreaView, Text } from 'react-native';

import { loadUser } from 'src/store/modules/user';
import { views } from './Core.styles';
import initAxios from 'src/lib/api/axios';
import { loadToken } from 'src/lib/storage/token';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  actions: {
    loadUser: () => void;
  };
}

class Core extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    initAxios();
    this.checkUser();
  }

  checkUser = async () => {
    const { actions, navigation } = this.props;
    const token = await loadToken();

    if (token) {
      axios.defaults.headers.common['authorization'] = token;
      actions.loadUser();
      navigation.navigate('app');
    } else {
      delete axios.defaults.headers.common['authorization'];
      navigation.navigate('session');
    }
  };

  render() {
    return (
      <SafeAreaView style={views.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    actions: bindActionCreators({ loadUser }, dispatch),
  })
)(Core);
