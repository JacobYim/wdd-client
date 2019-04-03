import produce from 'immer';
import React, { PureComponent } from 'react';
import { rangeWithUnit } from 'src/assets/functions/print';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import { height as navHeight } from 'src/components/module/TopNavbar/TopNavbar';
import { color } from 'src/theme';
import { filterHeight as resultHeight } from '../Map.styles';
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
    width: 80,
    backgroundColor: color.white,
    marginTop: navHeight + resultHeight + 8,
    marginLeft: horizontalSize,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    borderColor: color.grayB1,
  },
  optionWrapper: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: color.grayEF,
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
    const { range } = this.props;

    return (
      <>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={this.handleToggle}
          activeOpacity={0.7}>
          <Text style={styles.range}>{rangeWithUnit(range)}</Text>
          <Image
            source={require('src/assets/icons/ic_dropdown.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Modal visible={this.state.activated} transparent>
          <TouchableOpacity
            style={styles.modal}
            onPress={this.handleToggle}
            activeOpacity={1}>
            <SafeAreaView />
            <View style={styles.box}>
              {RANGES.map((range, index) => (
                <TouchableOpacity
                  style={[
                    styles.optionWrapper,
                    { ...(index > 0 ? styles.borderTop : null) },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => this.handleChange(range)}
                  key={range}>
                  <Text>{rangeWithUnit(range)}</Text>
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
