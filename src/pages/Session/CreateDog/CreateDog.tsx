import React, { Component } from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Storage } from 'aws-amplify';
import { View, TouchableOpacity, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import * as actions from 'src/store/actions/dog';
import { views } from './CreateDog.styles';
import PageContainer from 'src/components/module/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';

interface Props {
  navigation: NavigationScreenProp<any>;
  createDog: typeof actions.createDog;
}

interface State {
  name: string;
  thumbnail: string;
  race: string;
  gender: 'M' | 'F' | 'N' | '';
  thumbnailFile?: any;
}

class CreateDog extends Component<Props, State> {
  state: State = {
    name: '',
    thumbnail: '',
    race: '',
    gender: '',
  };

  handleChange = ({ name, value }: HandleChangeText | HandleChangeSelector) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  selectPhoto = () => {
    const options = {
      title: '프로필 선택',
      customButtons: [{ name: 'default', title: '기본 이미지' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel || res.error) return;
      if (res.customButton)
        this.setState(state =>
          produce(state, draft => {
            delete draft.thumbnailFile;
            draft.thumbnail = '';
          })
        );

      this.setState(state =>
        produce(state, draft => {
          draft.thumbnail = res.uri;
          draft.thumbnailFile = res.data;
        })
      );
    });
  };

  handleSubmit = async () => {
    const { createDog, navigation } = this.props;
    const file = this.state.thumbnailFile;
    if (file) {
      const result = (await Storage.put(
        `${this.state.name}/thumbnail.png`,
        file,
        {
          contentType: 'image/png',
        }
      )) as { key: string };
      await this.setState({ thumbnail: result.key });
    }
    const { thumbnailFile, ...state } = this.state;

    createDog(state, navigation);
  };

  render() {
    const { navigation } = this.props;
    const { name, race, gender, thumbnail } = this.state;

    return (
      <PageContainer
        left={{ text: '이전', handlePress: () => navigation.goBack(null) }}
        right={{ text: '취소', handlePress: () => navigation.popToTop() }}
        bottom={{
          text: '다음',
          boxType: true,
          handlePress: this.handleSubmit,
          disable: !name || !race || !gender,
        }}
        scrollEnabled={false}>
        <View style={views.thumbnailWrapper}>
          <TouchableOpacity
            style={views.thumbnailButton}
            activeOpacity={0.7}
            onPress={this.selectPhoto}>
            <Image
              style={views.thumbnail}
              source={
                thumbnail
                  ? { uri: thumbnail }
                  : require('src/lib/icons/ic_thumbnail.png')
              }
            />
          </TouchableOpacity>
        </View>
        <TextInput
          name="name"
          label="이름"
          value={name}
          handleChange={this.handleChange}
        />
        <TextInput
          name="race"
          label="품종"
          value={this.state.race}
          handleChange={this.handleChange}
        />
        <Selector
          name="gender"
          label="성별"
          handleChange={this.handleChange}
          list={[
            { name: 'M', label: '수컷' },
            { name: 'F', label: '암컷' },
            { name: 'N', label: '중성화' },
          ]}
        />
      </PageContainer>
    );
  }
}

export default connect(
  null,
  { createDog: actions.createDog }
)(CreateDog);
