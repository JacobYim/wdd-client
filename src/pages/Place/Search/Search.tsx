import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import { HandleChangeText } from 'src/components/module/TextInput';

interface Props extends NavigationScreenProps {
  preLoad?: string[];
}

const Search: React.FC<Props> = ({ navigation, preLoad = [] }) => {
  function handleSubmit(data: HandleChangeText) {
    navigation.navigate('result', { keyword: data.value });
  }

  function handleDismiss() {
    navigation.goBack(null);
  }

  return (
    <TextAutocomplete
      placeholder="원하는 장소를 검색하세요"
      name="search"
      list={preLoad}
      handleSubmit={handleSubmit}
      handleDismiss={handleDismiss}
    />
  );
};

export default Search;
