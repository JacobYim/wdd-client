import { Animated, Easing } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import EditScreen from './Edit';
import FinishScreen from './Finish';
import MapScreen from './Map';
import UploadScreen from './Upload';
import WalkScreen from './Walk';
import {
  MapListNavigator as PlaceMapNavigator,
  SearchNavigator as PlaceSearchNavigator,
} from 'src/pages/Place';

const FinishNavigator = createStackNavigator(
  {
    finish: FinishScreen,
    upload: UploadScreen,
    edit: EditScreen,
  },
  {
    initialRouteName: 'finish',
    headerMode: 'none',
  }
);

const WalkNavigator = createSwitchNavigator(
  {
    walk: WalkScreen,
    finish: FinishNavigator,
  },
  {
    initialRouteName: 'walk',
    backBehavior: 'initialRoute',
  }
);

const MapNavigator = createStackNavigator(
  {
    map: MapScreen,
    walk: WalkNavigator,
    placeMap: PlaceMapNavigator,
    placeSearch: PlaceSearchNavigator,
  },
  {
    initialRouteName: 'map',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  }
);

MapNavigator.navigationOptions = ({ navigation }: any) => ({
  tabBarVisible: navigation.state.index === 0,
});

export default MapNavigator;
