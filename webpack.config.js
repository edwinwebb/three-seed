const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = './build/';

module.exports = {
  entry: ['./src/entry.js'],
  output: {
    path: path.join(__dirname, buildPath),
    filename: '[name].[hash].js'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      },{
        test: /\.(jpe?g|png|gif|svg|json|obj|mat|mp3|ogg)$/i,
        use: 'file-loader'
      },{
        test: /\.(vert|frag|glsl|shader|txt)$/i,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({'title': 'three-seed project'})
  ],
  devServer: {
    contentBase: path.join(__dirname, buildPath),
    compress: true,
    port: 8080
  }
}
