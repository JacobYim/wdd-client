import * as Hangul from 'hangul-js';
import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { HandleChangeText } from 'src/components/module/TextInput';
import TopNavbar from 'src/components/module/TopNavbar';
import { color } from 'src/theme';
import { icons, texts, views } from './TextAutocomplete.styles';
import TextBox from './TextBox';

interface Props {
  placeholder: string;
  name: string;
  list: string[];
  icon: NodeRequire;
  defaultList?: string[];
  handleChange?: (data: HandleChangeText) => void;
  handleSubmit: (data: HandleChangeText) => void;
  handleDismiss: () => void;
}

interface State {
  keyword: string;
  autocomplete: string[];
}

class TextAutocomplete extends Component<Props, State> {
  state: State = { keyword: '', autocomplete: [] };

  getAutocomplete = (value: string) => {
    if (value.length < 2) return [];
    // 한글을 분석해서 자동완성을 함
    const dValue = Hangul.disassembleToString(value.replace(/\s/g, ''));
    const regex = new RegExp(dValue);
    return this.props.list.filter(item => {
      const dItem = Hangul.disassembleToString(item.replace(/\s/g, ''));
      return regex.test(dItem);
    });
  };

  handleTextChange = (keyword: string) => {
    const { name, handleChange } = this.props;
    const autocomplete = this.getAutocomplete(keyword);
    this.setState({ keyword, autocomplete });
    if (handleChange) {
      handleChange({ name, value: keyword.trim() });
    }
  };

  handleTextPress = async (keyword: string) => {
    await this.setState({ keyword });
    this.handleSubmit();
  };

  handleSubmit = () => {
    const { name, handleSubmit } = this.props;
    handleSubmit({ name, value: this.state.keyword.trim() });
  };

  render() {
    const { placeholder, handleDismiss, icon, defaultList = [] } = this.props;
    const data =
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
            onSubmitEditing={this.handleSubmit}
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
          {data.map((item, index) => (
            <TextBox
              value={item}
              icon={icon}
              keyword={this.state.keyword}
              handlePress={this.handleTextPress}
              key={index}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default TextAutocomplete;
