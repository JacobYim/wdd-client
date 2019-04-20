import produce from 'immer';
import { pick } from 'lodash';
import React, { PureComponent } from 'react';
import { Alert, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import withLoading, { LoadingProps } from 'src/components/base/withLoading';
import PageContainer from 'src/components/container/PageContainer';
import { ImageInterface } from 'src/components/module/ImageWithSticker/ImageWithSticker';
import { createFeed } from 'src/services/api/feed';
import { uploadImages } from 'src/services/aws/s3';
import * as userActions from 'src/store/actions/user';
import * as walkActions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import ImageCard, { AddImageCard } from './ImageCard';
import { texts, views } from './Upload.styles';
import {
  NavigationScreenProps,
  NavigationActions,
  StackActions,
} from 'react-navigation';

interface Props extends LoadingProps, NavigationScreenProps {
  walk: ReducerState['walk'];
  updateStatus: typeof walkActions.updateStatus;
  getUser: typeof userActions.getUser;
}

interface State {
  memo: string;
  images: ImageInterface[];
}

// helpers
const pinsToCoord = (pins: ReducerState['walk']['pins']) =>
  pins.map(pin => [pin.longitude, pin.latitude]);

class Upload extends PureComponent<Props, State> {
  state: State = {
    memo: '',
    images: [{ uri: this.props.navigation.getParam('snapshot') }],
  };

  handleSave = async () => {
    const {
      navigation,
      walk,
      getUser,
      updateStatus,
      toggleLoading,
      hideLoading,
    } = this.props;
    if (this.state.images.length === 0) {
      Alert.alert('사진을 1장 이상 업로드 해주세요.');
      return;
    }
    const uris = this.state.images.map(image => image.nextUri || image.uri);
    try {
      const images = await uploadImages({
        uris,
        table: 'feeds',
        name: JSON.stringify(walk.pins[0]),
      })(toggleLoading);
      await createFeed({
        images,
        memo: this.state.memo,
        pins: JSON.stringify(pinsToCoord(walk.pins)),
        ...pick(walk, ['seconds', 'distance', 'steps', 'pees', 'poos']),
      });
      await getUser();
    } catch (e) {
      await hideLoading();
      Alert.alert('업로드 중 문제가 발생했습니다.');
    }
    updateStatus('READY');
    const action = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'map' })],
    });
    navigation.dispatch(action);
  };

  handleChangeMemo = (memo: string) => {
    this.setState({ memo });
  };

  handleAddImage = (image: ImageInterface) => {
    this.setState(state =>
      produce(state, draft => {
        draft.images = [image, ...state.images];
      })
    );
  };

  handleUpdateImage = (image: ImageInterface, index: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.images[index] = image;
      })
    );
  };

  handleDeleteImage = (index: number) => {
    this.setState(state =>
      produce(state, draft => {
        draft.images.splice(index, 1);
      })
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <PageContainer
        left={{ navigation }}
        center="게시물 작성"
        right={{ view: '완료', handlePress: this.handleSave }}
        bottom={{
          view: (
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={views.listView}
              horizontal={true}
              showsVerticalScrollIndicator={false}>
              <AddImageCard handleLoad={this.handleAddImage} />
              {this.state.images.map((image, index) => (
                <ImageCard
                  key={index}
                  image={image}
                  index={index}
                  navigate={navigation.navigate}
                  handleUpdate={this.handleUpdateImage}
                  handleDelete={this.handleDeleteImage}
                />
              ))}
            </ScrollView>
          ),
          styles: views.bottom,
        }}
        showBorder>
        <TextInput
          style={texts.input}
          onChangeText={this.handleChangeMemo}
          autoFocus={true}
          multiline={true}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="오늘 산책은 어떠셨나요?"
          placeholderTextColor="#00000048"
        />
      </PageContainer>
    );
  }
}

export default connect(
  (state: ReducerState) => ({
    walk: state.walk,
  }),
  {
    updateStatus: walkActions.updateStatus,
    getUser: userActions.getUser,
  }
)(withLoading(Upload));
