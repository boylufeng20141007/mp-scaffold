import fs from 'fs';
import path from 'path';
import entry from './scripts/pagesEntry';
import rules from './scripts/moduleRules';
import { BannerPlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

// src/ 直接拷贝到dist/
const fromDirPrefix = 'src/pages/*/*';
const toDirPrefix = 'pages/[name]/[name]';
const pattern = [
  {from: 'src/assets', to: 'assets'},
  {from: 'src/app/app.json', to: 'app.json'},
  {from: `${fromDirPrefix}.wxml`, to: `${toDirPrefix}.wxml`},
  {from: `${fromDirPrefix}.json`, to: `${toDirPrefix}.json`},
  {from: `${fromDirPrefix}.wxss`, to: `${toDirPrefix}.wxss`}
];

export default ({ dev }) => ({
  mode: dev ? 'development' : 'production',
  stats: dev ? 'none' : {
    colors: true,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: false
  },
  devtool: dev ? 'source-map' : 'none',
  entry: entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'global',
  },
  module: {
    rules: rules
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
  },
  optimization: {
    runtimeChunk: {
      name: 'chunks/runtime'
    },
    splitChunks: {
      cacheGroups: {
        // npm 包
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunks/vendors',
            chunks: 'all',
        },
        // 项目公共函数
        scripts: {
            test: /[\\/]src[\\/]scripts[\\/]/,
            name: 'chunks/scripts',
            chunks: 'all',
            // 强制提取
            enforce: true,
        },
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin(pattern),
    new ExtractTextPlugin('[name].wxss'),
    new FriendlyErrorsWebpackPlugin(),
    new BannerPlugin({
      raw: true,
      // 因为无法通过 html 的 script 标签插入
      // 所以只好在入口文件 app.js 前插入公共依赖
      banner: `require('./chunks/runtime');require('./chunks/vendors');require('./chunks/scripts');`,
      include: 'app.js',
    })
  ],
});