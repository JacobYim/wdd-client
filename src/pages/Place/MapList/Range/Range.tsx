import produce from 'immer';
import React, { PureComponent } from 'react';
import { rangeWithUnit } from 'src/assets/functions/print';
import { height as navHeight } from 'src/components/module/TopNavbar/TopNavbar';
import { color, size } from 'src/theme';
import { filterHeight as resultHeight } from '../MapList.styles';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  range: number;
  handleChange: (range: number) => void;
}

interface State {
  activated: boolean;
}

const styles = StyleSheet.create({
  wrapper: { height: '100%', flexDirection: 'row', alignItems: 'center' },
  icon: { width: 8, height: 4 },
  range: { fontSize: 16, color: color.black, marginRight: 6 },
  modal: {
    flex: 1,
    backgroundColor: color.black33Opacity,
  },
  box: {
    width: 72,
    backgroundColor: color.white,
    marginTop: navHeight + resultHeight,
    paddingVertical: 7,
    marginLeft: size.horizontal,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionWrapper: {
    paddingVertical: 9,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: color.black,
  },
});

const RANGES = [0.3, 0.5, 1, 5];

class Range extends PureComponent<Props, State> {
  state: State = { activated: false };

  handleToggle = () => {
    this.setState(state =>
      produce(state, draft => {
        draft.activated = !state.activated;
      })
    );
  };

  handleChange = (range: number) => {
    const { handleChange } = this.props;
    handleChange(range);
    this.handleToggle();
  };

  render() {
    const curRange = this.props.range;
    return (
      <>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={this.handleToggle}
          activeOpacity={0.7}>
          <Text style={styles.range}>{rangeWithUnit(curRange, true)}</Text>
          <Image
            source={require('src/assets/icons/ic_dropdown.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Modal
          animationType="none"
          visible={this.state.activated}
          transparent
          hardwareAccelerated
          onRequestClose={this.handleToggle}>
          <TouchableOpacity
            style={styles.modal}
            onPress={this.handleToggle}
            activeOpacity={1}>
            <SafeAreaView />
            <View style={styles.box}>
              {RANGES.map(range => (
                <TouchableOpacity
                  style={styles.optionWrapper}
                  activeOpacity={0.7}
                  onPress={() => this.handleChange(range)}
                  key={range}>
                  <Text
                    style={[
                      styles.label,
                      curRange === range ? { color: color.blue } : null,
                    ]}>
                    {rangeWithUnit(range, true)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
}

export default Range;
