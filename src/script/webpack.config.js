const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SimpleI18nWebpackPlugin = require("simple-i18n-webpack-plugin");
const HtmlLayoutWebpackPlugin = require("html-layout-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const Reload4Plugin = require("@prakriya/reload4-html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MyWebpackPlugin = require('./MyWebpackPlugin');
const autoprefixer = require("autoprefixer");
const { themePath, dataPath, htmlList, beforeConfigCreate, cleanFiles } = require("./utils");
const theme = themePath();
const configPath = dataPath().config;
const config = require(configPath);
const isProd = process.env.NODE_ENV === "production";

const webpackConfig = {
  mode: isProd ? "production" : "development",
  devtool: isProd ? false : "cheap-module-source-map",
  entry: {
    common: path.join(theme.js, "common")
  },
  resolve: {
    extensions: [".js", ".scss", ".md"]
  },
  output: {
    path: config.dev.outputPath,
    filename: isProd ? "static/js/[name]-[hash].js" : "static/js/[name].js",
    publicPath: config.dev.publicPath
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-syntax-dynamic-import"]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: isProd ? true : false,
              minimize: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: isProd
                ? "static/fonts/[name]-[hash].[ext]"
                : "static/fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          { loader: "raw-loader" },
          {
            loader: "markdownit-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? "static/css/[name]-[hash].css" : "static/css/[name].css"
    }),
    new HtmlLayoutWebpackPlugin({
      include: path.join(theme.includes),
      layout: path.join(theme.layouts)
    }),
    new SimpleI18nWebpackPlugin({
      language: configPath,
      beforeCreate: beforeConfigCreate
    }),
    new webpack.ProvidePlugin({
      "__config__": configPath,
      "__database__": path.join(dataPath().database, 'index.json')
    }),
    new MyWebpackPlugin()
  ]
};

htmlList().forEach(item => {
  if (!config.dev.asyncImport) {
    webpackConfig.entry[item.chunkName] = item.chunkPath;
  }
  webpackConfig.plugins.unshift(
    new HtmlWebpackPlugin({
      filename: item.filename,
      template: item.template,
      chunks: ["vendor", "common", config.dev.asyncImport ? '' : item.chunkName],
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
          }
        : false
    })
  );
});

if (isProd) {
  webpackConfig.plugins.push(
    new SimpleProgressWebpackPlugin({
      format: "minimal"
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new OptimizeCssAssetsPlugin({
      // 
    }),
    new FileManagerPlugin({
      onStart: {
        delete: cleanFiles()
      }
    })
  );
} else {
  webpackConfig.plugins.push(new Reload4Plugin());
}

module.exports = webpackConfig;
