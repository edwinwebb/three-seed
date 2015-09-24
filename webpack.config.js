var path = require('path');
var pkg = require('./package.json')
var DEBUG = process.env.NODE_ENV !== 'production';
var entry = {
  app: ['./app.js']
};

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: entry,
    debug : DEBUG,
    target : 'web',
    devtool : DEBUG ? 'inline-source-map' : false,
    output: {
        path: path.resolve(pkg.config.buildDir),
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
          { test: /\.html$/, exclude: /node_modules/, loader: "file-loader?name=[path][name].[ext]"},
          { test: /\.jpe?g$|\.svg$|\.png$/, exclude: /node_modules/, loader: "file-loader?name=[path][name].[ext]"},
          { test: /\.json$/, exclude: /node_modules/, loader: "json"}
        ]
    }
};
