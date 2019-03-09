import produce from 'immer';
import React, { Component, createRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { calcDistance } from 'src/assets/functions/calcutate';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import { icons, views } from './Map.styles';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';

interface Props {
  navigation: NavigationScreenProp<any>;
  pushPin: typeof actions.pushPin;
  walk: ReducerState['walk'];
}

interface State {
  trackUser: boolean;
  statusChanged: boolean;
  current: {
    latitude: number;
    longitude: number;
    speed: number;
  };
}

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const extLocation = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
  [x: string]: any;
}): LatLng => ({ latitude, longitude });

class Map extends Component<Props, State> {
  private map = createRef<MapView>();
  private watchLocation: number = -1;
  private initLocation: LatLng = {
    // 우리동네댕댕이 HQ
    latitude: 37.4734372,
    longitude: 127.0405071,
  };
  private initDelta = {
    latitudeDelta: 0.005,
    longitudeDelta: 0.005 * ASPECT_RATIO,
  };

  state: State = {
    trackUser: true,
    statusChanged: true,
    current: {
      ...this.initLocation,
      speed: 0,
    },
  };

  checkPermission = async (): Promise<boolean> => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    return false;
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.walk.status !== this.props.walk.status) {
      this.setState({ statusChanged: true });
    }
  }

  componentDidMount() {
    if (this.checkPermission()) {
      this.watchPosition();
    }
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchLocation);
  }

  watchPosition = () => {
    const { pushPin } = this.props;
    this.watchLocation = Geolocation.watchPosition(
      ({ coords }) => {
        const { walk } = this.props;
        const { trackUser, statusChanged } = this.state;
        const current = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          speed: coords.speed || 0,
        };
        console.log(current);

        if (walk.status === 'WALKING') {
          const pinLength = walk.pins.length;
          const pinInfo: actions.UpdateWalkInterface = {
            ...current,
            addDistance: 0,
          };
          if (statusChanged) {
            pushPin(pinInfo);
            this.setState({ statusChanged: false });
          } else {
            const previous = walk.pins[pinLength - 1];
            pinInfo.addDistance = calcDistance(
              extLocation(previous),
              extLocation(current)
            );
            if (pinInfo.addDistance > 0.0098) pushPin(pinInfo);
          }
        }
        this.moveCameraToUser(extLocation(current), trackUser);
        this.setState({ current });
      },
      () => {},
      {
        enableHighAccuracy: true,
        distanceFilter: 2, // Listen moving on every 2m
        interval: 5000,
        fastestInterval: 2000,
      }
    );
  };

  moveCameraToUser = (center: LatLng, activate: boolean) => {
    const map = this.map.current;
    if (map && activate) {
      map.animateToRegion({ ...center, ...this.initDelta }, 120);
    }
  };

  handleDragMapStart = () => {
    if (this.state.trackUser) this.setState({ trackUser: false });
  };

  handlePressTrackButton = () => {
    this.setState(state =>
      produce(state, draft => {
        const { latitude, longitude } = state.current;
        draft.trackUser = !state.trackUser;
        this.moveCameraToUser({ latitude, longitude }, draft.trackUser);
      })
    );
  };

  render() {
    const { trackUser } = this.state;

    return (
      <View style={views.container}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={views.map}
          onTouchStart={this.handleDragMapStart}
          initialRegion={{
            ...this.initLocation,
            ...this.initDelta,
          }}
          showsUserLocation={true}
        />
        <TouchableOpacity
          style={views.trackUserButton}
          activeOpacity={1}
          onPress={this.handlePressTrackButton}>
          <Image
            style={[{ opacity: trackUser ? 1 : 0.4 }, icons.trackUser]}
            source={require('src/assets/icons/ic_location.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    walk: state.walk,
  }),
  {
    pushPin: actions.pushPin,
  }
)(Map);
