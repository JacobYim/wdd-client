import produce from 'immer';
import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import * as actions from 'src/store/actions/walk';
import { AddImageCard, ImageCard } from './ImageCard';
import { texts, views } from './Upload.styles';

export interface ImageInterface {
  uri: string;
  file?: string;
}

interface Props extends NavigationScreenProps {
  updateStatus: typeof actions.updateStatus;
}

interface State {
  memo: string;
  images: ImageInterface[];
}

class Upload extends PureComponent<Props, State> {
  state: State = {
    memo: '',
    images: [{ uri: this.props.navigation.getParam('snapshot') }],
  };

  handleSave = () => {
    const { navigation, updateStatus } = this.props;
    updateStatus('READY');
    navigation.popToTop();
  };

  handleChangeMemo = (memo: string) => {
    this.setState({ memo });
  };

  handleAddImage = (image: ImageInterface) => {
    this.setState(state =>
      produce(state, draft => {
        draft.images.push(image);
      })
    );
  };

  handleUpdateImage = (image: ImageInterface, index: number) => {};

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
                  handleUpdate={this.handleUpdateImage}
                  handleDelete={this.handleDeleteImage}
                />
              ))}
            </ScrollView>
          ),
          styles: { paddingHorizontal: 0, flexDirection: 'row' },
        }}
        showBorder>
        <TextInput
          value={this.state.memo}
          style={texts.input}
          onChangeText={this.handleChangeMemo}
          placeholder="오늘 산책은 어떠셨나요?"
          placeholderTextColor="#00000048"
        />
      </PageContainer>
    );
  }
}

export default connect(
  null,
  { updateStatus: actions.updateStatus }
)(Upload);
