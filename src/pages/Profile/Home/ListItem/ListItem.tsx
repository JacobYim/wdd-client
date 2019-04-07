import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color, font, size } from 'src/theme';

interface Props {
  onPress?: () => void;
  thumbnail?: string;
  index: number;
  name: string;
  message: string;
}

const thumbnailSize = 56;
const verticalSize = 8;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
  },
  textWrapper: {
    flex: 1,
    height: thumbnailSize + verticalSize * 2,
    marginLeft: 12,
    borderTopWidth: 1,
    borderColor: color.grayEF,
    justifyContent: 'center',
  },
  name: {
    color: color.black,
    fontSize: font.size.medium,
  },
  message: {
    marginTop: 3,
    color: '#999999',
    fontSize: 13,
  },
});

const ListItem: React.FC<Props> = ({
  onPress,
  thumbnail,
  index,
  name,
  message,
}) => (
  <TouchableOpacity
    style={styles.wrapper}
    onPress={onPress}
    activeOpacity={0.7}>
    <Image
      source={
        thumbnail
          ? { uri: thumbnail }
          : require('src/assets/icons/ic_place_default.png')
      }
      style={styles.thumbnail}
    />
    <View
      style={[styles.textWrapper, index === 0 ? { borderTopWidth: 0 } : null]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  </TouchableOpacity>
);

export default ListItem;
