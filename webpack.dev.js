'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlwebpackplugin = [];
  const entryfiles = glob.sync(path.join(__dirname, './src/page/*/index.js'));

  Object.keys(entryfiles).map((index) => {
    const entryfile = entryfiles[index];
    const match = entryfile.match(/src\/page\/(.*)\/index\.js/);

    const pageName = match && match[1]
    entry[pageName] = entryfile
    htmlwebpackplugin.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/page/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })

  return {
    entry,
    htmlwebpackplugin
  }
}
const { entry, htmlwebpackplugin } = setMPA();
module.exports = {
  mode: 'development',
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ].concat(htmlwebpackplugin),
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: 'source-map'
}