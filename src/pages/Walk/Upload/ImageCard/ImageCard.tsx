import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import ImageWithSticker from 'src/components/module/ImageWithSticker';
import { ImageInterface } from 'src/components/module/ImageWithSticker/ImageWithSticker';
import { ReducerState } from 'src/store/reducers';
import { icons, views } from './ImageCard.styles';

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
  const showImagePicker = () => {
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
  walk: ReducerState['walk'];
  navigate: NavigationScreenProp<any>['navigate'];
  index: number;
  handleUpdate: (image: ImageInterface, index: number) => void;
  handleDelete: (index: number) => void;
}

const ImageCard: React.FC<Props> = ({
  image,
  walk,
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
      <ImageWithSticker image={image} walk={walk} style={views.image} />
    </ImageWrapper>
  );
};

export default connect((state: ReducerState) => ({ walk: state.walk }))(
  ImageCard
);
