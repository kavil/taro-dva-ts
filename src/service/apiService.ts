import request from '../utils/request';
import { baseUrl } from '../config';


export const demo = data => request({
  url: baseUrl + 'url',
  method: 'POST',
  data,
});

import Request from '../utils/request';

export const account = data => Request({
  url: this.baseUrl + 'url',
  method: 'POST',
  data,
});

// 模板自动生成占位 勿删

