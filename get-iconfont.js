
const fs = require('fs');
const request = require('request');

const fontPath = 'http://at.alicdn.com/t/font_153770_qxdb439a27p'
const suffixs = ['.eot', '.woff', '.ttf', '.svg', '.css'];

const promise = (ele) => {
  return new Promise((resolve, reject) => {
    const downloadPath = `${fontPath}${ele}`;
    const options = {
      method: 'GET',
      url: downloadPath,
      headers: {
        'cache-control': 'no-cache'
      }
    };
    request(options, (error, response, body) => {
      if (error) {
        reject(`iconfont${ele}下载失败了`);
        throw new Error(error);
      }
      if (ele === '.css') {
        body = body.replace(/16px/, '50px');
        fs.writeFileSync(`./src/static/iconfont/iconfont.scss`, body);
      } else {
        fs.writeFileSync(`./src/static/iconfont/iconfont${ele}`, body);
      }
      resolve(`iconfont${ele}下载成功`);
    });
  });
};
const promises = suffixs.map((ele) => {
  return promise(ele);
});
Promise.all(promises).then((res) => {
  console.log(res);
  process.exit(0);
});

