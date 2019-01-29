import React, { Component } from 'react';
import produce from 'immer';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Storage } from 'aws-amplify';
import { View, TouchableOpacity, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import * as actions from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { views } from './CreateDog.styles';
import PageContainer from 'src/components/module/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import withLoading, { LoadingProps } from 'src/components/module/withLoading';
import Search from 'src/components/module/Search';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';

interface Props extends LoadingProps {
  navigation: NavigationScreenProp<any>;
  createDog: typeof actions.createDog;
  user: ReducerState['user'];
}

interface State {
  // ShortenDogInterface
  name: string;
  thumbnail: string;
  race: string;
  gender: 'M' | 'F' | 'N' | '';
  // Options
  showSearch: boolean;
  thumbnailFile?: any;
}

class CreateDog extends Component<Props, State> {
  state: State = {
    name: '',
    thumbnail: '',
    race: '',
    gender: '',
    showSearch: false,
  };

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  handleChange = ({ name, value }: HandleChangeText | HandleChangeSelector) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleSearchSubmit = (value: string) => {
    this.setState({ race: value });
  };

  handleImagePicker = () => {
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
    const { createDog, navigation, user, toggleLoading } = this.props;
    const imgFile = this.state.thumbnailFile;
    if (imgFile) {
      await toggleLoading();
      const result = (await Storage.put(
        `${user.email}/dogs/${this.state.name}/thumbnail.png`,
        imgFile,
        { contentType: 'image/png' }
      )) as { key: string };
      await this.setState({ thumbnail: result.key });
    }
    const { thumbnailFile, showSearch, ...state } = this.state;

    await toggleLoading();
    createDog(state, navigation);
  };

  render() {
    const { navigation } = this.props;
    const { name, race, gender, thumbnail, showSearch } = this.state;

    return (
      <>
        <Search
          placeholder="댕댕이의 품종을 입력해주세요."
          visible={showSearch}
          toggleSearch={this.toggleSearch}
          handleSubmit={this.handleSearchSubmit}
        />
        <PageContainer
          center="댕댕이 프로필 설정"
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
              activeOpacity={0.7}
              onPress={this.handleImagePicker}>
              <Image
                style={views.thumbnail}
                source={
                  thumbnail
                    ? { uri: thumbnail }
                    : require('src/lib/icons/ic_thumbnail.png')
                }
              />
              <Image
                style={views.edit}
                source={require('src/lib/icons/ic_edit.png')}
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
            handleFocus={this.toggleSearch}
            value={this.state.race}
            handleChange={() => {}}
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
      </>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    user: state.user,
  }),
  { createDog: actions.createDog }
)(withLoading(CreateDog));
