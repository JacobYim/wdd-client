import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { views } from './UpdateDog.styles';
import PageContainer from 'src/components/module/PageContainer';
import TextInput, { HandleChangeText } from 'src/components/module/TextInput';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  name: string;
  race: string;
  gender: 'M' | 'F' | 'N' | '';
}

class UpdateDog extends Component<Props, State> {
  state: State = {
    name: '',
    race: '',
    gender: '',
  };

  navToBack = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  navToSession = () => {
    const { navigation } = this.props;
    navigation.popToTop();
  };

  navToNext = () => {
    const { navigation } = this.props;
    navigation.navigate('tutorial');
  };

  handleChange = ({ name, value }: HandleChangeText | HandleChangeSelector) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleSubmit = () => {
    const { name, race, gender } = this.state;
  };

  render() {
    const { name, race, gender } = this.state;
    return (
      <PageContainer
        left={{ text: '이전', handlePress: this.navToBack }}
        right={{ text: '취소', handlePress: this.navToSession }}
        bottom={{
          text: '다음',
          boxType: true,
          handlePress: this.handleSubmit,
          disable: !name || !race || !gender,
        }}
        scrollEnabled={false}>
        <View style={views.thumbnailWrapper}>
          <TouchableOpacity style={views.thumbnailButton}>
            <Image
              style={views.thumbnail}
              source={require('src/lib/icons/ic_thumbnail.png')}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          name="name"
          label="이름"
          value={this.state.name}
          handleChange={this.handleChange}
        />
        <TextInput
          name="race"
          label="품종"
          value={this.state.race}
          handleChange={this.handleChange}
        />
        <Selector
          name="gender"
          label="성별"
          handleChange={this.handleChange}
          list={[
            { name: 'M', label: '수컷' },
            { name: 'F', label: '암컷' },
            { name: 'N', label: '중성화' },
          ]}
        />
      </PageContainer>
    );
  }
}

export default UpdateDog;
