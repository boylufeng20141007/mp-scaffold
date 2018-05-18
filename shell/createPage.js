/*
 * @Description 新建页面模板
 * @Author: luxlu
 * @Date: 2018-05-18 16:07:54
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-05-18 17:53:24
 */

const path = require('path');
const fs = require ('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');

const resolve = path.resolve;
const prompt = inquirer.prompt;
const pagePrefix = resolve(__dirname, '../src/pages');
const tplPrefix = resolve(__dirname, '../template/page');

prompt([{
  type: 'input',
  name: 'pageName',
  message: '请输入页面名称',
  default: `default-${Date.now()}`
}]).then(res => {
  createPage(res);
});


function createPage({ pageName }) {
  if (!pageName) return;

  const destPrefix = path.join(pagePrefix, pageName);
  
  const jsFile = resolve(destPrefix, `${pageName}.js`);
  const jsonFile = resolve(destPrefix, `${pageName}.json`);
  const styleFile = resolve(destPrefix, `${pageName}.scss`);
  const wxmlFile = resolve(destPrefix, `${pageName}.wxml`);

  fs.copy(resolve(tplPrefix, 'page.json'), jsonFile);
  fs.copy(resolve(tplPrefix, 'page.scss'), styleFile);
  fs.copy(resolve(tplPrefix, 'page.wxml'), wxmlFile);

  fs.copy(resolve(tplPrefix, 'page.js'), jsFile)
  .then(() => {
    updateTplContent({filePath: jsFile, fileName: pageName});
  })
  .catch(err => {
    console.log(chakl.bold.bgRed.white('新建页面失败'));
    console.error(err);
  });
}

function updateTplContent({filePath, fileName}) {
  fs.readFile(filePath, 'utf8', (err,data) => {
    if (err) {
        return console.log(chalk.red(err));
    }

    const result = data.replace(/\.\/page\.scss/g, `./${fileName}.scss`);//.replace(/\/page\.js/g, `/${name}.js`);

    fs.writeFile(filePath, result, 'utf8', err => {
        if ( err ) {
            return console.log(chalk.red(err));
        }
        console.log(chalk.green(`${fileName}-page 新建成功`));
    });
  });
  
}
