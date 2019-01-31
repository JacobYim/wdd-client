import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { HandleChangeSelector } from './index';
import { views } from './Selector.styles';
import ModuleContainer from 'src/components/module/ModuleContainer';
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
      <ModuleContainer label={label}>
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
      </ModuleContainer>
    );
  }
}

export default Selector;
