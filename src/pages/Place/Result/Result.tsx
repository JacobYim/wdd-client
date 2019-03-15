import produce from 'immer';
import { pick } from 'lodash';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import TrackUser from 'src/pages/App/Map/TrackUser';
import { GeoJSON, Params, Place, searchPlace } from 'src/services/api/place';
import MapView, {
  LatLng,
  PROVIDER_GOOGLE,
  EventUserLocation,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LOCATION: LatLng = { latitude: 37.4734372, longitude: 127.0405071 };
const DELTA = { latitudeDelta: 0.005, longitudeDelta: 0.005 * ASPECT_RATIO };

interface State {
  places: Place[];
  trackUser: boolean;
  userCoord: LatLng;
  mapCoord: LatLng;
  filter: { range: number };
}

const geoToLatLng = ({ coordinates }: GeoJSON) =>
  ({
    latitude: coordinates[1],
    longitude: coordinates[0],
  } as LatLng);

class Result extends Component<NavigationScreenProps, State> {
  private map = React.createRef<MapView>();
  private loadUserLocation = false;

  state: State = {
    places: [],
    trackUser: true,
    userCoord: LOCATION,
    mapCoord: LOCATION,
    filter: { range: 300 },
  };

  search = async (params: Params) => {
    const response = await searchPlace(params);
    const places: Place[] = response.map(data =>
      Object.assign(data, { location: geoToLatLng(data.location) })
    );
    this.setState({ places });
  };

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
        draft.trackUser = !state.trackUser;
        this.moveCameraToUser(state.userCoord, draft.trackUser);
      })
    );
  };

  handleLocationChange = (e: EventUserLocation) => {
    const userCoord = pick(e.nativeEvent.coordinate, ['latitude', 'longitude']);
    this.moveCameraToUser(userCoord, this.state.trackUser);
    this.setState({ userCoord });
    if (!this.loadUserLocation) {
      const { navigation } = this.props;
      this.loadUserLocation = true;
      const keyword: string | undefined = navigation.getParam('keyword');
      this.search({ keyword, location: userCoord });
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          ref={this.map}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{ ...LOCATION, ...DELTA }}
          showsCompass={false}
          showsMyLocationButton={false}
          showsUserLocation={true}
          onTouchStart={this.handleDragMapStart}
          onUserLocationChange={this.handleLocationChange}
        />
        <TrackUser
          handlePress={this.handlePressTrackButton}
          active={this.state.trackUser}
        />
      </SafeAreaView>
    );
  }
}

export default Result;
