import React, { PureComponent } from 'react';
import produce from 'immer';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { views, texts, width } from './ToggleMode.styles';

export type MapMode = 'shop' | 'map';

interface ModeInterface {
  name: MapMode;
  label: string;
}

interface Props {
  mode: MapMode;
  handlePress: (mode: MapMode) => void;
}

interface State {
  space: Animated.Value;
  text: boolean[];
}

const modes: ModeInterface[] = [
  { name: 'shop', label: '주변' },
  { name: 'map', label: '내위치' },
];

class ToggleMode extends PureComponent<Props, State> {
  private duration = 200;

  state: State = {
    space: new Animated.Value(1),
    text: [false, true],
  };

  mapEventToProps = (name: MapMode, index: number) => {
    const { handlePress, mode } = this.props;
    if (mode !== name) {
      handlePress(name);
      Animated.timing(this.state.space, {
        toValue: index,
        duration: this.duration,
        easing: Easing.ease,
      }).start();
      setTimeout(() => {
        this.setState(state =>
          produce(state, draft => {
            draft.text = draft.text.map(item => !item);
          })
        );
      }, this.duration * 0.6);
    }
  };

  renderButtons = ({ name, label }: ModeInterface, index: number) => {
    const textMode = this.state.text[index] ? 'labelFocus' : 'labelBlur';
    return (
      <TouchableOpacity
        style={views.button}
        onPress={() => this.mapEventToProps(name, index)}
        key={name}
        activeOpacity={0.7}>
        <Text style={[texts.label, texts[textMode]]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const left = this.state.space.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width.container - width.background],
    });

    return (
      <View style={views.container}>
        <Animated.View style={{ ...views.animateBackground, left }} />
        {modes.map(this.renderButtons)}
      </View>
    );
  }
}

export default ToggleMode;
