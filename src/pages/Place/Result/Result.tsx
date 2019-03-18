import produce from 'immer';
import { pick } from 'lodash';
import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import TopNavbar from 'src/components/module/TopNavbar';
import TrackUser from 'src/pages/App/Map/TrackUser';
import { Params, Place, searchPlace } from 'src/services/api/place';
import MarkerView from './MarkerView';
import Range from './Range';
import { icons, views } from './Result.styles';
import MapView, {
  LatLng,
  Marker,
  MapEvent,
  PROVIDER_GOOGLE,
  EventUserLocation,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LOCATION: LatLng = { latitude: 37.4734372, longitude: 127.0405071 };
const DELTA = { latitudeDelta: 0.005, longitudeDelta: 0.005 * ASPECT_RATIO };

interface State {
  places: Place[];
  curPlace: number;
  trackUser: boolean;
  userCoord: LatLng;
  mapCoord: LatLng;
  filter: { keyword?: string; range: number };
}

class Result extends Component<NavigationScreenProps, State> {
  private map = React.createRef<MapView>();
  private loadUserLocation = false;

  state: State = {
    places: [],
    curPlace: 0,
    trackUser: false,
    userCoord: LOCATION,
    mapCoord: LOCATION,
    filter: {
      keyword: this.props.navigation.getParam('keyword'),
      range: 0.5, // km
    },
  };

  search = async (params: Params) => {
    const places = await searchPlace(params);
    this.setState(state =>
      produce(state, draft => {
        draft.places = places;
        draft.curPlace = 0;
        if (places.length > 0) {
          this.moveCameraToLocation(places[draft.curPlace].location);
        }
      })
    );
  };

  moveCameraToLocation = (center: LatLng, activate: boolean = true) => {
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
        this.moveCameraToLocation(state.userCoord, draft.trackUser);
      })
    );
  };

  handleLocationChange = (e: EventUserLocation) => {
    const userCoord = pick(e.nativeEvent.coordinate, ['latitude', 'longitude']);
    const { trackUser, filter } = this.state;
    this.moveCameraToLocation(userCoord, trackUser);
    this.setState({ userCoord });
    // call only once
    if (!this.loadUserLocation) {
      this.loadUserLocation = true;
      this.search({ location: userCoord, ...filter });
    }
  };

  handleMarkerPress = (e: MapEvent<{ action: 'marker-press'; id: string }>) => {
    const { id, coordinate } = e.nativeEvent;
    this.moveCameraToLocation(coordinate);
    this.setState({ curPlace: parseInt(id, 10) });
  };

  handleRangeChange = (range: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.filter.range = range;
        this.search({ location: state.userCoord, ...draft.filter });
      })
    );
  };

  render() {
    const { places, trackUser, filter, curPlace } = this.state;

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
            <Range range={filter.range} handleChange={this.handleRangeChange} />
          </View>
        </SafeAreaView>
        <View style={views.container}>
          <MapView
            ref={this.map}
            provider={PROVIDER_GOOGLE}
            style={views.map}
            initialRegion={{ ...LOCATION, ...DELTA }}
            showsCompass={false}
            showsMyLocationButton={false}
            showsUserLocation={true}
            onTouchStart={this.handleDragMapStart}
            onUserLocationChange={this.handleLocationChange}
            onMarkerPress={this.handleMarkerPress}>
            {places &&
              places.map((place, index) => (
                <Marker
                  identifier={index.toString()}
                  coordinate={place.location}
                  key={index}>
                  <MarkerView place={place} selected={index === curPlace} />
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
