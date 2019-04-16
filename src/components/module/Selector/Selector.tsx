import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import LabelWrapper from 'src/components/container/LabelWrapper';
import { HandleChangeSelector } from './index';
import { texts, views } from './Selector.styles';
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
  alert?: string;
  handleChange: (data: HandleChangeSelector) => void;
}

interface State {
  selected: string;
}

class Selector extends PureComponent<Props, State> {
  state: State = { selected: this.props.value || '' };

  handleSelect = (value: string) => {
    const { handleChange, name } = this.props;
    this.setState({ selected: value });
    handleChange({ name, value });
  };

  render() {
    const { label, list, alert } = this.props;
    return (
      <LabelWrapper label={label}>
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
        {alert && <Text style={texts.alert}>{alert}</Text>}
      </LabelWrapper>
    );
  }
}

export default Selector;
