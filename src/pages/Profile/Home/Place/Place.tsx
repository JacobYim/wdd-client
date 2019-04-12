import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultImage from 'src/components/module/DefaultImage';
import { color, font } from 'src/theme';

interface Props {
  onPress?: () => void;
  name: string;
  label: string;
  icon?: string;
  description?: string;
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
    borderRadius: 5,
    resizeMode: 'cover',
  },
  textWrapper: {
    flex: 1,
    height: thumbnailSize + verticalSize * 2,
    marginLeft: 12,
    justifyContent: 'center',
  },
  headWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: color.black,
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    color: '#999999',
    fontSize: font.size.small,
    marginLeft: 8,
  },
  description: {
    marginTop: 8,
    color: '#999999',
    fontSize: 13,
  },
});

const Place: React.FC<Props> = ({
  onPress,
  icon,
  name,
  label,
  description,
}) => (
  <TouchableOpacity
    style={styles.wrapper}
    onPress={onPress}
    activeOpacity={0.7}>
    <DefaultImage size={thumbnailSize} uri={icon} />
    {/* <Image
      source={
        icon
          ? { uri: icon }
          : require('src/assets/icons/ic_thumbnail_default.png')
      }
      style={styles.thumbnail}
    /> */}
    <View style={styles.textWrapper}>
      <View style={styles.headWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text numberOfLines={1} style={styles.description}>
        {description}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Place;
