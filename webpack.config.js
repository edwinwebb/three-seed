var path = require('path');
var pkg = require('./package.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  target : "web",
  entry : ["./app/app.js"],
  output : {
    path: path.join(__dirname, pkg.config.build),
    filename: "[name].[hash].js",
    devtool : 'source-map'
  },
  devServer: {
    outputPath : path.join(__dirname, pkg.config.build)
  },
  module : {
    loaders : [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg|json)$/i,
        loaders: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({'title' : pkg.config.title})
  ]
}
