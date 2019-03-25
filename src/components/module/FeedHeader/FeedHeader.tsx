import { find } from 'lodash';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { UserInterface } from 'src/store/actions/user';
import { color, font } from 'src/theme';

interface Props {
  user: UserInterface;
  updatedAt: Date;
}

const thumbnailSize = 32;
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: horizontalSize,
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
  const dog = find(user.dogs, dog => dog.default);
  return (
    <View style={styles.wrapper}>
      {dog && (
        <>
          <Image
            source={
              dog.thumbnail
                ? { uri: dog.thumbnail }
                : require('src/assets/icons/ic_wdd.png')
            }
            style={styles.thumbnail}
          />
          <Text style={styles.name}>{dog.name}</Text>
        </>
      )}
      <Text style={styles.time}>{moment(updatedAt).fromNow()}</Text>
    </View>
  );
};

export default FeedHeader;
