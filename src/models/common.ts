import Taro from '@tarojs/taro';

export default {
  namespace: 'common',
  state: {
    accessToken: Taro.getStorageSync('accessToken'),
    userInfo: Taro.getStorageSync('userInfo')
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
