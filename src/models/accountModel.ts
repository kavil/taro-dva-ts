import * as Api from '../service/apiService';
export default {
  namespace: 'account',
  state: {},
  effects: {
    *load({ payload }, { call, put }) {
      const res = yield call(Api.Demo, { payload });
      if (res.errno === 0) {
        yield put({
          type: 'save',
          payload: {
            topData: res.data // 模拟
          }
        });
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
