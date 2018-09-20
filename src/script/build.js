const webpack = require("webpack");
const logger = require("./logger");
const webpackConfig = require("./webpack.config.js");
webpack(webpackConfig, (err, stats) => {
    if (err) logger.fatal(err);
    logger.success(`Successfully build production`);
})