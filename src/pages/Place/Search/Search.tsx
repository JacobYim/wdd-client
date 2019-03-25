import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import { HandleChangeText } from 'src/components/module/TextInput';
import { Place, searchPlace } from 'src/services/api/place';

interface State {
  places: Place[];
  names: string[];
}

class Search extends PureComponent<NavigationScreenProps, State> {
  state: State = {
    places: [],
    names: [],
  };

  handleChange = async (data: HandleChangeText) => {
    if (data.value.length > 1) {
      const places = await searchPlace({ keyword: data.value });
      const names = places.map(place => place.name);
      this.setState({ names, places });
    } else {
      this.setState({ names: [], places: [] });
    }
  };

  handleSubmit = (data: HandleChangeText) => {
    const { navigation } = this.props;
    navigation.navigate('detail', { place: this.state.places[0] });
  };

  handleDismiss = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  render() {
    const { names } = this.state;
    return (
      <TextAutocomplete
        placeholder="원하는 장소를 검색하세요"
        name="search"
        list={names}
        icon={require('src/assets/icons/ic_pin_gray.png')}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDismiss={this.handleDismiss}
      />
    );
  }
}

export default Search;
