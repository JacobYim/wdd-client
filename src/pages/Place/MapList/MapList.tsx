import produce from 'immer';
import { pick } from 'lodash';
import React, { PureComponent } from 'react';
import { Image, SafeAreaView, ScrollViewProps, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import TopNavbar from 'src/components/module/TopNavbar';
import TrackUser from 'src/pages/Map/Map/TrackUser';
import { SearchParams, searchPlace } from 'src/services/api/place';
import { Place } from 'src/store/actions/place';
import Card, { cardWidth } from './Card';
import { height, icons, views, width } from './MapList.styles';
import MarkerView from './MarkerView';
import Range from './Range';
import Carousel, {
  CarouselStatic,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import MapView, {
  LatLng,
  Marker,
  MapEvent,
  PROVIDER_GOOGLE,
  EventUserLocation,
} from 'react-native-maps';

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

interface Item {
  item: Place;
  index: number;
}

type CarouselInterface = Carousel<Place> &
  CarouselStatic<Place> &
  ScrollViewProps;

class MapList extends PureComponent<NavigationScreenProps, State> {
  private map = React.createRef<MapView>();
  private carousel = React.createRef<CarouselInterface>();
  private loadUserLocation = false;

  state: State = {
    places: [],
    curPlace: 0,
    trackUser: false,
    userCoord: LOCATION,
    mapCoord: LOCATION,
    filter: {
      range: 0.5, // km
    },
  };

  search = async (params: SearchParams) => {
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

  moveToDetail = (place: Place) => {
    const { navigation } = this.props;
    navigation.navigate('detail', { place });
  };

  stopTrackUser = () => {
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
    const curPlace = parseInt(id, 10);
    this.moveCameraToLocation(coordinate);
    this.setState({ curPlace });
    if (this.carousel.current) {
      this.carousel.current.snapToItem(curPlace);
    }
  };

  handleRangeChange = (range: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.filter.range = range;
        this.search({ location: state.userCoord, ...draft.filter });
      })
    );
  };

  handleSnap = (index: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.curPlace = index;
        this.moveCameraToLocation(state.places[draft.curPlace].location);
      })
    );
  };

  renderItem = ({ item }: Item, parallaxProps?: AdditionalParallaxProps) => (
    <Card
      place={item}
      handlePress={() => this.moveToDetail(item)}
      icon={
        <Image
          source={require('src/assets/icons/ic_show.png')}
          style={icons.show}
        />
      }
    />
  );

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
            onTouchStart={this.stopTrackUser}
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
            <Carousel
              ref={this.carousel}
              data={places}
              containerCustomStyle={views.carousel}
              sliderWidth={width}
              itemWidth={cardWidth}
              decelerationRate="fast"
              onSnapToItem={this.handleSnap}
              renderItem={this.renderItem}
            />
          </SafeAreaView>
        </View>
      </>
    );
  }
}

export default MapList;
