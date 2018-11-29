import * as Api from '../service/apiService';

export default {
  namespace: 'account',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const res = yield call(Api.demo, {});
      if (res.code === 0) {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
