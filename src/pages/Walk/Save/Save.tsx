import moment from 'moment';
import React, { createRef, PureComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import TopNavbar from 'src/components/module/TopNavbar';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import ImageMarker from './ImageMarker';
import { icons, texts, views } from './Save.styles';
import TextMarker from './TextMarker';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

interface Props extends NavigationScreenProps {
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
}

const CENTER = { x: 0.5, y: 0.5 };

class Save extends PureComponent<Props> {
  private map = createRef<MapView>();

  handleDismiss = () => {
    const { navigation, updateStatus } = this.props;
    updateStatus('READY');
    navigation.popToTop();
  };

  handleUpload = () => {};

  googleMapDidMount = () => {
    const map = this.map.current;
    if (!map) return;
    const { width, height } = Dimensions.get('window');
    map.fitToCoordinates(this.props.walk.pins, {
      animated: false,
      edgePadding: {
        top: height * 0.1,
        right: width * 0.12,
        bottom: height * 0.05,
        left: width * 0.12,
      },
    });
  };

  render() {
    const { walk } = this.props;
    const lastIndex = walk.pins.length - 1;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            ref={this.map}
            onLayout={this.googleMapDidMount}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            zoomEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            toolbarEnabled={false}>
            <Polyline
              coordinates={walk.pins}
              lineCap="round"
              lineJoin="round"
              strokeWidth={6}
              strokeColor="#127EFF"
            />
            <Marker coordinate={walk.pins[0]}>
              <TextMarker text="출발" />
            </Marker>
            <Marker coordinate={walk.pins[lastIndex]}>
              <TextMarker text="도착" blackMode />
            </Marker>
            {walk.pins.slice(1, lastIndex).map(
              (pin, index) =>
                pin.type && (
                  <Marker key={index} coordinate={pin}>
                    <ImageMarker
                      source={
                        pin.type === 'pee'
                          ? require('src/assets/icons/ic_pee_small.png')
                          : require('src/assets/icons/ic_poo_small.png')
                      }
                    />
                  </Marker>
                )
            )}
          </MapView>
          <SafeAreaView>
            <TopNavbar
              right={{
                handlePress: this.handleDismiss,
                view: (
                  <Image
                    style={icons.close}
                    source={require('src/assets/icons/ic_close.png')}
                  />
                ),
              }}
              transparent
            />
          </SafeAreaView>
        </View>
        <SafeAreaView>
          <View style={views.dashboard} />
          <View style={views.info}>
            <Text style={texts.title}>오늘의 산책기록</Text>
            <Text style={texts.timestamp}>
              {moment(walk.createdAt).format('YYYY년 MM월 DD일 dddd')}
            </Text>
          </View>
          <TouchableOpacity
            style={views.upload}
            onPress={this.handleUpload}
            activeOpacity={0.7}>
            <Text style={texts.upload}>내 피드 올리기</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  ({ walk }: ReducerState) => ({ walk }),
  { updateStatus: actions.updateStatus }
)(Save);
