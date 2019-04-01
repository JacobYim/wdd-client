import React, { PureComponent } from 'react';
import { Dimensions, Image, SafeAreaView, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import ImageWithSticker from 'src/components/module/ImageWithSticker';
import { ImageInterface } from 'src/components/module/ImageWithSticker/ImageWithSticker';
import TopNavbar from 'src/components/module/TopNavbar';
import { ReducerState } from 'src/store/reducers';

interface Props extends NavigationScreenProps {
  walk: ReducerState['walk'];
}

interface State {
  image: ImageInterface;
}

const { width } = Dimensions.get('window');

class Edit extends PureComponent<Props, State> {
  state: State = {
    image: this.props.navigation.getParam('image'),
  };

  completeEdit = () => {
    const { navigation } = this.props;
    const handleEdit: (image: ImageInterface) => void = navigation.getParam(
      'handleEdit'
    );
    handleEdit(this.state.image);
    navigation.goBack(null);
  };

  render() {
    const { walk } = this.props;
    return (
      <SafeAreaView>
        <TopNavbar
          left={{
            view: <Image source={require('src/assets/icons/ic_save.png')} />,
            handlePress: () => {},
          }}
          center="이미지 편집"
          right={{ view: <Text>완료</Text>, handlePress: this.completeEdit }}
        />
        <ImageWithSticker image={this.state.image} walk={walk} size={width} />
      </SafeAreaView>
    );
  }
}

export default connect((state: ReducerState) => ({ walk: state.walk }))(Edit);
