/**
 * WEBPACK CONFIG
 *
 * Notes on config properties:
 *
 * 'entry'
 * Entry point for the bundle.
 *
 * 'output'
 * If you pass an array - the modules are loaded on startup. The last one is exported.
 *
 * 'resolve'
 * Array of file extensions used to resolve modules.
 *
 * 'webpack-dev-server'
 * Is a little node.js Express server, which uses the webpack-dev-middleware to
 * serve a webpack bundle. It also has a little runtime which is connected to
 * the server via Socket.IO.
 *
 * 'webpack/hot/dev-server'
 * By adding a script to your index.html file and a special entry point in your
 * configuration you will be able to get live reloads when doing changes to your
 * files.
 *
 * devtool: 'eval-source-map'
 * http://www.cnblogs.com/Answer1215/p/4312265.html
 * The source map file will only be downloaded if you have source maps enabled
 * and your dev tools open.
 *
 * HotModuleReplacementPlugin()
 * Hot Module Replacement (HMR) exchanges, adds or removes modules while an
 * application is running without page reload.
 *
 * NoErrorsPlugin()
 * Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server
 * since it eliminates page reloads altogether and recovers after syntax errors.
 *
 * 'react-hot'
 * React Hot Loader is a plugin for Webpack that allows instantaneous live
 * refresh without losing state while editing React components.
 *
 * 'babel'
 * Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5 source
 * that is actually delivered to the end user browser.
 */

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  entry: [
    // "./node_modules/bootstrap/dist/css/bootstrap.css",
    // "./node_modules/font-awesome/css/font-awesome.css",
    // "./node_modules/react-s-alert/dist/s-alert-default.css",
    // "./node_modules/react-s-alert/dist/s-alert-css-effects/slide.css",
    "webpack-dev-server/client?http://localhost:5000",
    "webpack/hot/dev-server",
    "./scripts/index",
    // './assets/css/custom.css'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    modules: ['node_modules', 'scripts'],
    extensions: ['.jsx', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015", 'react', "stage-0"]
        },
        include: path.join(__dirname, 'scripts')
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ]
        })
      },
    ]
  }
};
