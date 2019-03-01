import Amplify from 'aws-amplify';
import React, { PureComponent } from 'react';
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
    return null;
  }
}

export default connect(
  null,
  { autoSignIn: userActions.autoSignIn }
)(Core);
