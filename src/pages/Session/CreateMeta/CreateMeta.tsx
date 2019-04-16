import moment from 'moment';
import React, { PureComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import PageContainer from 'src/components/container/PageContainer';
import DateInput, { HandleChangeDate } from 'src/components/module/DateInput';
import Selector, { HandleChangeSelector } from 'src/components/module/Selector';
import * as userActions from 'src/store/actions/user';
import { ReducerState } from 'src/store/reducers';

interface Props extends NavigationScreenProps {
  createMeta: typeof userActions.createMeta;
  user: ReducerState['user'];
}

interface State {
  getUserFromStore: boolean;
  gender?: 'M' | 'F';
  birth?: Date;
}

class CreateMeta extends PureComponent<Props, State> {
  state: State = { getUserFromStore: false };

  static getDerivedStateFromProps({ user }: Props, state: State) {
    if (!state.getUserFromStore) {
      if (user.gender && user.birth) {
        return {
          gender: user.gender as ('M' | 'F'),
          birth: new Date(user.birth),
          getUserFromStore: true,
        };
      }
      return { gender: undefined, birth: undefined, getUserFromStore: true };
    }
    return null;
  }

  handleChange = ({ name, value }: HandleChangeSelector | HandleChangeDate) => {
    this.setState(state => ({ ...state, [name]: value }));
  };

  handleSubmit = () => {
    const { createMeta, navigation } = this.props;
    const { birth, gender } = this.state;
    if (gender) {
      const payload = {
        gender,
        birth: moment(birth).format('YYYY.MM.DD'),
      };
      createMeta(payload, navigation);
    }
  };

  render() {
    const { gender, birth } = this.state;
    const { navigation } = this.props;

    return (
      <PageContainer
        title="환영합니다!"
        subtitle={
          '고객님과 댕댕이의 즐거운 산책을 위해 간단한 정보가 필요합니다.\n\n먼저, 보호자의 성별과 생년월일을 입력해주세요.'
        }
        left={{ navigation }}
        right={{
          view: '건너뛰기',
          handlePress: () => navigation.navigate('app'),
        }}
        bottomBox={{
          text: '다음',
          handlePress: this.handleSubmit,
          disable: !gender || !birth,
        }}>
        <Selector
          name="gender"
          label="성별"
          value={gender}
          list={[{ name: 'M', label: '남자' }, { name: 'F', label: '여자' }]}
          handleChange={this.handleChange}
        />
        <DateInput
          name="birth"
          label="생년월일"
          value={birth}
          handleChange={this.handleChange}
        />
      </PageContainer>
    );
  }
}

export default connect(
  (state: ReducerState) => ({ user: state.user }),
  {
    createMeta: userActions.createMeta,
  }
)(CreateMeta);
