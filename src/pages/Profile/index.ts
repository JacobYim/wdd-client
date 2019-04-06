import { createStackNavigator } from 'react-navigation';
import PlaceScreen from 'src/pages/Place/Detail';
import ReviewScreen from 'src/pages/Place/Review';
import EditScreen from './Edit';
import HomeScreen from './Home';
import SettingScreen from './Setting';

const ProfileNavigator = createStackNavigator(
  {
    home: HomeScreen,
    setting: SettingScreen,
    edit: EditScreen,
    create: {
      screen: EditScreen,
      params: { createMode: true },
    },
    place: PlaceScreen,
    review: ReviewScreen,
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
