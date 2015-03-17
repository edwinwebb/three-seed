var path = require('path');
var util = require('util');
var webpack = require('webpack');
var pkg = require('./package.json');

var DEBUG = process.env.NODE_ENV !== 'production';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

var plugins =[
  new webpack.optimize.OccurenceOrderPlugin()
];

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  );
}

var loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader?optional&optional=runtime'
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
    loader: 'file-loader?name=[path][name].[ext]'
  },
  {
    test: /\.html$/,
    loader: [
      'file-loader?name=[path][name].[ext]',
      'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'version='+pkg.version,
        'description='+pkg.description
      ].join('&')
    ].join('!')
  }
];

var config = {
  context: path.join(__dirname, 'app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? '#inline-source-map' : false,
  entry: {
    app: [
      'webpack/hot/dev-server',
      './app.js'
    ]
  },
  output: {
    path: pkg.config.build_dir,
    publicPath: '/',
    filename: jsBundle,
    pathinfo: DEBUG
  },
  module: {
    loaders: loaders
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
};

module.exports = config;
