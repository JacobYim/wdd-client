import React, { Component } from 'react';
import moment from 'moment';
import { NavigationScreenProp } from 'react-navigation';

import PageContainer from 'src/components/module/PageContainer';
import DateInput, { HandleChangeDate } from 'src/components/module/DateInput';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  gender: 'M' | 'F' | '';
  birth: Date;
}

class SignUpMeta extends Component<Props, State> {
  state: State = {
    gender: '',
    birth: moment()
      .subtract(20, 'years')
      .toDate(),
  };

  navToBack = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  navToSession = () => {
    const { navigation } = this.props;
    navigation.popToTop();
  };

  navToNext = () => {};

  handleGenderChange = ({ name, value }: HandleChangeSelector) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleDateChange = ({ name, value }: HandleChangeDate) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  render() {
    return (
      <PageContainer
        title="환영합니다!"
        subtitle="고객님께 더 적절한 산책과 댕댕이를 위해 몇 가지 정보를 입력해주세요."
        left={{ text: '이전', handlePress: this.navToBack }}
        right={{ text: '취소', handlePress: this.navToSession }}
        bottom={{
          text: '다음',
          boxType: true,
          handlePress: this.navToNext,
          disable: !this.state.gender || !this.state.birth,
        }}
        scrollEnabled={false}>
        <Selector
          name="gender"
          label="성별"
          list={[{ name: 'M', label: '남자' }, { name: 'F', label: '여자' }]}
          handleChange={this.handleGenderChange}
        />
        <DateInput
          name="birth"
          label="생년월일"
          value={this.state.birth}
          handleChange={this.handleDateChange}
        />
      </PageContainer>
    );
  }
}

export default SignUpMeta;
