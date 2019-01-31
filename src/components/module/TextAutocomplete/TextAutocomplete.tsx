import React, { Component } from 'react';
import { Modal, View, TextInput } from 'react-native';
import * as Hangul from 'hangul-js';

import Input, { HandleChangeText } from 'src/components/module/TextInput';
import { color } from 'src/theme';
import { inputs } from './TextAutocomplete.styles';
import PageContainer from 'src/components/module/PageContainer';

interface Props {
  label: string;
  name: string;
  data: string[];
  handleChange: (data: HandleChangeText) => void;
}

interface State {
  value: string;
  showModal: boolean;
  autocomplete: string[];
}

class Search extends Component<Props, State> {
  state: State = { value: '', showModal: false, autocomplete: [] };

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

  handleSubmit = () => {
    const { name, handleChange } = this.props;
    handleChange({ name, value: this.state.value.trim() });
    this.toggleModal();
  };

  handleTextChange = (value: string) => {
    const autocomplete = this.getAutocomplete(value);
    this.setState({ value, autocomplete });
  };

  render() {
    const { name, label } = this.props;
    return (
      <>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}>
          <PageContainer
            right={{ text: '취소', handlePress: this.toggleModal }}>
            <TextInput
              value={this.state.value}
              placeholder={`${label}을 입력해주세요`}
              onChangeText={this.handleTextChange}
              onSubmitEditing={this.handleSubmit}
              style={inputs.text}
              placeholderTextColor={color.grayB1}
              multiline={false}
              autoCorrect={false}
              autoFocus={true}
              autoCapitalize="none"
              returnKeyType="done"
            />
          </PageContainer>
        </Modal>
        <Input
          name={name}
          label={label}
          handleFocus={this.toggleModal}
          handleChange={() => null}
          value={this.state.value}
        />
      </>
    );
  }
}

export default Search;
