/*
 * @description 获取webpack entry
 * @Author: luxlu
 * @Date: 2018-05-17 15:52:13
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-05-18 11:43:48
 */
import path from 'path';
import { pages } from '../src/app/app.json';

const resolve = (...dir) => path.resolve(...dir);

const entry = Object.assign({app: './src/app/app'},
  pages.map(page => ({
    [page]: resolve('src', page)
  }))
  .reduce((acc, cur) => {
    return Object.assign(acc, cur);
  }, {})
  // TODO
  // .reduce((acc, cur) => ({...acc,...cur}), {})
);
console.log(entry);

// [{'pages/index/index': 'D:src/pages/index/index'}, {'page/list/list': 'D://project/../list/list'}]

export default entry;
