import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({account}) => ({
  ...account,
}))
export default class Account extends Component {
  config = {
    navigationBarTitleText: 'account',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="account-page">
        account
      </View>
    )
  }
}
