import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { HandleChangeSelector } from './index';
import { views, texts } from './Selector.styles';
import ToggleBox from './ToggleBox';

interface Data {
  label: string;
  name: string;
}

interface Props {
  label: string;
  name: string;
  list: Data[];
  value?: string;
  handleChange: (data: HandleChangeSelector) => void;
}

interface State {
  selected: string;
}

class Selector extends Component<Props, State> {
  state: State = { selected: this.props.value || '' };

  handleSelect = (value: string) => {
    const { handleChange, name } = this.props;
    this.setState({ selected: value });
    handleChange({ name, value });
  };

  render() {
    const { label, list } = this.props;
    return (
      <View style={views.container}>
        <Text style={texts.label}>{label}</Text>
        <View style={views.boxWrapper}>
          {list.map(data => (
            <ToggleBox
              key={data.name}
              label={data.label}
              name={data.name}
              active={data.name === this.state.selected}
              handlePress={this.handleSelect}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default Selector;
