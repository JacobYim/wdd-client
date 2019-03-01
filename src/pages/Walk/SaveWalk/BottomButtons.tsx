import React from 'react';
import { color, font } from 'src/theme';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

interface Props {
  handlePressDownload: () => void;
  handlePressFeed: () => void;
}

const { width } = Dimensions.get('window');
const leftBtnSize = 40;
const rightBtnHeight = 48;

const styles = StyleSheet.create({
  btnWrapper: {
    alignItems: 'center',
  },
  leftBtn: {
    width: leftBtnSize,
    height: leftBtnSize,
    borderRadius: leftBtnSize / 2,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: `${color.black}14`,
    elevation: 2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    shadowColor: color.black,
    shadowOpacity: 0.1,
  },
  icon: {
    width: '47.5%',
    height: '47.5%',
    resizeMode: 'contain',
  },
  leftText: {
    color: color.black33,
    fontSize: font.size.small,
  },
  rightBtn: {
    width: width * 0.42,
    height: rightBtnHeight,
    marginLeft: 'auto',
    borderRadius: rightBtnHeight / 2,
    backgroundColor: color.blue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowColor: color.black,
    shadowOpacity: 0.15,
  },
  rightText: {
    color: color.white,
    fontSize: font.size.large,
    fontWeight: '600',
  },
});

const BottomButtons: React.FC<Props> = ({
  handlePressDownload,
  handlePressFeed,
}) => (
  <>
    <TouchableOpacity
      style={styles.btnWrapper}
      activeOpacity={0.7}
      onPress={handlePressDownload}>
      <View style={styles.leftBtn}>
        <Image
          style={styles.icon}
          source={require('src/assets/icons/ic_download.png')}
        />
      </View>
      <Text style={styles.leftText}>이미지 저장</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.rightBtn}
      activeOpacity={0.7}
      onPress={handlePressFeed}>
      <Text style={styles.rightText}>내 피드에 올리기</Text>
    </TouchableOpacity>
  </>
);

export default BottomButtons;
