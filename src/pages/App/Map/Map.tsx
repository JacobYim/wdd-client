import produce from 'immer';
import { pick } from 'lodash';
import React, { Component, createRef } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { calcDistance } from 'src/assets/functions/calcutate';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import Header from './Header';
import TrackUser from './TrackUser';

interface Props extends NavigationScreenProps {
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
const LOCATION: LatLng = { latitude: 37.4734372, longitude: 127.0405071 };
const DELTA = { latitudeDelta: 0.005, longitudeDelta: 0.005 * ASPECT_RATIO };

class Map extends Component<Props, State> {
  private map = createRef<MapView>();
  private watchLocation: number = -1;

  state: State = {
    trackUser: true,
    statusChanged: true,
    current: { ...LOCATION, speed: 0 },
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.walk.status !== this.props.walk.status) {
      this.setState({ statusChanged: true });
    }
  }

  componentDidMount() {
    this.watchLocation = Geolocation.watchPosition(
      ({ coords }) => {
        const { pushPin, walk } = this.props;
        const { latitude, longitude, speed } = coords;
        const current = { latitude, longitude, speed: speed || 0 };

        this.setState(state =>
          produce(state, draft => {
            if (walk.status === 'WALKING') {
              const pinLength = walk.pins.length;
              const pinInfo: actions.UpdateWalkInterface = {
                ...current,
                addDistance: 0,
              };
              if (state.statusChanged) {
                pushPin(pinInfo);
                draft.statusChanged = false;
              } else {
                const previous = walk.pins[pinLength - 1];
                pinInfo.addDistance = calcDistance(
                  pick(previous, ['latitude', 'longitude']),
                  pick(current, ['latitude', 'longitude'])
                );
                if (pinInfo.addDistance > 0.0098) pushPin(pinInfo);
              }
            }
            this.moveCameraToUser(
              pick(current, ['latitude', 'longitude']),
              state.trackUser
            );
            draft.current = current;
          })
        );
      },
      () => {},
      {
        enableHighAccuracy: true,
        distanceFilter: 2, // Listen moving on every 2m
        interval: 5000,
        fastestInterval: 2000,
      }
    );
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
        const { latitude, longitude } = state.current;
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
  { pushPin: actions.pushPin }
)(Map);
