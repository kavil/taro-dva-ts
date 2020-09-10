/* eslint-disable import/no-commonjs */
/**
 * pages模版快速生成脚本,执行命令 npm run tpl `文件名`
 */

const fs = require('fs');

const prettier = require('prettier');

const prettierConfig = Object.assign(JSON.parse(fs.readFileSync(`./.prettierrc`, 'utf8')), { parser: 'babel' });

const dirName = process.argv[2];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tpl test');
  process.exit(0);
}

// 页面模版
const indexTep = `import React, { ComponentClass } from 'react';
import { View } from '@tarojs/components';
import { connect } from 'react-redux';

import { StateType } from '../../models/${dirName}Model';
import { ConnectProps, ConnectState } from '../../models/connect';

import './index.scss';

interface OwnProps {
  // 父组件要传的prop放这
  value: number;
}
interface OwnState {
  // 自己要用的state放这
}

type IProps = StateType & ConnectProps & OwnProps;
@connect(({ ${dirName}, loading }: ConnectState) => ({
  ...${dirName},
  ...loading
}))
class ${titleCase(dirName)} extends React.Component<IProps, OwnState> {
  componentDidMount() {}
  render() {
    const {} = this.props;
    return <View className="${dirName}-page">${dirName}</View>;
  }
}
export default ${titleCase(dirName)} as ComponentClass<OwnProps>;
`;

// scss文件模版
const scssTep = `
@import "../../static/css/mixin";
.${dirName}-page {

}
`;

// model文件模版
const modelTep = `import { Reducer } from 'redux';
import { Model } from 'dva';
import * as Api from '../service/apiService';

export interface StateType {
  ${dirName}State: string;
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
  namespace: '${dirName}',
  state: {
    ${dirName}State: '0'
  },
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

export default model;
`;

// service页面模版
const serviceTep = `export const ${dirName} = (data) => Request({ url: '/url', method: 'GET', data });
`;

const indexConfig = `export default {
  navigationBarTitleText: '${dirName}'
};
`;

const modelsIndexTep1 = `common,
  ${dirName}Model,`;

const modelsIndexTep2 = `import ${dirName}Model from './${dirName}Model';
import common from './common';`;

const connectTmp1 = `import { AnyAction, Dispatch } from 'redux';
import { StateType as ${titleCase(dirName)}State } from './${dirName}Model';`;

const connectTmp2 = `loading: Loading;
  ${dirName}: ${titleCase(dirName)}State;`;

try {
  fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
} catch (e) {
  console.log(`${dirName}目录已存在，生成失败`);
  process.exit(0);
}
fs.writeFileSync(`./src/pages/${dirName}/index.tsx`, indexTep);
fs.writeFileSync(`./src/pages/${dirName}/index.scss`, scssTep);
fs.writeFileSync(`./src/pages/${dirName}/index.config.ts`, indexConfig);
fs.writeFileSync(`./src/models/${dirName}Model.ts`, modelTep);

const apiService = fs.readFileSync(`./src/service/apiService.ts`, 'utf8');

if (!apiService.includes(`export const ${dirName}`)) {
  const newApiService = apiService + serviceTep;
  fs.writeFileSync('./src/service/apiService.ts', newApiService);
}

const connectFile = fs.readFileSync(`./src/models/connect.d.ts`, 'utf8');
if (!connectFile.includes(`import { StateType as ${dirName}State } from './${dirName}Model'`)) {
  const _newConnectFile = connectFile.replace(/import { AnyAction, Dispatch } from 'redux';/, connectTmp1);
  const newConnectFile = _newConnectFile.replace(/loading: Loading;/, connectTmp2);
  fs.writeFileSync('./src/models/connect.d.ts', newConnectFile);
}

const appConfigFile = fs.readFileSync(`./src/app.config.ts`, 'utf8');
if (!appConfigFile.includes(`pages/${dirName}/index`)) {
  const newAppConfigFile = appConfigFile.replace(/pages\: \[/, `pages: ['pages/${dirName}/index',`);
  fs.writeFileSync('./src/app.config.ts', prettier.format(newAppConfigFile, prettierConfig));
}

const modelsIndex = fs.readFileSync(`./src/models/index.ts`, 'utf8');
if (!modelsIndex.includes(`${dirName}Model`)) {
  const _newModelsIndex = modelsIndex.replace(/common,/, modelsIndexTep1);
  const newModelsIndex = _newModelsIndex.replace("import common from './common';", modelsIndexTep2);
  fs.writeFileSync('./src/models/index.ts', prettier.format(newModelsIndex, prettierConfig));
}

console.log(`模版${dirName}已创建 enjoy`);

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);
