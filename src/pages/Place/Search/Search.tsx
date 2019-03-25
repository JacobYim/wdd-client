import { pick } from 'lodash';
import React, { PureComponent } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { NavigationScreenProps } from 'react-navigation';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import { HandleChangeText } from 'src/components/module/TextInput';
import { Place, searchPlace } from 'src/services/api/place';

interface State {
  places: Place[];
}

class Search extends PureComponent<NavigationScreenProps, State> {
  state: State = {
    places: [],
  };

  handleChange = (data: HandleChangeText) => {
    if (data.value.length > 1) {
      if (this.state.places.length === 0) {
        Geolocation.getCurrentPosition(async ({ coords }) => {
          const location = pick(coords, ['latitude', 'longitude']);
          const places = await searchPlace({
            location,
            keyword: data.value,
            range: 20,
          });
          this.setState({ places });
        });
      }
    } else {
      this.setState({ places: [] });
    }
  };

  handleSubmit = (data: HandleChangeText) => {
    const { navigation } = this.props;
    navigation.navigate('detail', { place: this.state.places[0] });
  };

  render() {
    const { places } = this.state;
    const names = places.map(place => place.name);

    return (
      <TextAutocomplete
        placeholder="원하는 장소를 검색하세요"
        name="search"
        list={names}
        icon={require('src/assets/icons/ic_pin_gray.png')}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDismiss={() => this.props.navigation.goBack(null)}
      />
    );
  }
}

export default Search;
