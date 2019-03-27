import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { icons, views } from './ImageCard.styles';

interface Props {
  uri?: string;
}

const ImageCard: React.FC<Props> = ({ uri }) => (
  <TouchableOpacity style={views.wrapper} activeOpacity={0.7}>
    {uri ? (
      <>
        <Image source={{ uri }} style={views.fullSize} />
        <TouchableOpacity style={views.deleteButton}>
          <Image
            source={require('src/assets/icons/ic_close.png')}
            style={icons.delete}
          />
        </TouchableOpacity>
      </>
    ) : (
      <Image
        source={require('src/assets/icons/ic_add_image.png')}
        style={icons.addImage}
      />
    )}
  </TouchableOpacity>
);

export default ImageCard;
