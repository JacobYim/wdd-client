import React, { PureComponent } from 'react';
import LabelWrapper from 'src/components/container/LabelWrapper';
import { HandleChangeText } from './index';
import { inputs as inputStyle, texts, views } from './TextInput.styles';
import {
  PageContext,
  ContextInterface,
} from 'src/components/container/PageContainer';
import {
  Text,
  TextInput as Input,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
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
  unit?: string;
  handleChange: (data: HandleChangeText) => void;
  returnKeyType?: 'next' | 'done' | 'send' | 'search';
  [x: string]: any;
}

interface State {
  isFocus: boolean;
  index: number;
}

const COMPONENT_HEIGHT = 85;

class TextInput extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    let index = -1;
    if (props.inputs) {
      Object.keys(props.inputs).forEach((key, idx) => {
        if (key === props.name) index = idx;
      });
    }

    this.state = { index, isFocus: false };
  }

  handleFocus = (
    e: NativeSyntheticEvent<TextInputFocusEventData>,
    context: ContextInterface | null
  ) => {
    const { handleFocus } = this.props;
    this.setState({ isFocus: true });
    if (context && this.state.index > -1) {
      context.scrollTo(this.state.index * COMPONENT_HEIGHT);
    }
    if (handleFocus) handleFocus(e);
  };

  handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocus: false });
  };

  handleChangeWithName = (value: string) => {
    const { handleChange, name } = this.props;
    handleChange({ name, value });
  };

  handleFocusNext = () => {
    const { inputs } = this.props;
    if (inputs) {
      const { current } = inputs[Object.keys(inputs)[this.state.index + 1]];
      if (current) current.focus();
    }
  };

  render() {
    const {
      name,
      label,
      value,
      alert,
      unit,
      inputs,
      returnKeyType,
      ...options
    } = this.props;

    return (
      <LabelWrapper label={label}>
        <PageContext.Consumer>
          {context => (
            <View
              style={[
                views.inputWrapper,
                this.state.isFocus ? views.focused : views.unFocused,
              ]}>
              <Input
                value={value}
                multiline={false}
                onChangeText={this.handleChangeWithName}
                onFocus={e => this.handleFocus(e, context)}
                onBlur={this.handleBlur}
                returnKeyType={returnKeyType || 'default'}
                autoCapitalize="none"
                autoCorrect={false}
                style={inputStyle.text}
                {...options}
                {...inputs && { ref: inputs[name] }}
                {...(returnKeyType === 'next'
                  ? {
                      onSubmitEditing: this.handleFocusNext,
                      blurOnSubmit: false,
                    }
                  : {})}
              />
              {unit && (
                <View style={views.unitWrapper}>
                  <Text style={texts.unit}>{value ? unit : ''}</Text>
                </View>
              )}
            </View>
          )}
        </PageContext.Consumer>
        {alert && <Text style={texts.alert}>{alert}</Text>}
      </LabelWrapper>
    );
  }
}

export default TextInput;
