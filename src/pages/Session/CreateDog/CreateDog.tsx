import produce from 'immer';
import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import breeds from 'src/assets/consts/breeds.json';
import withLoading, { LoadingProps } from 'src/components/base/withLoading';
import PageContainer from 'src/components/container/PageContainer';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import { uploadImage } from 'src/services/aws/s3';
import * as actions from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { texts, views } from './CreateDog.styles';

interface Props extends LoadingProps {
  navigation: NavigationScreenProp<any>;
  createDog: typeof actions.createDog;
  email: ReducerState['user']['email'];
}

interface State extends actions.ShortenDogInterface {
  thumbnailFile?: any;
}

class CreateDog extends Component<Props, State> {
  state: State = {
    name: '',
    thumbnail: '',
    breed: '',
    gender: '',
  };

  handleChange = ({ name, value }: HandleChangeText | HandleChangeSelector) => {
    this.setState(state => ({ ...state, [name]: value }));
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
      if (res.customButton) {
        this.setState(state =>
          produce(state, draft => {
            delete draft.thumbnailFile;
            draft.thumbnail = '';
          })
        );
      }

      this.setState(state =>
        produce(state, draft => {
          draft.thumbnail = res.uri;
          draft.thumbnailFile = res.data;
        })
      );
    });
  };

  handleSubmit = async () => {
    const { createDog, navigation, email, toggleLoading } = this.props;
    const thumbnail = await uploadImage({
      email,
      table: 'dogs',
      name: this.state.name,
      type: 'thumbnail',
      file: this.state.thumbnailFile,
    })(toggleLoading);

    const { name, breed, gender } = this.state;
    await createDog({ name, breed, gender, thumbnail }, navigation);
  };

  render() {
    const { navigation } = this.props;
    const { name, breed, gender, thumbnail } = this.state;

    return (
      <>
        <PageContainer
          left={{ navigation }}
          right={{
            view: '건너뛰기',
            handlePress: () => navigation.navigate('app'),
          }}
          bottomBox={{
            text: '시작하기',
            handlePress: this.handleSubmit,
            disable: !name || !breed || !gender,
          }}>
          <View style={views.thumbnailWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.handleImagePicker}>
              <Image
                style={views.thumbnail}
                source={
                  thumbnail
                    ? { uri: thumbnail }
                    : require('src/assets/icons/ic_thumbnail.png')
                }
              />
              <Image
                style={views.edit}
                source={require('src/assets/icons/ic_edit.png')}
              />
            </TouchableOpacity>
            <Text style={texts.notice}>
              반려동물의 정보를 입력해주세요!{'\n'}
              회원가입 후, 프로필 설정에서 변경 가능합니다.
            </Text>
          </View>
          <TextInput
            name="name"
            label="이름"
            value={name}
            handleChange={this.handleChange}
          />
          <TextAutocomplete
            name="breed"
            label="품종"
            data={breeds}
            defalutData={['믹스', '알 수 없음']}
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
      </>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    email: state.user.email,
  }),
  { createDog: actions.createDog }
)(withLoading(CreateDog));
