import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from 'src/theme';

interface Props {
  item: {
    label: string;
    name?: string;
    value?: boolean;
    handlePress?: () => void;
  };
  index: number;
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderColor: color.grayEF,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: color.black,
    fontSize: 16,
  },
  arrow: {
    width: 5,
    height: 10,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

const RowItem: React.FC<Props> = ({ item, index }) => (
  <View style={[styles.wrapper, index === 0 ? { borderTopWidth: 0 } : null]}>
    <Text style={styles.label}>{item.label}</Text>
    {item.handlePress && (
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={item.handlePress}
        activeOpacity={0.7}>
        <Image
          style={styles.arrow}
          source={require('src/assets/icons/ic_arrow.png')}
        />
      </TouchableOpacity>
    )}
  </View>
);

export default RowItem;
