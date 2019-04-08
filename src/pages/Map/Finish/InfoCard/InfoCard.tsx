import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { color, font } from 'src/theme';

interface Props {
  icon: NodeRequire;
  value: string;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  text: {
    marginLeft: 6,
    color: color.gray84,
    fontSize: font.size.medium,
  },
});

const InfoCard: React.FC<Props> = ({ icon, value }) => (
  <View style={styles.wrapper}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.text}>{value}</Text>
  </View>
);

export default InfoCard;
