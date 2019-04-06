import moment from 'moment';
import React, { PureComponent } from 'react';
import { Alert, Image, Modal, TextInput as Input, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import breeds from 'src/assets/consts/breeds.json';
import withLoading, { LoadingProps } from 'src/components/base/withLoading';
import PageContainer from 'src/components/container/PageContainer';
import DateInput, { HandleChangeDate } from 'src/components/module/DateInput';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';
import TextAutocomplete from 'src/components/module/TextAutocomplete';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import { uploadImage } from 'src/services/aws/s3';
import * as dogActions from 'src/store/actions/dog';
import { ReducerState } from 'src/store/reducers';
import { icons, views } from './Edit.styles';

interface Props extends LoadingProps, NavigationScreenProps {
  user: ReducerState['user'];
  createDog: typeof dogActions.createDog;
  updateDog: typeof dogActions.updateDog;
}

interface State
  extends Pick<
    dogActions.UpdateDogInterface,
    Exclude<keyof dogActions.UpdateDogInterface, 'birth'>
  > {
  showModal: boolean;
  birth?: Date;
}

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
    if (repDog === undefined) return;
    this.state = {
      _id: this.create ? '' : repDog._id,
      name: this.create ? '' : repDog.name,
      thumbnail: this.create ? '' : repDog.thumbnail,
      breed: this.create ? '' : repDog.breed,
      gender: this.create ? '' : repDog.gender,
      birth: !this.create && repDog.birth ? new Date(repDog.birth) : undefined,
      weight: !this.create && repDog.weight ? repDog.weight : undefined,
      info: !this.create && repDog.info ? repDog.info : undefined,
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleChange = ({
    name,
    value,
  }: HandleChangeText | HandleChangeSelector | HandleChangeDate) => {
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
      storageOptions: { skipBackup: true, path: 'images' },
    };
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel || res.error) return;
      this.setState({ thumbnail: res.customButton ? '' : res.uri });
    });
  };

  handleSubmit = async () => {
    const {
      createDog,
      updateDog,
      navigation,
      user,
      toggleLoading,
    } = this.props;
    const { showModal, birth: prevBirth, _id, ...state } = this.state;
    if (state.name && state.breed && state.gender) {
      let birth: string | undefined = undefined;
      // Parse state data
      if (state.thumbnail !== undefined) {
        const url = await uploadImage({
          table: 'dogs',
          label: user.email,
          name: state.name,
          uri: state.thumbnail,
        })(toggleLoading);
        state.thumbnail = url;
      }
      if (prevBirth !== undefined) {
        birth = moment(prevBirth).format('YYYY.MM.DD');
      }
      // Call reducer
      if (_id) await updateDog({ ...state, birth, _id });
      else await createDog({ ...state, birth });
      navigation.goBack(null);
    } else {
      Alert.alert('반려견의 이름, 품종, 성별을 모두 입력해주세요.');
    }
  };

  render() {
    const { navigation } = this.props;
    const thumbnail = this.state.thumbnail
      ? { uri: this.state.thumbnail }
      : require('src/assets/icons/ic_place_default.png');

    return (
      <PageContainer
        center={this.create ? '반려견 추가' : '프로필 수정'}
        left={{ navigation }}
        right={{ handlePress: this.handleSubmit, view: '완료' }}
        extraBottom={80}
        enableScroll>
        <View style={views.thumbnailWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.handleImagePicker}>
            <Image style={views.thumbnail} source={thumbnail} />
            <Image
              style={icons.edit}
              source={require('src/assets/icons/ic_edit.png')}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          name="name"
          label="이름"
          value={this.state.name}
          inputs={this.inputs}
          handleChange={this.handleChange}
        />
        <TextInput
          name="breed"
          label="품종"
          value={this.state.breed}
          handleChange={() => null}
          handleFocus={this.toggleModal}
        />
        <Selector
          name="gender"
          label="성별"
          value={this.state.gender}
          handleChange={this.handleChange}
          list={[
            { name: 'M', label: '수컷' },
            { name: 'F', label: '암컷' },
            { name: 'N', label: '중성화' },
          ]}
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
  (state: ReducerState) => ({ user: state.user }),
  { createDog: dogActions.createDog, updateDog: dogActions.updateDog }
)(withLoading(Edit));
