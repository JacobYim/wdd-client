import React from 'react';
import { Image, Text, View } from 'react-native';
import { color, font } from 'src/theme';

interface Props {
  source: NodeRequire;
  message: string;
  style?: object;
}

const EmptyList: React.FC<Props> = ({ source, message, style }) => (
  <View
    style={[
      { flex: 1, justifyContent: 'center', alignItems: 'center' },
      style,
    ]}>
    <Image source={source} style={{ width: 147 }} />
    <Text
      style={{
        color: color.grayB1,
        fontSize: font.size.medium,
        textAlign: 'center',
        marginTop: 18,
        lineHeight: 18,
      }}>
      {message}
    </Text>
  </View>
);

export default EmptyList;
