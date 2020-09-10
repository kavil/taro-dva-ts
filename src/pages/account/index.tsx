import React, { ComponentClass } from 'react';
import { View } from '@tarojs/components';
import { connect } from 'react-redux';

import { StateType } from '../../models/accountModel';
import { ConnectProps, ConnectState } from '../../models/connect';

import './index.scss';
import { RectWrap } from '../../components/RectWrap';

interface OwnProps {
  // 父组件要传的prop放这
  value: number;
}
interface OwnState {
  // 自己要用的state放这
}

type IProps = StateType & ConnectProps & OwnProps;
@connect(({ account, loading }: ConnectState) => ({
  ...account,
  ...loading
}))
class Account extends React.Component<IProps, OwnState> {
  componentDidMount() {
    console.log(this.props.accountState);
  }
  render() {
    const { value } = this.props;
    return (
      <View className="account-page">
        <RectWrap title="Taro account页面">{value || 'account'}</RectWrap>
      </View>
    );
  }
}

export default Account as ComponentClass<OwnProps>;
