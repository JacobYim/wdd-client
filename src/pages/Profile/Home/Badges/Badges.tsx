import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { ReducerState } from 'src/store/reducers';
import { font } from 'src/theme';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  wrapper: {
    flex: 1,
    marginTop: 16,
    alignItems: 'center',
  },
  icon: {
    width: 64,
    height: 53,
    resizeMode: 'contain',
  },
  label: {
    color: '#484848',
    fontSize: font.size.small,
  },
});

const Badges: React.FC<{ user: ReducerState['user'] }> = ({ user }) => (
  <FlatList
    data={[
      {
        label: '프로필 사진등록',
        name: 'first_profile',
        source: require('src/assets/badges/badge_first_profile.png'),
      },
      {
        label: '첫 킁킁 보내기',
        name: 'first_like',
        source: require('src/assets/badges/badge_first_like.png'),
      },
      {
        label: '첫 산책 오줌',
        name: 'first_pee',
        source: require('src/assets/badges/badge_first_pee.png'),
      },
      {
        label: '첫 산책 똥',
        name: 'first_poo',
        source: require('src/assets/badges/badge_first_poo.png'),
      },
      {
        label: '1km',
        name: '1km',
        source: require('src/assets/badges/badge_1km.png'),
      },
      {
        label: '3km',
        name: '3km',
        source: require('src/assets/badges/badge_3km.png'),
      },
      {
        label: '5km',
        name: '5km',
        source: require('src/assets/badges/badge_5km.png'),
      },
      {
        label: '10km',
        name: '10km',
        source: require('src/assets/badges/badge_10km.png'),
      },
    ]}
    numColumns={4}
    keyExtractor={(i, index) => index.toString()}
    contentContainerStyle={styles.container}
    renderItem={({ item }) => (
      <View style={styles.wrapper}>
        <Image source={item.source} style={[styles.icon, { opacity: 0.3 }]} />
        <Text style={styles.label}>{item.label}</Text>
      </View>
    )}
  />
);

export default Badges;
