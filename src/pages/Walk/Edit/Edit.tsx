import produce from 'immer';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
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

  completeEdit = () => {
    const { navigation } = this.props;
    const handleEdit: (image: ImageInterface) => void = navigation.getParam(
      'handleEdit'
    );
    handleEdit(this.state.image);
    navigation.goBack(null);
  };

  renderButton = (onPress: () => void, icon: NodeRequire) => (
    <TouchableOpacity style={views.button} onPress={onPress}>
      <Image source={icon} style={icons.button} />
    </TouchableOpacity>
  );

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
        <ImageWithSticker image={this.state.image} walk={walk} size={width} />
        <View style={views.buttonContainer}>
          <View style={views.buttonRow}>
            <TouchableOpacity style={views.button} onPress={this.handleClear}>
              <Text style={texts.clear}>없음</Text>
            </TouchableOpacity>
            {this.renderButton(
              () => this.handleToggle('time'),
              require('src/assets/icons/ic_time_black.png')
            )}
            {this.renderButton(
              () => this.handleToggle('distance'),
              require('src/assets/icons/ic_distance.png')
            )}
            {this.renderButton(
              () => this.handleToggle('poos'),
              require('src/assets/icons/ic_poo_gray.png')
            )}
          </View>
          <View style={views.buttonRow}>
            {this.renderButton(
              () => this.handleToggle('pees'),
              require('src/assets/icons/ic_pee_gray.png')
            )}
            {this.renderButton(
              () => this.handleLogo('LOGO'),
              require('src/assets/icons/logo_text.png')
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect((state: ReducerState) => ({ walk: state.walk }))(Edit);
