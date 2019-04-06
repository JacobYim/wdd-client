import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from 'src/theme';

interface Props {
  onSwitch: (name: string) => void;
  currentTab: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: color.grayEF,
  },
  itemWrapper: {
    flex: 1,
    paddingVertical: 16,
  },
  border: {
    width: '100%',
    height: 20,
    borderLeftWidth: 1,
    borderColor: color.grayEF,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: color.gray48,
    fontSize: 16,
  },
  focus: {
    color: color.blue,
    fontWeight: '600',
  },
});

const Tabbar: React.FC<Props> = ({ onSwitch, currentTab }) => (
  <View style={styles.container}>
    {[
      { label: '게시물', name: 'myFeed' },
      { label: '내 상점', name: 'scrap' },
      { label: '뱃지', name: 'badge' },
      { label: '킁킁', name: 'likes' },
    ].map((item, index) => (
      <TouchableOpacity
        style={styles.itemWrapper}
        key={item.name}
        activeOpacity={0.8}
        onPress={() => onSwitch(item.name)}>
        <View style={[styles.border, index === 0 ? { borderWidth: 0 } : null]}>
          <Text
            style={[
              styles.text,
              currentTab === item.name ? styles.focus : null,
            ]}>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

export default Tabbar;
