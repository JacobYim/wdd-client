import produce from 'immer';
import { pick } from 'lodash';
import React, { Component, createRef } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { calcDistance } from 'src/assets/functions/calcutate';
import * as userActions from 'src/store/actions/user';
import * as walkActions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import Header from './Header';
import TrackUser from './TrackUser';
import {
  LOCATION_PERMISSIONS,
  checkPermission,
} from 'src/assets/functions/validate';

interface Props extends NavigationScreenProps {
  pushPin: typeof walkActions.pushPin;
  updateLocation: typeof userActions.updateLocation;
  walk: ReducerState['walk'];
}

interface State {
  trackUser: boolean;
  statusChanged: boolean;
  snapLocation: LatLng;
}

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LOCATION: LatLng = { latitude: 37.4734372, longitude: 127.0405071 };
const DELTA = { latitudeDelta: 0.005, longitudeDelta: 0.005 * ASPECT_RATIO };

class Map extends Component<Props, State> {
  private map = createRef<MapView>();
  private watchLocation: number = -1;

  state: State = {
    trackUser: true,
    statusChanged: true,
    snapLocation: LOCATION,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.walk.status !== this.props.walk.status) {
      this.setState({ statusChanged: true });
    }
  }

  async componentDidMount() {
    const { pushPin, updateLocation } = this.props;
    if (await checkPermission(LOCATION_PERMISSIONS)) {
      this.watchLocation = Geolocation.watchPosition(
        ({ coords }) => {
          const { walk } = this.props;
          const current = pick(coords, ['latitude', 'longitude']);

          this.setState(state =>
            produce(state, draft => {
              // Update Walk Store
              if (walk.status === 'WALKING') {
                const pinInfo: walkActions.UpdateWalkInterface = {
                  ...current,
                  speed: coords.speed || 0,
                  addDistance: 0,
                };
                if (state.statusChanged) {
                  pushPin(pinInfo);
                  draft.statusChanged = false;
                } else {
                  const previous = walk.pins[walk.pins.length - 1];
                  pinInfo.addDistance = calcDistance(
                    pick(previous, ['latitude', 'longitude']),
                    current
                  );
                  if (pinInfo.addDistance > 0.0098) pushPin(pinInfo);
                }
              }
              // Default Actions
              this.moveCameraToUser(current, state.trackUser);
              if (calcDistance(current, draft.snapLocation) > 0.05) {
                updateLocation(current);
                draft.snapLocation = current;
              }
            })
          );
        },
        err => {
          Alert.alert(err.message);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 2, // Listen moving on every 2m
          interval: 5000,
          fastestInterval: 2000,
        }
      );
    }
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchLocation);
  }

  moveCameraToUser = (center: LatLng, activate: boolean) => {
    const map = this.map.current;
    if (map && activate) {
      map.animateToRegion({ ...center, ...DELTA }, 120);
    }
  };

  handleDragMapStart = () => {
    if (this.state.trackUser) this.setState({ trackUser: false });
  };

  handlePressTrackButton = () => {
    this.setState(state =>
      produce(state, draft => {
        const { latitude, longitude } = state.snapLocation;
        draft.trackUser = !state.trackUser;
        this.moveCameraToUser({ latitude, longitude }, draft.trackUser);
      })
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{ ...LOCATION, ...DELTA }}
          showsMyLocationButton={false}
          showsCompass={false}
          showsUserLocation={true}
          onTouchStart={this.handleDragMapStart}
        />
        <Header />
        <TrackUser
          handlePress={this.handlePressTrackButton}
          active={this.state.trackUser}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: ReducerState) => ({ walk: state.walk }),
  { pushPin: walkActions.pushPin, updateLocation: userActions.updateLocation }
)(Map);
