import produce from 'immer';
import { pick } from 'lodash';
import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import TopNavbar from 'src/components/module/TopNavbar';
import TrackUser from 'src/pages/App/Map/TrackUser';
import { Params, Place, searchPlace } from 'src/services/api/place';
import { icons } from './Result.styles';
import MapView, {
  LatLng,
  Marker,
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

class Result extends Component<NavigationScreenProps, State> {
  private map = React.createRef<MapView>();
  private loadUserLocation = false;

  state: State = {
    places: [],
    trackUser: true,
    userCoord: LOCATION,
    mapCoord: LOCATION,
    filter: {
      range: 1, // km
    },
  };

  search = async (keyword?: string) => {
    const { userCoord, filter } = this.state;
    const params: Params = {
      keyword,
      location: userCoord,
      range: filter.range,
    };
    const places = await searchPlace(params);
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
      this.search(keyword);
    }
  };

  render() {
    const { places, trackUser } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavbar
          right={{
            view: (
              <Image
                style={icons.close}
                source={require('src/assets/icons/ic_close.png')}
              />
            ),
            handlePress: () => this.props.navigation.goBack(null),
          }}
        />
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
          active={trackUser}
        />
        {places &&
          places.map((place, index) => (
            <Marker
              coordinate={place.location}
              anchor={{ x: 0.5, y: 0.5 }}
              key={index}>
              <Image
                source={require('src/assets/icons/ic_pin.png')}
                style={icons.pin}
              />
            </Marker>
          ))}
      </SafeAreaView>
    );
  }
}

export default Result;
