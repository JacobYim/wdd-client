import * as Hangul from 'hangul-js';
import { sortBy } from 'lodash';
import React, { Component } from 'react';
import TopNavbar from 'src/components/module/TopNavbar';
import { color } from 'src/theme';
import { icons, texts, views } from './TextAutocomplete.styles';
import TextBox from './TextBox';
import {
  FlatList,
  Image,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

export type Data = { name: string } & any;

interface Props {
  placeholder: string;
  icon: NodeRequire;
  staticList?: Data[];
  defaultList?: Data[];
  onSubmit: (data: Data) => void;
  onDismiss: () => void;
  onSearch?: (keyword: string) => Promise<Data[]>;
}

interface State {
  keyword: string;
  autocomplete: Data[];
}

const disassemble = (value: string) =>
  Hangul.disassembleToString(value.replace(/\s/g, ''));

class TextAutocomplete extends Component<Props, State> {
  private searchResult: Data[] | undefined;
  state: State = { keyword: '', autocomplete: this.props.defaultList || [] };

  getAutocomplete = (keyword: string, list: Data[]) => {
    // 한글을 분석해서 자동완성을 함
    const regex = new RegExp(disassemble(keyword));
    return list.map((data: Data) => ({
      ...data,
      match: regex.exec(disassemble(data.name)),
    }));
  };

  handleTextChange = async (keyword: string) => {
    const { staticList, defaultList, onSearch } = this.props;
    let autocomplete: Data[] = defaultList || [];
    if (disassemble(keyword).length > 4) {
      let result: Data[] = [];
      if (staticList !== undefined) {
        result = this.getAutocomplete(keyword, staticList);
      } else if (onSearch !== undefined) {
        if (this.searchResult === undefined) {
          this.searchResult = await onSearch(keyword);
        }
        result = this.getAutocomplete(keyword, this.searchResult);
      }
      const filter = result.filter(data => data.match !== null);
      autocomplete = sortBy(
        filter,
        data => 1 - Math.pow(1.4, -data.match[0].length)
      );
    } else if (this.searchResult !== undefined) {
      delete this.searchResult;
    }
    this.setState({ keyword, autocomplete });
  };

  handleInputSubmit = async () => {
    const { onSearch } = this.props;
    const { keyword } = this.state;
    if (onSearch) {
      this.searchResult = await onSearch(keyword);
      const autocomplete = this.getAutocomplete(keyword, this.searchResult);
      this.setState({ autocomplete });
    }
  };

  render() {
    const { placeholder, onDismiss, onSubmit, icon } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavbar
          right={{
            view: (
              <Image
                style={icons.close}
                source={require('src/assets/icons/ic_close.png')}
              />
            ),
            handlePress: onDismiss,
          }}
        />
        <View style={views.inputWrapper}>
          <TextInput
            style={texts.input}
            value={this.state.keyword}
            placeholder={placeholder}
            placeholderTextColor={`${color.black}1A`}
            multiline={false}
            autoCorrect={false}
            autoFocus={true}
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={this.handleTextChange}
            onSubmitEditing={this.handleInputSubmit}
          />
          {this.state.keyword.length > 0 && (
            <TouchableOpacity onPress={() => this.setState({ keyword: '' })}>
              <Image
                source={require('src/assets/icons/ic_close_filled.png')}
                style={icons.clear}
              />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          contentContainerStyle={views.autocompleteWrapper}
          data={this.state.autocomplete}
          keyExtractor={(d, index) => index.toString()}
          renderItem={data => (
            <TextBox
              data={data.item}
              icon={icon}
              keyword={this.state.keyword}
              handlePress={onSubmit}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

export default TextAutocomplete;
