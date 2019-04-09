import React from 'react';
import { ReducerState } from 'src/store/reducers';
import { font } from 'src/theme';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const badgeSize = 78;
const space = (width - badgeSize * 4) / 5;

const styles = StyleSheet.create({
  container: {
    marginTop: space,
    paddingHorizontal: space / 2,
  },
  wrapper: {
    width: badgeSize,
    marginHorizontal: space / 2,
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

const Badges: React.FC<{ user: ReducerState['user'] }> = ({ user }) => {
  const feedLength = user.repDog ? user.repDog.feeds.length : 0;
  const scrapLength = user.places.length;

  return (
    <FlatList
      data={[
        {
          label: '프로필 사진등록',
          name: 'first_profile',
          iconOn: require('src/assets/badges/badge_first_profile_on.png'),
          iconOff: require('src/assets/badges/badge_first_profile_off.png'),
          achieve: user.repDog !== undefined,
        },
        {
          label: '첫 킁킁 보내기',
          name: 'first_like',
          iconOn: require('src/assets/badges/badge_first_like_on.png'),
          iconOff: require('src/assets/badges/badge_first_like_off.png'),
          achieve: false,
        },
        {
          label: '첫 산책 오줌',
          name: 'first_pee',
          iconOn: require('src/assets/badges/badge_first_pee_on.png'),
          iconOff: require('src/assets/badges/badge_first_pee_off.png'),
          achieve: false,
        },
        {
          label: '첫 산책 똥',
          name: 'first_poo',
          iconOn: require('src/assets/badges/badge_first_poo_on.png'),
          iconOff: require('src/assets/badges/badge_first_poo_off.png'),
          achieve: false,
        },
        {
          label: '1km',
          name: '1km',
          iconOn: require('src/assets/badges/badge_1km_on.png'),
          iconOff: require('src/assets/badges/badge_1km_off.png'),
          achieve: false,
        },
        {
          label: '3km',
          name: '3km',
          iconOn: require('src/assets/badges/badge_3km_on.png'),
          iconOff: require('src/assets/badges/badge_3km_off.png'),
          achieve: false,
        },
        {
          label: '5km',
          name: '5km',
          iconOn: require('src/assets/badges/badge_5km_on.png'),
          iconOff: require('src/assets/badges/badge_5km_off.png'),
          achieve: false,
        },
        {
          label: '10km',
          name: '10km',
          iconOn: require('src/assets/badges/badge_10km_on.png'),
          iconOff: require('src/assets/badges/badge_10km_off.png'),
          achieve: false,
        },
        {
          label: '산책 1회',
          name: 'walk_1',
          iconOn: require('src/assets/badges/badge_walk_1_on.png'),
          iconOff: require('src/assets/badges/badge_walk_1_off.png'),
          achieve: feedLength > 0,
        },
        {
          label: '산책 3회',
          name: 'walk_3',
          iconOn: require('src/assets/badges/badge_walk_3_on.png'),
          iconOff: require('src/assets/badges/badge_walk_3_off.png'),
          achieve: feedLength > 2,
        },
        {
          label: '산책 5회',
          name: 'walk_5',
          iconOn: require('src/assets/badges/badge_walk_5_on.png'),
          iconOff: require('src/assets/badges/badge_walk_5_off.png'),
          achieve: feedLength > 4,
        },
        {
          label: '산책 10회',
          name: 'walk_10',
          iconOn: require('src/assets/badges/badge_walk_10_on.png'),
          iconOff: require('src/assets/badges/badge_walk_10_off.png'),
          achieve: feedLength > 9,
        },
        {
          label: '스크랩 1회',
          name: 'scrap_1',
          iconOn: require('src/assets/badges/badge_scrap_1_on.png'),
          iconOff: require('src/assets/badges/badge_scrap_1_off.png'),
          achieve: scrapLength > 0,
        },
        {
          label: '스크랩 3회',
          name: 'scrap_3',
          iconOn: require('src/assets/badges/badge_scrap_3_on.png'),
          iconOff: require('src/assets/badges/badge_scrap_3_off.png'),
          achieve: scrapLength > 2,
        },
        {
          label: '스크랩 5회',
          name: 'scrap_5',
          iconOn: require('src/assets/badges/badge_scrap_5_on.png'),
          iconOff: require('src/assets/badges/badge_scrap_5_off.png'),
          achieve: scrapLength > 4,
        },
        {
          label: '스크랩 10회',
          name: 'scrap_10',
          iconOn: require('src/assets/badges/badge_scrap_10_on.png'),
          iconOff: require('src/assets/badges/badge_scrap_10_off.png'),
          achieve: scrapLength > 9,
        },
      ]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={4}
      keyExtractor={(i, index) => index.toString()}
      columnWrapperStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.wrapper}>
          <Image
            source={item.achieve ? item.iconOn : item.iconOff}
            style={styles.icon}
          />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      )}
    />
  );
};

export default Badges;
