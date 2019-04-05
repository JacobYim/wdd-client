import { createStackNavigator } from 'react-navigation';
import EditScreen from './Edit';
import HomeScreen from './Home';
import SettingScreen from './Setting';

const ProfileNavigator = createStackNavigator(
  {
    home: HomeScreen,
    setting: SettingScreen,
    edit: EditScreen,
  },
  {
    initialRouteName: 'home',
    headerMode: 'none',
  }
);

ProfileNavigator.navigationOptions = ({ navigation }: any) => ({
  tabBarVisible: navigation.state.index === 0,
});

export default ProfileNavigator;
