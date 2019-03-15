import produce from 'immer';
import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';
import { icons, texts, views } from './Agreement.styles';
import Detail from './Detail';

interface Term {
  title: string;
  force?: boolean;
  agree: boolean;
  link: string;
}

interface RenderTermInterface extends Term {
  index: number;
}

interface State {
  checkAll: boolean;
  terms: Term[];
  detail?: {
    title: string;
    link: string;
  };
}

class Agreement extends Component<NavigationScreenProps, State> {
  state: State = {
    checkAll: false,
    terms: [
      {
        title: '서비스 이용 약관',
        force: true,
        agree: false,
        link: 'http://policy.woodongdang.com/',
      },
      {
        title: '개인정보 이용 약관',
        agree: false,
        link: '',
      },
    ],
  };

  hideDetail = () => {
    this.setState({ detail: undefined });
  };

  showDetail = (detail: State['detail']) => {
    if (detail && !this.state.detail) {
      this.setState({ detail });
    }
  };

  handleCheckAll = () => {
    this.setState(state =>
      produce(state, draft => {
        draft.terms.forEach(term => {
          term.agree = !state.checkAll;
        });
        draft.checkAll = !state.checkAll;
      })
    );
  };

  handleAgree = (index: number) => {
    this.setState(state =>
      produce(state, draft => {
        let count = 0;
        draft.terms[index].agree = !state.terms[index].agree;
        draft.terms.forEach(term => {
          if (term.agree) count += 1;
        });
        draft.checkAll = draft.terms.length === count;
      })
    );
  };

  renderTerm = ({ title, force, agree, link, index }: RenderTermInterface) => (
    <View style={views.termWrapper} key={index}>
      <TouchableOpacity
        style={views.termInfo}
        onPress={() => this.handleAgree(index)}
        activeOpacity={0.95}>
        <Image
          style={icons.agree}
          source={
            agree
              ? require('src/assets/icons/ic_check_on.png')
              : require('src/assets/icons/ic_check_off.png')
          }
        />
        <Text style={texts.termTitle}>{`${title} [${
          force ? '필수' : '선택'
        }]`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={views.termMore}
        activeOpacity={0.95}
        onPress={() => this.showDetail({ title, link })}>
        <Image
          style={icons.more}
          source={require('src/assets/icons/ic_more.png')}
        />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { navigation } = this.props;
    const { checkAll, terms } = this.state;

    return (
      <PageContainer
        title="약관동의"
        left={{ navigation }}
        bottomBox={{
          text: '확인',
          handlePress: () => navigation.navigate('signUpUser'),
          disable: !checkAll,
        }}>
        <TouchableOpacity
          style={[
            views.checkAll,
            views[checkAll ? 'checkAllOn' : 'checkAllOff'],
          ]}
          activeOpacity={0.95}
          onPress={this.handleCheckAll}>
          <Text
            style={[
              texts.checkAll,
              texts[checkAll ? 'checkAllOn' : 'checkAllOff'],
            ]}>
            아래 약관에 모두 동의합니다.
          </Text>
          <Image
            style={icons.agreeDog}
            source={require('src/assets/icons/ic_agree.png')}
          />
        </TouchableOpacity>
        {terms.map((term, index) => this.renderTerm({ ...term, index }))}
        <Detail hideDetail={this.hideDetail} detail={this.state.detail} />
      </PageContainer>
    );
  }
}

export default Agreement;
