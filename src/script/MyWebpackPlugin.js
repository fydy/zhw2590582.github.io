const path = require("path");
const glob = require("glob");
const chokidar = require('chokidar');
const { updateMeta, dataPath } = require('./utils');
const isProd = process.env.NODE_ENV === "production";

const dependencies = [
  path.join(dataPath().config, 'wrap.js'),
  ...glob.sync(path.join(dataPath().pages, '*.md'))
]

module.exports = class MyWebpackPlugin {
  constructor(options) {
    // 
  }

  apply(compiler) {
    // 添加额外编译监听
    compiler.hooks.afterCompile.tap("after-compile", compilation => {
      dependencies.forEach(item => {
        compilation.fileDependencies.add(item);
      });
    });

    // 监听编译文章
    if (isProd) {
      glob.sync(path.join(dataPath().posts, '*.md')).forEach(item => {
        const name = path.basename(item).replace(".md", "");
        updateMeta(name, false);
      });
    } else {      
      chokidar.watch(path.join(dataPath().posts, '*.md')).on('all', (e, item) => {
        const name = path.basename(item).replace(".md", "");
        updateMeta(name, false);
      });
    }
  }
}
