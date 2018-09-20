const serve = require("webpack-serve");
const webpackConfig = require("./webpack.config.js");
const { dataPath } = require("./utils");
const config = require(dataPath().config);

serve(
  {
    open: true,
    port: config.dev.port
  },
  {
    config: webpackConfig
  }
).then(result => {
  //
});
