import * as Hangul from 'hangul-js';
import React, { Component } from 'react';
import { Modal, ScrollView, TextInput } from 'react-native';
import PageContainer from 'src/components/container/PageContainer';
import Input, { HandleChangeText } from 'src/components/module/TextInput';
import { color } from 'src/theme';
import { texts, views } from './TextAutocomplete.styles';
import TextBox from './TextBox';

interface Props {
  label: string;
  name: string;
  data: string[];
  handleChange: (data: HandleChangeText) => void;
  trailData?: string[];
}

interface State {
  keyword: string;
  showModal: boolean;
  autocomplete: string[];
}

class Search extends Component<Props, State> {
  state: State = { keyword: '', showModal: false, autocomplete: [] };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  getAutocomplete = (value: string) => {
    if (value.length < 2) return [];
    // 한글을 분석해서 자동완성을 함
    const dValue = Hangul.disassembleToString(value.replace(/\s/g, ''));
    const regex = new RegExp(dValue);
    return this.props.data.filter(item => {
      const dItem = Hangul.disassembleToString(item.replace(/\s/g, ''));
      return regex.test(dItem);
    });
  };

  handleTextChange = (keyword: string) => {
    const autocomplete = this.getAutocomplete(keyword);
    this.setState({ keyword, autocomplete });
  };

  handleTextPress = async (keyword: string) => {
    await this.setState({ keyword });
    this.handleSubmit();
  };

  handleSubmit = () => {
    const { name, handleChange } = this.props;
    handleChange({ name, value: this.state.keyword.trim() });
    this.toggleModal();
  };

  render() {
    const { name, label, trailData = [] } = this.props;
    const autocomplete = this.state.autocomplete.concat(trailData);

    return (
      <>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}>
          <PageContainer
            right={{ view: '닫기', handlePress: this.toggleModal }}>
            <TextInput
              value={this.state.keyword}
              placeholder={`찾으시는 ${label}을 입력해주세요`}
              onChangeText={this.handleTextChange}
              onSubmitEditing={this.handleSubmit}
              style={texts.input}
              placeholderTextColor={color.black}
              multiline={false}
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              returnKeyType="done"
            />
            <ScrollView style={views.autocompleteWrapper}>
              {autocomplete.map(item => (
                <TextBox
                  value={item}
                  keyword={this.state.keyword}
                  handlePress={this.handleTextPress}
                  key={item}
                />
              ))}
            </ScrollView>
          </PageContainer>
        </Modal>
        <Input
          name={name}
          label={label}
          handleFocus={this.toggleModal}
          handleChange={() => null}
          value={this.state.keyword}
        />
      </>
    );
  }
}

export default Search;
