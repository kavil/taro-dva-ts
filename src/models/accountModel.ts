import { Reducer } from 'redux';
import { Model } from 'dva';
import * as Api from '../service/apiService';

export interface StateType {
  accountState: string;
}

interface ModelType {
  namespace: string;
  state: StateType;
  effects: {};
  reducers: {
    save: Reducer;
  };
}

const model: Model & ModelType = {
  namespace: 'account',
  state: {
    accountState: '自定义state'
  },
  effects: {
    *load({ payload }, { call, put }) {
      const res = yield call(Api, { payload });
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

export default model;
