var path = require('path');
var util = require('util');
var webpack = require('webpack');
var pkg = require('./package.json')

var DEBUG = process.env.NODE_ENV !== 'production';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

var entry = {
  app: ['./app.js']
};

if (DEBUG) {
  entry.app.push(
    util.format(
      'webpack-dev-server/client?http://%s:%d',
      pkg.config.devHost,
      pkg.config.devPort
    )
  );
  entry.app.push('webpack/hot/only-dev-server');
}

var config = {
  context: path.join(__dirname, 'app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? 'inline-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    loaders: getLoaders()
  },
  plugins: getPlugins(),
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir),
    hot: true,
    noInfo: false,
    inline: true,
    stats: { colors: true }
  }
};

function getPlugins() {
  var plugins = [
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
  return plugins;
}

function getLoaders() {

  var jsxLoader;
  var fileLoader = 'file-loader?name=[path][name].[ext]';
  var htmlLoader = [
    'file-loader?name=[path][name].[ext]',
    'template-html-loader?' + [
      'raw=true',
      'engine=lodash',
      'version=' + pkg.version,
      'title=' + pkg.name,
      'debug=' + DEBUG
    ].join('&')
  ].join('!');
  var jsonLoader = ['json-loader'];

  if (DEBUG) {
    jsxLoader = ['react-hot', 'babel-loader?optional=runtime'];
  } else {
    jsxLoader = ['babel-loader?optional=runtime'];
  }

  return [
    {
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: jsxLoader
    },
    {
      test: /\.jpe?g$|\.svg$|\.png$/,
      loader: fileLoader
    },
    {
      test: /\.json$/,
      exclude: /node_modules/,
      loaders: jsonLoader
    },
    {
      test: /\.html$/,
      loader: htmlLoader
    }
  ];
}

module.exports = config;