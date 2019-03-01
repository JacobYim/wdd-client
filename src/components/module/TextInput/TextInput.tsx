import React, { PureComponent } from 'react';
import LabelWrapper from 'src/components/container/LabelWrapper';
import { HandleChangeText } from './index';
import { inputs as inputStyle, texts } from './TextInput.styles';
import {
  View,
  Text,
  TextInput as Input,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

interface InputsInterface {
  [key: string]: React.RefObject<Input>;
}

interface Props {
  label: string;
  name: string;
  value?: string;
  alert?: string;
  inputs?: InputsInterface;
  handleChange: (data: HandleChangeText) => void;
  returnKeyType?: 'next' | 'done' | 'send' | 'search';
  [x: string]: any;
}

interface State {
  isFocus: boolean;
}

class TextInput extends PureComponent<Props, State> {
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

  handleFocusNext = () => {
    const { inputs, name } = this.props;
    if (inputs) {
      const keyArray = Object.keys(inputs);
      keyArray.map((key, index) => {
        if (key === name) {
          // select next input
          const { current } = inputs[keyArray[index + 1]];
          if (current) current.focus();
        }
      });
    }
  };

  render() {
    const {
      name,
      label,
      value,
      alert,
      inputs,
      returnKeyType,
      ...options
    } = this.props;

    return (
      <LabelWrapper label={label}>
        <Input
          value={value}
          multiline={false}
          onChangeText={this.handleChangeWithName}
          onFocus={options.handleFocus || this.handleFocus}
          onBlur={this.handleBlur}
          returnKeyType={returnKeyType || 'default'}
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            inputStyle.text,
            inputStyle[this.state.isFocus ? 'focused' : 'unFocused'],
          ]}
          {...options}
          {...inputs && { ref: inputs[name] }}
          {...(returnKeyType === 'next'
            ? {
                onSubmitEditing: this.handleFocusNext,
                blurOnSubmit: false,
              }
            : {})}
        />
        {alert && <Text style={texts.alert}>{alert}</Text>}
      </LabelWrapper>
    );
  }
}

export default TextInput;
