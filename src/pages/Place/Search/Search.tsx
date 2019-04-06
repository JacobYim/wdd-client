import { pick } from 'lodash';
import React, { PureComponent } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { NavigationScreenProps } from 'react-navigation';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import { searchPlace } from 'src/services/api/place';
import { Place } from 'src/store/actions/place';

interface State {
  places: Place[];
}

class Search extends PureComponent<NavigationScreenProps, State> {
  state: State = { places: [] };

  handleChange = (keyword: string) => {
    const { places } = this.state;
    if (places.length === 0 && keyword.length > 1) {
      Geolocation.getCurrentPosition(async ({ coords }) => {
        const location = pick(coords, ['latitude', 'longitude']);
        const places = await searchPlace({ location, keyword, range: 100 });
        this.setState({ places });
      });
    }
  };

  handleSubmit = (place: Place) => {
    const { navigation } = this.props;
    navigation.navigate('detail', { place });
  };

  render() {
    const { places } = this.state;

    return (
      <TextAutocomplete
        placeholder="원하는 장소를 검색하세요"
        list={places}
        icon={require('src/assets/icons/ic_pin_gray.png')}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDismiss={() => this.props.navigation.goBack(null)}
      />
    );
  }
}

export default Search;
