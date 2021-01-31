// import Amplify from 'aws-amplify';
import moment from 'moment';
import 'moment/locale/ko';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
// import awsmobile from 'src/aws-exports';
import Splash from 'src/components/module/Splash';
import configAxios from 'src/services/api/axios';
import * as userActions from 'src/store/actions/user';

interface Props extends NavigationScreenProps {
  autoSignIn: typeof userActions.autoSignIn;
}

class Core extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    configAxios();
    // Amplify.configure(awsmobile);
    moment.locale('ko');
  }

  componentDidMount() {
    const { autoSignIn, navigation } = this.props;
    autoSignIn(navigation);
  }

  render() {
    return <Splash />;
  }
}

export default connect(
  null,
  { autoSignIn: userActions.autoSignIn }
)(Core);
