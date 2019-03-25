import produce from 'immer';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProps } from 'react-navigation';
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
import {
  Image,
  Text,
  TextInput as Input,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

interface Props extends LoadingProps, NavigationScreenProps {
  createDog: typeof actions.createDog;
  email: ReducerState['user']['email'];
}

interface State extends actions.CreateDogInterface {
  showModal: boolean;
  thumbnailFile?: any;
}

class CreateDog extends Component<Props, State> {
  private inputs = {
    name: React.createRef<Input>(),
    breed: React.createRef<Input>(),
  };

  state: State = {
    showModal: false,
    name: '',
    breed: '',
    gender: '',
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleChange = ({ name, value }: HandleChangeText | HandleChangeSelector) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleBreedChange = ({ name }: { name: string }) => {
    this.setState({ breed: name });
    this.toggleModal();
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
    const { name, thumbnailFile, ...others } = this.state;
    const thumbnail = await uploadImage({
      email,
      name,
      table: 'dogs',
      type: 'thumbnail',
      file: thumbnailFile,
    })(toggleLoading);

    await createDog({ name, thumbnail, ...others }, navigation);
  };

  render() {
    const { navigation } = this.props;
    const { name, breed, gender, thumbnail } = this.state;

    return (
      <PageContainer
        left={{ navigation, routeName: 'createMeta' }}
        right={{
          view: '건너뛰기',
          handlePress: () => navigation.navigate('app'),
        }}
        bottomBox={{
          text: '시작하기',
          handlePress: this.handleSubmit,
          disable: !name || !breed || !gender,
        }}
        extraScrollHeight={200}>
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
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <TextInput
          name="breed"
          label="품종"
          value={breed}
          handleChange={() => null}
          handleFocus={this.toggleModal}
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}>
          <TextAutocomplete
            placeholder="찾으시는 품종을 입력해주세요"
            list={breeds}
            icon={require('src/assets/icons/ic_search_gray.png')}
            defaultList={[{ name: '믹스' }, { name: '알 수 없음' }]}
            handleSubmit={this.handleBreedChange}
            handleDismiss={this.toggleModal}
          />
        </Modal>
      </PageContainer>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    email: state.user.email,
  }),
  { createDog: actions.createDog }
)(withLoading(CreateDog));
