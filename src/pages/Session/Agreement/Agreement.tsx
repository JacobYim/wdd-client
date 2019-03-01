import produce from 'immer';
import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import PageContainer from 'src/components/container/PageContainer';
import { icons, texts, views } from './Agreement.styles';

interface Term {
  title: string;
  agree: boolean;
  link: any;
}

interface RenderTermInterface extends Term {
  index: number;
}

interface Props {
  navigation: NavigationScreenProp<any>;
}

interface State {
  checkAll: boolean;
  terms: Term[];
}

class Agreement extends Component<Props, State> {
  state: State = {
    checkAll: false,
    terms: [
      {
        title: '서비스 이용 약관(필수)',
        agree: false,
        link: '',
      },
      {
        title: '개인정보 이용 약관(필수)',
        agree: false,
        link: '',
      },
    ],
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

  renderTerm = ({ title, agree, index }: RenderTermInterface) => (
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
        <Text style={texts.termTitle}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={views.termMore} activeOpacity={0.95}>
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
        }}
        alwaysShowBottom>
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
      </PageContainer>
    );
  }
}

export default Agreement;
