import React, { Component } from 'react';
import { Modal, View, TextInput } from 'react-native';

import { color } from 'src/theme';
import { inputs } from './Search.styles';
import PageContainer from 'src/components/module/PageContainer';

interface Props {
  visible: boolean;
  toggleSearch: () => void;
  handleSubmit: (value: string) => void;
  placeholder?: string;
}

interface State {
  value: string;
}

class Search extends Component<Props, State> {
  state: State = {
    value: '',
  };

  handleSubmit = () => {
    const { handleSubmit, toggleSearch } = this.props;
    handleSubmit(this.state.value);
    toggleSearch();
  };

  handleChange = (value: string) => {
    this.setState({ value });
  };

  render() {
    const { visible, placeholder, toggleSearch } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={toggleSearch}>
        <PageContainer right={{ text: '취소', handlePress: toggleSearch }}>
          <TextInput
            style={inputs.text}
            value={this.state.value}
            placeholder={placeholder || '검색할 내용을 입력해주세요.'}
            placeholderTextColor={color.grayB1}
            onChangeText={this.handleChange}
            onSubmitEditing={this.handleSubmit}
            multiline={false}
            autoCorrect={false}
            autoFocus={true}
            autoCapitalize="none"
            returnKeyType="done"
          />
        </PageContainer>
      </Modal>
    );
  }
}

export default Search;
