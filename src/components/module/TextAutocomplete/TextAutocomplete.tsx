import * as Hangul from 'hangul-js';
import { sortBy } from 'lodash';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import TopNavbar from 'src/components/module/TopNavbar';
import { color } from 'src/theme';
import { icons, texts, views } from './TextAutocomplete.styles';
import TextBox from './TextBox';

export type Data = { name: string } & any;

interface Props {
  placeholder: string;
  list: Data[];
  icon: NodeRequire;
  defaultList?: Data[];
  handleSubmit: (data: Data) => void;
  handleDismiss: () => void;
  handleChange?: (keyword: string) => void;
}

interface State {
  keyword: string;
  autocomplete: Data[];
}

class TextAutocomplete extends Component<Props, State> {
  state: State = { keyword: '', autocomplete: [] };

  getAutocomplete = (value: string) => {
    if (value.length < 2) return [];
    // 한글을 분석해서 자동완성을 함
    const dValue = Hangul.disassembleToString(value.replace(/\s/g, ''));
    const regex = new RegExp(dValue);
    const dList = this.props.list.map((data: Data) => ({
      ...data,
      match: regex.exec(
        Hangul.disassembleToString(data.name.replace(/\s/g, ''))
      ),
    }));
    const filter = dList.filter(data => data.match !== null);
    return sortBy(filter, data => 1 - Math.pow(1.4, -data.match[0].length));
  };

  handleTextChange = (keyword: string) => {
    const { handleChange } = this.props;
    const autocomplete = this.getAutocomplete(keyword);
    this.setState({ keyword, autocomplete });
    if (handleChange) handleChange(keyword.trim());
  };

  render() {
    const {
      placeholder,
      handleDismiss,
      handleSubmit,
      icon,
      defaultList = [],
    } = this.props;
    const list =
      this.state.autocomplete.length > 0
        ? this.state.autocomplete
        : defaultList;

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
            handlePress: handleDismiss,
          }}
        />
        <View style={views.inputWrapper}>
          <TextInput
            value={this.state.keyword}
            placeholder={placeholder}
            onChangeText={this.handleTextChange}
            style={texts.input}
            placeholderTextColor={`${color.black}1A`}
            multiline={false}
            autoCorrect={false}
            autoFocus={true}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </View>
        <ScrollView style={views.autocompleteWrapper}>
          {list.map((data, index) => (
            <TextBox
              data={data}
              icon={icon}
              keyword={this.state.keyword}
              handlePress={handleSubmit}
              key={index}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default TextAutocomplete;
