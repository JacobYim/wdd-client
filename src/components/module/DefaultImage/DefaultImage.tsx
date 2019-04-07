import React from 'react';
import { Image } from 'react-native';
import { color } from 'src/theme';

interface Props {
  size: number;
  uri?: string;
  showBorder?: boolean;
}

const DefaultImage: React.FC<Props> = ({ size, uri, showBorder }) => (
  <Image
    style={[
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        resizeMode: 'cover',
      },
      showBorder ? { borderWidth: 1.5, borderColor: `${color.black}14` } : null,
    ]}
    source={
      uri ? { uri } : require('src/assets/icons/ic_thumbnail_default.png')
    }
  />
);

export default DefaultImage;
