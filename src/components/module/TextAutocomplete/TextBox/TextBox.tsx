import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { Data } from '../TextAutocomplete';
import { icons, texts, views } from './TextBox.styles';

interface Props {
  data: Data;
  keyword: string;
  icon: NodeRequire;
  handlePress: (data: Data) => void;
}

const rangeWithUnit = (range: number) =>
  range < 1 ? `${Math.round(range * 1000)}m` : `${range.toFixed(2)}km`;

const TextBox: React.FC<Props> = ({ data, keyword, icon, handlePress }) => {
  const { name } = data;

  const highlightKeyword = () => {
    const regexFull = new RegExp(keyword, 'g');
    const regexPart = new RegExp(keyword.slice(0, -1), 'g');
    const match = regexFull.exec(name) || regexPart.exec(name);

    if (match) {
      const start = match.index;
      const end = start + match[0].length;
      return (
        <Text style={texts.name}>
          {name.slice(0, start)}
          <Text style={texts.highlight}>{name.slice(start, end)}</Text>
          {name.slice(end)}
        </Text>
      );
    }
    return <Text style={texts.name}>{name}</Text>;
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress(data)}
      style={views.textButton}
      activeOpacity={0.7}>
      <Image source={icon} style={icons.badge} />
      {highlightKeyword()}
      {data.distance && (
        <Text style={texts.distance}>{rangeWithUnit(data.distance)}</Text>
      )}
    </TouchableOpacity>
  );
};

export default TextBox;
