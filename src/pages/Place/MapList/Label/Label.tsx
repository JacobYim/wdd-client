import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Label as LabelType } from 'src/store/actions/place';
import { color } from 'src/theme';

interface Props {
  onChange: (label?: LabelType) => void;
}

interface State {
  label?: LabelType;
}

const height = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12,
  },
  listWrapper: {
    paddingRight: 12,
  },
  itemWrapper: {
    height,
    marginLeft: 8,
    paddingHorizontal: 12,
    borderRadius: height / 2,
    borderWidth: 1,
    borderColor: color.grayDA,
    backgroundColor: color.white,
    justifyContent: 'center',
  },
  text: {
    color: color.black,
    fontSize: 15,
  },
});

class Label extends PureComponent<Props, State> {
  state: State = { label: undefined };

  handleChange = (label?: LabelType) => {
    this.props.onChange(label);
    this.setState({ label });
  };

  render() {
    const label = this.state.label || '전체';
    return (
      <FlatList
        data={['전체', '카페', '식당', '병원', '용품', '술집', '기타']}
        keyExtractor={item => item}
        style={styles.container}
        contentContainerStyle={styles.listWrapper}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.itemWrapper,
              label === item
                ? { backgroundColor: color.blue, borderColor: color.blue }
                : null,
            ]}
            activeOpacity={0.7}
            onPress={() =>
              index === 0 ? this.handleChange() : this.handleChange(item)
            }>
            <Text
              style={[
                styles.text,
                label === item ? { color: color.white } : null,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

export default Label;
