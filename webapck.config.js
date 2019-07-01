'use strict';

const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
}