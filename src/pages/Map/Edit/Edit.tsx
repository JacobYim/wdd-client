import produce from 'immer';
import React, { PureComponent } from 'react';
import ViewShot from 'react-native-view-shot';
import { FlatList, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import ImageWithSticker from 'src/components/module/ImageWithSticker';
import { ImageInterface } from 'src/components/module/ImageWithSticker/ImageWithSticker';
import TopNavbar from 'src/components/module/TopNavbar';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views } from './Edit.styles';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  CameraRoll,
  Alert,
} from 'react-native';

interface Props extends NavigationScreenProps {
  walk: ReducerState['walk'];
}

interface State {
  image: ImageInterface;
}

const { width } = Dimensions.get('window');

class Edit extends PureComponent<Props, State> {
  private snapshot = React.createRef<ViewShot>();

  state: State = {
    image: this.props.navigation.getParam('image'),
  };

  handleDownload = async () => {
    const snapshot = this.snapshot.current;
    if (snapshot) {
      const uri = await (snapshot as any).capture();
      await CameraRoll.saveToCameraRoll(`file://${uri}`);
      Alert.alert('저장되었습니다.');
    }
  };

  handleClear = () => {
    this.setState(state =>
      produce(state, draft => {
        delete draft.image.stickers;
      })
    );
  };

  handleToggle = (key: 'time' | 'distance' | 'poos' | 'pees') => {
    this.setState(state =>
      produce(state, draft => {
        draft.image.stickers = {
          ...state.image.stickers,
          [key]: state.image.stickers ? !state.image.stickers[key] : true,
        };
      })
    );
  };

  handleLogo = (top: 'LOGO' | 'GO') => {
    this.setState(state =>
      produce(state, draft => {
        if (draft.image.stickers) {
          if (draft.image.stickers.top === top) {
            delete draft.image.stickers.top;
          } else {
            draft.image.stickers.top = top;
          }
        } else {
          draft.image.stickers = { top };
        }
      })
    );
  };

  completeEdit = async () => {
    const { navigation } = this.props;
    const handleEdit: (image: ImageInterface) => void = navigation.getParam(
      'handleEdit'
    );
    const snapshot = this.snapshot.current;
    if (snapshot) {
      const nextUri: string = await (snapshot as any).capture();
      handleEdit({ ...this.state.image, nextUri });
      navigation.goBack(null);
    }
  };

  render() {
    const { walk, navigation } = this.props;
    return (
      <SafeAreaView>
        <TopNavbar
          left={{
            view: (
              <Image
                source={require('src/assets/icons/ic_save.png')}
                style={icons.save}
              />
            ),
            handlePress: this.handleDownload,
          }}
          center="이미지 편집"
          right={{
            view: <Text style={texts.navbar}>완료</Text>,
            handlePress: this.completeEdit,
          }}
          showBorder
        />
        <ViewShot ref={this.snapshot} options={{ format: 'png', quality: 0.9 }}>
          <ImageWithSticker
            image={this.state.image}
            walk={walk}
            size={width}
            blackMode={navigation.getParam('blackMode')}
          />
        </ViewShot>
        <FlatList
          data={[
            {
              handlePress: this.handleClear,
              text: '없음',
              style: {},
            },
            {
              handlePress: () => this.handleToggle('time'),
              icon: require('src/assets/icons/ic_time_black.png'),
              style: { width: 32, height: 30 },
            },
            {
              handlePress: () => this.handleToggle('distance'),
              icon: require('src/assets/icons/ic_km.png'),
              style: { width: 41, height: 33 },
            },
            {
              handlePress: () => this.handleToggle('poos'),
              icon: require('src/assets/icons/ic_poo_black.png'),
              style: { width: 28, height: 27 },
            },
            {
              handlePress: () => this.handleToggle('pees'),
              icon: require('src/assets/icons/ic_pee_black.png'),
              style: { width: 18, height: 28 },
            },
            {
              handlePress: () => this.handleLogo('GO'),
              icon: require('src/assets/icons/ic_go_black.png'),
              style: { width: 48, height: 26 },
            },
            {
              handlePress: () => this.handleLogo('LOGO'),
              icon: require('src/assets/icons/logo_text_black.png'),
              style: { width: 58, height: 10 },
            },
          ]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={views.buttonContainer}
          numColumns={4}
          keyExtractor={(i, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={views.button} onPress={item.handlePress}>
              {item.icon && <Image source={item.icon} style={item.style} />}
              {item.text && <Text style={texts.clear}>{item.text}</Text>}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

export default connect((state: ReducerState) => ({ walk: state.walk }))(Edit);
