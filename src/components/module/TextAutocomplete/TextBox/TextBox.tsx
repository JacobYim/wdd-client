import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { icons, texts, views } from './TextBox.styles';

interface Props {
  value: string;
  keyword: string;
  icon: NodeRequire;
  handlePress: (value: string) => {};
}

const TextBox: React.FC<Props> = ({ value, keyword, icon, handlePress }) => {
  const mapValueToPress = () => {
    handlePress(value);
  };

  const highlightKeyword = () => {
    const regexFull = new RegExp(keyword, 'g');
    const regexPart = new RegExp(keyword.slice(0, -1), 'g');
    const match = regexFull.exec(value) || regexPart.exec(value);

    if (match) {
      const start = match.index;
      const end = start + match[0].length;
      return (
        <Text style={texts.value}>
          {value.slice(0, start)}
          <Text style={texts.highlight}>{value.slice(start, end)}</Text>
          {value.slice(end)}
        </Text>
      );
    }
    return <Text style={texts.value}>{value}</Text>;
  };

  return (
    <TouchableOpacity
      onPress={mapValueToPress}
      style={views.textButton}
      activeOpacity={0.7}>
      <Image source={icon} style={icons.badge} />
      {highlightKeyword()}
    </TouchableOpacity>
  );
};

export default TextBox;
