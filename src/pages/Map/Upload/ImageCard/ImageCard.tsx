import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProp } from 'react-navigation';
import { ImageInterface } from 'src/components/module/ImageWithSticker/ImageWithSticker';
import { icons, views } from './ImageCard.styles';
import {
  checkPermission,
  PICTURE_PERMISSIONS,
} from 'src/assets/functions/validate';

const ImageWrapper: React.FC<{
  onPress: () => void;
  children: React.ReactNode;
  onPressDelete?: () => void;
}> = ({ children, onPress, onPressDelete }) => (
  <View style={views.wrapper}>
    <TouchableOpacity
      style={views.imageCard}
      activeOpacity={0.7}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
    {onPressDelete && (
      <TouchableOpacity style={views.deleteButton} onPress={onPressDelete}>
        <Image
          source={require('src/assets/icons/ic_close.png')}
          style={icons.delete}
        />
      </TouchableOpacity>
    )}
  </View>
);

interface AddProps {
  handleLoad: (item: ImageInterface) => void;
}

export const AddImageCard: React.FC<AddProps> = ({ handleLoad }) => {
  const showImagePicker = async () => {
    const options = {
      title: '산책 사진 선택',
      storageOptions: { skipBackup: true, path: 'images' },
    };
    if (await checkPermission(PICTURE_PERMISSIONS)) {
      ImagePicker.showImagePicker(options, res => {
        if (res.didCancel || res.error) return;
        handleLoad({ uri: res.uri });
      });
    }
  };
  return (
    <ImageWrapper onPress={showImagePicker}>
      <Image
        source={require('src/assets/icons/ic_add_image.png')}
        style={icons.addImage}
      />
    </ImageWrapper>
  );
};

interface Props {
  image: ImageInterface;
  navigate: NavigationScreenProp<any>['navigate'];
  index: number;
  handleUpdate: (image: ImageInterface, index: number) => void;
  handleDelete: (index: number) => void;
}

const ImageCard: React.FC<Props> = ({
  image,
  index,
  navigate,
  handleDelete,
  handleUpdate,
}) => {
  const handleEdit = (nextImage: ImageInterface) => {
    handleUpdate(nextImage, index);
  };
  return (
    <ImageWrapper
      onPress={() => navigate('edit', { image, handleEdit })}
      onPressDelete={() => handleDelete(index)}>
      <Image source={{ uri: image.uri }} style={views.image} />
    </ImageWrapper>
  );
};

export default ImageCard;
