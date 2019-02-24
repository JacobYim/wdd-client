import React, { PureComponent, createRef } from 'react';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import TopNavbar from 'src/components/module/TopNavbar';
import { ReducerState } from 'src/store/reducers';
import * as actions from 'src/store/actions/walk';
import { views } from './SaveWalk.styles';

interface Props {
  navigation: NavigationScreenProp<any>;
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
}

class SaveWalk extends PureComponent<Props> {
  private map = createRef<MapView>();

  handleDismiss = () => {
    const { navigation, updateStatus } = this.props;
    updateStatus('READY');
    navigation.popToTop();
  };

  mapDidMount = () => {
    const map = this.map.current;
    const edgePadding = { top: 10, right: 10, bottom: 10, left: 10 };
    if (map)
      map.fitToCoordinates(this.props.walk.pins, {
        edgePadding,
        animated: false,
      });
  };

  render() {
    const { walk } = this.props;
    return (
      <SafeAreaView style={views.container}>
        <MapView
          ref={this.map}
          onLayout={this.mapDidMount}
          provider={PROVIDER_GOOGLE}
          style={views.map}
          scrollEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}>
          <Polyline
            coordinates={walk.pins}
            strokeWidth={4}
            strokeColor="#2962FF"
          />
        </MapView>
        <TopNavbar
          right={{ handlePress: this.handleDismiss, view: <Text>닫기</Text> }}
        />
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
