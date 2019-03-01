import React, { createRef, PureComponent } from 'react';
import { Alert, Dimensions, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import BottomButtons from './BottomButtons';
import { icons, views } from './SaveWalk.styles';
import MapView, {
  Callout,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

interface Props {
  navigation: NavigationScreenProp<any>;
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
}

interface State {
  peePooPins: ReducerState['walk']['pins'];
}

const center = { x: 0.5, y: 0.5 };

class SaveWalk extends PureComponent<Props, State> {
  private map = createRef<MapView>();

  state: State = { peePooPins: [] };

  componentDidMount() {
    this.setState({
      peePooPins: this.props.walk.pins.filter(pin => pin.type !== undefined),
    });
  }

  handleDismiss = () => {
    const { navigation, updateStatus } = this.props;
    updateStatus('READY');
    navigation.popToTop();
  };

  handlePressDownload = () => {
    Alert.alert('작업중입니다.');
  };

  handlePressFeed = () => {
    Alert.alert('작업중입니다.');
  };

  googleMapDidMount = () => {
    const map = this.map.current;
    const { width, height } = Dimensions.get('window');
    if (map) {
      map.fitToCoordinates(this.props.walk.pins, {
        animated: false,
        edgePadding: {
          top: height * 0.3,
          right: width * 0.12,
          bottom: height * 0.2,
          left: width * 0.12,
        },
      });
    }
  };

  render() {
    const { walk } = this.props;
    return (
      <>
        <MapView
          ref={this.map}
          onLayout={this.googleMapDidMount}
          provider={PROVIDER_GOOGLE}
          style={views.absolute}
          zoomEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          toolbarEnabled={false}>
          <Polyline
            coordinates={walk.pins}
            lineCap="round"
            lineJoin="round"
            strokeWidth={4}
            strokeColor="#FF6060"
            // strokeColors={strokeColors}
          />
          {/* Start & END Pinpoint */}
          <Marker coordinate={walk.pins[0]} anchor={center}>
            <View style={[icons.marker, icons.end]} />
          </Marker>
          <Marker
            coordinate={walk.pins[walk.pins.length - 1]}
            anchor={center}
            image={require('src/assets/icons/ic_cur_location.png')}
          />
          {/* Pee & Poo Pinpoint */}
          {this.state.peePooPins.map((pin, i) => (
            <Marker coordinate={pin} anchor={{ x: 0.5, y: 0.838 }} key={i}>
              <View style={views.pin}>
                <View style={views.absolute}>
                  <Image
                    source={require('src/assets/icons/ic_pin.png')}
                    style={icons.pin}
                  />
                </View>
                <Image
                  source={
                    pin.type === 'pee'
                      ? require('src/assets/icons/ic_pee.png')
                      : require('src/assets/icons/ic_poo.png')
                  }
                  style={icons.pinType}
                />
              </View>
            </Marker>
          ))}
        </MapView>
        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF00', '#FFFFFF00', '#FFFFFF']}
          locations={[0.16, 0.4, 0.68, 0.84]}
          style={views.container}>
          <PageContainer
            right={{
              handlePress: this.handleDismiss,
              view: (
                <Image
                  style={icons.close}
                  source={require('src/assets/icons/ic_close.png')}
                />
              ),
            }}
            bottom={{
              view: (
                <BottomButtons
                  handlePressDownload={this.handlePressDownload}
                  handlePressFeed={this.handlePressFeed}
                />
              ),
              styles: views.bottomWrapper,
            }}
            title={'오늘의 행복한 순간을\n기록해보세요!'}
            titleNarrow>
            <View />
          </PageContainer>
        </LinearGradient>
      </>
    );
  }
}

export default connect(
  ({ walk }: ReducerState) => ({ walk }),
  {
    updateStatus: actions.updateStatus,
  }
)(SaveWalk);
