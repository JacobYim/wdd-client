import produce from 'immer';
import { pick } from 'lodash';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import breeds from 'src/assets/consts/breeds.json';
import withLoading, { LoadingProps } from 'src/components/base/withLoading';
import PageContainer from 'src/components/container/PageContainer';
import DateInput, { HandleChangeDate } from 'src/components/module/DateInput';
import DefaultImage from 'src/components/module/DefaultImage';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import { uploadImage } from 'src/services/aws/s3';
import * as dogActions from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { icons, views } from './Edit.styles';
import {
  Image,
  Modal,
  TextInput as Input,
  View,
  Dimensions,
} from 'react-native';
import {
  checkPermission,
  PICTURE_PERMISSIONS,
} from 'src/assets/functions/validate';

interface Props extends LoadingProps, NavigationScreenProps {
  user: ReducerState['user'];
  createDog: typeof dogActions.createDog;
  updateDog: typeof dogActions.updateDog;
}

interface State
  extends Pick<
    dogActions.UpdateDog,
    Exclude<keyof dogActions.UpdateDog, 'birth'>
  > {
  showModal: boolean;
  birth?: Date;
  error: {
    name?: string;
    breed?: string;
    gender?: string;
  };
}

const { height } = Dimensions.get('window');

class Edit extends PureComponent<Props, State> {
  private create: boolean = this.props.navigation.getParam('createMode');
  private inputs = {
    name: React.createRef<Input>(),
    breed: React.createRef<Input>(),
    gender: React.createRef<Input>(),
    weight: React.createRef<Input>(),
    info: React.createRef<Input>(),
  };

  constructor(props: Props) {
    super(props);
    const { repDog } = props.user;
    let state: State = {
      _id: '',
      name: '',
      breed: '',
      gender: '',
      error: {},
      showModal: false,
    };

    if (!this.create && repDog) {
      state = {
        ...state,
        ...pick(repDog, [
          '_id',
          'name',
          'breed',
          'gender',
          'thumbnail',
          'weight',
          'info',
        ]),
        birth: repDog.birth
          ? moment(repDog.birth.split('.')).toDate()
          : undefined,
      };
    }

    this.state = state;
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleChange = ({
    name,
    value,
  }: HandleChangeText | HandleChangeSelector | HandleChangeDate) => {
    this.setState(state => {
      const error = { ...state.error };
      if (name === 'name' || name === 'gender') {
        delete error[name];
      }
      return { ...state, error, [name]: value };
    });
  };

  handleBreedChange = ({ name }: { name: string }) => {
    this.setState(state =>
      produce(state, draft => {
        draft.breed = name;
        delete draft.error.breed;
      })
    );
    this.toggleModal();
  };

  handleImagePicker = async () => {
    const options = {
      title: '프로필 선택',
      takePhotoButtonTitle: '사진 찍기',
      chooseFromLibraryButtonTitle: '앨범에서 사진 선택',
      customButtons: [{ name: 'default', title: '우동댕 기본 이미지' }],
      cancelButtonTitle: '취소',
      quality: 0.6,
      storageOptions: { skipBackup: true, path: 'images' },
    };
    if (await checkPermission(PICTURE_PERMISSIONS)) {
      ImagePicker.showImagePicker(options, res => {
        if (res.didCancel || res.error) return;
        this.setState({ thumbnail: res.customButton ? '' : res.uri });
      });
    }
  };

  validate = async () => {
    await this.setState(state =>
      produce(state, draft => {
        if (!state.name) draft.error.name = '반려견의 이름을 입력해주세요.';
        if (!state.breed) draft.error.breed = '반려견의 품종을 입력해주세요.';
        if (!state.gender) draft.error.gender = '반려견의 성별을 입력해주세요.';
      })
    );
  };

  handleSubmit = async () => {
    const {
      createDog,
      updateDog,
      navigation,
      user,
      toggleLoading,
    } = this.props;
    await this.validate();
    const { showModal, error, birth: prevBirth, _id, ...state } = this.state;
    if (Object.keys(error).length === 0) {
      let birth: string | undefined = undefined;
      // Parse state data
      if (state.thumbnail !== undefined) {
        const url = await uploadImage({
          table: 'dogs',
          label: user.email,
          name: `${state.name}_${moment().toISOString()}`,
          uri: state.thumbnail,
        })(toggleLoading);
        state.thumbnail = url;
      }
      if (prevBirth !== undefined) {
        birth = moment(prevBirth).format('YYYY.MM.DD');
      }
      if (state.weight) {
        state.weight = parseFloat((state.weight as any) as string);
      }
      // Call reducer
      if (_id) await updateDog({ ...state, birth, _id });
      else await createDog({ ...state, birth });
      navigation.goBack(null);
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <PageContainer
        center={this.create ? '반려견 추가' : '프로필 수정'}
        left={{ navigation }}
        right={{ handlePress: this.handleSubmit, view: '완료' }}
        extraScrollHeight={height * 0.16}
        extraBottom={height * 0.32}
        enableScroll>
        <View style={views.thumbnailWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.handleImagePicker}>
            <DefaultImage size={80} uri={this.state.thumbnail} />
            <Image
              style={icons.edit}
              source={require('src/assets/icons/ic_edit.png')}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          name="name"
          label="이름"
          alert={this.state.error.name}
          value={this.state.name}
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <TextInput
          name="breed"
          label="품종"
          alert={this.state.error.breed}
          value={this.state.breed}
          handleChange={() => null}
          handleFocus={this.toggleModal}
        />
        <Selector
          name="gender"
          label="성별"
          value={this.state.gender}
          alert={this.state.error.gender}
          handleChange={this.handleChange}
          list={[
            { name: 'M', label: '수컷' },
            { name: 'F', label: '암컷' },
            { name: 'N', label: '중성화' },
          ]}
        />
        <TextInput
          name="weight"
          label="몸무게"
          value={this.state.weight ? this.state.weight.toString() : ''}
          keyboardType="numeric"
          unit="Kg"
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <TextInput
          name="info"
          label="특징"
          value={this.state.info}
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <DateInput
          name="birth"
          label="생년월일"
          value={this.state.birth}
          handleChange={this.handleChange}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}
          hardwareAccelerated>
          <TextAutocomplete
            placeholder="찾으시는 품종을 입력해주세요"
            staticList={breeds}
            icon={require('src/assets/icons/ic_search_gray.png')}
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
  (state: ReducerState) => ({ user: state.user }),
  { createDog: dogActions.createDog, updateDog: dogActions.updateDog }
)(withLoading(Edit));
