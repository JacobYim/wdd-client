import React, { PureComponent } from 'react';
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

const modes: ModeInterface[] = [
  { name: 'shop', label: '주변' },
  { name: 'map', label: '지도' },
];

class ToggleMode extends PureComponent<Props> {
  private space = new Animated.Value(1);

  mapEventToProps = (name: MapMode, index: number) => {
    const { handlePress, mode } = this.props;
    if (mode !== name) {
      handlePress(name);
      Animated.timing(this.space, {
        toValue: index,
        duration: 200,
        easing: Easing.ease,
      }).start();
    }
  };

  renderButtons = ({ name, label }: ModeInterface, index: number) => (
    <TouchableOpacity
      style={views.button}
      onPress={() => this.mapEventToProps(name, index)}
      key={name}
      activeOpacity={0.7}>
      <Text
        style={[
          texts.label,
          texts[name === this.props.mode ? 'labelFocus' : 'labelBlur'],
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const left = this.space.interpolate({
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
