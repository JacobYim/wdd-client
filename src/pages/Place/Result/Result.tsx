import produce from 'immer';
import { pick } from 'lodash';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import TopNavbar from 'src/components/module/TopNavbar';
import TrackUser from 'src/pages/App/Map/TrackUser';
import { Params, Place, searchPlace } from 'src/services/api/place';
import { fonts, icons, views } from './Result.styles';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
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
      range: 0.3, // km
    },
  };

  search = async (params: Params) => {
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
    const { trackUser, filter } = this.state;
    this.moveCameraToUser(userCoord, trackUser);
    this.setState({ userCoord });
    if (!this.loadUserLocation) {
      const { navigation } = this.props;
      const keyword: string | undefined = navigation.getParam('keyword');
      this.search({ keyword, location: userCoord, ...filter });
      this.loadUserLocation = true;
    }
  };

  render() {
    const { places, trackUser, filter } = this.state;
    const range =
      filter.range < 1 ? `${filter.range * 1000}m` : `${filter.range}km`;
    return (
      <>
        <SafeAreaView>
          <TopNavbar
            center="주변 상점"
            left={{
              view: (
                <Image
                  style={icons.back}
                  source={require('src/assets/icons/ic_back.png')}
                />
              ),
              handlePress: () => this.props.navigation.goBack(null),
            }}
          />
          <View style={views.filterWrapper}>
            <Text style={fonts.range}>{range}</Text>
            <Image
              source={require('src/assets/icons/ic_dropdown.png')}
              style={icons.dropDown}
            />
          </View>
        </SafeAreaView>
        <View style={views.container}>
          <MapView
            ref={this.map}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{ ...LOCATION, ...DELTA }}
            showsCompass={false}
            showsMyLocationButton={false}
            showsUserLocation={true}
            onTouchStart={this.handleDragMapStart}
            onUserLocationChange={this.handleLocationChange}>
            {places &&
              places.map((place, index) => (
                <Marker coordinate={place.location} key={index}>
                  <Image
                    source={require('src/assets/icons/ic_pin.png')}
                    style={icons.pin}
                  />
                </Marker>
              ))}
          </MapView>
          <SafeAreaView>
            <TrackUser
              handlePress={this.handlePressTrackButton}
              active={trackUser}
            />
          </SafeAreaView>
        </View>
      </>
    );
  }
}

export default Result;
