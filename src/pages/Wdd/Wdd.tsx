import React, { PureComponent } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { serachUsers } from 'src/services/api/user';
import { ReducerState } from 'src/store/reducers';
import { icons, views } from './Wdd.styles';

interface Props extends NavigationScreenProps {
  user: ReducerState['user'];
}

interface State {
  users: ReducerState['user'][];
}

class Wdd extends PureComponent<Props, State> {
  async componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={views.header}>
          <Image
            source={require('src/assets/icons/logo_text.png')}
            style={icons.logo}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect((state: ReducerState) => ({ user: state.user }))(Wdd);
