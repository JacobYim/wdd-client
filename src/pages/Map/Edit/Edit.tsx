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
  View,
  TouchableOpacity,
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
    const { walk } = this.props;
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
            handlePress: () => {},
          }}
          center="이미지 편집"
          right={{
            view: <Text style={texts.navbar}>완료</Text>,
            handlePress: this.completeEdit,
          }}
          showBorder
        />
        <ViewShot ref={this.snapshot} options={{ format: 'png', quality: 0.9 }}>
          <ImageWithSticker image={this.state.image} walk={walk} size={width} />
        </ViewShot>
        <FlatList
          data={[
            {
              handlePress: this.handleClear,
              text: '없음',
            },
            {
              handlePress: () => this.handleToggle('time'),
              icon: require('src/assets/icons/ic_time_black.png'),
            },
            {
              handlePress: () => this.handleToggle('distance'),
              icon: require('src/assets/icons/ic_distance.png'),
            },
            {
              handlePress: () => this.handleToggle('poos'),
              icon: require('src/assets/icons/ic_poo_gray.png'),
            },
            {
              handlePress: () => this.handleToggle('pees'),
              icon: require('src/assets/icons/ic_pee_gray.png'),
            },
            {
              handlePress: () => this.handleLogo('LOGO'),
              icon: require('src/assets/icons/logo_text.png'),
            },
          ]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={views.buttonContainer}
          numColumns={4}
          keyExtractor={(i, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={views.button} onPress={item.handlePress}>
              {item.icon && <Image source={item.icon} style={icons.button} />}
              {item.text && <Text style={texts.clear}>{item.text}</Text>}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

export default connect((state: ReducerState) => ({ walk: state.walk }))(Edit);
