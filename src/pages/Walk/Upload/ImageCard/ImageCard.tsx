import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ImageInterface } from '../Upload';
import { icons, views } from './ImageCard.styles';

interface AddProps {
  handleLoad: (item: ImageInterface) => void;
}

export const AddImageCard: React.FC<AddProps> = ({ handleLoad }) => {
  const handleImagePicker = () => {
    const options = {
      title: '산책 사진 선택',
      storageOptions: { skipBackup: true, path: 'images' },
    };
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel || res.error) return;
      handleLoad({ uri: res.uri, file: res.data });
    });
  };

  return (
    <View style={views.wrapper}>
      <TouchableOpacity
        style={views.imageCard}
        activeOpacity={0.7}
        onPress={handleImagePicker}>
        <Image
          source={require('src/assets/icons/ic_add_image.png')}
          style={icons.addImage}
        />
      </TouchableOpacity>
    </View>
  );
};

interface Props {
  image: ImageInterface;
  index: number;
  handleUpdate: (image: ImageInterface, index: number) => void;
  handleDelete: (index: number) => void;
}

export const ImageCard: React.FC<Props> = ({
  image,
  index,
  handleUpdate,
  handleDelete,
}) => {
  const handleUpdateImage = () => {
    handleUpdate(image, index);
  };

  return (
    <View style={views.wrapper}>
      <TouchableOpacity
        style={views.imageCard}
        activeOpacity={0.7}
        onPress={handleUpdateImage}>
        <Image source={{ uri: image.uri }} style={views.image} />
      </TouchableOpacity>
      <TouchableOpacity
        style={views.deleteButton}
        onPress={() => handleDelete(index)}>
        <Image
          source={require('src/assets/icons/ic_close.png')}
          style={icons.delete}
        />
      </TouchableOpacity>
    </View>
  );
};
