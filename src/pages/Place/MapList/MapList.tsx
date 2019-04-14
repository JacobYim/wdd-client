import produce from 'immer';
import { pick } from 'lodash';
import React, { PureComponent } from 'react';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';
import { NavigationScreenProps } from 'react-navigation';
import TopNavbar from 'src/components/module/TopNavbar';
import TrackUser from 'src/pages/Map/Map/TrackUser';
import { SearchParams, searchPlace } from 'src/services/api/place';
import { Label as LabelType, Place } from 'src/store/actions/place';
import Card, { cardWidth } from './Card';
import Label from './Label';
import { height, icons, texts, views, width } from './MapList.styles';
import MarkerView from './MarkerView';
import Range from './Range';
import {
  Image,
  SafeAreaView,
  ScrollViewProps,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, {
  EventUserLocation,
  LatLng,
  Marker,
  MapEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

const ASPECT_RATIO = width / height;
const LOCATION: LatLng = { latitude: 37.4734372, longitude: 127.0405071 };
const DELTA = { latitudeDelta: 0.005, longitudeDelta: 0.005 * ASPECT_RATIO };

interface State {
  places: Place[];
  curPlace: number;
  trackUser: boolean;
  showSearch: boolean;
  userCoord: LatLng;
  mapCoord: LatLng;
  filter: { range: number; label?: LabelType };
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
    showSearch: false,
    userCoord: LOCATION,
    mapCoord: LOCATION,
    filter: {
      range: 0.5, // km
    },
  };

  search = async (params: SearchParams) => {
    const places = await searchPlace(params);
    const carousel = this.carousel.current;
    this.setState(state =>
      produce(state, draft => {
        draft.places = places;
        draft.curPlace = 0;
        if (state.showSearch) draft.showSearch = false;
        if (places.length > 0) {
          this.moveCameraToLocation(places[draft.curPlace].location);
          if (carousel) carousel.snapToItem(draft.curPlace);
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
    this.setState(state =>
      produce(state, draft => {
        if (state.trackUser) draft.trackUser = false;
        if (!state.showSearch) draft.showSearch = true;
      })
    );
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
    this.setState({ curPlace, showSearch: false });
    if (this.carousel.current) {
      this.carousel.current.snapToItem(curPlace);
    }
  };

  handleRangeChange = (range: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.filter.range = range;
        if (state.showSearch) draft.showSearch = false;
        this.search({ location: state.userCoord, ...draft.filter });
      })
    );
  };

  handleLabelChange = (label?: LabelType) => {
    this.setState(state =>
      produce(state, draft => {
        if (label) draft.filter.label = label;
        else delete draft.filter.label;
        if (state.showSearch) draft.showSearch = false;
        this.search({ location: state.userCoord, ...draft.filter });
      })
    );
  };

  handleMapLocationSerach = () => {
    const { mapCoord, filter } = this.state;
    this.search({ location: mapCoord, ...filter });
  };

  handleRegionChange = (region: Region) => {
    this.setState({ mapCoord: pick(region, ['latitude', 'longitude']) });
  };

  handleSnap = (index: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.curPlace = index;
        if (state.showSearch) draft.showSearch = false;
        this.moveCameraToLocation(state.places[draft.curPlace].location);
      })
    );
  };

  renderItem = ({ item }: Item) => (
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
            showBorder
          />
          <View style={views.filterWrapper}>
            <Range range={filter.range} handleChange={this.handleRangeChange} />
            <Label onChange={this.handleLabelChange} />
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
            onRegionChangeComplete={this.handleRegionChange}
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
          <View>
            {this.state.showSearch && (
              <TouchableOpacity
                style={views.reSearch}
                onPress={this.handleMapLocationSerach}>
                <Text style={texts.reSearch}>여기서 재탐색</Text>
              </TouchableOpacity>
            )}
          </View>
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
