import React, { PureComponent as Component } from 'react';
import {
  View,
  Text,
  TextInput as Input,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

import { HandleChangeText } from './index';
import { inputs, views, texts } from './TextInput.styles';

interface Props {
  label: string;
  name: string;
  value?: string;
  alert?: string;
  handleChange: (data: HandleChangeText) => void;
}

interface State {
  isFocus: boolean;
}

class TextInput extends Component<Props, State> {
  state: State = { isFocus: false };

  handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocus: true });
  };

  handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocus: false });
  };

  handleChangeWithName = (value: string) => {
    const { handleChange, name } = this.props;
    handleChange({ name, value });
  };

  render() {
    const { label, value, alert } = this.props;
    return (
      <View style={views.container}>
        <Text style={texts.label}>{label}</Text>
        <Input
          value={value}
          multiline={false}
          onChangeText={this.handleChangeWithName}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoCapitalize="none"
          style={[
            inputs.text,
            inputs[this.state.isFocus ? 'focused' : 'unFocused'],
          ]}
        />
        {alert && <Text style={texts.alert}>{alert}</Text>}
      </View>
    );
  }
}

export default TextInput;
