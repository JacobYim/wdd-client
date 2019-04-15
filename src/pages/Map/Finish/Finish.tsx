import produce from 'immer';
import moment from 'moment';
import React, { createRef, PureComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { rangeWithUnit } from 'src/assets/functions/print';
import TopNavbar from 'src/components/module/TopNavbar';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import { icons, texts, views } from './Finish.styles';
import ImageMarker from './ImageMarker';
import InfoCard from './InfoCard';
import TextMarker from './TextMarker';
import MapView, {
  Marker,
  LatLng,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  Image,
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageEditor,
  Alert,
} from 'react-native';

interface Props extends NavigationScreenProps {
  walk: ReducerState['walk'];
  user: ReducerState['user'];
  updateStatus: typeof actions.updateStatus;
  updateCount: typeof actions.updateCount;
}

interface State {
  start: LatLng;
  end: LatLng;
  pees: ReducerState['walk']['pins'];
  poos: ReducerState['walk']['pins'];
}

const CENTER = { x: 0.5, y: 0.5 };

class Finish extends PureComponent<Props, State> {
  private mapWrapper = createRef<View>();
  private map = createRef<MapView>();

  state: State = {
    start: { latitude: 0, longitude: 0 },
    end: { latitude: 0, longitude: 0 },
    pees: [],
    poos: [],
  };

  componentDidMount() {
    const { pins } = this.props.walk;
    this.setState(state =>
      produce(state, draft => {
        for (let i = 1; i < pins.length - 2; i += 1) {
          if (pins[i].type) {
            if (pins[i].type === 'pee') draft.pees.push(pins[i]);
            else draft.poos.push(pins[i]);
          }
        }
        draft.start = pins[0];
        draft.end = pins[pins.length - 1];
        this.props.updateCount({
          pees: draft.pees.length,
          poos: draft.poos.length,
        });
      })
    );
  }

  handleDismiss = () => {
    const { navigation, updateStatus } = this.props;
    navigation.popToTop();
    updateStatus('READY');
  };

  handleUpload = () => {
    const { navigation } = this.props;
    const map = this.map.current;
    const mapWrapper = this.mapWrapper.current;
    if (!map || !mapWrapper) return;

    mapWrapper.measure(async (x, y, width, height) => {
      const snapshot = await map.takeSnapshot({
        width,
        height,
        format: 'png',
      });
      Image.getSize(
        snapshot,
        (imgWidth, imgHeight) => {
          const options = {
            offset: { x: 0, y: (imgHeight - imgWidth) / 2 },
            size: { width: imgWidth, height: imgWidth },
          };
          ImageEditor.cropImage(
            snapshot,
            options,
            uri => {
              navigation.navigate('upload', {
                snapshot: uri,
                handleDismiss: this.handleDismiss,
              });
            },
            err => {}
          );
        },
        err => {}
      );
    });
  };

  googleMapDidMount = (e: LayoutChangeEvent) => {
    const map = this.map.current;
    if (!map) return;
    const { width, height } = e.nativeEvent.layout;
    const horizontal = width * 0.12;
    const vertical = (height - width) / 2 + horizontal;
    map.fitToCoordinates(this.props.walk.pins, {
      animated: false,
      edgePadding: {
        top: vertical,
        left: horizontal,
        bottom: vertical,
        right: horizontal,
      },
    });
  };

  render() {
    const { walk, user } = this.props;
    const { pees, poos, start, end } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View ref={this.mapWrapper} style={{ flex: 1 }}>
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
            <Marker coordinate={start}>
              <TextMarker text="출발" />
            </Marker>
            <Marker coordinate={end}>
              <TextMarker text="도착" blackMode />
            </Marker>
            {pees.map((pin, index) => (
              <Marker key={index} coordinate={pin} anchor={CENTER}>
                <ImageMarker source={require('src/assets/icons/ic_pee.png')} />
              </Marker>
            ))}
            {poos.map((pin, index) => (
              <Marker key={index} coordinate={pin} anchor={CENTER}>
                <ImageMarker source={require('src/assets/icons/ic_poo.png')} />
              </Marker>
            ))}
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
          <View style={views.dashboard}>
            <InfoCard
              icon={require('src/assets/icons/ic_time.png')}
              value={`${Math.floor(walk.seconds / 60)}분`}
            />
            <InfoCard
              icon={require('src/assets/icons/ic_distance.png')}
              value={rangeWithUnit(walk.distance)}
            />
            <InfoCard
              icon={require('src/assets/icons/ic_poo_gray.png')}
              value={`${walk.poos}회`}
            />
            <InfoCard
              icon={require('src/assets/icons/ic_pee_gray.png')}
              value={`${walk.pees}회`}
            />
          </View>
          <View style={views.info}>
            <Text style={texts.title}>오늘의 산책기록</Text>
            <Text style={texts.timestamp}>
              {moment(walk.createdAt).format('YYYY년 MM월 DD일 dddd')}
            </Text>
          </View>
          {user.email.length !== 0 && (
            <TouchableOpacity
              style={views.upload}
              onPress={this.handleUpload}
              activeOpacity={0.7}>
              <Text style={texts.upload}>내 피드 올리기</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  (state: ReducerState) => ({ walk: state.walk, user: state.user }),
  { updateStatus: actions.updateStatus, updateCount: actions.updateCount }
)(Finish);
