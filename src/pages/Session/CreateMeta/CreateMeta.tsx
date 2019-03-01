import moment from 'moment';
import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DateInput, { HandleChangeDate } from 'src/components/module/DateInput';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';
import * as userActions from 'src/store/actions/user';

interface Props {
  navigation: NavigationScreenProp<any>;
  createMeta: typeof userActions.createMeta;
}

interface State {
  gender: 'M' | 'F' | '';
  birth: Date;
}

class CreateMeta extends Component<Props, State> {
  state: State = {
    gender: '',
    birth: moment()
      .subtract(20, 'years')
      .toDate(),
  };

  handleSubmit = () => {
    const { createMeta, navigation } = this.props;
    const payload = {
      gender: this.state.gender,
      birth: moment(this.state.birth).format('YYYY.MM.DD'),
    };

    createMeta(payload, navigation);
  };

  handleGenderChange = ({ name, value }: HandleChangeSelector) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleDateChange = ({ name, value }: HandleChangeDate) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  render() {
    const { navigation } = this.props;

    return (
      <PageContainer
        title="환영합니다!"
        subtitle="고객님께 더 적절한 산책과 댕댕이를 위해 몇 가지 정보를 입력해주세요."
        left={{ navigation }}
        right={{
          view: '건너뛰기',
          handlePress: () => navigation.navigate('app'),
        }}
        bottomBox={{
          text: '다음',
          handlePress: this.handleSubmit,
          disable: !this.state.gender || !this.state.birth,
        }}>
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

export default connect(
  null,
  {
    createMeta: userActions.createMeta,
  }
)(CreateMeta);
