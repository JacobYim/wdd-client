import React, { Component, createRef } from 'react';
import produce from 'immer';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  GestureResponderEvent,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';

import { calcDistance } from 'src/assets/functions/calcutate';
import { ReducerState } from 'src/store/reducers';
import * as actions from 'src/store/actions/walk';
import { views, icons } from './Map.styles';

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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.walk.status !== this.props.walk.status)
      this.setState({ statusChanged: true });
  }

  componentDidMount() {
    this.watchPosition();
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
    if (map && activate)
      map.animateToRegion({ ...center, ...this.initDelta }, 120);
  };

  handleDragMapStart = (e: GestureResponderEvent) => {
    if (e.target === 13) {
      // e.stopPropagation();
      if (this.state.trackUser) this.setState({ trackUser: false });
    }
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
      <ScrollView
        contentContainerStyle={views.container}
        onTouchStart={this.handleDragMapStart}
        scrollEnabled={false}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={views.map}
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
      </ScrollView>
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
