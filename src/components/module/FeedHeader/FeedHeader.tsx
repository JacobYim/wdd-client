import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DefaultImage from 'src/components/module/DefaultImage';
import { UserInterface } from 'src/store/actions/user';
import { color, font, size } from 'src/theme';

interface Props {
  user: UserInterface;
  updatedAt: Date;
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: size.horizontal,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
          <DefaultImage size={32} uri={user.repDog.thumbnail} />
          <Text style={styles.name}>{user.repDog.name}</Text>
        </>
      )}
      <Text style={styles.time}>{moment(updatedAt).fromNow()}</Text>
    </View>
  );
};

export default FeedHeader;
