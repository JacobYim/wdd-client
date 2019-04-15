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
  blackMode: boolean;
  size?: number;
  style?: object;
}

const ImageWithSticker: React.FC<Props> = ({
  image,
  walk,
  blackMode,
  size,
  style,
}) => {
  const fontStyle = [texts.info, blackMode ? texts.black : null];
  return (
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
                  source={
                    blackMode
                      ? require('src/assets/icons/logo_text_black.png')
                      : require('src/assets/icons/logo_text_white.png')
                  }
                  style={icons.logo}
                />
              ) : (
                <Image
                  source={
                    blackMode
                      ? require('src/assets/icons/ic_go_black.png')
                      : require('src/assets/icons/ic_go_white.png')
                  }
                  style={icons.go}
                />
              )}
            </View>
          )}
          <View style={views.bottomWrapper}>
            {image.stickers.time && (
              <View style={views.item}>
                <Image
                  source={
                    blackMode
                      ? require('src/assets/icons/ic_time_black.png')
                      : require('src/assets/icons/ic_time_white.png')
                  }
                  style={icons.time}
                />
                <Text style={fontStyle}>{Math.floor(walk.seconds / 60)}분</Text>
              </View>
            )}
            {image.stickers.distance && (
              <View style={views.item}>
                <Image
                  source={
                    blackMode
                      ? require('src/assets/icons/ic_distance_black.png')
                      : require('src/assets/icons/ic_distance_white.png')
                  }
                  style={icons.distance}
                />
                <Text style={fontStyle}>{rangeWithUnit(walk.distance)}</Text>
              </View>
            )}
            {image.stickers.poos && (
              <View style={views.item}>
                <Image
                  source={
                    blackMode
                      ? require('src/assets/icons/ic_poo_black.png')
                      : require('src/assets/icons/ic_poo_white.png')
                  }
                  style={icons.poo}
                />
                <Text style={fontStyle}>{walk.poos}회</Text>
              </View>
            )}
            {image.stickers.pees && (
              <View style={views.item}>
                <Image
                  source={
                    blackMode
                      ? require('src/assets/icons/ic_pee_black.png')
                      : require('src/assets/icons/ic_pee_white.png')
                  }
                  style={icons.pee}
                />
                <Text style={fontStyle}>{walk.pees}회</Text>
              </View>
            )}
          </View>
        </>
      )}
    </ImageBackground>
  );
};
export default ImageWithSticker;
