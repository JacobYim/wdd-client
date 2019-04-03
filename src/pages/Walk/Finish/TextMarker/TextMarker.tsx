import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color, font } from 'src/theme';

interface Props {
  text: string;
  blackMode?: boolean;
}

const pointSize = 6;
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: pointSize / 2,
    alignItems: 'center',
  },
  box: {
    borderColor: '#00000030',
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
  },
  text: {
    fontSize: font.size.medium,
  },
  verticalBar: {
    width: 0,
    height: 14.6,
    borderWidth: 1,
    borderColor: color.black33,
  },
  point: {
    width: pointSize,
    height: pointSize,
    borderRadius: pointSize / 2,
    backgroundColor: color.black33,
  },
});

const TextMarker: React.FC<Props> = ({ text, blackMode }) => (
  <View style={styles.wrapper}>
    <View
      style={[
        styles.box,
        { backgroundColor: blackMode ? color.black33 : color.white },
      ]}>
      <Text
        style={[
          styles.text,
          { color: blackMode ? color.white : color.gray66 },
        ]}>
        {text}
      </Text>
    </View>
    <View style={styles.verticalBar} />
    <View style={styles.point} />
  </View>
);

export default TextMarker;
