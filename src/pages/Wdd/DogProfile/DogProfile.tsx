import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import DefaultImage from 'src/components/module/DefaultImage';
import * as dogActions from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views } from './DogProfile.styles';

interface Props {
  dog?: dogActions.Dog;
  user: ReducerState['user'];
  dismissModal: () => void;
  onPressLike: (id: string) => void;
}

// helper
function mapGender(gender: 'M' | 'F' | 'N' | '') {
  switch (gender) {
    case 'M':
      return '수컷';
    case 'F':
      return '암컷';
    case 'N':
      return '중성화';
    default:
      return '';
  }
}

const DogProfile: React.FC<Props> = ({
  dog,
  user,
  dismissModal,
  onPressLike,
}) => {
  const signedIn = user.email.length !== 0;

  return (
    <Modal
      animationType="none"
      visible={dog !== undefined}
      onRequestClose={dismissModal}
      transparent
      hardwareAccelerated>
      <TouchableOpacity
        style={views.modalBackground}
        activeOpacity={1}
        onPress={dismissModal}>
        {dog && (
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={views.modal}>
              <TouchableOpacity
                style={views.closeWrapper}
                activeOpacity={0.7}
                onPress={dismissModal}>
                <Image
                  source={require('src/assets/icons/ic_close_filled.png')}
                  style={icons.close}
                />
              </TouchableOpacity>
              <DefaultImage uri={dog.thumbnail} size={110} showBorder />
              <Text style={texts.name}>{dog.name}</Text>
              <View style={views.topRowWrapper}>
                <View style={views.itemWrapper}>
                  <Text style={texts.spec}>{dog.breed}</Text>
                </View>
                <View style={[views.itemWrapper, views.vr]}>
                  <Text style={texts.spec}>{mapGender(dog.gender)}</Text>
                </View>
                {dog.weight && (
                  <View style={[views.itemWrapper, views.vr]}>
                    <Text style={texts.spec}>{dog.weight}kg</Text>
                  </View>
                )}
              </View>
              {dog.info && (
                <View style={views.infoWrapper}>
                  <Text style={texts.info}>{dog.info}</Text>
                </View>
              )}
              <View style={views.bottomRowWrapper}>
                {[
                  { label: '킁킁', value: dog.likes.length },
                  { label: '산책횟수', value: dog.feeds.length },
                ].map((data, index) => (
                  <View key={index.toString()} style={views.bottomItem}>
                    <Text style={texts.bottomLabel}>{data.label}</Text>
                    <Text style={texts.bottomValue}>{data.value}</Text>
                  </View>
                ))}
              </View>
              {signedIn && dog.user !== user._id && (
                <TouchableOpacity
                  style={views.likeButton}
                  activeOpacity={0.7}
                  disabled={!signedIn}
                  onPress={() => onPressLike(dog._id)}>
                  <Text style={texts.like}>킁킁 보내기</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default DogProfile;
