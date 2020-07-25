/**
 * pages模版快速生成脚本,执行命令 npm run tpl `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tpl test');
  process.exit(0);
}

// 页面模版
const indexTep = `import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

type PageState = {}
interface PageDvaProps {
  dispatch: Function,
}
interface PageOwnProps {
  // 父组件要传放这
}
interface PageStateProps {
  // 自己要用的放这
}
type IProps = PageStateProps & PageDvaProps & PageOwnProps
@connect(({ ${dirName}, loading }) => ({
  ...${dirName},
}))
class ${titleCase(dirName)} extends Component<IProps, {}> {
  config = {
    navigationBarTitleText: '${dirName}',
  };
  componentDidMount() {
  };
  render() {
    const { } = this.props;
    return (
      <View className="${dirName}-page">
        ${dirName}
      </View>
    )
  }
}
export default  ${titleCase(dirName)} as ComponentClass<PageOwnProps, PageState>;
`;

// scss文件模版
const scssTep = `
@import "../../static/css/mixin";
.${dirName}-page {

}
`;

// model文件模版
const modelTep = `import * as Api from '../service/apiService';
export default {
  namespace: '${dirName}',
  state: {

  },
  effects: {
    * load({ payload }, { call, put }) {
      const res = yield call(Api.Demo, { payload });
      if (res.errno === 0) {
        yield put({ 
          type: 'save',
          payload: {
            topData: res.data, // 模拟
          } 
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
`;

// service页面模版
const serviceTep = `export const ${dirName} = data => Request({ url: '/url', method: 'GET', data });
// 模板自动生成占位 勿删`;

const apptsTep = `'pages/index/index',
      'pages/${dirName}/index',`

const modelsIndexTep1 = `${dirName}Model,
  common,`

const modelsIndexTep2 = `import ${dirName}Model from './${dirName}Model';
import common from './common';`

try {
  fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
} catch (e) {
  console.log(`${dirName}目录已存在，生成失败`);
  process.exit(0);
}
fs.writeFileSync(`./src/pages/${dirName}/index.tsx`, indexTep);
fs.writeFileSync(`./src/pages/${dirName}/index.scss`, scssTep);
fs.writeFileSync(`./src/models/${dirName}Model.ts`, modelTep);

const apiService = fs.readFileSync(`./src/service/apiService.ts`, 'utf8');

if (!apiService.includes(`export const ${dirName}`)) {
  const newApiService = apiService.replace(/\/\/ 模板自动生成占位 勿删/, serviceTep);
  fs.writeFileSync('./src/service/apiService.ts', newApiService);
}

const appts = fs.readFileSync(`./src/app.tsx`, 'utf8');
if (!appts.includes(`pages/${dirName}/index`)) {
  const newAppts = appts.replace(/\'pages\/index\/index\'\,/, apptsTep);
  fs.writeFileSync('./src/app.tsx', newAppts);
}

const modelsIndex = fs.readFileSync(`./src/models/index.ts`, 'utf8');
if (!modelsIndex.includes(`${dirName}Model`)) {
  const _newModelsIndex = modelsIndex.replace(/common,/, modelsIndexTep1);
  const newModelsIndex = _newModelsIndex.replace("import common from './common';", modelsIndexTep2);
  fs.writeFileSync('./src/models/index.ts', newModelsIndex);
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