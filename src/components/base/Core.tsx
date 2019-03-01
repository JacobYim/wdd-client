import Amplify from 'aws-amplify';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import awsconfig from 'src/aws-exports';
import configAxios from 'src/services/api/axios';
import * as userActions from 'src/store/actions/user';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  autoSignIn: typeof userActions.autoSignIn;
}

class Core extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    configAxios();
    Amplify.configure(awsconfig);
  }

  componentDidMount() {
    const { autoSignIn, navigation } = this.props;
    autoSignIn(navigation);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Image
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          source={require('src/assets/images/img_splash.jpg')}
        />
      </View>
    );
  }
}

export default connect(
  null,
  { autoSignIn: userActions.autoSignIn }
)(Core);
