import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { rangeWithUnit } from 'src/assets/functions/print';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views } from './ImageWithSticker.styles';

export interface ImageInterface {
  uri: string; // default uri
  nextUri?: string; // edited
  stickers?: {
    time?: boolean;
    distance?: boolean;
    poos?: boolean;
    pees?: boolean;
    top?: 'LOGO' | 'GO';
  };
}

interface Props {
  image: ImageInterface;
  walk: ReducerState['walk'];
  size?: number;
  style?: object;
}

const ImageWithSticker: React.FC<Props> = ({ image, walk, size, style }) => (
  <ImageBackground
    style={{ width: size || '100%', height: size || '100%', ...style }}
    source={{ uri: image.uri }}
    imageStyle={{ resizeMode: 'cover' }}>
    {image.stickers && (
      <>
        {image.stickers.top && (
          <View style={views.topWrapper}>
            {image.stickers.top === 'LOGO' ? (
              <Image
                source={require('src/assets/icons/logo_text_white.png')}
                style={icons.logo}
              />
            ) : (
              <Image
                source={require('src/assets/icons/ic_go_white.png')}
                style={icons.go}
              />
            )}
          </View>
        )}
        <View style={views.bottomWrapper}>
          {image.stickers.time && (
            <View style={views.item}>
              <Image source={require('src/assets/icons/ic_time_white.png')} />
              <Text style={texts.info}>{Math.floor(walk.seconds / 60)}분</Text>
            </View>
          )}
          {image.stickers.distance && (
            <View style={views.item}>
              <Image
                source={require('src/assets/icons/ic_distance_white.png')}
              />
              <Text style={texts.info}>{rangeWithUnit(walk.distance)}</Text>
            </View>
          )}
          {image.stickers.poos && (
            <View style={views.item}>
              <Image source={require('src/assets/icons/ic_poo.png')} />
              <Text style={texts.info}>{walk.poos}회</Text>
            </View>
          )}
          {image.stickers.pees && (
            <View style={views.item}>
              <Image source={require('src/assets/icons/ic_pee.png')} />
              <Text style={texts.info}>{walk.pees}회</Text>
            </View>
          )}
        </View>
      </>
    )}
  </ImageBackground>
);
export default ImageWithSticker;
