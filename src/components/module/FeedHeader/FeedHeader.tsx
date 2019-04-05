import { find } from 'lodash';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { UserInterface } from 'src/store/actions/user';
import { color, font, size } from 'src/theme';

interface Props {
  user: UserInterface;
  updatedAt: Date;
}

const thumbnailSize = 32;
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: size.horizontal,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    borderWidth: 1,
    borderColor: color.grayEF,
    resizeMode: 'contain',
  },
  name: {
    marginLeft: 10,
    color: color.black,
    fontSize: 16,
  },
  time: {
    marginLeft: 4,
    color: `${color.black}4D`,
    fontSize: font.size.small,
  },
});

const FeedHeader: React.FC<Props> = ({ user, updatedAt }) => {
  return (
    <View style={styles.wrapper}>
      {user.repDog && (
        <>
          <Image
            source={
              user.repDog.thumbnail
                ? { uri: user.repDog.thumbnail }
                : require('src/assets/icons/ic_place_default.png')
            }
            style={styles.thumbnail}
          />
          <Text style={styles.name}>{user.repDog.name}</Text>
        </>
      )}
      <Text style={styles.time}>{moment(updatedAt).fromNow()}</Text>
    </View>
  );
};

export default FeedHeader;
