import React from 'react';
import { Button, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from 'src/store/actions/user';

interface Props extends NavigationScreenProps {
  signOut: typeof actions.signOut;
}

const Profile: React.FC<Props> = ({ navigation, signOut }) => {
  function handleSignOut() {
    signOut(navigation);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="로그아웃" onPress={handleSignOut} />
    </View>
  );
};

export default connect(
  null,
  {
    signOut: actions.signOut,
  }
)(Profile);
