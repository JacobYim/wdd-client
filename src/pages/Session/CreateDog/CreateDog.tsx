import { pick } from 'lodash';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import breeds from 'src/assets/consts/breeds.json';
import withLoading, { LoadingProps } from 'src/components/base/withLoading';
import PageContainer from 'src/components/container/PageContainer';
import DefaultImage from 'src/components/module/DefaultImage';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import { uploadImage } from 'src/services/aws/s3';
import * as actions from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { texts, views } from './CreateDog.styles';
import {
  PICTURE_PERMISSIONS,
  checkPermission,
} from 'src/assets/functions/validate';
import {
  Image,
  Text,
  TextInput as Input,
  TouchableOpacity,
  View,
  Modal,
  Keyboard,
  Dimensions,
} from 'react-native';

interface Props extends LoadingProps, NavigationScreenProps {
  createDog: typeof actions.createDog;
  email: ReducerState['user']['email'];
}

interface State extends actions.DogBase {
  showModal: boolean;
  thumbnailHeight: number;
}

const { height } = Dimensions.get('window');

class CreateDog extends Component<Props, State> {
  private inputs = {
    name: React.createRef<Input>(),
  };

  state: State = {
    showModal: false,
    thumbnailHeight: 0,
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

  handleImagePicker = async () => {
    const options = {
      title: '프로필 선택',
      takePhotoButtonTitle: '사진 찍기',
      chooseFromLibraryButtonTitle: '앨범에서 사진 선택',
      customButtons: [{ name: 'default', title: '우동댕 기본 이미지' }],
      cancelButtonTitle: '취소',
      storageOptions: { skipBackup: true, path: 'images' },
    };
    if (await checkPermission(PICTURE_PERMISSIONS)) {
      ImagePicker.showImagePicker(options, res => {
        if (res.didCancel || res.error) return;
        this.setState({ thumbnail: res.customButton ? '' : res.uri });
      });
    }
  };

  handleSubmit = async () => {
    const { createDog, email, navigation, toggleLoading } = this.props;
    const state = pick(this.state, ['name', 'thumbnail', 'breed', 'gender']);
    Keyboard.dismiss();
    if (state.thumbnail) {
      const url = await uploadImage({
        table: 'dogs',
        label: email,
        name: state.name,
        uri: state.thumbnail,
      })(toggleLoading);
      state.thumbnail = url;
    }
    await createDog(state, navigation);
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
        titleOnScroll="댕댕이 정보 입력"
        extraScrollHeight={height * 0.25}
        extraBottom={height * 0.6}>
        <View style={views.thumbnailWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.handleImagePicker}>
            <DefaultImage size={100} uri={thumbnail} showBorder />
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
          onRequestClose={this.toggleModal}
          visible={this.state.showModal}
          hardwareAccelerated>
          <TextAutocomplete
            placeholder="찾으시는 품종을 입력해주세요"
            icon={require('src/assets/icons/ic_search_gray.png')}
            staticList={breeds}
            defaultList={[{ name: '믹스' }, { name: '알 수 없음' }]}
            onSubmit={this.handleBreedChange}
            onDismiss={this.toggleModal}
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
