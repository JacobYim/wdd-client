import React, { PureComponent } from 'react';
import {
  Dimensions,
  View,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

interface ImageInterface {
  ic_num: NodeRequire;
  img_prepare: NodeRequire;
}

interface Props {
  onFinish: () => void;
}

interface State {
  index: number;
}

const images: ImageInterface[] = [
  {
    ic_num: require('src/assets/icons/ic_num_3.png'),
    img_prepare: require('src/assets/images/img_prepare_3.png'),
  },
  {
    ic_num: require('src/assets/icons/ic_num_2.png'),
    img_prepare: require('src/assets/images/img_prepare_2.png'),
  },
  {
    ic_num: require('src/assets/icons/ic_num_1.png'),
    img_prepare: require('src/assets/images/img_prepare_1.png'),
  },
  {
    ic_num: require('src/assets/icons/ic_go.png'),
    img_prepare: require('src/assets/images/img_prepare_go.png'),
  },
];

const { width, height } = Dimensions.get('window');
const wrapperWidth = width * 0.802;
const iconHeight = height * 0.135;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: wrapperWidth,
    height: iconHeight,
  },
  icon: {
    width: '100%',
    height: iconHeight,
    resizeMode: 'contain',
  },
  image: {
    marginTop: height * 0.057,
    width: wrapperWidth,
    height: height * 0.519,
    resizeMode: 'contain',
  },
});

class Prepare extends PureComponent<Props, State> {
  private scroll = React.createRef<FlatList<ImageInterface>>();
  private interval: any;
  state: State = { index: 0 };

  componentDidMount() {
    const scroll = this.scroll.current;
    this.interval = setInterval(() => {
      const index = this.state.index + 1;
      if (index === images.length) {
        clearInterval(this.interval);
        this.props.onFinish();
      } else {
        this.setState({ index });
        if (scroll) scroll.scrollToIndex({ index, animated: true });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { index } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.iconWrapper}>
          <FlatList
            ref={this.scroll}
            data={images}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            onScrollToIndexFailed={() => {}}
            keyExtractor={(i, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={item.ic_num} style={styles.icon} />
            )}
          />
        </View>
        <Image source={images[index].img_prepare} style={styles.image} />
      </SafeAreaView>
    );
  }
}

export default Prepare;
