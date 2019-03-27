import React, { PureComponent } from 'react';
import { FlatList, TextInput } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';
import ImageCard from './ImageCard';
import { texts, views } from './Upload.styles';

interface State {
  memo: string;
  images: string[];
}

class Upload extends PureComponent<NavigationScreenProps, State> {
  state: State = {
    memo: '',
    images: ['', this.props.navigation.getParam('snapshot')],
  };

  handleChangeMemo = (memo: string) => {
    this.setState({ memo });
  };

  render() {
    const { navigation } = this.props;
    return (
      <PageContainer
        left={{ navigation }}
        center="게시물 작성"
        right={{ view: '완료', handlePress: () => {} }}
        bottom={{
          view: (
            <FlatList
              data={this.state.images}
              horizontal={true}
              style={views.listView}
              renderItem={data => (
                <ImageCard uri={data.item} key={data.index} />
              )}
            />
          ),
          styles: { paddingHorizontal: 0 },
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

export default Upload;
