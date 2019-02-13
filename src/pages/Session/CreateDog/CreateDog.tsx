import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
// Redux
import { connect } from 'react-redux';
import * as actions from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
// Style
import { views } from './CreateDog.styles';
// Components
import PageContainer from 'src/components/container/PageContainer';
import withLoading, { LoadingProps } from 'src/components/base/withLoading';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';
// Other
import ImagePicker from 'react-native-image-picker';
import produce from 'immer';
import { uploadImage } from 'src/services/aws/s3';
import breeds from 'src/assets/consts/breeds.json';

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
    const { createDog, navigation, email, toggleLoading } = this.props;
    const thumbnail = await uploadImage({
      table: 'dogs',
      email,
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
          center="댕댕이 프로필 설정"
          left={{ navigation }}
          right={{ text: '취소', handlePress: () => navigation.popToTop() }}
          bottom={{
            text: '다음',
            boxType: true,
            handlePress: this.handleSubmit,
            disable: !name || !breed || !gender,
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
                    : require('src/assets/icons/ic_thumbnail.png')
                }
              />
              <Image
                style={views.edit}
                source={require('src/assets/icons/ic_edit.png')}
              />
            </TouchableOpacity>
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
