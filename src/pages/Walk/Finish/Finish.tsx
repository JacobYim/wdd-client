import produce from 'immer';
import moment from 'moment';
import React, { createRef, PureComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
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
import {
  Image,
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props extends NavigationScreenProps {
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
  updateCount: typeof actions.updateCount;
}

interface State {
  pees: ReducerState['walk']['pins'];
  poos: ReducerState['walk']['pins'];
}

const CENTER = { x: 0.5, y: 0.5 };

class Finish extends PureComponent<Props, State> {
  private map = createRef<MapView>();

  state: State = { pees: [], poos: [] };

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
        this.props.updateCount({
          pees: draft.pees.length,
          poos: draft.poos.length,
        });
      })
    );
  }

  handleDismiss = () => {
    const { navigation, updateStatus } = this.props;
    updateStatus('READY');
    navigation.popToTop();
  };

  handleUpload = async () => {
    const { navigation } = this.props;
    const map = this.map.current;
    if (!map) return;
    const snapshot = await map.takeSnapshot({
      width: 800,
      height: 800,
      format: 'png',
      quality: 0.8,
      result: 'file',
    });
    navigation.navigate('upload', { snapshot });
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
    const { walk } = this.props;
    const { pees, poos } = this.state;

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
            <Marker coordinate={walk.pins[walk.pins.length - 1]}>
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
  { updateStatus: actions.updateStatus, updateCount: actions.updateCount }
)(Finish);
