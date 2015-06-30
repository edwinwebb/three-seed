var path = require('path');
var pkg = require('./package.json')
var DEBUG = process.env.NODE_ENV !== 'production';
var util = require('util');
var entry = {
  app: ['./app.js']
};

if (DEBUG) {
  entry.app.unshift('webpack/hot/dev-server');
}

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: entry,
    output: {
        path: path.resolve(pkg.config.buildDir),
        "publicPath" : "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
          { test: /\.html$/, exclude: /node_modules/, loader: "file-loader?name=[path][name].[ext]"},
          { test: /\.jpe?g$|\.svg$|\.png$/, exclude: /node_modules/, loader: "file-loader?name=[path][name].[ext]"}
        ]
    }
};
