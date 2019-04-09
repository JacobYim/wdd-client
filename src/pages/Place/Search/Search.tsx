import { pick } from 'lodash';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { NavigationScreenProps } from 'react-navigation';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import { searchPlace } from 'src/services/api/place';
import { Place } from 'src/store/actions/place';
import {
  LOCATION_PERMISSIONS,
  checkPermission,
} from 'src/assets/functions/validate';

interface State {
  location: { latitude: number; longitude: number };
}

class Search extends Component<NavigationScreenProps, State> {
  state: State = { location: { latitude: 0, longitude: 0 } };

  async componentDidMount() {
    if (await checkPermission(LOCATION_PERMISSIONS)) {
      Geolocation.getCurrentPosition(
        async ({ coords }) => {
          this.setState({ location: pick(coords, ['latitude', 'longitude']) });
        },
        err => {
          if (err.PERMISSION_DENIED) {
            Alert.alert('위치정보 요청이 거부되었습니다.');
          }
        }
      );
    }
  }

  handleSearch = async (keyword: string) => {
    const { location } = this.state;
    const places = await searchPlace({ location, keyword });
    return places;
  };

  handleSubmit = (place: Place) => {
    const { navigation } = this.props;
    navigation.navigate('detail', { place });
  };

  render() {
    return (
      <TextAutocomplete
        placeholder="원하는 장소를 검색하세요"
        icon={require('src/assets/icons/ic_pin_gray.png')}
        onSubmit={this.handleSubmit}
        onSearch={this.handleSearch}
        onDismiss={() => this.props.navigation.goBack(null)}
      />
    );
  }
}

export default Search;
