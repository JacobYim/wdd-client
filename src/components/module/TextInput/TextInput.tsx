import React, { PureComponent as Component } from 'react';
import {
  View,
  Text,
  TextInput as Input,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

import { HandleChangeText } from './index';
import { inputs, texts } from './TextInput.styles';
import ModuleContainer from 'src/components/module/ModuleContainer';

interface Props {
  label: string;
  name: string;
  value?: string;
  alert?: string;
  handleChange: (data: HandleChangeText) => void;
  [x: string]: any;
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
    const { label, value, alert, ...options } = this.props;
    return (
      <ModuleContainer label={label}>
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
          {...options}
        />
        {alert && <Text style={texts.alert}>{alert}</Text>}
      </ModuleContainer>
    );
  }
}

export default TextInput;
