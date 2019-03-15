import React, { createRef, PureComponent } from 'react';
import { Alert, Dimensions, Image, SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import BottomButtons from './BottomButtons';
import { icons, views } from './SaveWalk.styles';
import MapView, {
  Marker,
  Overlay,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

interface Props extends NavigationScreenProps {
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
}

interface State {
  peePooPins: ReducerState['walk']['pins'];
  bounds: [[number, number], [number, number]];
  showOverlay: boolean;
}

const center = { x: 0.5, y: 0.5 };
const DEFAULT_BOUND: [number, number] = [37.4734372, 127.0405071];

class SaveWalk extends PureComponent<Props, State> {
  private map = createRef<MapView>();

  state: State = {
    peePooPins: [],
    bounds: [DEFAULT_BOUND, DEFAULT_BOUND],
    showOverlay: false,
  };

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

  handleRegionChange = async () => {
    const map = this.map.current;
    if (map) {
      const { northEast, southWest } = await map.getMapBoundaries();
      this.setState({
        bounds: [
          [northEast.latitude, northEast.longitude],
          [southWest.latitude, southWest.longitude],
        ],
      });
    }
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
      <SafeAreaView style={views.container}>
        <MapView
          ref={this.map}
          onLayout={this.googleMapDidMount}
          provider={PROVIDER_GOOGLE}
          style={views.absolute}
          onRegionChangeComplete={this.handleRegionChange}
          zoomEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          toolbarEnabled={false}>
          <Overlay
            image={require('src/assets/images/bg_white_opacity.png')}
            bounds={this.state.bounds}
          />
          <Polyline
            coordinates={walk.pins}
            onLayout={() => this.setState({ showOverlay: true })}
            lineCap="round"
            lineJoin="round"
            strokeWidth={6}
            strokeColor="#FF6060"
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
        {this.state.showOverlay && (
          <>
            <LinearGradient
              style={views.topFilter}
              colors={['#FFFFFF', '#FFFFFF78']}
            />
            <LinearGradient
              style={views.bottomFilter}
              colors={['#FFFFFF78', '#FFFFFF']}
            />
          </>
        )}
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
          {}
        </PageContainer>
      </SafeAreaView>
    );
  }
}

export default connect(
  ({ walk }: ReducerState) => ({ walk }),
  {
    updateStatus: actions.updateStatus,
  }
)(SaveWalk);
