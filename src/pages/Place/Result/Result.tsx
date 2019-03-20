import produce from 'immer';
import { pick } from 'lodash';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import TopNavbar from 'src/components/module/TopNavbar';
import TrackUser from 'src/pages/App/Map/TrackUser';
import { Params, Place, searchPlace } from 'src/services/api/place';
import MarkerView from './MarkerView';
import Range from './Range';
import {
  cardWidth,
  height,
  icons,
  texts,
  views,
  width
  } from './Result.styles';
import {
  Image,
  SafeAreaView,
  ScrollViewProps,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
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

const renderImage = (images: string[]) =>
  (images && images[0] && { uri: images[0] }) ||
  require('src/assets/icons/logo_img.png');

const renderRating = (rating: number) => rating.toFixed(1);

const ratingIcons = (rating: number) => {
  const nodes: React.ReactNode[] = [];
  const ratingRound = Math.round(rating);
  for (let i = 1; i < 6; i += 1) {
    nodes.push(
      <Image
        source={require('src/assets/icons/ic_rating.png')}
        style={[icons.rating, { opacity: ratingRound < i ? 0.5 : 1 }]}
        key={i}
      />
    );
  }
  return nodes;
};

class Result extends PureComponent<NavigationScreenProps, State> {
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

  moveToDetail = (params: Place) => {
    const { navigation } = this.props;
    navigation.navigate({ params, routeName: 'detail' });
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
    <View style={views.cardWrapper}>
      <Image source={renderImage(item.images)} style={icons.thumbnail} />
      <View style={views.infoWrapper}>
        <Text style={texts.name}>{item.name}</Text>
        <Text style={texts.address}>{item.address}</Text>
        <View style={views.ratingWrapper}>
          <Text style={texts.rating}>{renderRating(item.rating)}</Text>
          {ratingIcons(item.rating)}
        </View>
      </View>
      <TouchableOpacity
        style={views.show}
        onPress={() => this.moveToDetail(item)}
        activeOpacity={0.7}>
        <Image
          source={require('src/assets/icons/ic_show.png')}
          style={icons.show}
        />
      </TouchableOpacity>
    </View>
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

export default Result;
